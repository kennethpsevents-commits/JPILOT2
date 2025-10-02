import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { AlertCreationForm } from "@/components/alert-creation-form"
import { ActiveAlertsDashboard } from "@/components/active-alerts-dashboard"
import { AlertNotificationsFeed } from "@/components/alert-notifications-feed"
import { AlertSettings } from "@/components/alert-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Bell } from "lucide-react"

export default function AlertsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-background" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Job Alerts</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Real-time job monitoring with intelligent notifications and priority alerts
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create Your First Alert
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/office-success-celebration.jpg"
                  alt="Professional celebrating job alert success"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Never Miss an Opportunity</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  Set up intelligent job alerts and get notified instantly when your dream job becomes available. Our AI
                  filters ensure you only see the most relevant opportunities.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Real-time notifications via email, SMS, and push</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Smart AI filtering for perfect matches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Priority alerts for urgent opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="create">Create Alert</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <ActiveAlertsDashboard />
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <AlertCreationForm />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <AlertNotificationsFeed />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <AlertSettings />
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
