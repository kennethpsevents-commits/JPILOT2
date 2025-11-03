import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { SOPsClient } from "@/components/owner/sops-client"

export default async function SOPsPage() {
  const cookieStore = await cookies()
  const ownerSession = cookieStore.get("owner_session")

  if (!ownerSession) {
    redirect("/owner/login")
  }

  return <SOPsClient />
}
