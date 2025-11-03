import { createClient } from "@/lib/supabase/server"
import { JobsClient } from "@/components/jobs/jobs-client"
import type { Job } from "@/lib/types"

export const metadata = {
  title: "Find Jobs | JobPilot",
  description: "Browse 3000+ job opportunities across Europe. Find your dream job with AI-powered matching.",
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
