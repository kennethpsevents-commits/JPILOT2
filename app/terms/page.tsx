import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | JobPilot",
  description: "Read the terms and conditions for using JobPilot",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          By accessing and using JobPilot, you accept and agree to be bound by the terms and provision of this
          agreement. If you do not agree to these terms, please do not use our service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
        <p className="text-muted-foreground leading-relaxed">
          Permission is granted to temporarily access JobPilot for personal, non-commercial use only. This is the grant
          of a license, not a transfer of title.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
        <p className="text-muted-foreground leading-relaxed">
          You are responsible for maintaining the confidentiality of your account and password. You agree to accept
          responsibility for all activities that occur under your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. Subscription and Payments</h2>
        <p className="text-muted-foreground leading-relaxed">
          Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring
          basis. Refunds are handled according to our refund policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Prohibited Uses</h2>
        <p className="text-muted-foreground leading-relaxed">
          You may not use JobPilot for any illegal purpose, to violate any laws, to infringe upon intellectual property
          rights, or to transmit harmful code or content.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed">
          JobPilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages
          resulting from your use of or inability to use the service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">7. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          For questions about these Terms, contact us at legal@jobpilot.com
        </p>
      </section>
    </div>
  )
}
