"use client"
import { cn } from "@/lib/utils"

interface PerspectiveButtonProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  variant?: "default" | "compact"
  className?: string
}

export function PerspectiveButton({
  label,
  isActive = false,
  onClick,
  variant = "default",
  className,
}: PerspectiveButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 cursor-pointer text-center"

  const variantClasses = {
    default: cn("text-sm md:text-base", {
      "border-[#82FAFA] bg-[#82FAFA] text-black": isActive,
      "border-[#82FAFA] bg-transparent text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black": !isActive,
    }),
    compact: cn("text-xs md:text-sm px-3 py-1", {
      "border-[#82FAFA] bg-[#82FAFA] text-black": isActive,
      "border-gray-600 bg-transparent text-gray-400 hover:border-[#82FAFA] hover:text-[#82FAFA]": !isActive,
    }),
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, variantClasses[variant], className)} aria-pressed={isActive}>
      {label}
    </button>
  )
}
