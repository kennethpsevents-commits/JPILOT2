"use client"

import type { Job } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, DollarSign, Clock, Shield, Bookmark } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
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
    if (!job.posted_date) return "Recently posted"
    try {
      return formatDistanceToNow(new Date(job.posted_date), { addSuffix: true })
    } catch (error) {
      console.error("[v0] Error formatting date:", error)
      return "Recently posted"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {job.company_logo && (
              <img
                src={job.company_logo || "/placeholder.svg"}
                alt={job.company}
                className="h-12 w-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-lg font-semibold hover:underline line-clamp-1">{job.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSaveJob} disabled={isLoading}>
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </Badge>
          {formatSalary() && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {formatSalary()}
            </Badge>
          )}
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatPostedDate()}
          </Badge>
          {job.requires_screening && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Screening Required
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {job.category && <Badge variant="outline">{job.category}</Badge>}
            {job.experience_level && <Badge variant="outline">{job.experience_level}</Badge>}
          </div>
          <Link href={`/jobs/${job.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
