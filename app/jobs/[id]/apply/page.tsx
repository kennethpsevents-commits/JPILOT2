"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { use } from "react"
import Image from "next/image"

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [coverLetter, setCoverLetter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error: applicationError } = await supabase.from("applications").insert({
        job_id: id,
        user_id: user.id,
        cover_letter: coverLetter,
        status: "pending",
      })

      if (applicationError) throw applicationError

      router.push("/dashboard?applied=true")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit application")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="relative h-40 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/friendly-female-application-support-specialist-smi.jpg"
              alt="Application support specialist ready to help"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-40 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/happy-male-guidance-counselor-in-modern-office-smi.jpg"
              alt="Guidance counselor providing application assistance"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Apply for Position</CardTitle>
            <CardDescription>Submit your application with a cover letter</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're a great fit for this position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                  required
                />
                <p className="text-sm text-gray-500">
                  Explain your relevant experience and why you're interested in this role
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
