"use client"

import type { Job } from "@/lib/types/job"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Home,
  Building2,
  Bookmark,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// ============================================================================
// TYPES
// ============================================================================

interface JobCardProps {
  job: Job
  showMatchScore?: boolean
  matchScore?: number
}

// ============================================================================
// COMPONENT
// ============================================================================

export function JobCard({
  job,
  showMatchScore = false,
  matchScore,
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Handle save/unsave job
  const handleSaveJob = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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
        await supabase
          .from("saved_jobs")
          .delete()
          .eq("user_id", user.id)
          .eq("job_id", job.id)
        setIsSaved(false)
      } else {
        await supabase
          .from("saved_jobs")
          .insert({ user_id: user.id, job_id: job.id })
        setIsSaved(true)
      }
    } catch (error) {
      // Silently fail, user can retry
    } finally {
      setIsLoading(false)
    }
  }

  // Format salary range
  const formatSalary = (): string | null => {
    if (!job.salary_min && !job.salary_max) return null
    
    const currency = job.salary_currency === "EUR" ? "\u20AC" : job.salary_currency
    
    if (job.salary_min && job.salary_max) {
      return `${currency}${formatK(job.salary_min)} - ${currency}${formatK(job.salary_max)}`
    }
    if (job.salary_min) {
      return `From ${currency}${formatK(job.salary_min)}`
    }
    if (job.salary_max) {
      return `Up to ${currency}${formatK(job.salary_max)}`
    }
    return null
  }

  // Format posted date
  const formatPostedDate = (): string => {
    if (!job.posted_at) return "Recently"
    
    try {
      const posted = new Date(job.posted_at)
      const now = new Date()
      const diffMs = now.getTime() - posted.getTime()
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      if (diffDays < 7) return `${diffDays}d ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
      return `${Math.floor(diffDays / 30)}mo ago`
    } catch {
      return "Recently"
    }
  }

  // Get location type icon
  const LocationIcon = () => {
    switch (job.location_type) {
      case "remote":
        return <Home className="h-3.5 w-3.5" />
      case "hybrid":
        return <Building2 className="h-3.5 w-3.5" />
      default:
        return <Briefcase className="h-3.5 w-3.5" />
    }
  }

  // Format employment type
  const formatEmploymentType = (): string => {
    if (!job.employment_type) return "Full-time"
    return job.employment_type
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("-")
  }

  const salary = formatSalary()

  return (
    <Card
      className="group relative h-full overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-md"
      role="article"
      aria-label={`${job.title} at ${job.company}`}
    >
      <Link href={`/jobs/${job.id}`} className="block">
        <CardContent className="flex h-full flex-col p-5">
          {/* Header: Logo + Title */}
          <div className="flex items-start gap-4">
            {job.company_logo ? (
              <Image
                src={job.company_logo}
                alt={`${job.company} logo`}
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0 rounded-lg border bg-white object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border bg-primary/5 text-lg font-semibold text-primary">
                {job.company.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                {job.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {job.company}
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            {salary && (
              <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-500">
                <DollarSign className="h-3.5 w-3.5" />
                {salary}
              </span>
            )}
          </div>

          {/* Match score (if provided) */}
          {showMatchScore && matchScore !== undefined && (
            <div className="mt-3 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {matchScore}% Match
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              <LocationIcon />
              <span className="capitalize">{job.location_type}</span>
            </Badge>

            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {formatEmploymentType()}
            </Badge>

            {job.experience_level && (
              <Badge
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
              >
                {job.experience_level}
              </Badge>
            )}
          </div>

          {/* Footer: Posted time + Actions */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatPostedDate()}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveJob}
                disabled={isLoading}
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                aria-label={isSaved ? "Remove from saved" : "Save job"}
              >
                <Bookmark
                  className={`h-4 w-4 ${isSaved ? "fill-current text-primary" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

// ============================================================================
// HELPERS
// ============================================================================

function formatK(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`
  }
  return num.toString()
}
