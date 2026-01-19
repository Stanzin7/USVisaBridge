/**
 * Security-enhanced middleware helpers
 * 
 * Integrate this with your existing middleware.ts to add security monitoring
 * and IP blocking capabilities.
 */

import { NextRequest, NextResponse } from 'next/server'
import { isIPBlocked, logSecurityEvent, detectSuspiciousPattern } from './security-monitoring'

/**
 * Enhanced request handler with security checks
 * 
 * Use this in your middleware to add security monitoring:
 * 
 * ```typescript
 * export async function middleware(request: NextRequest) {
 *   // Check security first
 *   const securityCheck = await checkRequestSecurity(request)
 *   if (!securityCheck.allowed) {
 *     return securityCheck.response
 *   }
 *   
 *   // Your existing middleware logic...
 * }
 * ```
 */
export async function checkRequestSecurity(
  request: NextRequest
): Promise<{
  allowed: boolean
  response?: NextResponse
  securityEvent?: {
    type: string
    severity: 'low' | 'medium' | 'high' | 'critical'
  }
}> {
  const ip = getClientIP(request)
  const url = new URL(request.url)
  const endpoint = url.pathname
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''

  // Check if IP is blocked
  if (isIPBlocked(ip)) {
    await logSecurityEvent({
      type: 'unauthorized_access_attempt',
      ip,
      endpoint,
      severity: 'high',
      details: {
        reason: 'Blocked IP attempted access',
        userAgent,
        referer,
      },
    })

    return {
      allowed: false,
      response: new NextResponse('Access Denied', { status: 403 }),
      securityEvent: {
        type: 'unauthorized_access_attempt',
        severity: 'high',
      },
    }
  }

  // Detect suspicious patterns
  const suspiciousPattern = detectSuspiciousPattern({
    ip,
    endpoint,
    userAgent,
    referer,
    method: request.method,
  })

  if (suspiciousPattern) {
    await logSecurityEvent({
      type: suspiciousPattern,
      ip,
      endpoint,
      severity: 'medium',
      details: {
        pattern: suspiciousPattern,
        userAgent,
        referer,
        method: request.method,
      },
    })

    // Don't block immediately, just log
    // You can adjust this to block on certain patterns
  }

  // Check for DDoS patterns (rapid requests to same endpoint)
  const isDDoSPattern = await checkDDoSPattern(ip, endpoint)
  if (isDDoSPattern) {
    await logSecurityEvent({
      type: 'ddos_pattern',
      ip,
      endpoint,
      severity: 'high',
      details: {
        pattern: 'rapid_requests',
        userAgent,
      },
    })

    return {
      allowed: false,
      response: new NextResponse('Rate limit exceeded', { status: 429 }),
      securityEvent: {
        type: 'ddos_pattern',
        severity: 'high',
      },
    }
  }

  return { allowed: true }
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Check various headers for IP (in order of preference)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback to connection remote address (may not work in all environments)
  return request.ip || 'unknown'
}

/**
 * Check for DDoS patterns (simplified - you'd want more sophisticated logic)
 */
async function checkDDoSPattern(ip: string, endpoint: string): Promise<boolean> {
  // This is a simplified check
  // In production, you'd want to:
  // 1. Use Redis or similar for distributed rate limiting
  // 2. Track requests per IP per endpoint
  // 3. Use sliding window or token bucket algorithm
  
  // For now, this is a placeholder
  // You can integrate with your existing rate limiting system
  
  return false
}

/**
 * Create a security-enhanced response
 * 
 * Adds security headers to responses
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy (adjust based on your needs)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Adjust as needed
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co",
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // HSTS (if using HTTPS)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

/**
 * Log API request for security monitoring
 */
export async function logAPIRequest(
  request: NextRequest,
  response: NextResponse,
  context?: {
    user_id?: string
    duration_ms?: number
  }
): Promise<void> {
  const ip = getClientIP(request)
  const url = new URL(request.url)
  
  // Only log if response indicates an issue
  if (response.status >= 400) {
    const severity = response.status >= 500 
      ? 'high' 
      : response.status >= 400 
      ? 'medium' 
      : 'low'

    await logSecurityEvent({
      type: response.status === 401 || response.status === 403
        ? 'unauthorized_access_attempt'
        : 'rate_limit_exceeded',
      ip,
      user_id: context?.user_id || null,
      endpoint: url.pathname,
      severity,
      details: {
        status: response.status,
        method: request.method,
        duration_ms: context?.duration_ms,
      },
    })
  }
}

