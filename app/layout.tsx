import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { GDPRBanner } from "@/components/gdpr-banner"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JobPilot - AI-Powered Job Search",
  description: "Find your dream job with AI-powered matching and smart recommendations",
  keywords: ["jobs", "careers", "employment", "job search", "AI matching", "recruitment"],
  authors: [{ name: "JobPilot" }],
  openGraph: {
    title: "JobPilot - AI-Powered Job Search",
    description: "Find your dream job with AI-powered matching and smart recommendations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobPilot - AI-Powered Job Search",
    description: "Find your dream job with AI-powered matching and smart recommendations",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AnalyticsProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <GDPRBanner />
          <ToastProvider />
        </AnalyticsProvider>
      </body>
    </html>
  )
}
