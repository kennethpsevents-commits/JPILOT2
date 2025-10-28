import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const runtime = "edge"
export const alt = "Job Details"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job } = await supabase.from("jobs").select("title, company, location").eq("id", id).single()

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: "bold", marginBottom: 20 }}>{job?.title || "Job Opening"}</div>
      <div style={{ fontSize: 48, color: "#4b5563" }}>{job?.company || "Company"}</div>
      <div style={{ fontSize: 36, color: "#6b7280", marginTop: 20 }}>{job?.location || "Location"}</div>
    </div>,
    {
      ...size,
    },
  )
}
