import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SkillsAssessmentClient } from "@/components/skills/skills-assessment-client"

export const runtime = "edge"
export const revalidate = 0

export default async function SkillsAssessmentPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <SkillsAssessmentClient userId={user.id} />
}
