import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SubscriptionFunnelClient from "@/components/owner/subscription-funnel-client"

export const metadata = {
  title: "Subscription Funnel Monitor | JobPilot Owner",
  description: "Real-time subscription funnel monitoring and analytics",
}

async function checkOwnerAuth() {
  const supabase = await createClient()

  // Check if owner session exists
  const { data: session } = await supabase
    .from("admin_access")
    .select("*")
    .eq("session_id", "owner")
    .gte("expires_at", new Date().toISOString())
    .single()

  if (!session) {
    redirect("/owner/login")
  }
}

export default async function SubscriptionFunnelPage() {
  await checkOwnerAuth()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-8">Loading funnel metrics...</div>}>
        <SubscriptionFunnelClient />
      </Suspense>
    </div>
  )
}
