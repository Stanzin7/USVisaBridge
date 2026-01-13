import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Visa Slot Monitoring',
  description: 'Crowdsourced visa slot monitoring',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
        <nav className="sticky top-0 z-50 w-full bg-[#0a0d1a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
                  <span className="text-foreground">USVisa</span>
                  <span className="text-primary">Bridge</span>
                </span>
              </Link>
              <div className="flex items-center">
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
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
