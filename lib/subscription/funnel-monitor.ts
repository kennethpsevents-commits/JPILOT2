import { createClient } from "@/lib/supabase/server"

export interface FunnelMetrics {
  totalSubscribers: number
  monthlyTarget: number
  currentMonthSubscribers: number
  progressPercentage: number
  daysRemaining: number
  planDistribution: {
    basic: number
    pro: number
    enterprise: number
  }
  abandonedCheckouts: number
  failedPayments: number
  churnRate: number
  averageRevenuePerUser: number
}

export interface SubscriptionEvent {
  type: "created" | "canceled" | "failed" | "abandoned"
  userId: string
  tier: string
  timestamp: Date
  metadata: Record<string, any>
}

/**
 * Calculate progress toward 500 subscriber goal in 6 months
 * Target: ~83 subscribers per month
 */
export async function calculateFunnelMetrics(): Promise<FunnelMetrics> {
  const supabase = await createClient()

  // Get total active subscribers
  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("tier, created_at, status")
    .eq("status", "active")

  if (error) throw error

  const totalSubscribers = subscriptions?.length || 0

  // Calculate current month subscribers
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const currentMonthSubscribers = subscriptions?.filter((sub) => new Date(sub.created_at) >= monthStart).length || 0

  // Calculate days remaining in 6-month period (assuming start date)
  const startDate = new Date("2025-01-01") // Adjust to actual start date
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + 6)
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  // Calculate progress percentage
  const progressPercentage = (totalSubscribers / 500) * 100

  // Plan distribution
  const planDistribution = {
    basic: subscriptions?.filter((s) => s.tier === "basic").length || 0,
    pro: subscriptions?.filter((s) => s.tier === "pro").length || 0,
    enterprise: subscriptions?.filter((s) => s.tier === "enterprise").length || 0,
  }

  // Get abandoned checkouts (sessions created but not completed in last 24h)
  const { data: errorLogs } = await supabase
    .from("error_logs")
    .select("*")
    .eq("error_type", "checkout_abandoned")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

  const abandonedCheckouts = errorLogs?.length || 0

  // Get failed payments
  const { data: failedSubs } = await supabase.from("subscriptions").select("*").eq("status", "failed")

  const failedPayments = failedSubs?.length || 0

  // Calculate churn rate (canceled / total)
  const { data: canceledSubs } = await supabase.from("subscriptions").select("*").eq("status", "canceled")

  const churnRate =
    totalSubscribers > 0 ? ((canceledSubs?.length || 0) / (totalSubscribers + (canceledSubs?.length || 0))) * 100 : 0

  // Calculate ARPU (simplified - would need actual revenue data)
  const revenueMap = { basic: 29, pro: 79, enterprise: 199 }
  const totalRevenue =
    subscriptions?.reduce((sum, sub) => {
      return sum + (revenueMap[sub.tier as keyof typeof revenueMap] || 0)
    }, 0) || 0

  const averageRevenuePerUser = totalSubscribers > 0 ? totalRevenue / totalSubscribers : 0

  return {
    totalSubscribers,
    monthlyTarget: 83,
    currentMonthSubscribers,
    progressPercentage,
    daysRemaining,
    planDistribution,
    abandonedCheckouts,
    failedPayments,
    churnRate,
    averageRevenuePerUser,
  }
}

/**
 * Log subscription events for tracking and analysis
 */
export async function logSubscriptionEvent(event: SubscriptionEvent): Promise<void> {
  const supabase = await createClient()

  await supabase.from("system_logs").insert({
    category: "subscription",
    log_level: event.type === "failed" ? "error" : "info",
    message: `Subscription ${event.type}: ${event.tier} plan for user ${event.userId}`,
    metadata: {
      ...event.metadata,
      type: event.type,
      tier: event.tier,
      userId: event.userId,
    },
  })
}

/**
 * Track abandoned checkout and trigger recovery workflow
 */
export async function trackAbandonedCheckout(userId: string, tier: string, sessionId: string): Promise<void> {
  const supabase = await createClient()

  // Log as error for monitoring
  await supabase.from("error_logs").insert({
    error_type: "checkout_abandoned",
    error_message: `User abandoned ${tier} checkout`,
    user_id: userId,
    severity: "warning",
    status: "open",
    metadata: {
      tier,
      sessionId,
      timestamp: new Date().toISOString(),
    },
  })

  // Trigger email recovery workflow (would integrate with email system)
  console.log(`[v0] Triggering abandoned cart recovery for user ${userId}, tier ${tier}`)
}

/**
 * Validate subscription flow integrity
 * Ensures all steps are completed correctly
 */
export async function validateSubscriptionFlow(
  userId: string,
  tier: string,
): Promise<{
  valid: boolean
  errors: string[]
}> {
  const supabase = await createClient()
  const errors: string[] = []

  // Check 1: User profile exists
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (!profile) {
    errors.push("User profile not found")
  }

  // Check 2: Valid tier selection
  const validTiers = ["basic", "pro", "enterprise"]
  if (!validTiers.includes(tier)) {
    errors.push(`Invalid tier: ${tier}`)
  }

  // Check 3: No duplicate active subscriptions
  const { data: existingSub } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single()

  if (existingSub) {
    errors.push("User already has an active subscription")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Retry failed payment with exponential backoff
 */
export async function retryFailedPayment(subscriptionId: string, attempt = 1): Promise<boolean> {
  const maxAttempts = 3
  const backoffMs = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s

  if (attempt > maxAttempts) {
    console.log(`[v0] Max retry attempts reached for subscription ${subscriptionId}`)
    return false
  }

  console.log(`[v0] Retrying payment for subscription ${subscriptionId}, attempt ${attempt}`)

  // Wait for backoff period
  await new Promise((resolve) => setTimeout(resolve, backoffMs))

  // Attempt to process payment again (would integrate with Paddle/Stripe)
  // For now, just log the attempt
  const success = Math.random() > 0.5 // Simulate 50% success rate

  if (!success && attempt < maxAttempts) {
    return retryFailedPayment(subscriptionId, attempt + 1)
  }

  return success
}
