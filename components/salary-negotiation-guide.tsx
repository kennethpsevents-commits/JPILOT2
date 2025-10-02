"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NegotiationTip {
  title: string
  description: string
  impact: "high" | "medium"
}

const negotiationTips: NegotiationTip[] = [
  {
    title: "Know Your Market Value",
    description:
      "Research salary ranges for your role and location. Use our salary comparison tool to understand where you stand in the market.",
    impact: "high",
  },
  {
    title: "Highlight Your Unique Skills",
    description:
      "Emphasize skills that are in high demand. TypeScript, System Design, and Cloud expertise can add €8k-€12k to your offer.",
    impact: "high",
  },
  {
    title: "Consider Total Compensation",
    description:
      "Look beyond base salary. Stock options, bonuses, learning budget, and remote work flexibility add significant value.",
    impact: "medium",
  },
  {
    title: "Timing Matters",
    description:
      "Negotiate after receiving the offer but before accepting. Companies expect negotiation and often have room to improve.",
    impact: "high",
  },
  {
    title: "Be Specific with Numbers",
    description:
      "Instead of asking for 'more', provide a specific range based on market data. This shows you've done your research.",
    impact: "medium",
  },
  {
    title: "Practice Your Pitch",
    description:
      "Rehearse your negotiation conversation. Confidence and clear communication can increase your success rate by 40%.",
    impact: "medium",
  },
]

export function SalaryNegotiationGuide() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Salary Negotiation Guide</h2>
        <p className="text-muted-foreground">Expert strategies to maximize your compensation package</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Quick Stats</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">€8,500</div>
                <div className="text-sm text-muted-foreground">Average increase from negotiation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">76%</div>
                <div className="text-sm text-muted-foreground">Success rate with preparation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">3-5</div>
                <div className="text-sm text-muted-foreground">Days to respond to offer</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {negotiationTips.map((tip, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{tip.title}</h3>
                  {tip.impact === "high" && (
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold">
                      HIGH IMPACT
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-xl font-bold mb-3">Sample Negotiation Script</h3>
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm italic text-muted-foreground mb-2">Opening:</p>
            <p className="text-sm">
              "Thank you for the offer. I'm excited about the opportunity. Based on my research of the market and my
              experience with [specific skills], I was expecting a range of €X - €Y. Is there flexibility in the base
              salary?"
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm italic text-muted-foreground mb-2">If they can't increase base:</p>
            <p className="text-sm">
              "I understand. Could we explore other aspects of the compensation package, such as signing bonus, stock
              options, or additional learning budget?"
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Get Personalized Negotiation Strategy</Button>
      </Card>
    </div>
  )
}
