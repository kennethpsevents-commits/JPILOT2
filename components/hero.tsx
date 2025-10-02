import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" role="region" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Smiling woman at laptop with colleagues in modern office"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      </div>

      {/* Aviation grid background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00A1DE08_1px,transparent_1px),linear-gradient(to_bottom,#00A1DE08_1px,transparent_1px)] bg-[size:64px_64px] z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9EE493]/10 rounded-full blur-3xl radar-pulse z-0"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance text-primary">
            AI Job Hunter – <span className="text-foreground">Pilot Your Career</span> with Job GPT
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto text-pretty leading-relaxed">
            More insights unlocked with higher subscription tiers
          </p>

          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative" role="search">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <Input
                placeholder="Search Jobs with Job GPT"
                className="pl-12 h-14 text-lg bg-card border-2 border-border focus:border-primary transition-colors"
                aria-label="Search jobs with Job GPT"
                type="search"
              />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9EE493] hover:bg-[#8DD482] text-foreground"
                aria-label="Search"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
              Start Your Mission
              <svg
                className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:border-[#9EE493] hover:bg-[#9EE493]/10 hover:text-foreground bg-transparent transition-all"
            >
              Watch Demo
            </Button>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            role="list"
            aria-label="Key features"
          >
            <div className="flex items-center gap-2" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#9EE493]" aria-hidden="true" />
              <span>AI-Powered Edits</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#9EE493]" aria-hidden="true" />
              <span>One-Click Apply</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#9EE493]" aria-hidden="true" />
              <span>Job Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
