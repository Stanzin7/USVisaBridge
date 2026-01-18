import { NextRequest, NextResponse } from "next/server";
import { PostgrestError } from "@supabase/supabase-js";

import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
};

type SlotReportStatus = "pending" | "approved" | "rejected";

type SlotReport = {
  id: string;
  reporter_id: string;
  status: SlotReportStatus;
  created_at: string;
  updated_at: string | null;

  // add other slot_reports columns here as needed
  reason?: string | null;
  slot_id?: string | null;
};

type SlotReportWithReporter = SlotReport & {
  profiles: Pick<Profile, "email" | "full_name"> | null;
};

type AuthResult = {
  user: { id: string } | null;
  error: Error | null;
};

export async function GET(
  request: NextRequest
  ): Promise<NextResponse<{ data?: SlotReportWithReporter[]; error?: string }>> {
  try {
    // Auth check
    const { user, error: authError } = (await getCurrentUser()) as AuthResult;

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin check
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

    // Query params
    const { searchParams } = new URL(request.url);

    const status =
      (searchParams.get("status") as SlotReportStatus) ?? "pending";

    const limit = Number.isNaN(Number(searchParams.get("limit")))
      ? 50
      : Math.min(Number(searchParams.get("limit")), 100);

    // Data fetch
    const {
      data,
      error,
    }: {
      data: SlotReportWithReporter[] | null;
      error: PostgrestError | null;
    } = await adminSupabase
      .from("slot_reports")
      .select(
        `
        *,
        profiles:reporter_id (
          email,
          full_name
        )
      `
      )
      .eq("status", status)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("[API] Error fetching admin reports:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
