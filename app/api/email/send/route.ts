import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Retry logic with exponential backoff
async function sendWithRetry(transporter: any, mailOptions: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions)
      return { success: true, info }
    } catch (error: any) {
      console.error(`[v0] Email send attempt ${attempt} failed:`, error)

      if (attempt === maxRetries) {
        return { success: false, error: error.message }
      }

      // Exponential backoff: 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000))
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { to, subject, html, text, templateId, variables } = body

    const emailContent = { subject, html, text }

    // If template ID provided, fetch and populate template
    if (templateId) {
      const { data: template } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .eq("is_active", true)
        .single()

      if (template) {
        emailContent.subject = template.subject
        emailContent.html = template.body

        // Replace variables
        if (variables) {
          Object.keys(variables).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, "g")
            emailContent.subject = emailContent.subject.replace(regex, variables[key])
            emailContent.html = emailContent.html.replace(regex, variables[key])
          })
        }
      }
    }

    // Log email attempt
    const { data: emailLog } = await supabase
      .from("email_logs")
      .insert({
        user_id: user.id,
        direction: "sent",
        to_address: to,
        from_address: process.env.EMAIL_USER,
        subject: emailContent.subject,
        body: emailContent.html || emailContent.text,
        status: "pending",
        metadata: { templateId, variables },
      })
      .select()
      .single()

    // Send email with retry logic
    const transporter = createTransporter()
    const mailOptions = {
      from: `"JobPilot" <${process.env.EMAIL_USER}>`,
      to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    }

    const result = await sendWithRetry(transporter, mailOptions)

    // Update email log
    if (result.success) {
      await supabase
        .from("email_logs")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
        })
        .eq("id", emailLog.id)

      return NextResponse.json({
        success: true,
        messageId: result.info.messageId,
        logId: emailLog.id,
      })
    } else {
      await supabase
        .from("email_logs")
        .update({
          status: "failed",
          error_message: result.error,
        })
        .eq("id", emailLog.id)

      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("[v0] Email send error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
