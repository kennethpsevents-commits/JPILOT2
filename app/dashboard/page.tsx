import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { redirect } from "next/navigation"
import Image from "next/image"

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
    <div className="relative">
      <div className="absolute right-4 top-4 hidden lg:block w-48 h-48 rounded-xl overflow-hidden shadow-lg opacity-90">
        <Image
          src="/professional-analyzing-data-on-computer-screen-wit.jpg"
          alt="Professional tracking career progress"
          width={192}
          height={192}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <div className="absolute left-4 bottom-20 hidden lg:block w-52 h-52 rounded-xl overflow-hidden shadow-lg opacity-90">
        <Image
          src="/diverse-team-celebrating-success-with-high-five-in.jpg"
          alt="Team celebrating success"
          width={208}
          height={208}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

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
    </div>
  )
}
