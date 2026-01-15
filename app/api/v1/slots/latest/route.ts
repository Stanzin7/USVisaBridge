import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/slots/latest
 * Get latest slot availability
 * Requires JWT authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Get user from JWT token
    const { user, error: authError } = await getCurrentUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const adminSupabase = createAdminClient();

    // Get latest verified slot reports
    const { data: reports, error } = await adminSupabase
      .from("slot_reports")
      .select("*")
      .eq("status", "verified")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch slot data" },
        { status: 500 }
      );
    }

    // Transform data for extension
    const slots = (reports || []).map((report) => ({
      location: report.consulate,
      visaType: report.visa_type,
      earliestDate: report.earliest_date,
      latestDate: report.latest_date,
      timestamp: new Date(report.created_at).getTime(),
      availableDates: report.latest_date && report.earliest_date
        ? Math.ceil(
            (new Date(report.latest_date).getTime() -
              new Date(report.earliest_date).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0,
    }));

    return NextResponse.json({
      success: true,
      slots,
      count: slots.length,
    });
  } catch (error: any) {
    console.error("[API] Error fetching latest slots:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

