import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { ImageGrid } from "@/components/image-grid"
import { AILogo } from "@/components/ai-logo"
import { colors, container, gridOverlay } from "@/lib/design-system"

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
    <div className={`${colors.bg} min-h-screen relative overflow-hidden`}>
      <div className={gridOverlay}></div>

      <Navigation user={user} />

      <main className={container}>
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <AILogo size="lg" label="AI Job Matching" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Browse thousands of opportunities from top companies and connect with your perfect career match
          </p>
        </div>

        <ImageGrid
          images={[
            {
              src: "/friendly-female-hr-recruiter-smiling-in-professio.jpg",
              alt: "HR specialist helping job seekers find opportunities",
            },
            {
              src: "/enthusiastic-male-talent-acquisition-specialist-i.jpg",
              alt: "Recruitment consultant providing career guidance",
            },
          ]}
        />

        <div className={`mb-12 ${colors.card} rounded-2xl p-8 shadow-xl`}>
          <form className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                name="search"
                placeholder="Job title, company, or keywords..."
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                defaultValue={params.search}
              />
            </div>
            <Select name="type" defaultValue={params.type || "all"}>
              <SelectTrigger className="w-full md:w-48 bg-slate-900/50 border-slate-600 text-white">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="location"
              placeholder="Location"
              className="w-full md:w-48 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
              defaultValue={params.location}
            />
            <Button type="submit" className={colors.button}>
              Search
            </Button>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-300">{jobs?.length || 0} jobs found</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} isSaved={savedJobIds.includes(job.id)} userId={user?.id} />
          ))}
        </div>

        {!jobs || jobs.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-300">No jobs found matching your criteria. Try adjusting your filters.</p>
          </div>
        ) : null}
      </main>
    </div>
  )
}
