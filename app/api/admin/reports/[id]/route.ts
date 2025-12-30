import { NextRequest, NextResponse } from "next/server";
import { PostgrestError } from "@supabase/supabase-js";

import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
};

type ReportDecision = "verified" | "rejected";

type SlotReport = {
  id: string;
  reporter_id: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  // add other slot_reports columns here as needed
};

type AuthResult = {
  user: { id: string } | null;
  error: Error | null;
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

// POST: Approve or reject a report
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ data?: SlotReport; error?: string }>> {
  try {
    /* ------------------------------ Auth check ------------------------------ */
    const { user, error: authError } = (await getCurrentUser()) as AuthResult;

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ----------------------------- Admin check ----------------------------- */
    const adminSupabase = createAdminClient();

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

    if (
      profileError ||
      !userProfile?.email ||
      !(await isAdmin(userProfile.email))
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    /* ------------------------------ Request body ----------------------------- */
    const body = await request.json();
    const { decision, reason_codes } = body;

    if (!decision || !["verified", "rejected"].includes(decision)) {
      return NextResponse.json(
        { error: 'Invalid decision. Must be "verified" or "rejected"' },
        { status: 400 }
      );
    }

    const typedDecision = decision as ReportDecision;

    /* ------------------------------ Update report ----------------------------- */
    const updateResult = await adminSupabase
      .from("slot_reports")
      .update({ status: typedDecision } as unknown as never)
      .eq("id", params.id)
      .select()
      .single();

    const {
      data: report,
      error: updateError,
    }: {
      data: SlotReport | null;
      error: PostgrestError | null;
    } = updateResult as {
      data: SlotReport | null;
      error: PostgrestError | null;
    };

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    /* ------------------------- Create verification record ------------------------ */
    const { error: verificationError } = await adminSupabase
      .from("report_verification")
      .insert({
        report_id: params.id,
        reviewer_id: user.id,
        decision: typedDecision,
        reason_codes: reason_codes || [],
      } as any);

    if (verificationError) {
      console.error(
        "[API] Error creating verification record:",
        verificationError
      );
    }

    /* ----------------------------- Create audit event ---------------------------- */
    await adminSupabase.from("audit_events").insert({
      actor_id: user.id,
      action: `report_${typedDecision}`,
      meta: {
        report_id: params.id,
        reason_codes,
      },
    } as any);

    // If verified, alerts will be processed by the cron job
    // (we don't trigger immediately to avoid blocking the admin action)

    return NextResponse.json({ data: report });
  } catch (error) {
    console.error("[API] Error processing report decision:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
