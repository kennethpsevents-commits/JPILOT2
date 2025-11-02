import { createClient } from "@/lib/supabase/server"
import type { Job } from "@/lib/types"
import { ApplyClient } from "@/components/jobs/apply-client"
import { notFound, redirect } from "next/navigation"

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${id}/apply`)
  }

  // Get job details
  const { data: job, error } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (error || !job) {
    notFound()
  }

  // Check if already applied
  const { data: existingApplication } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", user.id)
    .eq("job_id", id)
    .single()

  if (existingApplication) {
    redirect(`/jobs/${id}`)
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <ApplyClient job={job as Job} userProfile={profile} />
}
