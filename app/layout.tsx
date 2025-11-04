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
  metadataBase: new URL("https://www.wearejobpilot.com"),
  title: {
    default: "WeAreJobPilot - AI-Powered Job Search Platform",
    template: "%s | WeAreJobPilot",
  },
  description:
    "AI-powered European job aggregator. One-tap applications with automatic CV optimization, legal compliance checks, and salary intelligence. Find your dream job stress-free.",
  keywords: [
    "AI job search",
    "European jobs",
    "automatic applications",
    "CV optimization",
    "job aggregator",
    "career platform",
    "employment",
    "hiring",
  ],
  authors: [{ name: "WeAreJobPilot Team" }],
  creator: "WeAreJobPilot",
  publisher: "WeAreJobPilot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.wearejobpilot.com",
    title: "WeAreJobPilot - AI-Powered Job Search Platform",
    description: "AI-powered European job aggregator with one-tap applications",
    siteName: "WeAreJobPilot",
    images: [
      {
        url: "https://www.wearejobpilot.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeAreJobPilot - AI-Powered Job Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeAreJobPilot - AI-Powered Job Search Platform",
    description: "AI-powered European job aggregator with one-tap applications",
    images: ["https://www.wearejobpilot.com/twitter-image.jpg"],
    creator: "@wearejobpilot",
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
  },
    generator: 'v0.app'
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
        {children}
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
