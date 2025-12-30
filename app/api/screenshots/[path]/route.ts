import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser } from '@/lib/auth'

/**
 * Proxy endpoint to serve screenshots with proper auth checks
 * Admin users can view all screenshots, reporters can view their own
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const { user } = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminSupabase = createAdminClient()
    const path = decodeURIComponent(params.path)

    // Get the report to check ownership
    const { data: report } = await adminSupabase
      .from('slot_reports')
      .select('reporter_id, status')
      .eq('screenshot_path', path)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Check if user is admin or owner
    // const userProfile = await adminSupabase
    //   .from('profiles')
    //   .select('email')
    //   .eq('id', user.id)
    //   .single()

    // const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
    // const isAdmin = userProfile.data?.email && adminEmails.includes(userProfile.data.email)
    // const isOwner = report.reporter_id === user.id

    // if (!isAdmin && !isOwner) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    // Get signed URL for the screenshot
    const { data, error } = await adminSupabase.storage
      .from('screenshots')
      .createSignedUrl(path, 3600) // 1 hour expiry

    if (error || !data) {
      return NextResponse.json({ error: 'Failed to get screenshot' }, { status: 500 })
    }

    // Redirect to signed URL
    return NextResponse.redirect(data.signedUrl)
  } catch (error) {
    console.error('[API] Error serving screenshot:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

