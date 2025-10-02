import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { EuropeanMarketStats } from "@/components/european-market-stats"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { GDPRBanner } from "@/components/gdpr-banner"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main">
        <Hero />
        <Features />

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Thousands of Happy Professionals</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  WeAreJobPilot connects talented professionals with their dream careers across Europe. Our AI-powered
                  platform has helped thousands find fulfilling roles in amazing companies.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Users</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <div className="text-3xl font-bold text-accent">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/office-team-collaboration.jpg"
                  alt="Happy professionals collaborating in modern office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/office-diverse-team.jpg"
                  alt="Diverse team of professionals working together in modern office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Work With the Best Companies</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with leading European companies that value talent, innovation, and growth. Our platform
                  partners with organizations that prioritize employee satisfaction and career development.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <span className="text-lg">Verified company reviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <span className="text-lg">Culture fit analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <span className="text-lg">Real employee insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EuropeanMarketStats />
      </main>
      <Footer />
      <AIAssistantButton />
      <GDPRBanner />
    </div>
  )
}
