import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | JobPilot",
  description: "Learn how JobPilot collects, uses, and protects your personal information",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
        <p className="text-muted-foreground leading-relaxed">
          We collect information you provide directly to us, including your name, email address, resume, job
          preferences, and any other information you choose to provide when using JobPilot.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use the information we collect to provide, maintain, and improve our services, including AI-powered job
          matching, resume optimization, and personalized career guidance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. Data Security</h2>
        <p className="text-muted-foreground leading-relaxed">
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. Your Rights (GDPR)</h2>
        <p className="text-muted-foreground leading-relaxed">
          You have the right to access, correct, delete, or export your personal data. You can also object to processing
          or request restriction of processing. Contact us at privacy@jobpilot.com to exercise these rights.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use cookies and similar tracking technologies to track activity on our service and hold certain
          information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at privacy@jobpilot.com
        </p>
      </section>
    </div>
  )
}
