"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type { Job } from "@/lib/types"
import { JobCard } from "./job-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Briefcase, DollarSign, Filter, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface JobsClientProps {
  initialJobs: Job[]
  userSubscription?: string
}

export function JobsClient({ initialJobs, userSubscription = "free" }: JobsClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [locationType, setLocationType] = useState("")
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerTarget = useRef(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createBrowserClient()

  const jobLimits = {
    free: 10,
    basic: 50,
    pro: 200,
    enterprise: 999999,
  }

  const maxJobs = jobLimits[userSubscription as keyof typeof jobLimits] || jobLimits.free

  const loadMoreJobs = useCallback(async () => {
    if (loading || !hasMore || jobs.length >= maxJobs) return

    setLoading(true)
    const pageSize = 20
    const from = page * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from("jobs")
      .select("*")
      .eq("status", "active")
      .order("posted_date", { ascending: false })
      .range(from, to)

    // Apply filters
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    }
    if (location) query = query.ilike("location", `%${location}%`)
    if (category) query = query.eq("category", category)
    if (experienceLevel) query = query.eq("experience_level", experienceLevel)
    if (locationType) query = query.eq("location_type", locationType)

    const { data, error } = await query

    if (!error && data) {
      setJobs((prev) => [...prev, ...(data as Job[])])
      setHasMore(data.length === pageSize)
      setPage((prev) => prev + 1)
    }

    setLoading(false)
  }, [
    loading,
    hasMore,
    page,
    searchQuery,
    location,
    category,
    experienceLevel,
    locationType,
    jobs.length,
    maxJobs,
    supabase,
  ])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreJobs()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [loadMoreJobs, hasMore, loading])

  const handleSearch = async () => {
    setLoading(true)
    setPage(1)
    setHasMore(true)

    let query = supabase
      .from("jobs")
      .select("*")
      .eq("status", "active")
      .order("posted_date", { ascending: false })
      .range(0, 19)

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    }
    if (location) query = query.ilike("location", `%${location}%`)
    if (category) query = query.eq("category", category)
    if (experienceLevel) query = query.eq("experience_level", experienceLevel)
    if (locationType) query = query.eq("location_type", locationType)

    const { data, error } = await query

    if (!error && data) {
      setJobs(data as Job[])
      setHasMore(data.length === 20)
    }

    setLoading(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocation("")
    setCategory("")
    setExperienceLevel("")
    setLocationType("")
    setJobs(initialJobs)
    setPage(1)
    setHasMore(true)
  }

  const activeFilters = [searchQuery, location, category, experienceLevel, locationType].filter(Boolean).length

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Find your dream job</h1>
          <p className="text-lg text-muted-foreground">
            {jobs.length.toLocaleString()} jobs available across Europe
            {userSubscription !== "free" && userSubscription !== "enterprise" && (
              <span className="ml-2 text-sm">
                (Viewing up to {maxJobs} with {userSubscription} plan)
              </span>
            )}
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Job title, keywords, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-12 h-14 text-base"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="City or country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-12 h-14 text-base"
            />
          </div>
          <Button onClick={handleSearch} size="lg" className="h-14 px-8">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <Briefcase className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>

          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger className="w-[180px]">
              <DollarSign className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationType} onValueChange={setLocationType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>

          {activeFilters > 0 && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear filters ({activeFilters})
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="px-3 py-1">
                Search: {searchQuery}
                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSearchQuery("")} />
              </Badge>
            )}
            {location && (
              <Badge variant="secondary" className="px-3 py-1">
                Location: {location}
                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setLocation("")} />
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="px-3 py-1">
                {category}
                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setCategory("")} />
              </Badge>
            )}
            {experienceLevel && (
              <Badge variant="secondary" className="px-3 py-1">
                {experienceLevel}
                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setExperienceLevel("")} />
              </Badge>
            )}
            {locationType && (
              <Badge variant="secondary" className="px-3 py-1">
                {locationType}
                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setLocationType("")} />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium">No jobs found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {jobs.slice(0, maxJobs).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            {jobs.length >= maxJobs && userSubscription !== "enterprise" && (
              <div className="col-span-full rounded-lg border-2 border-dashed bg-muted/50 p-8 text-center">
                <h3 className="mb-2 text-xl font-semibold">You've reached your plan limit</h3>
                <p className="mb-4 text-muted-foreground">Upgrade to see more jobs and unlock premium features</p>
                <Button onClick={() => router.push("/pricing")} size="lg">
                  Upgrade Plan
                </Button>
              </div>
            )}

            {hasMore && jobs.length < maxJobs && (
              <div ref={observerTarget} className="col-span-full flex justify-center py-8">
                {loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
