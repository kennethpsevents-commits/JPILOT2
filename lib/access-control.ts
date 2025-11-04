import "server-only"
import { createClient } from "@/lib/supabase/server"

export interface SubscriptionTier {
  id: string
  name: string
  slug: string
  description: string | null
  price_monthly: number
  price_yearly: number | null
  stripe_price_id_monthly: string | null
  stripe_price_id_yearly: string | null
  features: string[]
  limits: Record<string, number>
  is_active: boolean
  display_order: number
}

export interface UserSubscription {
  id: string
  user_id: string
  tier_id: string | null
  status: "active" | "cancelled" | "expired" | "trial" | "blocked"
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  trial_ends_at: string | null
  tier?: SubscriptionTier
}

export interface AccessControlRule {
  feature_key: string
  feature_name: string
  description: string | null
  is_free: boolean
  required_tier_slug: string | null
  is_enabled: boolean
}

/**
 * Check if a user has access to a specific feature
 */
export async function checkUserAccess(userId: string, featureKey: string): Promise<boolean> {
  const supabase = await createClient()

  // Check for manual overrides first
  const { data: override } = await supabase
    .from("user_access_overrides")
    .select("*")
    .eq("user_id", userId)
    .or(`feature_key.eq.${featureKey},feature_key.is.null`)
    .single()

  if (override) {
    if (override.override_type === "block") return false
    if (override.override_type === "grant_free" || override.override_type === "grant_feature") {
      // Check if override is expired
      if (override.expires_at && new Date(override.expires_at) < new Date()) {
        return false
      }
      return true
    }
  }

  // Get access control rule
  const { data: rule } = await supabase
    .from("access_control_rules")
    .select("*")
    .eq("feature_key", featureKey)
    .eq("is_enabled", true)
    .single()

  if (!rule) return false
  if (rule.is_free) return true

  // Check user subscription
  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*, tier:subscription_tiers(*)")
    .eq("user_id", userId)
    .eq("status", "active")
    .single()

  if (!subscription || !subscription.tier) return false

  // Check if user's tier meets requirement
  const tierOrder = ["free", "basic", "pro", "enterprise"]
  const userTierIndex = tierOrder.indexOf(subscription.tier.slug)
  const requiredTierIndex = tierOrder.indexOf(rule.required_tier_slug || "free")

  return userTierIndex >= requiredTierIndex
}

/**
 * Get user's current subscription with tier details
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("*, tier:subscription_tiers(*)")
    .eq("user_id", userId)
    .single()

  if (error || !data) return null
  return data as UserSubscription
}

/**
 * Get all subscription tiers
 */
export async function getSubscriptionTiers(): Promise<SubscriptionTier[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("subscription_tiers")
    .select("*")
    .eq("is_active", true)
    .order("display_order")

  if (error || !data) return []
  return data as SubscriptionTier[]
}

/**
 * Get all access control rules
 */
export async function getAccessControlRules(): Promise<AccessControlRule[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("access_control_rules")
    .select("*")
    .eq("is_enabled", true)
    .order("feature_name")

  if (error || !data) return []
  return data as AccessControlRule[]
}
