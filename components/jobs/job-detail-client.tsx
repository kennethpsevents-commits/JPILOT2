"use client"

import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Shield,
  Bookmark,
  ArrowLeft,
  CheckCircle,
  FileText,
  MessageSquare,
  Video,
  Loader2,
  Building2,
  Gift,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// ============================================================================
// AI ACTION TYPES
// ============================================================================

type AiAction = "tailor_cv" | "cover_letter" | "interview_prep"

interface AiActionState {
  isLoading: boolean
  action: AiAction | null
}

interface JobDetailClientProps {
  job: Job
  hasApplied: boolean
  isSaved: boolean
}

export function JobDetailClient({ job, hasApplied: initialHasApplied, isSaved: initialIsSaved }: JobDetailClientProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved)
  const [isLoading, setIsLoading] = useState(false)
  const [aiState, setAiState] = useState<AiActionState>({ isLoading: false, action: null })
  const router = useRouter()

  // ============================================================================
  // AI ACTION HANDLER
  // ============================================================================

  const handleAiAction = async (action: AiAction) => {
    setAiState({ isLoading: true, action })

    try {
      const actionMessages: Record<AiAction, string> = {
        tailor_cv: `Help me tailor my CV for this job position:\n\nJob Title: ${job.title}\nCompany: ${job.company}\nDescription: ${job.description}\n\nPlease analyze the job requirements and suggest specific improvements to make my CV more relevant.`,
        cover_letter: `Generate a professional cover letter for this job position:\n\nJob Title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nDescription: ${job.description}\n\nPlease create a compelling cover letter that highlights relevant skills and enthusiasm for this role.`,
        interview_prep: `Help me prepare for an interview for this position:\n\nJob Title: ${job.title}\nCompany: ${job.company}\nDescription: ${job.description}\nRequirements: ${Array.isArray(job.requirements) ? job.requirements.join(", ") : job.requirements}\n\nPlease provide likely interview questions and suggested answers based on this role.`,
      }

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: actionMessages[action] }],
          jobContext: {
            id: job.id,
            title: job.title,
            company: job.company,
          },
        }),
      })

      if (response.ok) {
        // Redirect to AI assistant with context
        router.push(`/ai-assistant?job=${job.id}&action=${action}`)
      }
    } catch (error) {
      // Silently fail, redirect anyway
      router.push(`/ai-assistant?job=${job.id}&action=${action}`)
    } finally {
      setAiState({ isLoading: false, action: null })
    }
  }

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

            {/* Section: Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                {job.description ? (
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {job.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No description provided.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Section: What We Want */}
            {(hasRequirements(job.requirements)) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    What We Want
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {hasRequirements(job.requirements) && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-foreground">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {parseRequirements(job.requirements).map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Section: What You Get */}
            {hasBenefits(job.benefits) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    What You Get
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {parseBenefits(job.benefits).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Section: About Company */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  About {job.company}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  {job.company_logo && (
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="h-16 w-16 rounded-lg object-cover border"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {job.company} is hiring for this {job.employment_type || "full-time"} position 
                      in {job.location}.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>View company profile for more details</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Apply Card */}
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

                {/* Job Meta */}
                <div className="pt-4 border-t space-y-3">
                  {job.category && (
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">{job.category}</p>
                    </div>
                  )}
                  {job.experience_level && (
                    <div>
                      <p className="text-sm font-medium">Experience Level</p>
                      <p className="text-sm text-muted-foreground capitalize">{job.experience_level}</p>
                    </div>
                  )}
                  {job.location_type && (
                    <div>
                      <p className="text-sm font-medium">Location Type</p>
                      <p className="text-sm text-muted-foreground capitalize">{job.location_type}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Actions Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">AI Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Get help preparing your application
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => handleAiAction("tailor_cv")}
                  disabled={aiState.isLoading}
                >
                  {aiState.isLoading && aiState.action === "tailor_cv" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  Tailor CV
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => handleAiAction("cover_letter")}
                  disabled={aiState.isLoading}
                >
                  {aiState.isLoading && aiState.action === "cover_letter" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                  Generate Cover Letter
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => handleAiAction("interview_prep")}
                  disabled={aiState.isLoading}
                >
                  {aiState.isLoading && aiState.action === "interview_prep" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                  Interview Prep
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function hasRequirements(requirements: string[] | string | undefined | null): boolean {
  if (!requirements) return false
  if (Array.isArray(requirements)) return requirements.length > 0
  try {
    const parsed = JSON.parse(requirements)
    return Array.isArray(parsed) && parsed.length > 0
  } catch {
    return typeof requirements === "string" && requirements.trim().length > 0
  }
}

function hasBenefits(benefits: string[] | string | undefined | null): boolean {
  if (!benefits) return false
  if (Array.isArray(benefits)) return benefits.length > 0
  try {
    const parsed = JSON.parse(benefits)
    return Array.isArray(parsed) && parsed.length > 0
  } catch {
    return typeof benefits === "string" && benefits.trim().length > 0
  }
}

function parseRequirements(requirements: string[] | string | undefined | null): string[] {
  if (!requirements) return []
  if (Array.isArray(requirements)) return requirements
  try {
    const parsed = JSON.parse(requirements)
    return Array.isArray(parsed) ? parsed : [requirements]
  } catch {
    return [requirements]
  }
}

function parseBenefits(benefits: string[] | string | undefined | null): string[] {
  if (!benefits) return []
  if (Array.isArray(benefits)) return benefits
  try {
    const parsed = JSON.parse(benefits)
    return Array.isArray(parsed) ? parsed : [benefits]
  } catch {
    return [benefits]
  }
}
