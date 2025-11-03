"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Crown, Calendar, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useState } from "react"

interface SubscriptionSettingsClientProps {
  profile: any
  subscription: any
}

export function SubscriptionSettingsClient({ profile, subscription }: SubscriptionSettingsClientProps) {
  const [isCanceling, setIsCanceling] = useState(false)

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "pro":
        return "bg-purple-500/10 text-purple-500"
      case "basic":
        return "bg-blue-500/10 text-blue-500"
      case "enterprise":
        return "bg-amber-500/10 text-amber-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const handleCancelSubscription = async () => {
    if (!subscription?.paddle_subscription_id) return

    const confirmed = confirm(
      "Are you sure you want to cancel your subscription? You'll continue to have access until the end of your billing period.",
    )

    if (!confirmed) return

    setIsCanceling(true)

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: subscription.paddle_subscription_id,
        }),
      })

      if (response.ok) {
        alert("Your subscription has been canceled. You'll have access until the end of your billing period.")
        window.location.reload()
      } else {
        throw new Error("Failed to cancel subscription")
      }
    } catch (error) {
      console.error("[v0] Error canceling subscription:", error)
      alert("Failed to cancel subscription. Please try again or contact support.")
    } finally {
      setIsCanceling(false)
    }
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">JobPilot</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Subscription Settings</h1>
            <p className="text-muted-foreground">Manage your subscription and billing</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium capitalize">{profile?.subscription_tier || "Free"} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.subscription_status === "active" ? "Active subscription" : "No active subscription"}
                    </p>
                  </div>
                </div>
                <Badge className={getTierBadgeColor(profile?.subscription_tier)}>
                  {profile?.subscription_tier || "free"}
                </Badge>
              </div>

              {subscription && (
                <>
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Billing Period</span>
                      </div>
                      <span className="text-sm font-medium capitalize">{subscription.billing_period}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Amount</span>
                      </div>
                      <span className="text-sm font-medium">
                        ${subscription.amount} {subscription.currency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Billing Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(subscription.current_period_end), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t">
                <Link href="/pricing">
                  <Button className="w-full">
                    {profile?.subscription_tier === "free" ? "Upgrade Plan" : "Change Plan"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screening Credits</CardTitle>
              <CardDescription>Use credits for premium screening on applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{profile?.screening_credits || 0}</p>
                  <p className="text-sm text-muted-foreground">Available credits</p>
                </div>
                <Button variant="outline">Purchase Credits</Button>
              </div>
            </CardContent>
          </Card>

          {subscription && subscription.status === "active" && (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Cancel Subscription
                </CardTitle>
                <CardDescription>Cancel your subscription at any time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your subscription will remain active until the end of your current billing period on{" "}
                  {format(new Date(subscription.current_period_end), "MMM dd, yyyy")}.
                </p>
                <Button variant="destructive" onClick={handleCancelSubscription} disabled={isCanceling}>
                  {isCanceling ? "Canceling..." : "Cancel Subscription"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
