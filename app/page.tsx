import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation user={user} />

      <main>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 sm:text-6xl">
              Find Your Dream Job with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Matching
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              JobPilot uses advanced AI to match you with the perfect opportunities. Start your career journey today.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-lg">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
              {!user && (
                <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
                  <Link href="/auth/sign-up">Sign Up Free</Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/happy-smiling-female-customer-service-agent-in-mod.jpg"
                  alt="Friendly customer support representative ready to help"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/cheerful-male-customer-service-team-member-in-brig.jpg"
                  alt="Professional support team member providing assistance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Choose JobPilot?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Smart Search</CardTitle>
                  <CardDescription>
                    Advanced filters and AI-powered search to find exactly what you're looking for
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <Target className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Perfect Matches</CardTitle>
                  <CardDescription>
                    Our AI analyzes your skills and experience to recommend the best opportunities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>
                    Monitor your applications and get insights to improve your job search strategy
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
