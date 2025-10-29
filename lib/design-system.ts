/**
 * LOCKED COLOR PALETTE - NEVER DEVIATE
 * Used across ALL pages for 100% consistency
 */
export const colors = {
  bg: "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
  text: "text-white",
  muted: "text-slate-300",
  primary: "text-cyan-400",
  accent: "text-emerald-400",
  button: "bg-cyan-500 hover:bg-cyan-400 text-slate-900",
  card: "bg-slate-800/50 backdrop-blur border border-slate-700/50",
} as const

/**
 * Standard container for all pages
 */
export const container = "container mx-auto px-6 py-20 relative z-10" as const

/**
 * Grid overlay pattern
 */
export const gridOverlay = "absolute inset-0 bg-[url('/grid.jpg')] opacity-10 pointer-events-none" as const
