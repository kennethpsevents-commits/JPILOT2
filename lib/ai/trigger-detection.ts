/**
 * AI Trigger Detection System
 * Monitors user messages for 100+ predefined trigger keywords/phrases
 * Automatically escalates to fresh AI instance when triggers detected
 */

export const TRIGGER_KEYWORDS = {
  // Error & Technical Issues (20)
  errors: [
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
    "blank page",
    "white screen",
    "404",
    "500",
    "server error",
  ],

  // Confusion & Clarity (15)
  confusion: [
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
    "what is this",
    "why",
  ],

  // Frustration & Negative Sentiment (15)
  frustration: [
    "frustrated",
    "annoyed",
    "angry",
    "terrible",
    "awful",
    "worst",
    "hate",
    "useless",
    "waste of time",
    "disappointed",
    "fed up",
    "sick of",
    "ridiculous",
    "pathetic",
    "garbage",
  ],

  // Support Escalation (15)
  escalation: [
    "help me",
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
    "speak to someone",
    "human help",
    "live chat",
    "call me",
  ],

  // Payment & Billing Issues (15)
  payment: [
    "refund",
    "cancel",
    "unsubscribe",
    "payment failed",
    "checkout error",
    "billing issue",
    "charge problem",
    "subscription error",
    "renewal failed",
    "card declined",
    "payment method",
    "invoice missing",
    "overcharged",
    "wrong amount",
    "unauthorized charge",
  ],

  // Security & Privacy (10)
  security: [
    "privacy concern",
    "data breach",
    "security issue",
    "unauthorized",
    "hacked",
    "suspicious",
    "scam",
    "fraud",
    "fake",
    "phishing",
  ],

  // Account Access (10)
  access: [
    "can't access",
    "locked out",
    "password reset",
    "forgot password",
    "can't login",
    "authentication failed",
    "session expired",
    "timeout",
    "logged out",
    "access denied",
  ],
} as const

export interface TriggerDetectionResult {
  triggered: boolean
  category: string | null
  matchedKeywords: string[]
  severity: "low" | "medium" | "high" | "critical"
  escalationRequired: boolean
  suggestedAction: string
}

/**
 * Analyze message for trigger keywords and determine escalation need
 */
export function detectTriggers(message: string): TriggerDetectionResult {
  const lowerMessage = message.toLowerCase()
  const matchedKeywords: string[] = []
  let category: string | null = null
  let severity: "low" | "medium" | "high" | "critical" = "low"

  // Check each category
  for (const [cat, keywords] of Object.entries(TRIGGER_KEYWORDS)) {
    const matches = keywords.filter((keyword) => lowerMessage.includes(keyword.toLowerCase()))

    if (matches.length > 0) {
      matchedKeywords.push(...matches)
      category = cat

      // Determine severity based on category and match count
      if (cat === "security" || cat === "payment") {
        severity = "critical"
      } else if (cat === "escalation" || cat === "frustration") {
        severity = "high"
      } else if (cat === "errors" || cat === "access") {
        severity = "medium"
      } else {
        severity = "low"
      }

      break // Use first matching category
    }
  }

  const triggered = matchedKeywords.length > 0
  const escalationRequired = severity === "critical" || severity === "high" || matchedKeywords.length >= 3

  let suggestedAction = "Continue normal conversation"
  if (escalationRequired) {
    suggestedAction = "Escalate to fresh AI instance with context preservation"
  } else if (triggered) {
    suggestedAction = "Provide extra clarification and support"
  }

  return {
    triggered,
    category,
    matchedKeywords,
    severity,
    escalationRequired,
    suggestedAction,
  }
}

/**
 * Generate professional escalation message
 */
export function generateEscalationMessage(category: string): string {
  const messages = {
    security:
      "I understand your security concern is critical. Let me connect you with our security specialist who can address this immediately. Please hold for just a moment...",
    payment:
      "I see you're experiencing a payment issue. Let me transfer you to our billing specialist who can resolve this right away. One moment please...",
    escalation:
      "I'd be happy to connect you with a specialist who can provide more detailed assistance. Please hold while I transfer you...",
    frustration:
      "I sincerely apologize for the frustration you're experiencing. Let me connect you with a senior specialist who can help resolve this immediately. One moment...",
    errors:
      "I understand you're encountering technical difficulties. Let me connect you with our technical support team who can diagnose and fix this. Please hold...",
    access:
      "I see you're having trouble accessing your account. Let me connect you with our account specialist who can restore your access. One moment please...",
    confusion:
      "I want to make sure you get the clearest possible explanation. Let me connect you with a specialist who can walk you through this step-by-step. Please hold...",
  }

  return (
    messages[category as keyof typeof messages] ||
    "I want to ensure you receive the best possible assistance. Let me connect you with a specialist who can help. One moment please..."
  )
}

/**
 * Simulate professional hold tone (1 minute max)
 */
export async function simulateHoldTone(durationMs = 30000): Promise<void> {
  const maxDuration = 60000 // 1 minute max
  const actualDuration = Math.min(durationMs, maxDuration)

  console.log(`[v0] Simulating hold tone for ${actualDuration}ms`)

  // In production, this would play actual hold music/tone
  await new Promise((resolve) => setTimeout(resolve, actualDuration))

  console.log("[v0] Hold tone complete, transferring to specialist...")
}
