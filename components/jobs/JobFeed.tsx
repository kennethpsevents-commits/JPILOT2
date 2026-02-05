"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react"
import type { Job, EmploymentType, LocationType, ExperienceLevel } from "@/lib/types/job"

// ============================================================================
// TYPES
// ============================================================================

interface JobsApiResponse {
  jobs: Job[]
  nextCursor: string | null
  hasMore: boolean
}

interface Filters {
  location: string
  remote_type: LocationType | ""
  employment_type: EmploymentType | ""
  experience_level: ExperienceLevel | ""
  salary_min: string
  posted_within_days: string
  q: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_FILTERS: Filters = {
  location: "",
  remote_type: "",
  employment_type: "",
  experience_level: "",
  salary_min: "",
  posted_within_days: "",
  q: "",
}

// ============================================================================
// COMPONENT
// ============================================================================

export function JobFeed() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<Filters>(INITIAL_FILTERS)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Build URL with filters
  const buildUrl = useCallback((cursor: string | null, currentFilters: Filters) => {
    const params = new URLSearchParams()
    
    if (cursor) params.set("cursor", cursor)
    if (currentFilters.location) params.set("location", currentFilters.location)
    if (currentFilters.remote_type) params.set("remote_type", currentFilters.remote_type)
    if (currentFilters.employment_type) params.set("employment_type", currentFilters.employment_type)
    if (currentFilters.experience_level) params.set("experience_level", currentFilters.experience_level)
    if (currentFilters.salary_min) params.set("salary_min", currentFilters.salary_min)
    if (currentFilters.posted_within_days) params.set("posted_within_days", currentFilters.posted_within_days)
    if (currentFilters.q) params.set("q", currentFilters.q)
    
    params.set("limit", "20")
    
    return `/api/jobs?${params.toString()}`
  }, [])

  // Fetch jobs
  const fetchJobs = useCallback(async (cursor: string | null, reset: boolean = false) => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)

    try {
      const url = buildUrl(cursor, reset ? filters : appliedFilters)
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment.")
        }
        throw new Error("Failed to fetch jobs")
      }

      const data: JobsApiResponse = await response.json()

      if (reset) {
        setJobs(data.jobs)
        setAppliedFilters(filters)
      } else {
        setJobs((prev) => [...prev, ...data.jobs])
      }

      setNextCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [isLoading, buildUrl, filters, appliedFilters])

  // Initial load
  useEffect(() => {
    fetchJobs(null, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isInitialLoad) {
          fetchJobs(nextCursor)
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, isInitialLoad, nextCursor, fetchJobs])

  // Handle filter changes
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Apply filters
  const applyFilters = () => {
    setJobs([])
    setNextCursor(null)
    setHasMore(true)
    fetchJobs(null, true)
  }

  // Clear filters
  const clearFilters = () => {
    setFilters(INITIAL_FILTERS)
    setJobs([])
    setNextCursor(null)
    setHasMore(true)
    setTimeout(() => fetchJobs(null, true), 0)
  }

  // Check if filters are active
  const hasActiveFilters = Object.values(appliedFilters).some((v) => v !== "")

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies..."
            value={filters.q}
            onChange={(e) => handleFilterChange("q", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                Active
              </span>
            )}
          </Button>
          <Button onClick={applyFilters} disabled={isLoading}>
            Search
          </Button>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="rounded-lg border bg-card p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Berlin, Amsterdam"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remote_type">Work Type</Label>
              <Select
                value={filters.remote_type}
                onValueChange={(v) => handleFilterChange("remote_type", v)}
              >
                <SelectTrigger id="remote_type">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select
                value={filters.employment_type}
                onValueChange={(v) => handleFilterChange("employment_type", v)}
              >
                <SelectTrigger id="employment_type">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level</Label>
              <Select
                value={filters.experience_level}
                onValueChange={(v) => handleFilterChange("experience_level", v)}
              >
                <SelectTrigger id="experience_level">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_min">Minimum Salary</Label>
              <Select
                value={filters.salary_min}
                onValueChange={(v) => handleFilterChange("salary_min", v)}
              >
                <SelectTrigger id="salary_min">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="30000">30,000+</SelectItem>
                  <SelectItem value="50000">50,000+</SelectItem>
                  <SelectItem value="70000">70,000+</SelectItem>
                  <SelectItem value="100000">100,000+</SelectItem>
                  <SelectItem value="150000">150,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="posted_within_days">Posted Within</Label>
              <Select
                value={filters.posted_within_days}
                onValueChange={(v) => handleFilterChange("posted_within_days", v)}
              >
                <SelectTrigger id="posted_within_days">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      )}

      {/* Results count */}
      {!isInitialLoad && (
        <p className="text-sm text-muted-foreground">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          {hasMore && " (scroll for more)"}
        </p>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
          {error}
          <Button
            variant="link"
            onClick={() => fetchJobs(nextCursor)}
            className="ml-2 text-destructive"
          >
            Try again
          </Button>
        </div>
      )}

      {/* Job grid */}
      {isInitialLoad ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No jobs found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isLoading && !isInitialLoad && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading more jobs...
          </div>
        )}
        {!hasMore && jobs.length > 0 && (
          <p className="text-sm text-muted-foreground">
            You have reached the end of the list
          </p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// SKELETON
// ============================================================================

function JobCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-20 rounded-full bg-muted" />
        <div className="h-6 w-16 rounded-full bg-muted" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-9 flex-1 rounded bg-muted" />
        <div className="h-9 w-12 rounded bg-muted" />
      </div>
    </div>
  )
}
