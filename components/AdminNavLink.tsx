import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth'
import Link from 'next/link'

export async function AdminNavLink() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    if (!profile?.email || !(await isAdmin(profile.email))) {
      return null
    }

    return (
      <Link 
        href="/admin/reports" 
        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
      >
        Admin
      </Link>
    )
  } catch (error) {
    // Silently fail if admin check fails
    return null
  }
}

