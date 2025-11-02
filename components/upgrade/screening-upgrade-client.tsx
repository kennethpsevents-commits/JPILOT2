"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, Zap, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ScreeningUpgradeClientProps {
  applicationId: string
  jobTitle: string
  company: string
}

export function ScreeningUpgradeClient({ applicationId, jobTitle, company }: ScreeningUpgradeClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpgrade = async () => {
    setIsLoading(true)

    try {
      // Call Stripe checkout API
      const response = await fetch("/api/checkout/screening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: applicationId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("[v0] Error creating checkout:", error)
      alert("Failed to process payment. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push(`/applications/${applicationId}?success=true`)
  }

  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-6 bg-muted/30">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Application</h1>
          <p className="text-muted-foreground">
            For {jobTitle} at {company}
          </p>
        </div>

        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Premium Screening Service</CardTitle>
                <CardDescription>Stand out from other applicants</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Priority Review</p>
                  <p className="text-sm text-muted-foreground">
                    Your application will be reviewed first by the employer
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Enhanced Profile</p>
                  <p className="text-sm text-muted-foreground">Your profile will be highlighted with a premium badge</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">3x Higher Response Rate</p>
                  <p className="text-sm text-muted-foreground">Premium applications get 3x more responses on average</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-lg font-medium">One-time payment</span>
                <div className="text-right">
                  <span className="text-3xl font-bold">$29.99</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleUpgrade} className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Upgrade Now"}
                </Button>
                <Button onClick={handleSkip} variant="ghost" className="w-full" disabled={isLoading}>
                  Continue Without Screening
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">Secure payment powered by Stripe</p>
      </div>
    </div>
  )
}
