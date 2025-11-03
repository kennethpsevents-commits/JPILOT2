import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JobPilot - AI-Powered Job Search Platform",
    short_name: "JobPilot",
    description: "Find your dream job with AI-powered job search, resume optimization, and career guidance",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdf4",
    theme_color: "#166534",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
