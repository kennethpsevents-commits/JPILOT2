import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, Building2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - WeAreJobPilot",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="text-center space-y-6 max-w-md">
        <Building2 className="w-24 h-24 text-muted-foreground mx-auto mb-6" />

        <h1 className="text-9xl font-bold text-primary">404</h1>

        <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>

        <p className="text-muted-foreground text-lg">The page you're looking for doesn't exist or has been moved.</p>

        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/jobs">
              <Search className="mr-2 h-5 w-5" />
              Browse Jobs
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
