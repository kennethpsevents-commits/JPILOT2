import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ArrowRight, CheckCircle2, Users, FileText, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function EmployersPage() {
  return (
    <main className="container py-20 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">EMPLOYER PORTAL</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          Post jobs for free. Receive vetted candidates fast.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          WeAreJobPilot connects your roles to active talent with AI pre-screening and real-time matching. You control
          visibility. We deliver qualified applicants.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Request access <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="border-primary/20 bg-transparent px-8">
              See employer plans
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            icon: FileText,
            title: "3-minute job posting",
            desc: "Paste a job description or ATS link. We structure and enrich it instantly.",
          },
          {
            icon: Users,
            title: "Verified candidate shortlists",
            desc: "We send concise profiles with skills, location, and readiness summaries.",
          },
          {
            icon: Zap,
            title: "Pay for outcomes",
            desc: "Start free, then upgrade to pay-per-apply or priority matching.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-primary/10 bg-card/50">
            <CardContent className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-primary/20 bg-card/50">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              {[
                "Create your company profile and verify the hiring contact.",
                "Submit job details or connect a feed — we normalize and tag everything.",
                "Receive a curated shortlist with AI summaries and location checks.",
                "Stay invisible until you decide to contact a candidate.",
              ].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Why employers choose JobPilot</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Candidate-first system that increases response rates.",
                "Structured data and AI summaries for faster decisions.",
                "EU-first compliance and transparent sourcing.",
                "Optional concierge support for high-priority roles.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Talk to partnerships
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Free posting",
            desc: "Post roles at no cost and receive a basic shortlist.",
          },
          {
            title: "Priority matching",
            desc: "Upgrade to pay-per-apply or priority access for hard-to-fill roles.",
          },
          {
            title: "Concierge hiring",
            desc: "Get a dedicated hiring partner for high-impact roles and fast timelines.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-primary/10 bg-card/50">
            <CardContent className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
