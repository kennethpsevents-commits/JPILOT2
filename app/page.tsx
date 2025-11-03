import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  MessageSquare,
  FileText,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JobPilot - AI-Powered Career Intelligence | Premium Job Matching",
  description:
    "Experience the future of job search with AI-powered career intelligence. JobPilot delivers premium job matching, automated applications, and personalized career guidance for ambitious professionals.",
  keywords: [
    "AI job search",
    "premium job matching",
    "career intelligence",
    "automated job applications",
    "AI career assistant",
    "executive job search",
    "professional recruitment",
  ],
  openGraph: {
    title: "JobPilot - AI-Powered Career Intelligence",
    description: "Experience the future of job search with AI-powered career intelligence",
    type: "website",
    images: ["/og-image.png"],
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JobPilot",
    description: "AI-Powered Job Search Platform",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com"}/jobs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "JobPilot",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com"}/logo.png`,
      },
    },
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JobPilot",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com"}/logo.png`,
    description: "AI-Powered Job Search Platform helping professionals find their dream jobs",
    sameAs: ["https://twitter.com/jobpilot", "https://linkedin.com/company/jobpilot", "https://facebook.com/jobpilot"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@jobpilot.com",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />

      <div className="flex flex-col min-h-svh">
        {/* AI Logo Badge - KEPT */}
        <section className="relative container flex flex-col items-center justify-center gap-12 py-32 md:py-40">
          {/* AI Logo Badge - KEPT */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-primary">POWERED BY AI</span>
          </div>

          <div className="flex flex-col items-center gap-8 text-center max-w-5xl mt-16">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-balance">
              The complete platform
              <br />
              <span className="text-primary">to build your career.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
              Your AI career assistant handles everything. Upload your profile, we send applications, optimize your
              resume, and negotiate offers. <strong>You only say yes or no.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Start building <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 px-8 bg-transparent"
                >
                  Talk to AI Assistant
                </Button>
              </Link>
            </div>

            {/* Trust Indicators - KEPT */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>3,000+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>98% Match Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>24/7 AI Support</span>
              </div>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full max-w-6xl mt-16">
            {[
              { value: "98%", label: "faster time to hire", brand: "Top Companies" },
              { value: "300%", label: "increase in interviews", brand: "Our Users" },
              { value: "6x", label: "faster applications", brand: "AI Automation" },
              { value: "24/7", label: "AI assistance", brand: "Always Active" },
            ].map((stat, i) => (
              <Card key={i} className="border-primary/10 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-xs font-semibold text-primary">{stat.brand}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative container py-32 bg-gradient-to-b from-muted/20 to-background">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="relative flex flex-col items-center gap-6 text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold tracking-wide text-primary">AI CAREER INTELLIGENCE</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance max-w-4xl">
              Make career decisions seamless.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Tools for ambitious professionals to accelerate their career growth and land their dream roles faster.
            </p>
          </div>

          {/* AI Chat Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-primary/20 bg-card/50 backdrop-blur overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">AI Career Assistant</h3>
                    <p className="text-sm text-muted-foreground">Instant, intelligent career guidance</p>
                  </div>
                </div>

                <div className="space-y-4 bg-muted/30 rounded-2xl p-6 min-h-[350px]">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
                        Hello! I'm your AI career strategist. I can match you with perfect opportunities, optimize your
                        applications, and negotiate offers on your behalf. What's your career goal?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-[85%] space-y-2">
                      <p className="text-sm luxury-gradient text-white p-4 rounded-xl ml-auto w-fit shadow-lg">
                        Find me senior software engineering roles in Europe with €100k+ salary
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
                        Perfect! I found 247 senior positions matching your criteria across 15 European cities. I've
                        analyzed each role and ranked them by fit. Would you like me to auto-apply to your top 10
                        matches?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/auth/sign-up">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:opacity-90 h-12 text-base font-semibold">
                      Start Your AI Career Journey
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AI Capabilities Grid */}
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Target,
                  title: "Smart Job Matching",
                  desc: "AI analyzes 200+ data points to find your perfect role. 98% accuracy guaranteed.",
                },
                {
                  icon: FileText,
                  title: "Resume Optimization",
                  desc: "ATS-optimized resumes that get past filters and impress recruiters instantly.",
                },
                {
                  icon: Lightbulb,
                  title: "Interview Mastery",
                  desc: "AI-powered prep with company-specific questions and real-time feedback.",
                },
                {
                  icon: Zap,
                  title: "Auto-Apply System",
                  desc: "We handle applications, follow-ups, and scheduling. You focus on interviews.",
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors"
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Premium Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Salary Intelligence",
                desc: "Real-time market data and negotiation strategies",
              },
              {
                icon: Shield,
                title: "Application Tracking",
                desc: "Monitor every application with AI-powered insights",
              },
              { icon: Target, title: "Career Roadmaps", desc: "Personalized growth plans from AI career strategist" },
              { icon: Sparkles, title: "Company Research", desc: "Deep insights on culture, compensation, and growth" },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-primary/10 bg-card/50 backdrop-blur text-center hover:border-primary/30 transition-colors"
              >
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-base">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-32">
          <Card className="luxury-gradient border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <CardContent className="relative flex flex-col items-center gap-8 p-16 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">LIMITED TIME OFFER</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance max-w-3xl">
                Ready to accelerate your career?
              </h2>
              <p className="text-lg max-w-2xl text-pretty opacity-90 leading-relaxed">
                Join 10,000+ ambitious professionals who've landed their dream roles with AI-powered career
                intelligence. Start free, upgrade anytime.
              </p>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-10 h-14 text-base font-semibold shadow-2xl"
                >
                  Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm opacity-75">No credit card required • 3,000+ jobs • AI-powered matching</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
