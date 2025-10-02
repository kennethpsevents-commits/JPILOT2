import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CustomerSupportSection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="support-heading">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/customer-support-team.webp"
          alt="Diverse customer support team members smiling and working with headsets and laptops in a busy office"
          className="w-full h-full object-cover opacity-60 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl">
          <h2 id="support-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Onze Toegewijde Support
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Altijd klaar om u te helpen navigeren op uw carrièrepad.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
            <Link href="/contact">Neem Contact Op</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
