import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser, isAdmin } from '@/lib/auth'

// POST: Approve or reject a report
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error: authError } = await getCurrentUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin access
    const userProfile = await createAdminClient()
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    if (!userProfile.data || !(await isAdmin(userProfile.data.email || undefined))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { decision, reason_codes } = body

    if (!decision || !['verified', 'rejected'].includes(decision)) {
      return NextResponse.json(
        { error: 'Invalid decision. Must be "verified" or "rejected"' },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()

    // Update report status
    const { data: report, error: updateError } = await adminSupabase
      .from('slot_reports')
      .update({ status: decision })
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // Create verification record
    const { error: verificationError } = await adminSupabase
      .from('report_verification')
      .insert({
        report_id: params.id,
        reviewer_id: user.id,
        decision,
        reason_codes: reason_codes || [],
      })

    if (verificationError) {
      console.error('[API] Error creating verification record:', verificationError)
    }

    // Create audit event
    await adminSupabase.from('audit_events').insert({
      actor_id: user.id,
      action: `report_${decision}`,
      meta: {
        report_id: params.id,
        reason_codes,
      },
    })

    // If verified, alerts will be processed by the cron job
    // (we don't trigger immediately to avoid blocking the admin action)

    return NextResponse.json({ data: report })
  } catch (error) {
    console.error('[API] Error processing report decision:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

