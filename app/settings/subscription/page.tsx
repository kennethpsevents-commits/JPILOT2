import { createClient } from "@/lib/supabase/server"
import { SubscriptionSettingsClient } from "@/components/settings/subscription-settings-client"
import { redirect } from "next/navigation"

export default async function SubscriptionSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  return <SubscriptionSettingsClient profile={profile} subscription={subscription} />
}
