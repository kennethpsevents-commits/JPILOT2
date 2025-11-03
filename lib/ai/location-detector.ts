// IP-based location detection
export interface LocationInfo {
  country: string
  country_code: string
  city: string | null
  region: string | null
  currency: string
  language: string
  timezone: string
}

export async function detectLocationFromIP(ip: string): Promise<LocationInfo> {
  try {
    // Use ipapi.co for IP geolocation (free tier available)
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()

    return {
      country: data.country_name || "United States",
      country_code: data.country_code || "US",
      city: data.city || null,
      region: data.region || null,
      currency: data.currency || "USD",
      language: data.languages?.split(",")[0]?.toLowerCase() || "en",
      timezone: data.timezone || "America/New_York",
    }
  } catch (error) {
    console.error("[v0] Location detection error:", error)
    // Default to US if detection fails
    return {
      country: "United States",
      country_code: "US",
      city: null,
      region: null,
      currency: "USD",
      language: "en",
      timezone: "America/New_York",
    }
  }
}

export function getClientIP(request: Request): string {
  // Try various headers for IP detection
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")

  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(",")[0].trim()

  return "0.0.0.0" // Fallback
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  PLN: "zł",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF",
  CNY: "¥",
  INR: "₹",
}

export function formatSalary(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency
  return `${symbol}${amount.toLocaleString()}`
}
