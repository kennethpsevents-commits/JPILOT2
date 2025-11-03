import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Search,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Bot,
  Sparkles,
  MessageSquare,
  FileText,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JobPilot - AI-Powered Job Search Platform | Find Your Dream Job",
  description:
    "Find your dream job with AI-powered job search, resume optimization, interview preparation, and personalized career guidance. Join thousands of successful job seekers on JobPilot.",
  keywords: [
    "job search",
    "AI job matching",
    "resume optimization",
    "career guidance",
    "job board",
    "employment",
    "hiring",
    "interview preparation",
  ],
  openGraph: {
    title: "JobPilot - AI-Powered Job Search Platform",
    description: "Find your dream job with AI-powered job search and personalized career guidance",
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
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
          <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Find Your Dream Job with <span className="text-primary">AI-Powered</span> Precision
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              JobPilot uses advanced screening technology to match you with the perfect opportunities. Get personalized
              recommendations and stand out from the crowd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Job Search
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary text-primary hover:bg-primary/10"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/happy-diverse-customer-support-team-smiling-at-cam.jpg"
                alt="Diverse customer support team"
                className="w-full h-[400px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/friendly-customer-service-representative-with-head.jpg"
                alt="Friendly customer service representative"
                className="w-full h-[400px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </section>

        <section className="container py-24 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <div className="flex items-center gap-3">
              <Bot className="h-10 w-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">AI-Powered Job Assistant</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl text-pretty">
              Our advanced AI assistant helps you at every step of your job search journey with intelligent
              recommendations and personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/busy-customer-support-office-with-multiple-diverse.jpg"
                alt="Customer support office"
                className="w-full h-[350px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/professional-customer-support-team-collaborating-i.jpg"
                alt="Customer support team collaboration"
                className="w-full h-[350px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">AI Chat Assistant</h3>
                    <p className="text-sm text-muted-foreground">Get instant answers to your job search questions</p>
                  </div>
                </div>

                <div className="space-y-4 bg-muted/30 rounded-lg p-4 min-h-[300px]">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-3 rounded-lg border">
                        Hello! I'm your AI job assistant. I can help you find jobs, optimize your resume, prepare for
                        interviews, and much more. What would you like help with today?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-[80%] space-y-2">
                      <p className="text-sm bg-primary text-primary-foreground p-3 rounded-lg ml-auto w-fit">
                        Can you help me find software engineering jobs in San Francisco?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm bg-card p-3 rounded-lg border">
                        I found 247 software engineering positions in San Francisco! I've filtered them by relevance to
                        your profile. Would you like me to show you senior roles, or are you interested in all levels?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/auth/sign-up">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Start Chatting with AI
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AI Functions Grid */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-primary/20">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Smart Job Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      AI analyzes your skills, experience, and preferences to recommend the most relevant job
                      opportunities tailored specifically for you.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Resume Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Get AI-powered suggestions to improve your resume with keyword optimization, formatting tips, and
                      content recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Interview Preparation</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice with AI-generated interview questions specific to your target role and get instant
                      feedback on your answers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Cover Letter Generator</h3>
                    <p className="text-sm text-muted-foreground">
                      Create personalized, compelling cover letters in seconds using AI that understands the job
                      requirements and your background.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional AI Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Salary Insights</h4>
                <p className="text-xs text-muted-foreground">
                  AI-powered salary analysis and negotiation tips based on market data
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Career Path Planning</h4>
                <p className="text-xs text-muted-foreground">
                  Get personalized career roadmaps and skill development recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Application Tracking</h4>
                <p className="text-xs text-muted-foreground">
                  AI monitors your applications and suggests optimal follow-up times
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">Company Research</h4>
                <p className="text-xs text-muted-foreground">
                  Instant AI-generated company insights, culture analysis, and reviews
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 bg-muted/30">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Why Choose JobPilot?</h2>
            <p className="text-muted-foreground max-w-2xl text-pretty">
              Our platform combines cutting-edge technology with human expertise to deliver the best job search
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/smiling-diverse-customer-support-agents-wearing-he.jpg"
                alt="Customer support agents"
                className="w-full h-[350px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/happy-customer-service-team-celebrating-success-in.jpg"
                alt="Customer service team celebrating"
                className="w-full h-[350px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Search</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced filters and AI-powered recommendations help you find the perfect match quickly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Verified Companies</h3>
                <p className="text-sm text-muted-foreground">
                  All companies are verified and screened to ensure legitimate opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Apply to multiple jobs with one click using your saved profile and resume.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Career Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Track your applications and get insights to improve your job search strategy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Premium Screening</h3>
                <p className="text-sm text-muted-foreground">
                  Stand out with our premium screening service that highlights your profile to employers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Subscription Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock unlimited applications and premium features with our flexible plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-24">
          <Card className="bg-primary text-primary-foreground border-primary">
            <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Ready to Find Your Next Opportunity?
              </h2>
              <p className="text-lg max-w-2xl text-pretty opacity-90">
                Join thousands of professionals who have found their dream jobs through JobPilot.
              </p>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
