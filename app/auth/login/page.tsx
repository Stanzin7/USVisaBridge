'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const extensionId = searchParams.get('extensionId')

  // Get redirect URL based on current origin (works in dev, tunnel, and prod)
  // Uses window.location.origin which automatically adapts to localhost, tunnel, or production
  const getRedirectUrl = () => {
    // Use current origin - works for localhost:3000, tunnel URLs, and production
    const origin = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000'
    
    if (extensionId) {
      return `${origin}/auth/callback/extension?extensionId=${encodeURIComponent(extensionId)}`
    } else {
      return `${origin}/auth/callback`
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createClient()
    const redirectUrl = getRedirectUrl()
    
    // Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
      setLoading(false)
    } else {
      setMessage('Check your email for the login link!')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setOauthLoading(true)
    setMessage('')

    const supabase = createClient()
    const redirectUrl = getRedirectUrl()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
      setOauthLoading(false)
    }
    // OAuth redirects to provider, so loading state will persist until redirect
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {extensionId ? 'Connect Extension' : 'Sign In'}
        </h1>
        
        {extensionId && (
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to connect your USVisaBridge account to the extension.
          </p>
        )}

        {/* Google OAuth Button */}
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || oauthLoading}
          className="w-full mb-4"
          variant="outline"
        >
          {oauthLoading ? (
            'Connecting...'
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Magic Link Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || oauthLoading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Continue with Email (Magic Link)'}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

