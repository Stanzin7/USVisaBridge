import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { randomBytes } from 'crypto'

export const dynamic = 'force-dynamic'

/**
 * Server-side callback handler for extension authentication
 * Handles OAuth callback from Supabase (magic link or Google OAuth)
 * Generates one-time connect code for secure extension authentication
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const extensionId = requestUrl.searchParams.get('extensionId')
  const origin = requestUrl.origin

  // Handle OAuth errors
  if (error) {
    console.error('Extension callback error:', error, errorDescription)
    return NextResponse.redirect(
      `${origin}/auth/extension/done?extensionId=${extensionId || ''}&error=${encodeURIComponent(error || 'Authentication failed')}`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/auth/extension/done?extensionId=${extensionId || ''}&error=${encodeURIComponent('Missing authentication code')}`
    )
  }

  if (!extensionId) {
    return NextResponse.redirect(
      `${origin}/auth/extension/done?error=${encodeURIComponent('Missing extension ID')}`
    )
  }

  try {
    // Exchange OAuth code for session
    const supabase = await createClient()
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError || !data.session) {
      console.error('Extension callback exchange error:', exchangeError)
      return NextResponse.redirect(
        `${origin}/auth/extension/done?extensionId=${extensionId}&error=${encodeURIComponent(exchangeError?.message || 'Session exchange failed')}`
      )
    }

    // Get user ID and tokens from session
    const userId = data.session.user.id
    const accessToken = data.session.access_token
    const refreshToken = data.session.refresh_token
    const tokenExpiresAt = data.session.expires_at || 0

    // Generate secure one-time connect code (32 bytes = 64 hex chars)
    const connectCode = randomBytes(32).toString('hex')

    // Store code with tokens in database (expires in 5 minutes)
    // Tokens are stored temporarily and deleted after use
    const adminSupabase = createAdminClient()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    const { error: insertError } = await adminSupabase
      .from('extension_connect_codes')
      .insert({
        code: connectCode,
        user_id: userId,
        extension_id: extensionId,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        token_expires_at: tokenExpiresAt,
        used: false,
      })

    if (insertError) {
      console.error('Error storing connect code:', insertError)
      return NextResponse.redirect(
        `${origin}/auth/extension/done?extensionId=${extensionId}&error=${encodeURIComponent('Failed to generate connect code')}`
      )
    }

    // Redirect to done page with connect code
    return NextResponse.redirect(
      `${origin}/auth/extension/done?extensionId=${encodeURIComponent(extensionId)}&code=${connectCode}`
    )
  } catch (error: any) {
    console.error('Extension callback error:', error)
    return NextResponse.redirect(
      `${origin}/auth/extension/done?extensionId=${extensionId || ''}&error=${encodeURIComponent(error.message || 'Authentication failed')}`
    )
  }
}

