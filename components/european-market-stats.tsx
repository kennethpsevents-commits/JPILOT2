import { Card } from "@/components/ui/card"

export function EuropeanMarketStats() {
  const stats = [
    {
      country: "Netherlands",
      flag: "🇳🇱",
      jobs: "12,500+",
      avgSalary: "€68,000",
      growth: "+15%",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      jobs: "28,000+",
      avgSalary: "€65,000",
      growth: "+18%",
    },
    {
      country: "France",
      flag: "🇫🇷",
      jobs: "18,500+",
      avgSalary: "€58,000",
      growth: "+12%",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">European Job Market at a Glance</h2>
          <p className="text-xl text-muted-foreground">Real-time data from major tech hubs across Europe</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <Card key={stat.country} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">{stat.flag}</div>
              <h3 className="text-2xl font-bold mb-4">{stat.country}</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-primary">{stat.jobs}</div>
                  <div className="text-sm text-muted-foreground">Active Jobs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{stat.avgSalary}</div>
                  <div className="text-sm text-muted-foreground">Average Salary</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">{stat.growth}</div>
                  <div className="text-sm text-muted-foreground">YoY Growth</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
