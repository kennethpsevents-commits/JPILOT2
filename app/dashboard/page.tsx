import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Clock, CheckCircle2, XCircle, Calendar, Bookmark } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ applied?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: applications } = await supabase
    .from("applications")
    .select(
      `
      *,
      jobs (
        id,
        title,
        company,
        location,
        type,
        salary_min,
        salary_max
      )
    `,
    )
    .eq("user_id", user.id)
    .order("applied_at", { ascending: false })

  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select(
      `
      *,
      jobs (
        id,
        title,
        company,
        location,
        type,
        salary_min,
        salary_max,
        posted_date
      )
    `,
    )
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })

  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter((a) => a.status === "pending").length || 0,
    reviewing: applications?.filter((a) => a.status === "reviewing").length || 0,
    interview: applications?.filter((a) => a.status === "interview").length || 0,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "reviewing":
        return <Briefcase className="h-4 w-4" />
      case "interview":
        return <Calendar className="h-4 w-4" />
      case "accepted":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] opacity-10 pointer-events-none"></div>

      <Navigation user={user} />

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Your Dashboard
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Track your job applications and manage your career journey
          </p>
        </div>

        <div className="w-full -mx-6 md:mx-0 mb-12">
          <Image
            src="/motivating-female-success-coach-smiling-in-modern-.jpg"
            alt="Success coach helping track career progress"
            width={1200}
            height={600}
            className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
          />
        </div>

        {params.applied === "true" && (
          <Alert className="mb-6 bg-emerald-900/20 border-emerald-500/50">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <AlertDescription className="text-emerald-400">
              Application submitted successfully! You can track its status here.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Total Applications</CardDescription>
              <CardTitle className="text-4xl text-white">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Pending Review</CardDescription>
              <CardTitle className="text-4xl text-white">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Under Review</CardDescription>
              <CardTitle className="text-4xl text-white">{stats.reviewing}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Interviews</CardDescription>
              <CardTitle className="text-4xl text-white">{stats.interview}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="w-full -mx-6 md:mx-0 mb-12">
          <Image
            src="/dedicated-male-career-advisor-with-positive-attitu.jpg"
            alt="Career advisor providing guidance and support"
            width={1200}
            height={600}
            className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
          />
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-slate-800/40 border border-slate-700/50">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
            >
              My Applications
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
            >
              Saved Jobs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            {applications && applications.length > 0 ? (
              applications.map((application: any) => (
                <Card
                  key={application.id}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white">{application.jobs.title}</CardTitle>
                        <CardDescription className="mt-1 text-slate-400">{application.jobs.company}</CardDescription>
                      </div>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="capitalize">{application.status}</span>
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {application.jobs.location}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{application.jobs.type}</span>
                      <span>•</span>
                      <span>Applied {formatDate(application.applied_at)}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                      >
                        <Link href={`/jobs/${application.jobs.id}`}>View Job</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardContent className="py-12 text-center">
                  <Briefcase className="mx-auto mb-4 h-12 w-12 text-slate-500" />
                  <p className="mb-4 text-slate-300">You haven't applied to any jobs yet</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                  >
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedJobs && savedJobs.length > 0 ? (
              savedJobs.map((saved: any) => (
                <Card
                  key={saved.id}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white">{saved.jobs.title}</CardTitle>
                        <CardDescription className="mt-1 text-slate-400">{saved.jobs.company}</CardDescription>
                      </div>
                      <Bookmark className="h-5 w-5 fill-cyan-400 text-cyan-400" />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {saved.jobs.location}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{saved.jobs.type}</span>
                      <span>•</span>
                      <span>Saved {formatDate(saved.saved_at)}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                      >
                        <Link href={`/jobs/${saved.jobs.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardContent className="py-12 text-center">
                  <Bookmark className="mx-auto mb-4 h-12 w-12 text-slate-500" />
                  <p className="mb-4 text-slate-300">You haven't saved any jobs yet</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                  >
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
