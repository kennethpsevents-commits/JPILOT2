/**
 * Subscription tier definitions and enforcement
 * Free tier: 30% masked job details, limited features
 * Premium tier: Full access, advanced features
 */

export type SubscriptionTier = "free" | "premium"

export interface TierLimits {
  jobDetailsVisibility: number // percentage (0-100)
  jobgptRateLimit: number // queries per hour
  maxSavedJobs: number
  maxApplicationsPerMonth: number
  canApplyOneClick: boolean
  canUseAdvancedFilters: boolean
}

export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  free: {
    jobDetailsVisibility: 30, // Only 30% of job description visible
    jobgptRateLimit: 10, // 10 queries per hour
    maxSavedJobs: 20,
    maxApplicationsPerMonth: 10,
    canApplyOneClick: false,
    canUseAdvancedFilters: false,
  },
  premium: {
    jobDetailsVisibility: 100, // Full job details
    jobgptRateLimit: 100, // 100 queries per hour
    maxSavedJobs: -1, // Unlimited
    maxApplicationsPerMonth: -1, // Unlimited
    canApplyOneClick: true,
    canUseAdvancedFilters: true,
  },
}

/**
 * Mask job description based on subscription tier
 */
export function maskJobDescription(
  description: string,
  tier: SubscriptionTier,
): { masked: string; isFullyVisible: boolean } {
  const limits = TIER_LIMITS[tier]
  const visibilityPercent = limits.jobDetailsVisibility

  if (visibilityPercent >= 100) {
    return { masked: description, isFullyVisible: true }
  }

  const visibleLength = Math.floor((description.length * visibilityPercent) / 100)
  const masked = description.slice(0, visibleLength) + "..."

  return { masked, isFullyVisible: false }
}

/**
 * Check if user can perform action based on tier limits
 */
export function canPerformAction(tier: SubscriptionTier, action: keyof TierLimits): boolean {
  const limits = TIER_LIMITS[tier]
  const value = limits[action]

  if (typeof value === "boolean") {
    return value
  }

  return value === -1 || value > 0
}

/**
 * Get user's subscription tier from database
 */
export async function getUserTier(userId: string): Promise<SubscriptionTier> {
  // This will be implemented with Supabase query
  // For now, return free as default
  return "free"
}
