import { createClient } from "@/lib/supabase/server"
import { ScreeningUpgradeClient } from "@/components/upgrade/screening-upgrade-client"
import { redirect } from "next/navigation"

export default async function ScreeningUpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ application_id?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (!params.application_id) {
    redirect("/dashboard")
  }

  // Get application details
  const { data: application } = await supabase
    .from("applications")
    .select("*, jobs(*)")
    .eq("id", params.application_id)
    .eq("user_id", user.id)
    .single()

  if (!application) {
    redirect("/dashboard")
  }

  return (
    <ScreeningUpgradeClient
      applicationId={params.application_id}
      jobTitle={application.jobs.title}
      company={application.jobs.company}
    />
  )
}
