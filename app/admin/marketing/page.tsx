import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import MarketingDashboardClient from "@/components/admin/marketing-dashboard-client"

export const metadata = {
  title: "Marketing Dashboard | JobPilot Admin",
  description: "Manage marketing campaigns, email lists, and social media automation",
}

export default async function MarketingDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

  if (!profile || !["admin@jobpilot.com", "owner@jobpilot.com"].includes(profile.email)) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <MarketingDashboardClient />
      </Suspense>
    </div>
  )
}
