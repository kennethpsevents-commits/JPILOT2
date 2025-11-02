import { createClient } from "@/lib/supabase/server"
import type { Job } from "@/lib/types"
import { JobDetailClient } from "@/components/jobs/job-detail-client"
import { notFound } from "next/navigation"

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
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
