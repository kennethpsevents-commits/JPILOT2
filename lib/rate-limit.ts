// Simple in-memory rate limiter for auth endpoints
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(identifier: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export function getRateLimitInfo(identifier: string): { remaining: number; resetTime: number } | null {
  const record = rateLimitMap.get(identifier)
  if (!record || Date.now() > record.resetTime) {
    return null
  }
  return {
    remaining: Math.max(0, 5 - record.count),
    resetTime: record.resetTime,
  }
}
