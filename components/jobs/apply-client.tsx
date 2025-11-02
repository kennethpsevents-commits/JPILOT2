"use client"

import type React from "react"

import type { Job, Profile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Shield, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ApplyClientProps {
  job: Job
  userProfile: Profile | null
}

export function ApplyClient({ job, userProfile }: ApplyClientProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showScreeningDialog, setShowScreeningDialog] = useState(false)
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (job.requires_screening) {
      // Show screening upgrade dialog
      setShowScreeningDialog(true)
    } else {
      // Submit application directly
      await submitApplication(false)
    }
  }

  const submitApplication = async (withScreening: boolean) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/auth/login?redirect=/jobs/${job.id}/apply`)
        return
      }

      // Create application
      const { data: application, error } = await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          job_id: job.id,
          cover_letter: coverLetter,
          resume_url: resumeUrl,
          status: withScreening ? "screening" : "pending",
          screening_completed: false,
        })
        .select()
        .single()

      if (error) throw error

      if (withScreening) {
        // Redirect to screening upgrade payment
        setApplicationId(application.id)
        router.push(`/upgrade/screening?application_id=${application.id}`)
      } else {
        // Show success and redirect
        router.push(`/applications/${application.id}?success=true`)
      }
    } catch (error) {
      console.error("[v0] Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleScreeningChoice = async (upgrade: boolean) => {
    setShowScreeningDialog(false)
    await submitApplication(upgrade)
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/jobs/${job.id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Job</span>
          </Link>
        </div>
      </header>

      <div className="container py-8 max-w-3xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Apply for {job.title}</h1>
            <p className="text-muted-foreground">at {job.company}</p>
          </div>

          {job.requires_screening && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="flex items-start gap-4 pt-6">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Screening Required for This Position</h3>
                  <p className="text-sm text-muted-foreground">
                    This job requires a premium screening process. You can choose to upgrade your application with our
                    screening service to stand out to employers.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>Tell the employer why you're a great fit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume URL</Label>
                  <Input
                    id="resume"
                    type="url"
                    placeholder="https://example.com/resume.pdf"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a link to your resume (Google Drive, Dropbox, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={8}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Minimum 100 characters</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{userProfile?.full_name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Subscription Tier</p>
                  <p className="text-sm text-muted-foreground capitalize">{userProfile?.subscription_tier || "free"}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isLoading || coverLetter.length < 100}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
              <Link href={`/jobs/${job.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Screening Upgrade Dialog */}
      <Dialog open={showScreeningDialog} onOpenChange={setShowScreeningDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Your Application?</DialogTitle>
            <DialogDescription>This position requires screening. Choose how you'd like to proceed.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Card className="border-primary">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Premium Screening</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Stand out with our premium screening service. Your application will be prioritized and highlighted
                      to employers.
                    </p>
                    <p className="text-2xl font-bold">$29.99</p>
                  </div>
                </div>
                <Button onClick={() => handleScreeningChoice(true)} className="w-full" disabled={isLoading}>
                  Upgrade Screening
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Standard Application</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Submit your application without screening. Your application will still be reviewed by the
                      employer.
                    </p>
                    <p className="text-2xl font-bold">Free</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleScreeningChoice(false)}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Continue Without Screening
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
