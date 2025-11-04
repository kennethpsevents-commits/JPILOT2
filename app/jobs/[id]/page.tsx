import { createClient } from "@/lib/supabase/server"
import type { Job } from "@/lib/types"
import { JobDetailClient } from "@/components/jobs/job-detail-client"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (!job) {
    return {
      title: "Job Not Found - WeAreJobPilot",
      description: "The job you're looking for could not be found.",
    }
  }

  const salary =
    job.salary_min && job.salary_max
      ? `${job.salary_currency || "€"}${(job.salary_min / 1000).toFixed(0)}K - ${job.salary_currency || "€"}${(job.salary_max / 1000).toFixed(0)}K`
      : "Competitive salary"

  return {
    title: `${job.title} at ${job.company} - WeAreJobPilot`,
    description: `Apply for ${job.title} at ${job.company} in ${job.location}. ${salary}. ${job.description?.substring(0, 100) || ""}...`,
    keywords: [job.title, job.company, job.location, "job", "career", "employment"],
    alternates: {
      canonical: `https://www.wearejobpilot.com/jobs/${id}`,
    },
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: `${salary} • ${job.location}`,
      url: `https://www.wearejobpilot.com/jobs/${id}`,
      type: "website",
      images: [
        {
          url: job.company_logo || "https://www.wearejobpilot.com/og-job.jpg",
          width: 1200,
          height: 630,
          alt: `${job.company} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: `${salary} • ${job.location}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job, error } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (error || !job) {
    notFound()
  }

  // Check if user is authenticated and has applied
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let hasApplied = false
  let isSaved = false

  if (user) {
    const { data: application } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_id", id)
      .single()

    hasApplied = !!application

    const { data: savedJob } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_id", id)
      .single()

    isSaved = !!savedJob
  }

  return <JobDetailClient job={job as Job} hasApplied={hasApplied} isSaved={isSaved} />
}
