import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser, isAdmin } from '@/lib/auth'

// GET: List pending reports for admin review
export async function GET(request: NextRequest) {
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

