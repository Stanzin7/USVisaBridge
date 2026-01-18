import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { HeaderContent } from './HeaderContent'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <HeaderContent isLoggedIn={!!user} />
}

