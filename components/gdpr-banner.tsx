"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"

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

  const handleDecline = () => {
    localStorage.setItem("gdpr-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl border-2 bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold">We value your privacy</h3>
            <p className="mb-4 text-sm text-gray-600">
              We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize
              content. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or
              learn more in our{" "}
              <Link href="/privacy" className="font-medium text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAccept}>Accept All</Button>
              <Button variant="outline" onClick={handleDecline}>
                Decline
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/privacy">Learn More</Link>
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDecline} className="flex-shrink-0">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
