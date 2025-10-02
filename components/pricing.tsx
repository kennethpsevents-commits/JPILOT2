import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["5 AI CV edits per month", "Basic job search", "Email support", "Job tracking dashboard"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$29",
    description: "For active job seekers",
    features: [
      "Unlimited AI CV edits",
      "Advanced job matching",
      "Priority support",
      "Application templates",
      "Interview prep AI",
      "LinkedIn optimization",
    ],
    cta: "Start Your Mission",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$79",
    description: "For career professionals",
    features: [
      "Everything in Plus",
      "Personal career coach AI",
      "Salary negotiation tools",
      "Network expansion AI",
      "Executive resume service",
      "White-glove support",
    ],
    cta: "Go Pro",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="py-20 lg:py-32" id="pricing">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Choose Your Flight Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as your career takes off. All plans include core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 relative ${
                  plan.highlighted ? "border-primary shadow-2xl shadow-primary/20 scale-105" : "border-border/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Zap className="h-3.5 w-3.5" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <Button
                  className={`w-full mb-6 ${
                    plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
