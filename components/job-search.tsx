import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const PLACEHOLDER_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
    salary: "$120k - $180k",
    tier: "premium",
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "1 week ago",
    salary: "$100k - $150k",
    tier: "basic",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full-time",
    posted: "3 days ago",
    salary: "$130k - $170k",
    tier: "premium",
  },
  {
    id: 4,
    title: "UI/UX Engineer",
    company: "DesignFirst",
    location: "Remote",
    type: "Contract",
    posted: "5 days ago",
    salary: "$90k - $140k",
    tier: "basic",
  },
]

export function JobSearch() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30" role="region" aria-labelledby="job-search-heading">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="job-search-heading" className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Discover Your Next Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered job matching based on your skills, experience, and career goals.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-12">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Job title, keywords, or company"
                className="pl-12 h-12 bg-card border-border"
                aria-label="Search by job title, keywords, or company"
              />
            </div>
            <div className="relative flex-1">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="City, state, or remote"
                className="pl-12 h-12 bg-card border-border"
                aria-label="Search by location"
              />
            </div>
            <Button size="lg" className="bg-[#9EE493] hover:bg-[#8DD482] text-foreground px-8 h-12">
              Search Jobs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Job listings">
            {PLACEHOLDER_JOBS.map((job) => (
              <Card
                key={job.id}
                className="p-6 hover:border-primary/50 hover:shadow-lg transition-all group bg-card"
                role="listitem"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  {job.tier === "premium" && (
                    <Badge variant="secondary" className="bg-[#9EE493]/20 text-foreground border-[#9EE493]/50">
                      <TrendingUp className="h-3 w-3 mr-1" aria-hidden="true" />
                      Premium
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{job.posted}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">{job.salary}</span>
                  <Button
                    size="sm"
                    className="group-hover:bg-[#9EE493] group-hover:text-foreground transition-colors bg-secondary"
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:border-primary hover:text-primary bg-transparent"
            >
              Load More Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
