import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Sparkles, ArrowRight, MessageSquare, Rocket, Shield, Target } from "lucide-react"
import Link from "next/link"

export default function BetaPage() {
  return (
    <main className="container py-20 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Rocket className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">WEAREJOBPILOT BETA</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          A JobGPT-style platform with a real support angel.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our beta gives you guided AI matching, an application kit, and daily support. You stay in control — we do the
          heavy lifting.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/sign-up">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Join Beta <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/ai-assistant">
            <Button variant="outline" className="border-primary/20 bg-transparent px-8">
              Meet your Angel
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            icon: MessageSquare,
            title: "Chat-first intake",
            desc: "Tell us your goal, constraints, and preferences. We turn it into a structured profile instantly.",
          },
          {
            icon: Sparkles,
            title: "Evidence-based matching",
            desc: "We show why each role fits, then guide you toward the best outcome with trust-first prompts.",
          },
          {
            icon: Shield,
            title: "Human-style support",
            desc: "Daily updates, shortlists, and clear next steps. No robotic replies, just straight answers.",
          },
          {
            icon: Sparkles,
            title: "Invisible AI protocol",
            desc: "A named support angel remembers your dossier and picks up where you left off.",
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
            <h2 className="text-2xl font-semibold">What you get in beta</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Personalized AI intake with 150+ conversation playbooks.",
                "Shortlisted jobs with match rationale and confidence markers.",
                "Application kit: CV edits + cover letter + outreach templates.",
                "Interview prep based on the exact job and your profile.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Our promise</h2>
            <p className="text-muted-foreground">
              We never force a direction. We validate your original goal, show evidence, and offer better alternatives
              when we see a stronger outcome. You choose. We execute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing">
                <Button variant="outline" className="border-primary/20 bg-transparent">
                  View subscriptions
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Talk to the team</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Step 1: Intake flight check",
            desc: "We confirm goals, constraints, and dealbreakers in under 10 minutes.",
          },
          {
            title: "Step 2: Match + kit",
            desc: "You receive a ranked shortlist and a tailored application kit.",
          },
          {
            title: "Step 3: Daily guidance",
            desc: "We track responses, prep interviews, and keep momentum high.",
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
