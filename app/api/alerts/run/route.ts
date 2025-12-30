import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendAlertEmail } from '@/lib/email'
import { headers } from 'next/headers'

/**
 * Cron worker endpoint to process verified reports and send alerts
 * Protected by WORKER_SECRET header
 * 
 * Scans verified reports from last N minutes and fans out alerts to matching preferences
 */

const WORKER_SECRET = process.env.WORKER_SECRET
const LOOKBACK_MINUTES = 15 // Process reports from last 15 minutes

export async function POST(request: NextRequest) {
  try {
    // Verify worker secret
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    const providedSecret = authHeader?.replace('Bearer ', '')

    if (!WORKER_SECRET || providedSecret !== WORKER_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminSupabase = createAdminClient()
    const lookbackTime = new Date(Date.now() - LOOKBACK_MINUTES * 60 * 1000).toISOString()

    // Get verified reports from last N minutes
    const { data: reports, error: reportsError } = await adminSupabase
      .from('slot_reports')
      .select('*')
      .eq('status', 'verified')
      .gte('updated_at', lookbackTime) // Reports that were verified recently
      .order('updated_at', { ascending: true })

    if (reportsError) {
      return NextResponse.json({ error: reportsError.message }, { status: 500 })
    }

    if (!reports || reports.length === 0) {
      return NextResponse.json({ 
        message: 'No new verified reports to process',
        processed: 0,
      })
    }

    let processedCount = 0
    let alertCount = 0

    // Process each report
    for (const report of reports) {
      // Find matching preferences
      const { data: preferences, error: prefError } = await adminSupabase
        .from('preferences')
        .select('*')
        .eq('visa_type', report.visa_type)
        .eq('consulate', report.consulate)

      if (prefError) {
        console.error(`[ALERTS] Error fetching preferences for report ${report.id}:`, prefError)
        continue
      }

      if (!preferences || preferences.length === 0) {
        continue
      }

      // Filter preferences by date range if specified
      const matchingPrefs = preferences.filter((pref) => {
        if (pref.date_start && new Date(report.earliest_date) < new Date(pref.date_start)) {
          return false
        }
        if (pref.date_end && new Date(report.earliest_date) > new Date(pref.date_end)) {
          return false
        }
        return true
      })

      // Get user profiles for matching preferences
      const userIds = matchingPrefs.map(p => p.user_id)
      const { data: profiles, error: profilesError } = await adminSupabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds)

      if (profilesError || !profiles) {
        console.error(`[ALERTS] Error fetching profiles:`, profilesError)
        continue
      }

      const profileMap = new Map(profiles.map(p => [p.id, p.email]))

      // Send alerts for each matching preference
      for (const pref of matchingPrefs) {
        const userEmail = profileMap.get(pref.user_id)
        if (!userEmail) continue

        // Check quiet hours
        const now = new Date()
        const hour = now.getHours()
        if (pref.quiet_hours_start > pref.quiet_hours_end) {
          // Quiet hours span midnight (e.g., 22:00 - 08:00)
          if (hour >= pref.quiet_hours_start || hour < pref.quiet_hours_end) {
            continue // Skip during quiet hours
          }
        } else {
          // Normal quiet hours (e.g., 22:00 - 08:00, but this case is 08:00 - 22:00)
          if (hour >= pref.quiet_hours_start && hour < pref.quiet_hours_end) {
            continue // Skip during quiet hours
          }
        }

        // Send alerts for each channel
        for (const channel of pref.channels) {
          // Generate dedupe key
          const dedupeKey = `${pref.user_id}:${report.id}:${channel}`

          // Check if alert already sent (deduplication)
          const { data: existingAlert } = await adminSupabase
            .from('alerts')
            .select('id')
            .eq('dedupe_key', dedupeKey)
            .single()

          if (existingAlert) {
            continue // Already sent, skip
          }

          // Create alert record (pending)
          const { data: alert, error: alertInsertError } = await adminSupabase
            .from('alerts')
            .insert({
              user_id: pref.user_id,
              report_id: report.id,
              channel,
              status: 'pending',
              dedupe_key: dedupeKey,
            })
            .select()
            .single()

          if (alertInsertError) {
            console.error(`[ALERTS] Error creating alert record:`, alertInsertError)
            continue
          }

          // Send alert based on channel
          let sendResult: { success: boolean; error?: string } = { success: false }

          if (channel === 'email') {
            sendResult = await sendAlertEmail({
              to: userEmail,
              visaType: report.visa_type,
              consulate: report.consulate,
              earliestDate: report.earliest_date,
              latestDate: report.latest_date || undefined,
              reportUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?report=${report.id}`,
            })
          } else if (channel === 'sms') {
            // SMS not implemented in MVP
            sendResult = { success: false, error: 'SMS channel not implemented' }
          } else if (channel === 'push') {
            // Push not implemented in MVP
            sendResult = { success: false, error: 'Push channel not implemented' }
          }

          // Update alert status
          const alertStatus = sendResult.success ? 'sent' : 'failed'
          await adminSupabase
            .from('alerts')
            .update({
              status: alertStatus,
              error: sendResult.error || null,
              sent_at: sendResult.success ? new Date().toISOString() : null,
            })
            .eq('id', alert!.id)

          if (sendResult.success) {
            alertCount++
          }
        }
      }

      processedCount++
    }

    return NextResponse.json({
      message: 'Alerts processed',
      reportsProcessed: processedCount,
      alertsSent: alertCount,
    })
  } catch (error) {
    console.error('[API] Error processing alerts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

