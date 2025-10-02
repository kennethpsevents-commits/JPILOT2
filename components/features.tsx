import { Card } from "@/components/ui/card"
import { Plane, Target, Building2, TrendingUp, Bell, FileText, Brain, Globe } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Job Search Radar",
      description:
        "Advanced AI-powered job matching with intelligent filtering and real-time opportunities across Europe.",
    },
    {
      icon: Plane,
      title: "Career Autopilot",
      description: "AI-powered career path personalization with skill gap analysis and intelligent recommendations.",
    },
    {
      icon: Building2,
      title: "Company Intelligence",
      description: "Deep insights into company culture, employee satisfaction, and perfect fit analysis.",
    },
    {
      icon: TrendingUp,
      title: "Salary Intelligence",
      description: "European market salary data with location-based insights and skill impact analysis.",
    },
    {
      icon: Bell,
      title: "Smart Job Alerts",
      description: "Real-time job monitoring with intelligent notifications and priority alerts for perfect matches.",
    },
    {
      icon: FileText,
      title: "Application Tracking",
      description: "Manage your job applications with pipeline visualization and interview preparation tools.",
    },
    {
      icon: Target,
      title: "AI-Powered Matching",
      description: "Our advanced algorithms match you with opportunities that align with your skills and career goals.",
    },
    {
      icon: Globe,
      title: "European Focus",
      description: "Specialized for the European job market with multi-language support and GDPR compliance.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Everything You Need to Land Your Dream Job</h2>
          <p className="text-xl text-muted-foreground">Powered by AI, designed for the European job market</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
