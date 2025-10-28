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
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your job applications and saved positions</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="relative h-48 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/enthusiastic-female-success-coach-in-office-celebr.jpg"
              alt="Success coach helping track career progress"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-48 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/confident-male-career-advisor-in-modern-workspace-.jpg"
              alt="Career advisor providing guidance and support"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {params.applied === "true" && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Application submitted successfully! You can track its status here.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Review</CardDescription>
              <CardTitle className="text-3xl">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Under Review</CardDescription>
              <CardTitle className="text-3xl">{stats.reviewing}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Interviews</CardDescription>
              <CardTitle className="text-3xl">{stats.interview}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            {applications && applications.length > 0 ? (
              applications.map((application: any) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{application.jobs.title}</CardTitle>
                        <CardDescription className="mt-1">{application.jobs.company}</CardDescription>
                      </div>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="capitalize">{application.status}</span>
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
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
                      <Button asChild>
                        <Link href={`/jobs/${application.jobs.id}`}>View Job</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-4 text-gray-600">You haven't applied to any jobs yet</p>
                  <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedJobs && savedJobs.length > 0 ? (
              savedJobs.map((saved: any) => (
                <Card key={saved.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{saved.jobs.title}</CardTitle>
                        <CardDescription className="mt-1">{saved.jobs.company}</CardDescription>
                      </div>
                      <Bookmark className="h-5 w-5 fill-blue-600 text-blue-600" />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
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
                      <Button asChild>
                        <Link href={`/jobs/${saved.jobs.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bookmark className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-4 text-gray-600">You haven't saved any jobs yet</p>
                  <Button asChild>
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
