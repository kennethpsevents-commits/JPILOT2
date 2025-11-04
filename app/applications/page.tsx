import { createClient } from "@/lib/supabase/server"
import { ApplicationsListClient } from "@/components/applications/applications-list-client"
import { redirect } from "next/navigation"
import Image from "next/image"

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

  return (
    <div className="relative">
      <div className="absolute right-8 top-16 hidden xl:block w-60 h-60 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/confident-professional-in-video-interview-smiling-.jpg"
          alt="Professional in video interview"
          width={240}
          height={240}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <div className="absolute left-8 bottom-24 hidden xl:block w-56 h-56 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/professional-reviewing-documents-with-satisfied-ex.jpg"
          alt="Professional reviewing applications"
          width={224}
          height={224}
          className="object-cover"
          style={{ filter: "contrast(0.6)" }}
        />
      </div>

      <ApplicationsListClient applications={applications || []} />
    </div>
  )
}
