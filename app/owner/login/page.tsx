import type { Metadata } from "next"
import { OwnerLoginClient } from "@/components/owner/owner-login-client"

export const metadata: Metadata = {
  title: "Owner Login | JobPilot",
  description: "Owner dashboard access",
  robots: "noindex, nofollow",
}

export default function OwnerLoginPage() {
  return <OwnerLoginClient />
}
