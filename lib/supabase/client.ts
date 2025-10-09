import { createBrowserClient } from "@supabase/ssr"

/**
 * Creates a Supabase browser client for use in Client Components.
 * This client is safe to use in the browser and handles cookie management automatically.
 */
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
