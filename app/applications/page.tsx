import { createClient } from "@/lib/supabase/server"
import { ApplicationsListClient } from "@/components/applications/applications-list-client"
import { redirect } from "next/navigation"

export default async function ApplicationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: applications } = await supabase
    .from("applications")
    .select("*, jobs(*)")
    .eq("user_id", user.id)
    .order("applied_at", { ascending: false })

  return <ApplicationsListClient applications={applications || []} />
}
