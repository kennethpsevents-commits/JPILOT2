"use client"

import type { Job } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Target, Bookmark, Heart, Clock, Users, Briefcase, Home, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: Job
  showMatchScore?: boolean
  matchScore?: number
  healthScore?: "healthy" | "warning" | "critical"
  applicantCount?: number
}

export function JobCard({
  job,
  showMatchScore = true,
  matchScore = 94,
  healthScore = "healthy",
  applicantCount = 42,
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
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
    const currency = job.salary_currency || "€"
    return `${currency}${(job.salary_min / 1000).toFixed(0)}K - ${currency}${(job.salary_max / 1000).toFixed(0)}K`
  }

  const formatPostedDate = () => {
    if (!job.posted_date) return "2 days ago"
    try {
      const daysAgo = Math.floor((Date.now() - new Date(job.posted_date).getTime()) / (1000 * 60 * 60 * 24))
      if (daysAgo === 0) return "Today"
      if (daysAgo === 1) return "Yesterday"
      if (daysAgo < 7) return `${daysAgo} days ago`
      if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`
      return `${Math.floor(daysAgo / 30)} months ago`
    } catch (error) {
      return "2 days ago"
    }
  }

  const getHealthIndicator = () => {
    const colors = {
      healthy: "bg-green-500",
      warning: "bg-yellow-500",
      critical: "bg-red-500",
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${colors[healthScore]}`} />
        <span className="text-xs text-muted-foreground capitalize">{healthScore}</span>
      </div>
    )
  }

  const getWorkTypeIcon = () => {
    const type = job.type?.toLowerCase() || ""
    if (type.includes("remote")) return <Home className="h-3 w-3" />
    if (type.includes("hybrid")) return <Briefcase className="h-3 w-3" />
    return <Briefcase className="h-3 w-3" />
  }

  return (
    <Card className="group relative h-full overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Company Logo - 80x80 as per spec */}
            {job.company_logo ? (
              <img
                src={job.company_logo || "/placeholder.svg?height=80&width=80"}
                alt={`${job.company} logo`}
                className="h-20 w-20 flex-shrink-0 rounded-lg border border-border object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-2xl font-bold text-primary">
                {job.company.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <Link href={`/jobs/${job.id}`} className="group/title block">
                <h3 className="text-xl font-semibold leading-tight text-foreground transition-colors group-hover/title:text-primary line-clamp-2">
                  {job.title}
                </h3>
              </Link>
              <Link
                href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                className="mt-1 block text-base text-muted-foreground transition-colors hover:text-primary"
              >
                {job.company}
              </Link>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveJob}
            disabled={isLoading}
            className="h-10 w-10 flex-shrink-0 text-muted-foreground transition-colors hover:text-primary"
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current text-primary" : ""}`} />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          {formatSalary() && (
            <div className="flex items-center gap-1.5 font-medium text-green-600 dark:text-green-500">
              <DollarSign className="h-4 w-4" />
              <span>{formatSalary()}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {showMatchScore && (
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">{matchScore}% Match</span>
            </div>
          )}
          {getHealthIndicator()}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">{applicantCount} applied</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Posted {formatPostedDate()}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            <span className="mr-1.5">{getWorkTypeIcon()}</span>
            {job.type}
          </Badge>

          {job.experience_level && (
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
              {job.experience_level}
            </Badge>
          )}

          <Badge
            variant="default"
            className="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border-primary/20"
          >
            <Zap className="mr-1 h-3 w-3 animate-pulse" />
            Actively Reviewing
          </Badge>
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="flex-1 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium transition-all"
            aria-label="Apply to this job"
          >
            Apply in 1 Tap
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveJob}
            disabled={isLoading}
            className="px-4 font-medium transition-all hover:border-primary hover:text-primary bg-transparent"
            aria-label="Save for later"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
