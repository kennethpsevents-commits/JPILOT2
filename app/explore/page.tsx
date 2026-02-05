import { Metadata } from "next"
import { JobFeed } from "@/components/jobs/JobFeed"

export const metadata: Metadata = {
  title: "Explore Jobs - WeAreJobPilot | Discover Your Next Career",
  description:
    "Explore thousands of job opportunities across Europe. Filter by location, salary, remote options, and more. AI-powered job matching to find your perfect role.",
  keywords: [
    "explore jobs",
    "job search",
    "career opportunities",
    "European jobs",
    "remote jobs",
    "tech jobs",
    "job listings",
  ],
  alternates: {
    canonical: "https://www.wearejobpilot.com/explore",
  },
  openGraph: {
    title: "Explore Jobs - WeAreJobPilot",
    description: "Discover thousands of job opportunities across Europe",
    url: "https://www.wearejobpilot.com/explore",
    type: "website",
  },
}

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explore Jobs
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Discover your next career opportunity. Browse thousands of positions 
            across Europe with AI-powered matching.
          </p>
        </div>
      </div>

      {/* Job Feed */}
      <div className="container py-8">
        <JobFeed />
      </div>
    </main>
  )
}
