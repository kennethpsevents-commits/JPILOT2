import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { ProfileForm } from "@/components/profile-form"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/profile")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
            <ProfileForm user={user} profile={profile} />
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
