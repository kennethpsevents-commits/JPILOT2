"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, FileText, Shield, Briefcase } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"

interface ApplicationDetailClientProps {
  application: any
  showSuccess: boolean
  withScreening: boolean
}

export function ApplicationDetailClient({ application, showSuccess, withScreening }: ApplicationDetailClientProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(showSuccess)

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "screening":
        return "bg-blue-500/10 text-blue-500"
      case "reviewed":
        return "bg-purple-500/10 text-purple-500"
      case "interview":
        return "bg-green-500/10 text-green-500"
      case "accepted":
        return "bg-green-500/10 text-green-500"
      case "rejected":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
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
            <Link href="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {showSuccessMessage && (
          <Card className="mb-6 border-green-500/50 bg-green-500/5">
            <CardContent className="flex items-center gap-4 pt-6">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Application Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  {withScreening
                    ? "Your application has been upgraded with premium screening. The employer will review it soon."
                    : "Your application has been submitted. The employer will review it soon."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{application.jobs.title}</h1>
            <p className="text-lg text-muted-foreground">at {application.jobs.company}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Status</span>
                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Applied</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(application.applied_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {application.screening_completed && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Premium Screening Completed</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Resume</span>
                </div>
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Resume
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Cover Letter</span>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{application.cover_letter}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Wait for Review</p>
                    <p className="text-sm text-muted-foreground">
                      The employer will review your application and contact you if they're interested.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Check Your Email</p>
                    <p className="text-sm text-muted-foreground">
                      We'll notify you of any updates to your application status.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/jobs" className="flex-1">
              <Button className="w-full">Browse More Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
