"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("gdpr-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("gdpr-consent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("gdpr-consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize
              content. By clicking 'Accept All', you consent to our use of cookies. Read our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/gdpr" className="text-primary hover:underline">
                GDPR Compliance
              </a>{" "}
              for more information.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" variant="outline" onClick={handleReject}>
              Reject All
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleAccept}>
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
