import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AIAssistantClient from "@/components/ai/ai-assistant-client"

export default async function AIAssistantPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/ai-assistant")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <AIAssistantClient profile={profile} />
}
