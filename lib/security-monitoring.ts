/**
 * Enhanced Security Monitoring System
 * 
 * This module provides security monitoring, threat detection, and automated
 * protection mechanisms for the platform. Use this to protect against
 * retaliation and attacks when exposing security research.
 */

import { createAdminClient } from "./supabase/admin"

export interface SecurityEvent {
  id?: string
  type: SecurityEventType
  ip: string
  user_id?: string | null
  endpoint?: string
  timestamp: Date
  details: Record<string, any>
  severity: 'low' | 'medium' | 'high' | 'critical'
  blocked?: boolean
}

export type SecurityEventType =
  | 'suspicious_ip'
  | 'rate_limit_exceeded'
  | 'content_scraping'
  | 'ddos_pattern'
  | 'unauthorized_access_attempt'
  | 'malicious_payload'
  | 'bot_pattern'
  | 'repeated_failures'

interface IPBlockEntry {
  ip: string
  blocked_until: Date
  reason: string
  severity: SecurityEvent['severity']
}

// In-memory cache for IP blocks (in production, use Redis or database)
const ipBlockCache = new Map<string, IPBlockEntry>()

// Thresholds for automatic blocking
const SECURITY_THRESHOLDS = {
  rapidFire: { count: 10, window: 60000 }, // 10 requests in 1 minute
  duplicateContent: { count: 5, window: 3600000 }, // 5 identical in 1 hour
  botPattern: { count: 20, window: 300000 }, // 20 requests in 5 minutes
  failedAuth: { count: 5, window: 900000 }, // 5 failures in 15 minutes
}

/**
 * Log a security event and determine if action is needed
 */
export async function logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<{
  logged: boolean
  action_taken: 'none' | 'blocked' | 'alerted'
  block_duration?: number
}> {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: new Date(),
  }

  // Store in database (create security_events table)
  try {
    const adminSupabase = createAdminClient()
    
    // Note: You'll need to create this table in Supabase:
    // CREATE TABLE security_events (
    //   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //   type TEXT NOT NULL,
    //   ip TEXT NOT NULL,
    //   user_id UUID,
    //   endpoint TEXT,
    //   timestamp TIMESTAMPTZ DEFAULT NOW(),
    //   details JSONB,
    //   severity TEXT NOT NULL,
    //   blocked BOOLEAN DEFAULT false
    // );
    
    const { error } = await adminSupabase
      .from('security_events')
      .insert({
        type: fullEvent.type,
        ip: fullEvent.ip,
        user_id: fullEvent.user_id || null,
        endpoint: fullEvent.endpoint || null,
        timestamp: fullEvent.timestamp.toISOString(),
        details: fullEvent.details,
        severity: fullEvent.severity,
        blocked: false,
      } as never)

    if (error) {
      console.error('[Security] Failed to log event:', error)
    }
  } catch (error) {
    console.error('[Security] Error logging security event:', error)
  }

  // Check if IP should be blocked
  const shouldBlock = await shouldBlockIP(event.ip, event.type, event.severity)
  
  if (shouldBlock.should) {
    const blockDuration = getBlockDuration(event.severity)
    await blockIP(event.ip, event.type, blockDuration, event.severity)
    
    // Alert admins for high-severity events
    if (event.severity === 'high' || event.severity === 'critical') {
      await alertAdmins(fullEvent)
    }

    return {
      logged: true,
      action_taken: 'blocked',
      block_duration: blockDuration,
    }
  }

  // Alert for medium+ severity even if not blocking
  if (event.severity === 'high' || event.severity === 'critical') {
    await alertAdmins(fullEvent)
    return {
      logged: true,
      action_taken: 'alerted',
    }
  }

  return {
    logged: true,
    action_taken: 'none',
  }
}

/**
 * Check if an IP should be blocked based on recent activity
 */
