// Simple in-memory rate limiter for OTP operations
const attempts = new Map<string, { count: number; firstAttempt: number }>()

export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = attempts.get(key)

  if (!record || (now - record.firstAttempt) > windowMs) {
    attempts.set(key, { count: 1, firstAttempt: now })
    return { allowed: true, remaining: maxAttempts - 1 }
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxAttempts - record.count }
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of attempts) {
    if (now - record.firstAttempt > 3600000) attempts.delete(key)
  }
}, 600000)
