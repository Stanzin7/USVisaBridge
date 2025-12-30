import { NextRequest, NextResponse } from "next/server";
import { PostgrestError } from "@supabase/supabase-js";

import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
};

type SlotReport = {
  id: string;
  reporter_id: string | null;
  status: string;
  screenshot_path: string | null;
};

type AuthResult = {
  user: { id: string } | null;
  error: Error | null;
};

/**
 * Proxy endpoint to serve screenshots with proper auth checks
 * Admin users can view all screenshots, reporters can view their own
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    /* ------------------------------ Auth check ------------------------------ */
    const { user, error: authError } = (await getCurrentUser()) as AuthResult;

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminSupabase = createAdminClient();
    const path = decodeURIComponent(params.path);

    /* ------------------------------ Get report ----------------------------- */
    const {
      data: report,
      error: reportError,
    }: {
      data: Pick<SlotReport, "reporter_id" | "status"> | null;
      error: PostgrestError | null;
    } = await adminSupabase
      .from("slot_reports")
      .select("reporter_id, status")
      .eq("screenshot_path", path)
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    /* ----------------------------- Admin check ----------------------------- */
    const {
      data: userProfile,
      error: profileError,
    }: {
      data: Pick<Profile, "email"> | null;
      error: PostgrestError | null;
    } = await adminSupabase
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    const isAdmin =
      userProfile?.email && adminEmails.includes(userProfile.email);
    const isOwner = report.reporter_id === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    /* ------------------------- Get signed URL for screenshot ------------------------ */
    const { data, error } = await adminSupabase.storage
      .from("screenshots")
      .createSignedUrl(path, 3600); // 1 hour expiry

    if (error || !data) {
      return NextResponse.json(
        { error: "Failed to get screenshot" },
        { status: 500 }
      );
    }

    /* ------------------------------ Redirect to signed URL ----------------------------- */
    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("[API] Error serving screenshot:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
