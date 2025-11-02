"use client"

import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Clock, Shield, Bookmark, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface JobDetailClientProps {
  job: Job
  hasApplied: boolean
  isSaved: boolean
}

export function JobDetailClient({ job, hasApplied: initialHasApplied, isSaved: initialIsSaved }: JobDetailClientProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSaveJob = async () => {
    setIsLoading(true)
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/auth/login?redirect=/jobs/${job.id}`)
      return
    }

    try {
      if (isSaved) {
        await supabase.from("saved_jobs").delete().eq("user_id", user.id).eq("job_id", job.id)
        setIsSaved(false)
      } else {
        await supabase.from("saved_jobs").insert({ user_id: user.id, job_id: job.id })
        setIsSaved(true)
      }
    } catch (error) {
      console.error("[v0] Error saving job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatSalary = () => {
    if (!job.salary_min || !job.salary_max) return null
    return `${job.salary_currency} ${(job.salary_min / 1000).toFixed(0)}k - ${(job.salary_max / 1000).toFixed(0)}k`
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/jobs" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Jobs</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {job.company_logo && (
                    <img
                      src={job.company_logo || "/placeholder.svg"}
                      alt={job.company}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <p className="text-lg text-muted-foreground">{job.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.employment_type}
                  </Badge>
                  {formatSalary() && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatSalary()}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(job.posted_at), {
                      addSuffix: true,
                    })}
                  </Badge>
                  {job.requires_screening && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Screening Required
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>

            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-20">
              <CardContent className="pt-6 space-y-4">
                {initialHasApplied ? (
                  <Button disabled className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Already Applied
                  </Button>
                ) : (
                  <Link href={`/jobs/${job.id}/apply`}>
                    <Button className="w-full">Apply Now</Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleSaveJob}
                  disabled={isLoading}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Saved" : "Save Job"}
                </Button>

                <div className="pt-4 border-t space-y-3">
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience Level</p>
                    <p className="text-sm text-muted-foreground capitalize">{job.experience_level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location Type</p>
                    <p className="text-sm text-muted-foreground capitalize">{job.location_type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
