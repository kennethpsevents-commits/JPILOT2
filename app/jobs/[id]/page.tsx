import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] opacity-10 pointer-events-none"></div>

      <Navigation user={user} />

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">{job.title}</h1>
          <p className="text-2xl text-cyan-400 mb-4">{job.company}</p>
        </div>

        <div className="w-full -mx-6 md:mx-0 mb-12">
          <Image
            src="/supportive-female-career-counselor-with-warm-smile.jpg"
            alt="Career counselor providing job application support"
            width={1200}
            height={600}
            className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
          />
        </div>

        <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="h-5 w-5 text-cyan-400" />
                    <span className="capitalize">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="h-5 w-5 text-cyan-400" />
                    <span>{formatSalary()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    <span>Posted {formatDate(job.posted_date)}</span>
                  </div>
                </div>
              </div>
              {hasApplied && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Applied
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 text-2xl font-semibold text-white">Job Description</h3>
              <p className="leading-relaxed text-slate-300">{job.description}</p>
            </div>

            <Separator className="bg-slate-700/50" />

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-white">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-slate-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="bg-slate-700/50" />

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-white">Benefits</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="bg-slate-700/50" />

            <div className="w-full -mx-6 md:mx-0 my-8">
              <Image
                src="/helpful-male-job-advisor-in-contemporary-office-se.jpg"
                alt="Job advisor ready to assist with career decisions"
                width={1200}
                height={600}
                className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
              />
            </div>

            <div className="flex gap-4">
              {user ? (
                hasApplied ? (
                  <Button disabled className="flex-1 bg-slate-700 text-slate-400">
                    Already Applied
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                  >
                    <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                  </Button>
                )
              ) : (
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                >
                  <Link href="/auth/login">Sign in to Apply</Link>
                </Button>
              )}
              <Button
                variant="outline"
                asChild
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Link href="/jobs">Back to Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
