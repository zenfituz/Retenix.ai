import * as React from "react"

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger"
}

export function Pill({ variant = "default", className, children, ...props }: PillProps) {
  const variantClasses = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    success: "bg-[#E8FF47]/10 text-[#E8FF47] border-[#E8FF47]/20",
    warning: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    danger: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
