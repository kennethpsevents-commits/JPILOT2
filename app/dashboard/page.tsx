import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Track your job search progress, manage applications, and get AI-powered insights to accelerate your
                  career journey.
                </p>
              </div>
              <div className="relative h-[250px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/office-dashboard-work.jpg"
                  alt="Professional working on dashboard in modern office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <Dashboard />
        </div>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
