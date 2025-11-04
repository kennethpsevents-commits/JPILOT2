import { createClient } from "@/lib/supabase/server"
import { ProfileClient } from "@/components/profile/profile-client"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="relative">
      <div className="absolute right-4 top-8 hidden lg:block w-52 h-52 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/professional-taking-professional-headshot-photo-sm.jpg"
          alt="Professional updating profile"
          width={208}
          height={208}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <div className="absolute left-4 bottom-16 hidden lg:block w-48 h-48 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/person-typing-resume-on-laptop-with-coffee-in-mode.jpg"
          alt="Professional working on resume"
          width={192}
          height={192}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <ProfileClient profile={profile} />
    </div>
  )
}
