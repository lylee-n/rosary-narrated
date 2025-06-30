"use client"
import { cn } from "@/lib/utils"

interface MysteryTitleProps {
  title: string
  subtitle?: string
  className?: string
  size?: "sm" | "md" | "lg"
  align?: "left" | "center" | "right"
}

export function MysteryTitle({ title, subtitle, className, size = "md", align = "center" }: MysteryTitleProps) {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl lg:text-3xl",
    lg: "text-2xl md:text-3xl lg:text-4xl",
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={cn(alignClasses[align], className)}>
      <h2 className={cn("text-white font-sora font-bold md:font-semibold leading-tight mb-2", sizeClasses[size])}>
        {title}
      </h2>
      {subtitle && <p className="text-gray-300 font-inter text-sm md:text-base leading-relaxed">{subtitle}</p>}
    </div>
  )
}
