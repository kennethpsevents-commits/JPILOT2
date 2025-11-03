import { headers } from "next/headers"

export interface FlowGuardianResult {
  handover: boolean
  message?: string
  metrics: {
    frontendOk: boolean
    backendOk: boolean
    aiHealthy: boolean
    triggered: boolean
    latency: number
  }
}

// Trigger phrases that indicate malfunction, confusion, or looping
const TRIGGER_PHRASES = [
  "not working",
  "broken",
  "error",
  "doesn't work",
  "can't find",
  "stuck",
  "loading forever",
  "keeps crashing",
  "won't load",
  "same thing",
  "repeating",
  "loop",
  "again and again",
  "tried multiple times",
  "still not working",
  "frustrated",
  "help me",
  "confused",
  "don't understand",
  "makes no sense",
  "unclear",
  "what do you mean",
  "explain again",
  "not clear",
  "complicated",
  "too difficult",
  "can't figure out",
  "lost",
  "where am i",
  "how do i",
  "need assistance",
  "support",
  "talk to human",
  "real person",
  "customer service",
  "representative",
  "agent",
  "manager",
  "escalate",
  "complaint",
  "refund",
  "cancel",
  "unsubscribe",
  "delete account",
  "privacy concern",
  "data breach",
  "security issue",
  "unauthorized",
  "hacked",
  "suspicious",
  "scam",
  "fraud",
  "fake",
  "misleading",
  "deceptive",
  "wrong information",
  "incorrect",
  "outdated",
  "old data",
  "not updated",
  "missing",
  "disappeared",
  "gone",
  "deleted",
  "lost data",
  "can't access",
  "locked out",
  "password reset",
  "forgot password",
  "can't login",
  "authentication failed",
  "session expired",
  "timeout",
  "slow",
  "laggy",
  "unresponsive",
  "freezing",
  "hanging",
  "not responding",
  "blank page",
  "white screen",
  "404",
  "page not found",
  "server error",
  "500",
  "503",
  "unavailable",
  "maintenance",
  "down",
  "offline",
  "connection lost",
  "network error",
  "failed to fetch",
  "api error",
  "database error",
  "query failed",
  "transaction failed",
  "payment failed",
  "checkout error",
  "billing issue",
  "charge problem",
  "subscription error",
  "renewal failed",
  "card declined",
  "payment method",
  "invoice missing",
]

export async function checkFrontend(): Promise<boolean> {
  try {
    // Check if critical frontend resources are accessible
    const headersList = await headers()
    const userAgent = headersList.get("user-agent")
    return !!userAgent // Basic check that request is valid
  } catch {
    return false
  }
}

export async function checkBackend(): Promise<boolean> {
  try {
    // Check database connectivity
    const { createClient } = await import("@/lib/supabase/server")
    const supabase = await createClient()
    const { error } = await supabase.from("profiles").select("count").limit(1).single()
    return !error
  } catch {
    return false
  }
}

export interface AIContext {
  messageCount: number
  lastMessages: string[]
  sessionDuration: number
  errorCount: number
}

export async function scanAIContext(context: AIContext): Promise<{ looping: boolean; healthy: boolean }> {
  // Detect if AI is looping (repeating similar responses)
  const looping =
    context.lastMessages.length >= 3 &&
    context.lastMessages
      .slice(-3)
      .every((msg, i, arr) => i === 0 || msg.toLowerCase().includes(arr[i - 1].toLowerCase().slice(0, 50)))

  // Check if session is healthy (not too many errors, reasonable duration)
  const healthy = context.errorCount < 5 && context.sessionDuration < 3600000 // 1 hour

  return { looping, healthy }
}

export async function flowGuardian(session: AIContext, message: string): Promise<FlowGuardianResult> {
  const startTime = Date.now()

  const [frontendOk, backendOk, aiHealth] = await Promise.all([checkFrontend(), checkBackend(), scanAIContext(session)])

  const triggered = TRIGGER_PHRASES.some((phrase) => message.toLowerCase().includes(phrase.toLowerCase()))

  const latency = Date.now() - startTime

  const metrics = {
    frontendOk,
    backendOk,
    aiHealthy: aiHealth.healthy,
    triggered,
    latency,
  }

  // Determine if handover is needed
  const needsHandover = !frontendOk || !backendOk || aiHealth.looping || (triggered && !aiHealth.healthy)

  if (needsHandover) {
    return {
      handover: true,
      message:
        "I understand you're experiencing difficulties. Let me connect you with a specialist who can better assist you. One moment please...",
      metrics,
    }
  }

  return {
    handover: false,
    metrics,
  }
}

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}
