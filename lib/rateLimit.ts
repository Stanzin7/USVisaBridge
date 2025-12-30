/**
 * Simple rate limiting utility
 * Supports in-memory (dev) or Upstash Redis (production)
 */

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

// In-memory store for dev (single instance, resets on restart)
const memoryStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Rate limit check
 * @param key - Unique identifier for the rate limit (e.g., user ID or IP)
 * @param limit - Maximum number of requests
 * @param windowSeconds - Time window in seconds
 */
export async function rateLimit(
  key: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  // Try Upstash Redis if configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return rateLimitUpstash(key, limit, windowSeconds)
  }

  // Fall back to in-memory store
  return rateLimitMemory(key, limit, windowMs, now)
}

/**
 * In-memory rate limiting (for dev/single instance)
 */
function rateLimitMemory(
  key: string,
  limit: number,
  windowMs: number,
  now: number
): RateLimitResult {
  const record = memoryStore.get(key)

  if (!record || now > record.resetAt) {
    // New window or expired
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return {
      success: true,
      remaining: limit - 1,
      reset: now + windowMs,
    }
  }

  if (record.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: record.resetAt,
    }
  }

  // Increment counter
  record.count++
  memoryStore.set(key, record)

  return {
    success: true,
    remaining: limit - record.count,
    reset: record.resetAt,
  }
}

/**
 * Upstash Redis rate limiting (for production)
 */
async function rateLimitUpstash(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!
  const redisKey = `rate_limit:${key}`

  try {
    // Use Upstash REST API with atomic increment
    const response = await fetch(`${url}/incr/${redisKey}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Upstash API error: ${response.statusText}`)
    }

    const data = await response.json()
    const count = data.result as number

    // Set expiration on first request
    if (count === 1) {
      await fetch(`${url}/expire/${redisKey}/${windowSeconds}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }

    const now = Date.now()
    const reset = now + windowSeconds * 1000

    if (count > limit) {
      return {
        success: false,
        remaining: 0,
        reset,
      }
    }

    return {
      success: true,
      remaining: Math.max(0, limit - count),
      reset,
    }
  } catch (error) {
    console.error('[RATE_LIMIT] Upstash error, falling back to allow:', error)
    // On error, allow the request (fail open)
    return {
      success: true,
      remaining: limit - 1,
      reset: Date.now() + windowSeconds * 1000,
    }
  }
}

