import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { CompanyDirectory } from "@/components/company-directory"
import { CultureFitAnalyzer } from "@/components/culture-fit-analyzer"
import { EmployeeInsights } from "@/components/employee-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CompaniesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-background" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Company Intelligence</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Deep insights into company culture, employee satisfaction, and perfect fit analysis
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Companies
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-4">Discover Your Perfect Company Match</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Research thousands of companies across Europe with detailed culture insights, employee reviews, and
                  AI-powered fit analysis. Make informed decisions about where you'll thrive.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5,000+</div>
                    <div className="text-sm text-muted-foreground">Companies</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <div className="text-2xl font-bold text-accent">100K+</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-team-meeting.jpg"
                  alt="Happy team meeting in modern office environment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <Tabs defaultValue="directory" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="directory">Company Directory</TabsTrigger>
                <TabsTrigger value="culture">Culture Fit</TabsTrigger>
                <TabsTrigger value="insights">Employee Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="directory" className="mt-0">
                <CompanyDirectory />
              </TabsContent>

              <TabsContent value="culture" className="mt-0">
                <CultureFitAnalyzer />
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <EmployeeInsights />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/office-company-culture.jpg"
                  alt="Happy professionals enjoying positive company culture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Find Companies That Match Your Values</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Culture fit is crucial for long-term career satisfaction. Our AI analyzes company values, work
                  environment, and team dynamics to help you find organizations where you'll truly belong.
                </p>
                <div className="space-y-4">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="font-semibold mb-1">Work-Life Balance</div>
                    <p className="text-sm text-muted-foreground">
                      Find companies that respect your time and promote healthy work-life integration
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <div className="font-semibold mb-1">Growth Opportunities</div>
                    <p className="text-sm text-muted-foreground">
                      Discover organizations committed to employee development and career advancement
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
