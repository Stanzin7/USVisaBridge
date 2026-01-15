'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Extension Connection Done Page
 * Sends one-time connect code to extension via postMessage
 * Does NOT send tokens - only the code for secure exchange
 */
export default function ExtensionDonePage() {
  const searchParams = useSearchParams()
  const extensionId = searchParams.get('extensionId')
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Connecting extension...')

  useEffect(() => {
    // Get app origin for validation - uses current origin (works in dev and prod)
    const appOrigin = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000'

    // Handle errors
    if (error) {
      setStatus('error')
      setMessage(decodeURIComponent(error))
      return
    }

    // Validate required parameters
    if (!extensionId || !code) {
      setStatus('error')
      setMessage('Missing required parameters. Please try again.')
      return
    }

    // Send code to extension via postMessage
    // Only send code, NOT tokens (security requirement)
    const messageData = {
      type: 'USVISABRIDGE_EXTENSION_CONNECT',
      extensionId: extensionId,
      code: code,
    }

    try {
      // Validate target origin matches app URL
      if (typeof window !== 'undefined') {
        const currentOrigin = window.location.origin
        
        // Send message to extension
        window.postMessage(messageData, appOrigin)
        
        setStatus('success')
        setMessage('Connected! You can close this tab.')
        
        // Try to close tab after short delay
        setTimeout(() => {
          window.close()
        }, 2000)
      }
    } catch (err: any) {
      console.error('Error sending message to extension:', err)
      setStatus('error')
      setMessage('Failed to connect extension. Please try again.')
    }
  }, [extensionId, code, error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Connecting...</h1>
            <p>{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#10b981' }}>Connected!</h1>
            <p style={{ color: '#10b981' }}>{message}</p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              This tab will close automatically...
            </p>
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

