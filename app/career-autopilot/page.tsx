import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { CareerPathVisualization } from "@/components/career-path-visualization"
import { SkillGapAnalysis } from "@/components/skill-gap-analysis"
import { AICareerRecommendations } from "@/components/ai-career-recommendations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CareerAutopilotPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Career Autopilot</h1>
              <p className="text-xl text-muted-foreground mb-8">
                AI-powered career path personalization with skill gap analysis and intelligent recommendations
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Career Journey
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-career-growth.jpg"
                  alt="Professional celebrating career growth in modern office"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Accelerate Your Career Growth</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI-powered Career Autopilot analyzes your skills, experience, and goals to create a personalized
                  roadmap for success. Join professionals who have advanced their careers with data-driven insights.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Personalized career path visualization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>AI-powered skill gap analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Smart career recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <Tabs defaultValue="path" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="path">Career Path</TabsTrigger>
                <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="path" className="mt-0">
                <CareerPathVisualization />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillGapAnalysis />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0">
                <AICareerRecommendations />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-6">Guided Career Development</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform provides personalized guidance at every step of your career journey. From identifying
                  skill gaps to recommending learning paths, we help you achieve your professional goals faster.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">3x</div>
                    <div className="text-sm text-muted-foreground">Faster Growth</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent">85%</div>
                    <div className="text-sm text-muted-foreground">Goal Achievement</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-mentorship.jpg"
                  alt="Professional mentorship and career guidance in modern office"
                  fill
                  className="object-cover"
                />
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
