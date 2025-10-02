import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { ApplicationPipeline } from "@/components/application-pipeline"
import { ApplicationDetails } from "@/components/application-details"
import { ApplicationAnalytics } from "@/components/application-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Application Tracking</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Manage your job applications with pipeline visualization and interview preparation tools
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Add New Application
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl mb-8">
              <Image
                src="/office-interview-success.jpg"
                alt="Successful interview in professional office environment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
                <div className="p-8 w-full">
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-3">Track Every Step to Success</h2>
                    <p className="text-lg text-muted-foreground">
                      Organize your applications, prepare for interviews, and analyze your success rate with our
                      comprehensive tracking system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <Tabs defaultValue="pipeline" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline" className="mt-0">
                <ApplicationPipeline />
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <ApplicationDetails />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <ApplicationAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistantButton />
    </div>
  )
}
