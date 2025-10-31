import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Target, TrendingUp, Plane } from "lucide-react"
import Link from "next/link"
import { ImageGrid } from "@/components/image-grid"
import { AILogo } from "@/components/ai-logo"
import { colors, container, gridOverlay } from "@/lib/design-system"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className={`${colors.bg} min-h-screen relative overflow-hidden`}>
      <div className={gridOverlay}></div>

      <main className={container}>
        <section className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <AILogo size="lg" label="AI-Powered Matching" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Find Your Dream Job with AI-Powered Matching
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto text-center leading-relaxed mb-12">
            JobPilot uses advanced AI to match you with the perfect opportunities. Start your career journey today with
            enterprise-grade technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className={colors.button}>
              <Link href="/jobs">
                Browse Jobs <Plane className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {!user && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent"
              >
                <Link href="/auth/sign-up">Sign Up Free</Link>
              </Button>
            )}
          </div>
        </section>

        <ImageGrid
          images={[
            {
              src: "/happy-smiling-female-customer-service-agent-in-mod.jpg",
              alt: "Professional multicultural team in modern office",
            },
            {
              src: "/cheerful-male-customer-service-team-member-in-brig.jpg",
              alt: "Friendly support agent helping user",
            },
          ]}
        />

        <section>
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center tracking-tight leading-tight mb-12">
            Why Choose JobPilot?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className={`${colors.card} rounded-2xl p-10 shadow-xl hover:shadow-cyan-500/20 transition`}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                <Search className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <AILogo size="sm" />
                <h3 className="text-2xl font-bold text-white">Smart Search</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Advanced filters and AI-powered search to find exactly what you're looking for
              </p>
            </Card>

            <Card className={`${colors.card} rounded-2xl p-10 shadow-xl hover:shadow-emerald-500/20 transition`}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <AILogo size="sm" />
                <h3 className="text-2xl font-bold text-white">Perfect Matches</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Our AI analyzes your skills and experience to recommend the best opportunities
              </p>
            </Card>

            <Card className={`${colors.card} rounded-2xl p-10 shadow-xl hover:shadow-purple-500/20 transition`}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Track Progress</h3>
              <p className="text-slate-300 leading-relaxed">
                Monitor your applications and get insights to improve your job search strategy
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
