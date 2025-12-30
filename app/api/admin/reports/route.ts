import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser, isAdmin } from '@/lib/auth'

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

// GET: List pending reports for admin review
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getCurrentUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin access
    const userProfileResult = await createAdminClient()
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    const userProfile = userProfileResult.data as { email: string | null } | null
    if (!userProfile?.email || !(await isAdmin(userProfile.email))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const limit = parseInt(searchParams.get('limit') || '50')

    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
      .from('slot_reports')
      .select(`
        *,
        profiles:reporter_id (email, full_name)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[API] Error fetching admin reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