async function shouldBlockIP(
  ip: string,
  eventType: SecurityEventType,
  severity: SecurityEvent['severity']
): Promise<{ should: boolean; reason?: string }> {
  // Check if already blocked
  const existingBlock = ipBlockCache.get(ip)
  if (existingBlock && existingBlock.blocked_until > new Date()) {
    return { should: false, reason: 'Already blocked' }
  }

  // Check recent events for this IP
  const adminSupabase = createAdminClient()
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: recentEvents, error } = await adminSupabase
    .from('security_events')
    .select('type, severity, timestamp')
    .eq('ip', ip)
    .gte('timestamp', fiveMinutesAgo)
    .order('timestamp', { ascending: false })

  if (error || !recentEvents) {
    return { should: false }
  }

  // Block if critical severity
  if (severity === 'critical') {
    return { should: true, reason: 'Critical severity event' }
  }

  // Block if multiple high-severity events
  const highSeverityCount = recentEvents.filter(e => e.severity === 'high').length
  if (highSeverityCount >= 3) {
    return { should: true, reason: 'Multiple high-severity events' }
  }

  // Block if rapid-fire pattern detected
  if (recentEvents.length >= SECURITY_THRESHOLDS.rapidFire.count) {
    return { should: true, reason: 'Rapid-fire request pattern' }
  }

  // Block if bot pattern detected
  const botPatternEvents = recentEvents.filter(
    e => e.type === 'bot_pattern' || e.type === 'rate_limit_exceeded'
  )
  if (botPatternEvents.length >= 5) {
    return { should: true, reason: 'Bot pattern detected' }
  }

  return { should: false }
}

/**
 * Block an IP address for a specified duration
 */
async function blockIP(
  ip: string,
  reason: string,
  durationMs: number,
  severity: SecurityEvent['severity']
): Promise<void> {
  const blockedUntil = new Date(Date.now() + durationMs)
  
  ipBlockCache.set(ip, {
    ip,
    blocked_until: blockedUntil,
    reason,
    severity,
  })

  // Also store in database for persistence
  try {
    const adminSupabase = createAdminClient()
    
    // Note: Create blocked_ips table:
    // CREATE TABLE blocked_ips (
    //   ip TEXT PRIMARY KEY,
    //   blocked_until TIMESTAMPTZ NOT NULL,
    //   reason TEXT NOT NULL,
    //   severity TEXT NOT NULL,
    //   created_at TIMESTAMPTZ DEFAULT NOW()
    // );
    
    await adminSupabase
      .from('blocked_ips')
      .upsert({
        ip,
        blocked_until: blockedUntil.toISOString(),
        reason,
        severity,
        created_at: new Date().toISOString(),
      } as never)
  } catch (error) {
    console.error('[Security] Failed to persist IP block:', error)
  }

  console.warn(`[Security] Blocked IP ${ip} until ${blockedUntil.toISOString()}. Reason: ${reason}`)
}

/**
 * Check if an IP is currently blocked
 */
export function isIPBlocked(ip: string): boolean {
  const block = ipBlockCache.get(ip)
  if (!block) {
    return false
  }

  if (block.blocked_until <= new Date()) {
    // Block expired, remove from cache
    ipBlockCache.delete(ip)
    return false
  }

  return true
}

/**
 * Get block duration based on severity
 */
function getBlockDuration(severity: SecurityEvent['severity']): number {
  switch (severity) {
    case 'critical':
      return 24 * 60 * 60 * 1000 // 24 hours
    case 'high':
      return 6 * 60 * 60 * 1000 // 6 hours
    case 'medium':
      return 1 * 60 * 60 * 1000 // 1 hour
    case 'low':
      return 15 * 60 * 1000 // 15 minutes
    default:
      return 1 * 60 * 60 * 1000 // 1 hour default
  }
}

/**
 * Alert administrators about critical security events
 */
async function alertAdmins(event: SecurityEvent): Promise<void> {
  // In production, implement:
  // - Email alerts to admin team
  // - Slack/Discord webhook notifications
  // - SMS alerts for critical events
  // - Dashboard notifications

  console.error(`[Security Alert] ${event.severity.toUpperCase()}: ${event.type} from IP ${event.ip}`, event.details)

  // Example: Send email alert (implement with your email service)
  // await sendAdminAlert({
  //   subject: `Security Alert: ${event.type}`,
  //   body: JSON.stringify(event, null, 2),
  //   severity: event.severity,
  // })
}

