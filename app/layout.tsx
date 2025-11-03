import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieConsent } from "@/components/cookie-consent"
import { MainNav } from "@/components/navigation/main-nav"
import { Footer } from "@/components/navigation/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com"),
  title: {
    default: "JobPilot - AI-Powered Job Search Platform",
    template: "%s | JobPilot",
  },
  description:
    "Find your dream job with AI-powered job search, resume optimization, interview preparation, and personalized career guidance. Join thousands of successful job seekers.",
  keywords: [
    "job search",
    "career",
    "AI job matching",
    "resume optimization",
    "interview preparation",
    "job board",
    "employment",
    "hiring",
  ],
  authors: [{ name: "JobPilot Team" }],
  creator: "JobPilot",
  publisher: "JobPilot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com",
    title: "JobPilot - AI-Powered Job Search Platform",
    description:
      "Find your dream job with AI-powered job search, resume optimization, and personalized career guidance",
    siteName: "JobPilot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobPilot - AI-Powered Job Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobPilot - AI-Powered Job Search Platform",
    description: "Find your dream job with AI-powered job search and career guidance",
    images: ["/og-image.png"],
    creator: "@jobpilot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MainNav />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
