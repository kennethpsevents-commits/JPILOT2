"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, DollarSign, Clock, Bookmark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary_min?: number
    salary_max?: number
    description: string
    posted_date: string
  }
  isSaved?: boolean
  userId?: string
}

export function JobCard({ job, isSaved = false, userId }: JobCardProps) {
  const [saved, setSaved] = useState(isSaved)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSaveJob = async () => {
    if (!userId) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      if (saved) {
        const { error: deleteError } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("job_id", job.id)
          .eq("user_id", userId)
        if (deleteError) throw deleteError
        setSaved(false)
      } else {
        const { error: insertError } = await supabase.from("saved_jobs").insert({ job_id: job.id, user_id: userId })
        if (insertError) throw insertError
        setSaved(true)
      }
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save job")
      setSaved(!saved)
    } finally {
      setIsLoading(false)
    }
  }

  const formatSalary = () => {
    if (!job.salary_min || !job.salary_max) return "Salary not specified"
    return `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k`
  }

  const getTimeAgo = () => {
    const posted = new Date(job.posted_date)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return `${diffDays} days ago`
  }

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1 text-base">{job.company}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSaveJob} disabled={isLoading}>
            <Bookmark className={`h-5 w-5 ${saved ? "fill-blue-600 text-blue-600" : ""}`} />
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {formatSalary()}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {getTimeAgo()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-gray-600">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
      {error && <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-700 p-2 text-center">{error}</div>}
    </Card>
  )
}
