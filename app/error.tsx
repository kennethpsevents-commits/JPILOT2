"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("[v0] Global error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertCircle className="h-24 w-24 text-destructive mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
        <p className="text-muted-foreground text-lg">
          We're sorry, but something unexpected happened. Our team has been notified.
        </p>
        {error.digest && <p className="text-sm text-muted-foreground font-mono">Error ID: {error.digest}</p>}
        <div className="flex gap-4 justify-center pt-4">
          <Button onClick={reset} size="lg">
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
