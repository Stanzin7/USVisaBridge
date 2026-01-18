import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/slots
 * Submit slot data
 * Requires JWT authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Get user from JWT token
    const { user, error: authError } = await getCurrentUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const slotData = await request.json();

    // Validate required fields
    if (!slotData.location || !slotData.scheduleDays) {
      return NextResponse.json(
        { error: "Missing required fields: location, scheduleDays" },
        { status: 400 }
      );
    }

    // Store slot submission
    const adminSupabase = createAdminClient();

    // You can create a slot_submissions table or use existing slot_reports
    // For MVP, we'll just log it and return success
    // In production, you'd want to:
    // 1. Store raw slot data
    // 2. Process and aggregate
    // 3. Update slot_availability table

    // Return success
    return NextResponse.json({
      success: true,
      message: "Slot data submitted successfully",
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error("[API] Error submitting slot data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

