import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { slotReportSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rateLimit'
import { getCurrentUser } from '@/lib/auth'
import { calculateConfidence, shouldAutoVerify } from '@/lib/scoring'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

// POST: Create slot report (with optional screenshot upload)
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(`reports:${user.id}`, 5, 60)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const screenshot = formData.get('screenshot') as File | null
    const consulate = formData.get('consulate') as string
    const visaType = formData.get('visa_type') as string
    const earliestDate = formData.get('earliest_date') as string
    const latestDate = formData.get('latest_date') as string | null

    // Validate file if present
    if (screenshot && screenshot.size > 0) {
      if (screenshot.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Screenshot must be less than 2MB' },
          { status: 400 }
        )
      }
      if (!ALLOWED_FILE_TYPES.includes(screenshot.type)) {
        return NextResponse.json(
          { error: 'Screenshot must be PNG or JPEG' },
          { status: 400 }
        )
      }
    }

    // Validate report data
    const validation = slotReportSchema.safeParse({
      consulate,
      visa_type: visaType,
      earliest_date: earliestDate,
      latest_date: latestDate,
    })

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const adminSupabase = createAdminClient()

    // Upload screenshot if present
    let screenshotPath: string | null = null
    if (screenshot && screenshot.size > 0) {
      const fileExt = screenshot.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(fileName, screenshot, {
          contentType: screenshot.type,
        })

      if (uploadError) {
        return NextResponse.json(
          { error: `Upload failed: ${uploadError.message}` },
          { status: 500 }
        )
      }

      screenshotPath = uploadData.path
    }

    // Get reporter's verified report count for scoring
    const { count: verifiedCount } = await adminSupabase
      .from('slot_reports')
      .select('*', { count: 'exact', head: true })
      .eq('reporter_id', user.id)
      .eq('status', 'verified')

    // Check for cross-confirmations (similar reports in last 15 min)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString()
    const { count: crossConfirmCount } = await adminSupabase
      .from('slot_reports')
      .select('*', { count: 'exact', head: true })
      .eq('visa_type', validation.data.visa_type)
      .eq('consulate', validation.data.consulate)
      .gte('created_at', fifteenMinutesAgo)

    // Calculate confidence score
    const confidence = calculateConfidence({
      hasScreenshot: !!screenshotPath,
      reporterVerifiedReportCount: verifiedCount || 0,
      crossConfirmations: (crossConfirmCount || 0) - 1, // Exclude current report
    })

    // Determine status (auto-verify if confidence >= 0.75)
    const status = shouldAutoVerify(confidence) ? 'verified' : 'pending'

    // Insert report
    const { data: report, error: insertError } = await adminSupabase
      .from('slot_reports')
      .insert({
        reporter_id: user.id,
        consulate: validation.data.consulate,
        visa_type: validation.data.visa_type,
        earliest_date: validation.data.earliest_date,
        latest_date: validation.data.latest_date || null,
        screenshot_path: screenshotPath,
        confidence,
        status,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // If auto-verified, trigger alert processing (async, don't wait)
    if (status === 'verified') {
      // In production, you might want to queue this
      // For MVP, we'll let the cron job handle it
    }

    return NextResponse.json({ data: report }, { status: 201 })
  } catch (error) {
    console.error('[API] Error creating slot report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET: List user's reports
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('slot_reports')
      .select('*')
      .eq('reporter_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[API] Error fetching slot reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

