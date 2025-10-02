import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { SalaryComparisonTool } from "@/components/salary-comparison-tool"
import { SalaryMap } from "@/components/salary-map"
import { SkillImpactCalculator } from "@/components/skill-impact-calculator"
import { SalaryNegotiationGuide } from "@/components/salary-negotiation-guide"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function SalaryIntelligencePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Salary Intelligence</h1>
              <p className="text-xl text-muted-foreground mb-8">
                European market salary data with location-based insights and skill impact analysis
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Calculate Your Worth
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl mb-8">
              <Image
                src="/office-salary-discussion.jpg"
                alt="Professional salary negotiation in modern office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
                <div className="p-8 max-w-xl">
                  <h2 className="text-3xl font-bold mb-3">Know Your Worth</h2>
                  <p className="text-lg text-muted-foreground">
                    Access real-time salary data from across Europe. Compare compensation, understand market trends, and
                    negotiate with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="comparison">Compare</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="negotiate">Negotiate</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="mt-0">
                <SalaryComparisonTool />
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <SalaryMap />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillImpactCalculator />
              </TabsContent>

              <TabsContent value="negotiate" className="mt-0">
                <SalaryNegotiationGuide />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-negotiation-success.jpg"
                  alt="Happy professional after successful salary negotiation"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Negotiate With Confidence</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Armed with comprehensive salary data and market insights, you can negotiate compensation packages that
                  reflect your true value. Our users report an average salary increase of 18% after using our tools.
                </p>
                <div className="space-y-4">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span>📊</span>
                      </div>
                      <span className="font-semibold">Real-Time Market Data</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Access up-to-date salary information from thousands of verified sources
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span>💡</span>
                      </div>
                      <span className="font-semibold">Negotiation Strategies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn proven techniques to maximize your compensation package
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
