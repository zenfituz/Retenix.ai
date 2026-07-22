import * as React from "react"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback: string
  size?: "sm" | "md" | "lg"
}

export function Avatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg"
  }

  return (
    <div
      className={`relative flex shrink-0 overflow-hidden rounded-full border border-white/10 bg-zinc-800 ${sizeClasses[size]} ${className || ''}`}
      {...props}
    >
      {src ? (
        <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800 font-medium text-zinc-300">
          {fallback}
        </div>
      )}
    </div>
  )
}
