import { createClient } from "@/lib/supabase/server"
import { JobsClient } from "@/components/jobs/jobs-client"
import type { Job } from "@/lib/types"
import type { Metadata } from "next"
import Image from "next/image"

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

  return (
    <div className="relative">
      <div className="absolute right-8 top-8 hidden xl:block w-64 h-64 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/professional-woman-smiling-while-searching-jobs-on.jpg"
          alt="Professional searching for jobs"
          width={256}
          height={256}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <div className="absolute left-8 bottom-32 hidden xl:block w-56 h-56 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/happy-man-with-headset-working-at-computer-in-mode.jpg"
          alt="Professional working remotely"
          width={224}
          height={224}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <JobsClient initialJobs={(jobs as Job[]) || []} userSubscription={userSubscription} />
    </div>
  )
}
