"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket, Briefcase } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PricingClientProps {
  currentTier: string
  isAuthenticated: boolean
}

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    icon: Briefcase,
    features: ["5 applications per month", "Basic job search", "Email notifications", "Standard support"],
    limitations: ["No priority review", "No screening credits", "Limited filters"],
  },
  {
    id: "basic",
    name: "Basic",
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    description: "For active job seekers",
    icon: Zap,
    popular: true,
    features: [
      "25 applications per month",
      "Advanced job search",
      "Priority email notifications",
      "Resume review",
      "5 screening credits",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    description: "For serious professionals",
    icon: Crown,
    features: [
      "Unlimited applications",
      "AI-powered job matching",
      "Instant notifications",
      "Professional resume review",
      "20 screening credits",
      "Career coaching session",
      "Premium support",
      "Featured profile",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    description: "For executive-level searches",
    icon: Rocket,
    features: [
      "Everything in Pro",
      "Unlimited screening credits",
      "Dedicated account manager",
      "Custom job alerts",
      "Direct employer connections",
      "Salary negotiation support",
      "White-glove service",
    ],
  },
]

export function PricingClient({ currentTier, isAuthenticated }: PricingClientProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleSubscribe = async (planId: string, priceId?: string) => {
    if (!isAuthenticated) {
      router.push(`/auth/sign-up?redirect=/pricing`)
      return
    }

    if (planId === "free" || planId === currentTier) {
      return
    }

    setIsLoading(planId)

    try {
      const response = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: priceId,
          tier: planId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("[v0] Error creating checkout:", error)
      alert("Failed to process subscription. Please try again.")
      setIsLoading(null)
    }
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">JobPilot</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <div className="container py-16">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Unlock premium features and accelerate your job search with our flexible subscription plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/smiling-diverse-customer-support-agents-wearing-he.jpg"
              alt="Smiling diverse customer support agents"
              className="w-full h-[300px] object-cover"
              style={{ filter: "contrast(0.35)" }}
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/happy-customer-service-team-celebrating-success-in.jpg"
              alt="Happy customer service team celebrating"
              className="w-full h-[300px] object-cover"
              style={{ filter: "contrast(0.35)" }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            const isCurrentPlan = plan.id === currentTier
            const isDowngrade =
              (currentTier === "enterprise" && plan.id !== "enterprise") ||
              (currentTier === "pro" && ["basic", "free"].includes(plan.id)) ||
              (currentTier === "basic" && plan.id === "free")

            return (
              <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      {isCurrentPlan && (
                        <Badge variant="outline" className="mt-1">
                          Current Plan
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id, plan.priceId)}
                    disabled={isCurrentPlan || isDowngrade || isLoading === plan.id}
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {isLoading === plan.id
                      ? "Processing..."
                      : isCurrentPlan
                        ? "Current Plan"
                        : isDowngrade
                          ? "Contact Support"
                          : plan.id === "free"
                            ? "Get Started"
                            : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
