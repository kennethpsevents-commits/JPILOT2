"use client"

import type React from "react"

import { useState } from "react"
import type { Job } from "@/lib/types"
import { JobCard } from "./job-card"
import { JobFilters } from "./job-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Briefcase } from "lucide-react"

interface JobsClientProps {
  initialJobs: Job[]
}

export function JobsClient({ initialJobs }: JobsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("query", searchQuery)
    } else {
      params.delete("query")
    }
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">JobPilot</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {/* Search Bar */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Find Your Next Job</h1>
            <p className="text-muted-foreground">Browse {initialJobs.length} available positions</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <JobFilters />
              </SheetContent>
            </Sheet>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/happy-diverse-customer-support-team-smiling-at-cam.jpg"
              alt="Happy diverse customer support team"
              className="w-full h-[300px] object-cover"
              style={{ filter: "contrast(0.35)" }}
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/friendly-customer-service-representative-with-head.jpg"
              alt="Friendly customer service representative"
              className="w-full h-[300px] object-cover"
              style={{ filter: "contrast(0.35)" }}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-4">
          {initialJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            initialJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  )
}
