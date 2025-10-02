import { Header } from "@/components/header"
import { JobSearch } from "@/components/job-search"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import Image from "next/image"

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">AI Job Search Radar</h1>
            <p className="text-lg text-muted-foreground">
              Advanced AI-powered job search with intelligent matching and real-time opportunities across Europe
            </p>
          </div>

          <div className="mb-12 relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/office-job-search.jpg"
              alt="Professionals searching for jobs in modern office"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Find Your Perfect Role</h2>
                <p className="text-white/90">Join thousands of professionals who found their dream job with us</p>
              </div>
            </div>
          </div>

          <JobSearch />

          <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Success Is Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI-powered job matching connects you with opportunities that align with your skills, experience,
                  and career goals. Join professionals who have transformed their careers with WeAreJobPilot.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">15K+</div>
                    <div className="text-sm text-muted-foreground">Jobs Posted</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent">92%</div>
                    <div className="text-sm text-muted-foreground">Match Rate</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-success-celebration.jpg"
                  alt="Happy professionals celebrating successful job placement"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
