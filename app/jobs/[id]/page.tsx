import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Briefcase, DollarSign, Calendar, CheckCircle2 } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (!job) {
    notFound()
  }

  let hasApplied = false
  if (user) {
    const { data: application } = await supabase
      .from("applications")
      .select("id")
      .eq("job_id", id)
      .eq("user_id", user.id)
      .single()
    hasApplied = !!application
  }

  const formatSalary = () => {
    if (!job.salary_min || !job.salary_max) return "Salary not specified"
    return `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k per year`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="relative h-40 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/smiling-female-career-counselor-in-office-helping-.jpg"
              alt="Career counselor providing job application support"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-40 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/cheerful-male-job-advisor-in-modern-workspace-smil.jpg"
              alt="Job advisor ready to assist with career decisions"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{job.title}</CardTitle>
                <CardDescription className="mt-2 text-xl">{job.company}</CardDescription>
              </div>
              {hasApplied && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Applied
                </Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="h-5 w-5" />
                <span className="capitalize">{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-5 w-5" />
                <span>{formatSalary()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Posted {formatDate(job.posted_date)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold">Job Description</h3>
              <p className="leading-relaxed text-gray-700">{job.description}</p>
            </div>

            <Separator />

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-semibold">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-semibold">Benefits</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            <div className="flex gap-4">
              {user ? (
                hasApplied ? (
                  <Button disabled className="flex-1">
                    Already Applied
                  </Button>
                ) : (
                  <Button asChild className="flex-1">
                    <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                  </Button>
                )
              ) : (
                <Button asChild className="flex-1">
                  <Link href="/auth/login">Sign in to Apply</Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/jobs">Back to Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
