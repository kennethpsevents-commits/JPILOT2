import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { redirect } from "next/navigation"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ subscription?: string }>
}) {
  const query = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get applications with job details
  const { data: applications } = await supabase
    .from("applications")
    .select("*, jobs(*)")
    .eq("user_id", user.id)
    .order("applied_at", { ascending: false })
    .limit(10)

  // Get saved jobs
  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select("*, jobs(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get application stats
  const { count: totalApplications } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: pendingApplications } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "pending")

  const { count: interviewApplications } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "interview")

  return (
    <DashboardClient
      profile={profile}
      applications={applications || []}
      savedJobs={savedJobs || []}
      stats={{
        total: totalApplications || 0,
        pending: pendingApplications || 0,
        interviews: interviewApplications || 0,
      }}
      showSubscriptionSuccess={query.subscription === "success"}
    />
  )
}
