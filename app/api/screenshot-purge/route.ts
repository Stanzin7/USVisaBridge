import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PostgrestError } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type ReportToPurge = {
  id: string;
  screenshot_path: string;
};

/**
 * Scheduled job endpoint to purge screenshots according to retention policy
 * 
 * Purge rules:
 * - Delete screenshots where purge_at <= now()
 * - Set purge_at on upload: created_at + 7 days
 * - Set purge_at to now() when report is verified or rejected
 * 
 * This endpoint should be called by a cron job (hourly or daily)
 * Can also be triggered manually by admins for testing
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add auth check for manual triggers
    // For cron jobs, use a secret token or IP whitelist
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.PURGE_JOB_SECRET;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminSupabase = createAdminClient();
    const now = new Date().toISOString();

    // Find screenshots that should be purged
    const {
      data: reportsToPurge,
      error: queryError,
    }: {
      data: ReportToPurge[] | null;
      error: PostgrestError | null;
    } = await adminSupabase
      .from("slot_reports")
      .select("id, screenshot_path")
      .not("screenshot_path", "is", null)
      .lte("purge_at", now);

    if (queryError) {
      console.error("[Purge Job] Error querying reports:", queryError);
      return NextResponse.json(
        { error: "Failed to query reports", details: queryError.message },
        { status: 500 }
      );
    }

    if (!reportsToPurge || reportsToPurge.length === 0) {
      return NextResponse.json({
        message: "No screenshots to purge",
        purged_count: 0,
      });
    }

    const purgedIds: string[] = [];
    const errors: Array<{ id: string; error: string }> = [];

    // Delete each screenshot from storage and update database
    for (const report of reportsToPurge) {
      if (!report.screenshot_path) continue;

      try {
        // Delete from Supabase Storage
        const { error: storageError } = await adminSupabase.storage
          .from("screenshots")
          .remove([report.screenshot_path]);

        if (storageError) {
          console.error(
            `[Purge Job] Error deleting screenshot ${report.screenshot_path}:`,
            storageError
          );
          errors.push({
            id: report.id,
            error: storageError.message,
          });
          continue;
        }

        // Update database: clear screenshot_path and record deletion timestamp
        const { error: updateError } = await adminSupabase
          .from("slot_reports")
          .update({
            screenshot_path: null,
            screenshot_deleted_at: now,
          } as unknown as never)
          .eq("id", report.id);

        if (updateError) {
          console.error(
            `[Purge Job] Error updating report ${report.id}:`,
            updateError
          );
          errors.push({
            id: report.id,
            error: updateError.message,
          });
          continue;
        }

        purgedIds.push(report.id);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error(`[Purge Job] Unexpected error for report ${report.id}:`, err);
        errors.push({
          id: report.id,
          error: errorMessage,
        });
      }
    }

    return NextResponse.json({
      message: "Purge job completed",
      purged_count: purgedIds.length,
      purged_ids: purgedIds,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("[Purge Job] Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET: Check purge status (for monitoring)
export async function GET(request: NextRequest) {
  try {
    const adminSupabase = createAdminClient();
    const now = new Date().toISOString();

    // Count screenshots pending purge
    const { count, error } = await adminSupabase
      .from("slot_reports")
      .select("*", { count: "exact", head: true })
      .not("screenshot_path", "is", null)
      .lte("purge_at", now);

    if (error) {
      return NextResponse.json(
        { error: "Failed to query", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pending_purge_count: count || 0,
      timestamp: now,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