/**
 * Detect suspicious patterns in request behavior
 */
export function detectSuspiciousPattern(request: {
  ip: string
  endpoint: string
  userAgent?: string
  referer?: string
  method: string
}): SecurityEventType | null {
  // Bot pattern detection
  if (!request.userAgent || request.userAgent.length < 10) {
    return 'bot_pattern'
  }

  // Common bot user agents
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
  ]
  
  if (botPatterns.some(pattern => pattern.test(request.userAgent || ''))) {
    return 'bot_pattern'
  }

  // Content scraping pattern (rapid GET requests to content endpoints)
  if (request.method === 'GET' && 
      (request.endpoint.includes('/reports') || 
       request.endpoint.includes('/security-research'))) {
    return 'content_scraping'
  }

  return null
}

/**
 * Enhanced rate limiting with security monitoring
 */
export async function enhancedRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  context?: {
    ip: string
    endpoint?: string
    user_id?: string
  }
): Promise<{ success: boolean; remaining?: number; resetAt?: Date }> {
  // Check if IP is blocked first
  if (context?.ip && isIPBlocked(context.ip)) {
    await logSecurityEvent({
      type: 'unauthorized_access_attempt',
      ip: context.ip,
      user_id: context.user_id || null,
      endpoint: context.endpoint,
      severity: 'medium',
      details: {
        reason: 'Attempted access from blocked IP',
        key,
      },
    })

    return { success: false }
  }

  // Detect suspicious patterns
  if (context) {
    const suspiciousPattern = detectSuspiciousPattern({
      ip: context.ip,
      endpoint: context.endpoint || '',
      method: 'GET', // You'd pass actual method
    })

    if (suspiciousPattern) {
      await logSecurityEvent({
        type: suspiciousPattern,
        ip: context.ip,
        user_id: context.user_id || null,
        endpoint: context.endpoint,
        severity: 'medium',
        details: {
          pattern: suspiciousPattern,
          key,
        },
      })
    }
  }

  // Implement your existing rate limiting logic here
  // This is a placeholder - integrate with your existing rateLimit function
  // const result = await rateLimit(key, limit, windowMs)
  
  // For now, return success (implement actual rate limiting)
  return { success: true }
}

/**
 * Load blocked IPs from database on startup
 */
export async function loadBlockedIPs(): Promise<void> {
  try {
    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase
      .from('blocked_ips')
      .select('*')
      .gt('blocked_until', new Date().toISOString())

    if (error) {
      console.error('[Security] Failed to load blocked IPs:', error)
      return
    }

    if (data) {
      for (const block of data) {
        ipBlockCache.set(block.ip, {
          ip: block.ip,
          blocked_until: new Date(block.blocked_until),
          reason: block.reason,
          severity: block.severity,
        })
      }
    }

    console.log(`[Security] Loaded ${ipBlockCache.size} blocked IPs`)
  } catch (error) {
    console.error('[Security] Error loading blocked IPs:', error)
  }
}

/**
 * Get security statistics for admin dashboard
 */
export async function getSecurityStats(days: number = 7): Promise<{
  total_events: number
  blocked_ips: number
  events_by_type: Record<string, number>
  events_by_severity: Record<string, number>
}> {
  const adminSupabase = createAdminClient()
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const { data: events, error } = await adminSupabase
    .from('security_events')
    .select('type, severity')
    .gte('timestamp', since)

  if (error || !events) {
    return {
      total_events: 0,
      blocked_ips: ipBlockCache.size,
      events_by_type: {},
      events_by_severity: {},
    }
  }

  const eventsByType: Record<string, number> = {}
  const eventsBySeverity: Record<string, number> = {}

  for (const event of events) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1
    eventsBySeverity[event.severity] = (eventsBySeverity[event.severity] || 0) + 1
  }

  return {
    total_events: events.length,
    blocked_ips: ipBlockCache.size,
    events_by_type: eventsByType,
    events_by_severity: eventsBySeverity,
  }
}

