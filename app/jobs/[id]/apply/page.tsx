"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = params
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
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] opacity-10 pointer-events-none"></div>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Apply for Position
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Submit your application with a compelling cover letter
          </p>
        </div>

        <div className="w-full -mx-6 md:mx-0 mb-12">
          <Image
            src="/encouraging-female-application-support-specialist-.jpg"
            alt="Application support specialist ready to help"
            width={1200}
            height={600}
            className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Your Application</CardTitle>
              <CardDescription className="text-slate-400">Tell us why you're the perfect fit</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-white">
                    Cover Letter
                  </Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're a great fit for this position..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={10}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <p className="text-sm text-slate-400">
                    Explain your relevant experience and why you're interested in this role
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-400">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="w-full -mx-6 md:mx-0 my-8">
                  <Image
                    src="/patient-male-guidance-counselor-with-friendly-expr.jpg"
                    alt="Guidance counselor providing application assistance"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-xl"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
