import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Image from "next/image"

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string; location?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase.from("jobs").select("*").eq("status", "active").order("posted_date", { ascending: false })

  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,company.ilike.%${params.search}%,description.ilike.%${params.search}%`,
    )
  }

  if (params.type && params.type !== "all") {
    query = query.eq("type", params.type)
  }

  if (params.location) {
    query = query.ilike("location", `%${params.location}%`)
  }

  const { data: jobs } = await query

  let savedJobIds: string[] = []
  if (user) {
    const { data: savedJobs } = await supabase.from("saved_jobs").select("job_id").eq("user_id", user.id)
    savedJobIds = savedJobs?.map((sj) => sj.job_id) || []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
          <p className="text-gray-600">Browse thousands of opportunities from top companies</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="relative h-48 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/professional-female-hr-recruiter-smiling-in-modern.jpg"
              alt="HR specialist helping job seekers find opportunities"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-48 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/happy-male-recruitment-consultant-in-office-with-l.jpg"
              alt="Recruitment consultant providing career guidance"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <form className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                name="search"
                placeholder="Job title, company, or keywords..."
                className="pl-10"
                defaultValue={params.search}
              />
            </div>
            <Select name="type" defaultValue={params.type || "all"}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Input name="location" placeholder="Location" className="w-full md:w-48" defaultValue={params.location} />
            <Button type="submit">Search</Button>
          </form>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">{jobs?.length || 0} jobs found</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} isSaved={savedJobIds.includes(job.id)} userId={user?.id} />
          ))}
        </div>

        {!jobs || jobs.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">No jobs found matching your criteria. Try adjusting your filters.</p>
          </div>
        ) : null}
      </main>
    </div>
  )
}
