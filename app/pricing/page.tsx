import { Header } from "@/components/header"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import Image from "next/image"

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Choose Your Flight Plan</h1>
            <p className="text-lg text-muted-foreground">Select the perfect plan for your career journey</p>
          </div>

          <Pricing />

          <section className="mt-20 py-16 bg-muted/30 rounded-2xl">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/office-team-collaboration.jpg"
                    alt="Happy professionals in modern office celebrating success"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Join 50,000+ Happy Professionals</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    WeAreJobPilot has helped thousands of professionals across Europe find their dream careers. Our
                    AI-powered platform delivers results that matter.
                  </p>
                  <div className="space-y-6">
                    <div className="bg-background p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">⭐</span>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Sarah M., Senior Developer</p>
                          <p className="text-sm text-muted-foreground">
                            "Found my dream job in Amsterdam within 2 weeks. The AI matching was incredibly accurate!"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">⭐</span>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Marcus K., Product Manager</p>
                          <p className="text-sm text-muted-foreground">
                            "The salary intelligence helped me negotiate 20% higher compensation. Worth every penny!"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 py-16">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Invest in Your Career Success</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    WeAreJobPilot is more than a job board—it's your career partner. Our AI-powered tools and insights
                    give you the competitive edge needed to land better opportunities and negotiate higher salaries.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">€12K</div>
                      <div className="text-sm text-muted-foreground">Avg. Salary Increase</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent">4 weeks</div>
                      <div className="text-sm text-muted-foreground">Avg. Time to Hire</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/office-professional-success.jpg"
                    alt="Successful professional in modern office environment"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
