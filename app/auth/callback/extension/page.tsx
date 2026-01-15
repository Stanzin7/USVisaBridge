'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'

/**
 * Extension Callback Page
 * This page is opened when user clicks magic link from extension
 * It extracts the session token and sends it to the extension
 */
export default function ExtensionCallbackPage() {
  const searchParams = useSearchParams()
  const extensionId = searchParams.get('extensionId')
  const code = searchParams.get('code')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Completing sign in...')

  useEffect(() => {
    async function handleCallback() {
      const token = searchParams.get('token')
      const tokenType = searchParams.get('type')
      const sessionReady = searchParams.get('session') === 'ready'
      const errorParam = searchParams.get('error')
      
      // Handle errors
      if (errorParam) {
        setStatus('error')
        setMessage(`Authentication error: ${decodeURIComponent(errorParam)}`)
        return
      }
      
      // Check if session is already ready (from server-side exchange)
      if (sessionReady) {
        try {
          const supabase = createClient()
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            // Extract and send session to extension
            const sessionData = {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at,
              expires_in: session.expires_in,
              token_type: session.token_type,
              user: {
                id: session.user.id,
                email: session.user.email,
              }
            }
            sendSessionToExtension(sessionData)
            return
          }
        } catch (error: any) {
          console.error('Error getting session:', error)
          setStatus('error')
          setMessage('Failed to get session')
          return
        }
      }
      
      // Handle token from Supabase verify endpoint
      if (token && tokenType === 'magiclink') {
        // Supabase verify endpoint gives us a token, we need to exchange it
        // But actually, Supabase should redirect with code, not token
        // For now, show error
        setStatus('error')
        setMessage('Token-based auth not yet supported. Please use code-based flow.')
        return
      }
      
      if (!code) {
        setStatus('error')
        setMessage('Missing authentication code')
        return
      }

      try {
        const supabase = createClient()
        
        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        
        if (error) {
          throw error
        }

        if (!data.session) {
          throw new Error('No session received')
        }

        // Extract session data
        const session = {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
          expires_in: data.session.expires_in,
          token_type: data.session.token_type,
          user: {
            id: data.session.user.id,
            email: data.session.user.email,
          }
        }

        // Send session to extension
        sendSessionToExtension(session)
      } catch (error: any) {
        console.error('Auth error:', error)
        setStatus('error')
        setMessage(error.message || 'Authentication failed. Please try again.')
      }
    }

    // Function to send session to extension
    function sendSessionToExtension(session: any) {
      if (!extensionId) {
        setStatus('error')
        setMessage('Extension ID not found. Please sign in from the extension popup.')
        return
      }
      
      // Store in localStorage with extension-specific key
      // The content script (callback-handler.js) will pick this up and send to extension
      const sessionKey = `usvisabridge_session_${extensionId}`
      localStorage.setItem(sessionKey, JSON.stringify(session))
      console.log('Callback page: Session stored in localStorage with key:', sessionKey)
      
      // Also send via postMessage (content script listens for this)
      window.postMessage({
        type: 'USVISABRIDGE_AUTH_COMPLETE',
        extensionId: extensionId,
        session: session
      }, window.location.origin)
      
      // Dispatch a custom event that content script can listen to
      window.dispatchEvent(new CustomEvent('usvisabridge-session-ready', {
        detail: { session, extensionId }
      }))
      
      setStatus('success')
      setMessage('Successfully signed in! The extension will detect your session automatically. You can close this tab.')
      
      // Try to close after delay
      setTimeout(() => {
        window.close()
      }, 3000)
    }

    handleCallback()
  }, [code, extensionId])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Signing in...</h1>
            <p>{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#10b981' }}>Success!</h1>
            <p>{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#ef4444' }}>Error</h1>
            <p style={{ color: '#ef4444' }}>{message}</p>
            <button
              onClick={() => window.close()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  )
}

