import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8">Privacy Policy</h1>
            <Card className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">Last updated: January 2024</p>

                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  JobPilot ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect information that you provide directly to us:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (skills, experience, preferences)</li>
                  <li>Job application data</li>
                  <li>Communication preferences</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Provide and improve our services</li>
                  <li>Personalize your experience with AI recommendations</li>
                  <li>Send job alerts and notifications</li>
                  <li>Analyze usage patterns and optimize performance</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">4. GDPR Compliance</h2>
                <p className="text-muted-foreground mb-6">
                  As a European-focused platform, we comply with the General Data Protection Regulation (GDPR). You have
                  the right to access, correct, delete, or export your personal data at any time.
                </p>

                <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at privacy@jobpilot.eu
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
