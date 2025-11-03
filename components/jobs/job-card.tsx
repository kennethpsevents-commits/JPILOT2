"use client"

import type { Job } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Bookmark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: Job
  showMatchScore?: boolean
  matchScore?: number
}

export function JobCard({ job, showMatchScore = false, matchScore }: JobCardProps) {
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
    const currency = job.salary_currency || "EUR"
    return `${currency} ${(job.salary_min / 1000).toFixed(0)}k - ${(job.salary_max / 1000).toFixed(0)}k`
  }

  const formatPostedDate = () => {
    if (!job.posted_date) return "Recently"
    try {
      const daysAgo = Math.floor((Date.now() - new Date(job.posted_date).getTime()) / (1000 * 60 * 60 * 24))
      if (daysAgo === 0) return "Today"
      if (daysAgo === 1) return "Yesterday"
      if (daysAgo < 7) return `${daysAgo}d ago`
      if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}w ago`
      return `${Math.floor(daysAgo / 30)}mo ago`
    } catch (error) {
      return "Recently"
    }
  }

  return (
    <Card className="group relative h-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5">
        {/* Header: Company Logo + Save Button */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {job.company_logo ? (
              <img
                src={job.company_logo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="h-12 w-12 flex-shrink-0 rounded-lg object-cover ring-1 ring-border/50"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary ring-1 ring-border/50">
                {job.company.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <Link
                href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {job.company}
              </Link>
              <Link href={`/jobs/${job.id}`} className="group/title mt-0.5 block">
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover/title:text-primary">
                  {job.title}
                </h3>
              </Link>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveJob}
            disabled={isLoading}
            className="h-9 w-9 flex-shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current text-primary" : ""}`} />
          </Button>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatPostedDate()}</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-normal">
            {job.type}
          </Badge>

          {job.experience_level && (
            <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-normal">
              {job.experience_level}
            </Badge>
          )}

          {formatSalary() && (
            <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-medium text-green-700">
              {formatSalary()}
            </Badge>
          )}
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{job.description}</p>

        <div className="mt-auto">
          <Button
            onClick={() => router.push(`/jobs/${job.id}`)}
            variant="outline"
            className="w-full font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
