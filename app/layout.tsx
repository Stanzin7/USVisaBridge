import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminNavLink } from '@/components/AdminNavLink'
import { Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Visa Slot Monitoring',
  description: 'Crowdsourced visa slot monitoring',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span>Visa Slot Monitor</span>
                </Link>
                {user && (
                  <div className="hidden md:flex items-center gap-1">
                    <Link 
                      href="/dashboard" 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/preferences" 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    >
                      Preferences
                    </Link>
                    <Link 
                      href="/reports" 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    >
                      Submit Report
                    </Link>
                    <AdminNavLink />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <form action="/api/auth/signout" method="post">
                    <button 
                      type="submit" 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    >
                      Sign Out
                    </button>
                  </form>
                ) : (
                  <Link 
                    href="/auth/login" 
                    className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-primary/10"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
