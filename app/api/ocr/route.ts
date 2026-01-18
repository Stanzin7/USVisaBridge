import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

// Rate limit: 10 requests per minute per IP
const RATE_LIMIT_REQUESTS = 10
const RATE_LIMIT_WINDOW = 60 // 1 minute

export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
             req.headers.get('x-real-ip') || 
             'unknown'

  // Rate limiting
  const rateLimitResult = await rateLimit(
    `ocr:${ip}`,
    RATE_LIMIT_REQUESTS,
    RATE_LIMIT_WINDOW
  )

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }

  const formData = await req.formData()

  const res = await fetch('http://localhost:8000/ocr', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
