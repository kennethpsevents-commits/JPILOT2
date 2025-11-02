import { createClient } from "@/lib/supabase/server"
import { ProfileClient } from "@/components/profile/profile-client"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <ProfileClient profile={profile} />
}
