import { cn } from "@/lib/utils"

interface AILogoProps {
  className?: string
  label?: string
  size?: "sm" | "md" | "lg"
}

export function AILogo({ className, label, size = "md" }: AILogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center font-bold text-slate-900",
          sizeClasses[size],
        )}
      >
        AI
      </div>
      {label && <span className="text-cyan-400 font-semibold">{label}</span>}
    </div>
  )
}
