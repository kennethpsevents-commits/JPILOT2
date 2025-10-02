import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GDPRPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8">GDPR Compliance</h1>
            <Card className="p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">
                  JobPilot is fully compliant with the General Data Protection Regulation (GDPR) and respects your data
                  rights as a European citizen.
                </p>

                <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Right to Access</h3>
                    <p className="text-muted-foreground">
                      You have the right to request a copy of all personal data we hold about you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Right to Rectification</h3>
                    <p className="text-muted-foreground">
                      You can request corrections to any inaccurate or incomplete personal data.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Right to Erasure</h3>
                    <p className="text-muted-foreground">
                      You can request deletion of your personal data ("right to be forgotten").
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Right to Data Portability</h3>
                    <p className="text-muted-foreground">
                      You can request your data in a structured, machine-readable format.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Right to Object</h3>
                    <p className="text-muted-foreground">
                      You can object to processing of your personal data for specific purposes.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Data Protection Measures</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Data minimization principles</li>
                  <li>Secure data storage within the EU</li>
                  <li>Staff training on data protection</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Exercise Your Rights</h2>
                <p className="text-muted-foreground mb-6">
                  To exercise any of your GDPR rights, please contact our Data Protection Officer at dpo@jobpilot.eu or
                  use the buttons below.
                </p>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-primary hover:bg-primary/90">Request My Data</Button>
              <Button variant="outline">Update My Data</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                Delete My Account
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
