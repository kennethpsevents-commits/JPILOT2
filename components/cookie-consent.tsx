"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">Cookie Consent</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking
              "Accept", you consent to our use of cookies. Read our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={declineCookies} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-3 mt-4">
          <Button onClick={acceptCookies} className="flex-1 sm:flex-none">
            Accept All Cookies
          </Button>
          <Button onClick={declineCookies} variant="outline" className="flex-1 sm:flex-none bg-transparent">
            Decline
          </Button>
        </div>
      </Card>
    </div>
  )
}
