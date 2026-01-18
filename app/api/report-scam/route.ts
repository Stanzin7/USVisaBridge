import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { rateLimit } from "@/lib/rateLimit"

export const dynamic = "force-dynamic"

// Rate limit: 3 reports per hour per IP
const RATE_LIMIT_REQUESTS = 3
const RATE_LIMIT_WINDOW = 3600 // 1 hour

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown"

    // Rate limiting
    const rateLimitResult = await rateLimit(
      `report-scam:${ip}`,
      RATE_LIMIT_REQUESTS,
      RATE_LIMIT_WINDOW
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { category, country, url, description, requestedItems, hasEvidence } = body

    // Validate required fields
    if (!category || !country || !description) {
      return NextResponse.json(
        { error: "Missing required fields: category, country, description" },
        { status: 400 }
      )
    }

    // Validate description length (prevent abuse)
    if (description.length > 5000) {
      return NextResponse.json(
        { error: "Description is too long. Please keep it under 5000 characters." },
        { status: 400 }
      )
    }

    // Sanitize URL if provided
    let sanitizedUrl: string | null = null
    if (url) {
      try {
        const urlObj = new URL(url)
        sanitizedUrl = urlObj.toString()
      } catch {
        // Invalid URL, ignore it
        sanitizedUrl = null
      }
    }

    // Store in Supabase (private table)
    const adminSupabase = createAdminClient()

    // Insert into scam_reports table
    // Table structure needed:
    // CREATE TABLE scam_reports (
    //   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //   category TEXT NOT NULL,
    //   country TEXT NOT NULL,
    //   url TEXT,
    //   description TEXT NOT NULL,
    //   requested_items TEXT[],
    //   has_evidence BOOLEAN DEFAULT false,
    //   reporter_ip TEXT,
    //   created_at TIMESTAMPTZ DEFAULT NOW()
    // );
    // Note: This table should be private (not publicly accessible via API)
    const { error: insertError } = await adminSupabase
      .from("scam_reports")
      .insert({
        category,
        country,
        url: sanitizedUrl,
        description: description.substring(0, 5000), // Ensure max length
        requested_items: requestedItems || [],
        has_evidence: hasEvidence || false,
        reporter_ip: ip,
        created_at: new Date().toISOString(),
      } as never)

    if (insertError) {
      console.error("[API] Error storing scam report:", insertError)
      // Don't expose database errors to user
      return NextResponse.json(
        { error: "Failed to submit report. Please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Report submitted successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("[API] Error processing scam report:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

