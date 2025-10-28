import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jobpilot.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/jobs", "/jobs/*"],
        disallow: ["/dashboard", "/profile", "/auth/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
