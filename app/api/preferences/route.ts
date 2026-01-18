import { NextRequest, NextResponse } from "next/server";
import { PostgrestError } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { preferencesSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rateLimit";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Preference = {
  id: string;
  user_id: string;
  visa_type: string;
  consulate: string;
  date_start: string | null;
  date_end: string | null;
  channels: string[];
  quiet_hours_start: number;
  quiet_hours_end: number;
  created_at: string;
  updated_at: string;
};

type PreferenceInsert = {
  user_id: string;
  visa_type: string;
  consulate: string;
  date_start?: string | null;
  date_end?: string | null;
  channels?: string[];
  quiet_hours_start?: number;
  quiet_hours_end?: number;
};

// GET: List user preferences
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();
    const {
      data,
      error,
    }: {
      data: Preference[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from("preferences")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[API] Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create or update preference
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const { user, error: authError } = await getCurrentUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResult = await rateLimit(`preferences:${user.id}`, 10, 60);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = preferencesSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.errors },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Upsert preference (unique on user_id, visa_type, consulate)
    const upsertResult = await supabase
      .from("preferences")
      .upsert(
        {
          user_id: user.id,
          visa_type: validation.data.visa_type,
          consulate: validation.data.consulate,
          date_start: validation.data.date_start || null,
          date_end: validation.data.date_end || null,
          channels: validation.data.channels,
          quiet_hours_start: validation.data.quiet_hours_start,
          quiet_hours_end: validation.data.quiet_hours_end,
        } as unknown as never,
        {
          onConflict: "user_id,visa_type,consulate",
        }
      )
      .select()
      .single();

    const {
      data,
      error,
    }: {
      data: Preference | null;
      error: PostgrestError | null;
    } = upsertResult as {
      data: Preference | null;
      error: PostgrestError | null;
    };

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[API] Error creating/updating preference:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete preference
export async function DELETE(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const preferenceId = searchParams.get("id");

    if (!preferenceId) {
      return NextResponse.json(
        { error: "Missing preference ID" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("preferences")
      .delete()
      .eq("id", preferenceId)
      .eq("user_id", user.id); // Ensure user owns this preference

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error deleting preference:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
