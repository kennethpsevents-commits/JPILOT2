import { createClient } from "@/lib/supabase/server"
import { JobsClient } from "@/components/jobs/jobs-client"
import type { Job } from "@/lib/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Jobs - WeAreJobPilot | 3000+ European Opportunities",
  description:
    "Browse 3000+ job opportunities across Europe. AI-powered matching, one-tap applications, and automatic CV optimization. Find your dream job today.",
  keywords: [
    "job search",
    "European jobs",
    "AI job matching",
    "career opportunities",
    "job listings",
    "employment",
    "hiring",
  ],
  alternates: {
    canonical: "https://www.wearejobpilot.com/jobs",
  },
  openGraph: {
    title: "Find Jobs - WeAreJobPilot",
    description: "Browse 3000+ job opportunities across Europe with AI-powered matching",
    url: "https://www.wearejobpilot.com/jobs",
    type: "website",
    images: [
      {
        url: "https://www.wearejobpilot.com/og-jobs.jpg",
        width: 1200,
        height: 630,
        alt: "WeAreJobPilot Job Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Jobs - WeAreJobPilot",
    description: "Browse 3000+ job opportunities across Europe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function JobsPage() {
  const supabase = await createClient()

  // Get user subscription level
  const {
    data: { user },
  } = await supabase.auth.getUser()
  let userSubscription = "free"

  if (user) {
    const { data: profile } = await supabase.from("profiles").select("subscription_tier").eq("id", user.id).single()

    userSubscription = profile?.subscription_tier || "free"
  }

  // Fetch initial jobs (first 20)
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "active")
    .order("posted_date", { ascending: false })
    .range(0, 19)

  return <JobsClient initialJobs={(jobs as Job[]) || []} userSubscription={userSubscription} />
}
