export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // Integration point for analytics services (Google Analytics, Mixpanel, etc.)
    console.log("[v0] Analytics event:", eventName, properties)
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    console.log("[v0] Page view:", url)
  }
}
