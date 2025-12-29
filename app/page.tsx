import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Users,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JobGPT for Careers - WeAreJobPilot | AI Career Pilot",
  description:
    "JobGPT-style career platform with an AI support angel, smart matching, and application automation for European talent and employers.",
  keywords: [
    "JobGPT",
    "AI career assistant",
    "European jobs",
    "application automation",
    "CV optimization",
    "job aggregator",
    "one-tap apply",
    "career pilot",
  ],
  authors: [{ name: "WeAreJobPilot Team" }],
  creator: "WeAreJobPilot",
  publisher: "WeAreJobPilot",
  alternates: {
    canonical: "https://www.wearejobpilot.com",
  },
  openGraph: {
    title: "AI Job Search - WeAreJobPilot",
    description: "AI-powered job search for Europe. Apply in 1 tap.",
    url: "https://www.wearejobpilot.com",
    siteName: "WeAreJobPilot",
    images: [
      {
        url: "https://www.wearejobpilot.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeAreJobPilot - Stress-free job searching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Search - WeAreJobPilot",
    description: "AI-powered job search for Europe. Apply in 1 tap.",
    creator: "@wearejobpilot",
    images: ["https://www.wearejobpilot.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WeAreJobPilot",
    description: "AI-Powered Job Search Platform for Europe",
    url: "https://www.wearejobpilot.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.wearejobpilot.com/jobs?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "WeAreJobPilot",
      logo: {
        "@type": "ImageObject",
        url: "https://www.wearejobpilot.com/logo.png",
      },
    },
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WeAreJobPilot",
    url: "https://www.wearejobpilot.com",
    logo: "https://www.wearejobpilot.com/logo.png",
    description: "AI-Powered Job Search Platform helping European professionals find their dream jobs",
    email: "Info@wearejobpilot.com",
    sameAs: [
      "https://twitter.com/wearejobpilot",
      "https://linkedin.com/company/wearejobpilot",
      "https://facebook.com/wearejobpilot",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "Info@wearejobpilot.com",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />

      <main className="flex flex-col min-h-svh">
        <section className="relative container flex flex-col items-center justify-center gap-12 py-32 md:py-40">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-primary">JOBGPT BETA LIVE</span>
          </div>

          <div className="flex flex-col items-center gap-8 text-center max-w-5xl mt-16">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-balance">
              WeAreJobPilot is your
              <br />
              <span className="text-primary">JobGPT for careers.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
              Type a goal, get an answer from your AI support angel. We match you, optimize your CV, and guide you into
              the right role with evidence-based recommendations. <strong>You only approve the next move.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Join the Beta <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/5 px-8 bg-transparent"
                >
                  Talk to your Angel
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>EU-first job intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Human-style support angel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Trust-first career guidance</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full max-w-6xl mt-16">
            {[
              { value: "150+", label: "conversation playbooks", brand: "Angel Scripts" },
              { value: "4", label: "core copilots", brand: "Buddy • Coach • Recruiter • Negotiator" },
              { value: "3", label: "proof steps", brand: "Validate • Evidence • Choice" },
              { value: "1", label: "mission", brand: "Get you hired faster" },
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
              A chat-first platform that feels like a team.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              We combine AI reasoning with human-style support to guide every candidate into the best next role.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-primary/20 bg-card/50 backdrop-blur overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Support Angel (JobGPT)</h3>
                    <p className="text-sm text-muted-foreground">Conversational guidance, no fluff</p>
                  </div>
                </div>

                <div className="space-y-4 bg-muted/30 rounded-2xl p-6 min-h-[350px]">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
                        Welcome aboard. Tell me your goal, constraints, and dream role. I’ll map your best path to a
                        hire-ready shortlist.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-[85%] space-y-2">
                      <p className="text-sm luxury-gradient text-white p-4 rounded-xl ml-auto w-fit shadow-lg">
                        I want a growth marketing role in Amsterdam, €65k+, English-only.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
                        Got it. I found 18 high-fit roles within your constraints and ranked them by match score and
                        growth potential. Want me to prepare 3 applications today?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/auth/sign-up">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:opacity-90 h-12 text-base font-semibold">
                      Start with your Angel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Target,
                  title: "Evidence-based Matching",
                  desc: "We match by skills, constraints, and context — then explain why each role fits.",
                },
                {
                  icon: FileText,
                  title: "Application Kit",
                  desc: "Tailored CV, cover letter, and recruiter outreach in one guided flow.",
                },
                {
                  icon: Lightbulb,
                  title: "Interview Prep",
                  desc: "Company-specific mock questions and feedback loops based on your profile.",
                },
                {
                  icon: Zap,
                  title: "Guided Autopilot",
                  desc: "We queue applications, you approve — fast but always in your control.",
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

          <div className="flex justify-center my-16">
            <div className="relative w-full max-w-4xl h-64 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/friendly-customer-support-team-with-headsets-smili.jpg"
                alt="Customer support team ready to help"
                width={896}
                height={256}
                className="object-cover w-full h-full"
                style={{ filter: "contrast(0.6)" }}
              />
            </div>
          </div>

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

        <section className="container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">EMPLOYER PORTAL</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Employers post for free. We deliver vetted, nearby candidates.
              </h2>
              <p className="text-muted-foreground text-lg">
                Just like Takeaway or Uber Eats for talent — companies post in minutes and receive AI-screened profiles
                matched to real availability, skills, and location.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { title: "3-minute posting", desc: "Paste a job or link, we structure it." },
                  { title: "Verified CVs", desc: "Candidates are pre-checked and summarized." },
                  { title: "Pay for outcomes", desc: "Upgrade to pay-per-apply or priority access." },
                ].map((item) => (
                  <Card key={item.title} className="border-primary/10 bg-card/50">
                    <CardContent className="p-4">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/employers">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Post a job <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary/20 bg-transparent">
                    Talk to partnerships
                  </Button>
                </Link>
              </div>
            </div>
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold">Employer workflow (beta)</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  {[
                    "Create your company profile and verify a contact person.",
                    "Paste a job description or connect to your ATS feed.",
                    "Receive a curated shortlist with AI summaries within 24 hours.",
                    "Keep candidates invisible until you decide to engage.",
                  ].map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
                <Link href="/employers">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore the employer portal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-24">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">CHOOSE YOUR FLIGHT PATH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Built for talent and employers.</h2>
            <p className="text-muted-foreground max-w-2xl">
              A single platform with two intelligent journeys: one for candidates ready to move faster, and one for
              employers who want vetted matches without the noise.
            </p>
          </div>

          <Tabs defaultValue="seekers" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="seekers">Job Seekers</TabsTrigger>
              <TabsTrigger value="employers">Employers</TabsTrigger>
            </TabsList>
            <TabsContent value="seekers" className="mt-6">
              <Card className="border-primary/10 bg-card/50">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Your AI career cockpit</h3>
                      <p className="text-muted-foreground">
                        One chat powers matching, applications, and daily guidance.
                      </p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    {[
                      "Structured intake with clear constraints and priorities.",
                      "Shortlists with match evidence and confidence.",
                      "Application kits with CV, cover letters, and outreach.",
                      "Interview prep tailored to the exact role.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/beta">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Join JobGPT Beta <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="employers" className="mt-6">
              <Card className="border-primary/10 bg-card/50">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">The hiring control tower</h3>
                      <p className="text-muted-foreground">
                        Post once, receive vetted candidates with AI summaries and location checks.
                      </p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    {[
                      "3-minute job posting with AI normalization.",
                      "Verified candidate briefs with skills + availability.",
                      "Optional pay-per-apply or priority access.",
                      "Concierge support for hard-to-fill roles.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/employers">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Explore the portal <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container py-32">
          <Card className="luxury-gradient border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <CardContent className="relative flex flex-col items-center gap-8 p-16 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">BETA ACCESS</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance max-w-3xl">
                Ready to let JobGPT fly your career?
              </h2>
              <p className="text-lg max-w-2xl text-pretty opacity-90 leading-relaxed">
                Join the beta and get an AI support angel that never sleeps. Start free, upgrade when you want deeper
                automation and hands-off applications.
              </p>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-10 h-14 text-base font-semibold shadow-2xl"
                >
                  Get Beta Access <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm opacity-75">No credit card required • AI matching • Human-style support</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
