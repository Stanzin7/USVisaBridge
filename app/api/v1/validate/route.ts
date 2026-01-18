import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/validate
 * Validate JWT token
 * Used to check if user is authenticated
 */
export async function GET(request: NextRequest) {
  try {
    // Get user from JWT token
    const { user, error: authError } = await getCurrentUser();

    if (authError || !user) {
      return NextResponse.json(
        { valid: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 401 }
    );
  }
}

