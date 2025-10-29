import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

export default async function PrivacyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-gray-100">
            <Image
              src="/placeholder.svg?key=bnqwl"
              alt="Trust and safety team member ensuring data protection"
              width={600}
              height={400}
              className="object-contain object-top w-full h-auto max-h-96 mx-auto p-4 rounded-xl shadow-lg"
            />
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gray-100">
            <Image
              src="/placeholder.svg?key=m3xrp"
              alt="Compliance officer managing privacy and security"
              width={600}
              height={400}
              className="object-contain object-top w-full h-auto max-h-96 mx-auto p-4 rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Account information (name, email, password)</li>
                <li>Profile information (phone number, location, experience)</li>
                <li>Job application data (cover letters, application history)</li>
                <li>Usage data and preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your job applications</li>
                <li>Send you updates about your applications</li>
                <li>Personalize your job search experience</li>
                <li>Communicate with you about our services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                We do not sell your personal information. We may share your information with employers when you apply
                for jobs through our platform. We may also share information:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist our operations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Your Rights (GDPR)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>Under GDPR, you have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@jobpilot.com" className="font-medium text-blue-600 hover:underline">
                  privacy@jobpilot.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill the
                purposes outlined in this policy. You may request deletion of your account and data at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar tracking technologies to improve your experience, analyze usage patterns, and
                personalize content. You can control cookies through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last Updated" date.
              </p>
              <p className="font-medium">Last Updated: January 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="space-y-2">
                <li>
                  Email:{" "}
                  <a href="mailto:privacy@jobpilot.com" className="font-medium text-blue-600 hover:underline">
                    privacy@jobpilot.com
                  </a>
                </li>
                <li>Address: JobPilot Inc., 123 Tech Street, San Francisco, CA 94105</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
