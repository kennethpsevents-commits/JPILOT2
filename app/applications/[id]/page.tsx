import { createClient } from "@/lib/supabase/server"
import { ApplicationDetailClient } from "@/components/applications/application-detail-client"
import { notFound, redirect } from "next/navigation"

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string; screening?: string }>
}) {
  const { id } = await params
  const query = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: application } = await supabase
    .from("applications")
    .select("*, jobs(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!application) {
    notFound()
  }

  return (
    <ApplicationDetailClient
      application={application}
      showSuccess={query.success === "true"}
      withScreening={query.screening === "true"}
    />
  )
}
