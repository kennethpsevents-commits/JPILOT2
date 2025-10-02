import { Card } from "@/components/ui/card"
import { Target, Send, Sparkles, TrendingUp } from "lucide-react"

const STATS = [
  {
    icon: Target,
    label: "Jobs Found",
    value: "247",
    change: "+12 this week",
    color: "text-primary",
  },
  {
    icon: Send,
    label: "Applications Sent",
    value: "18",
    change: "+5 this week",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    label: "AI Edits Done",
    value: "34",
    change: "+8 this week",
    color: "text-chart-3",
  },
  {
    icon: TrendingUp,
    label: "Response Rate",
    value: "28%",
    change: "+4% improvement",
    color: "text-chart-4",
  },
]

export function Dashboard() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Mission Control Dashboard</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your job search progress and optimize your strategy with real-time insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="p-6 hover:border-primary/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-card-foreground/5 flex items-center justify-center ${stat.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
