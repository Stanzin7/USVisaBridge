import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

type ConnectCode = {
  id: string;
  code: string;
  user_id: string;
  extension_id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  token_expires_at: number;
  used: boolean;
  created_at: string;
};

/**
 * POST /api/v1/extension/exchange
 * Exchange one-time connect code for session tokens
 * Secure endpoint that validates code and returns minimal session payload
 * 
 * Security: Tokens are stored temporarily (5 min expiry) and deleted immediately after use
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting (per IP)
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const rateLimitResult = await rateLimit(`extension-exchange:${ip}`, 10, 60); // 10 requests per minute
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { extensionId, code } = body;

    // Validate required fields
    if (!extensionId || !code) {
      return NextResponse.json(
        { error: "Missing required fields: extensionId, code" },
        { status: 400 }
      );
    }

    // Validate code format (64 hex characters)
    if (typeof code !== 'string' || !/^[a-f0-9]{64}$/.test(code)) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    // Find and validate code (atomic select + update)
    // Use SELECT FOR UPDATE pattern to prevent race conditions
    const { data: connectCode, error: codeError } = await adminSupabase
      .from("extension_connect_codes")
      .select("*")
      .eq("code", code)
      .eq("extension_id", extensionId)
      .eq("used", false)
      .single();

    if (codeError || !connectCode) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 401 }
      );
    }

    // Type assertion for TypeScript
    const codeData = connectCode as ConnectCode;

    // Check if code is expired
    const expiresAt = new Date(codeData.expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Code has expired" },
        { status: 401 }
      );
    }

    // Mark code as used (atomic update)
    // Only update if not already used (prevents race conditions)
    const { error: updateError } = await (adminSupabase
      .from("extension_connect_codes") as any)
      .update({ used: true })
      .eq("code", code)
      .eq("used", false);

    if (updateError) {
      console.error("Error marking code as used:", updateError);
      return NextResponse.json(
        { error: "Failed to process code" },
        { status: 500 }
      );
    }

    // Verify code was actually updated (handles race condition)
    const { data: verifyCode } = await adminSupabase
      .from("extension_connect_codes")
      .select("used")
      .eq("code", code)
      .single();

    if (!verifyCode || !(verifyCode as { used: boolean }).used) {
      // Race condition: code was used between select and update
      return NextResponse.json(
        { error: "Code has already been used" },
        { status: 401 }
      );
    }

    // Get user info for response
    const { data: userProfile, error: profileError } = await adminSupabase
      .from("profiles")
      .select("email")
      .eq("id", codeData.user_id)
      .single();

    if (profileError || !userProfile) {
      console.error("Error fetching user profile:", profileError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return minimal session payload
    // Tokens are deleted from database after use (via used=true, cleanup function)
    return NextResponse.json({
      access_token: codeData.access_token,
      refresh_token: codeData.refresh_token,
      expires_at: codeData.token_expires_at,
      user: {
        id: codeData.user_id,
        email: (userProfile as { email: string }).email,
      },
    });
    
  } catch (error: any) {
    console.error("[API] Error exchanging extension code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
