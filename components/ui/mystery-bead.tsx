"use client"
import { cn } from "@/lib/utils"

interface MysteryBeadProps {
  number: number
  isActive?: boolean
  isCompleted?: boolean
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
}

export function MysteryBead({
  number,
  isActive = false,
  isCompleted = false,
  onClick,
  size = "md",
  variant = "default",
}: MysteryBeadProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  }

  const baseClasses =
    "rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer"

  const variantClasses = {
    default: cn("border-2", {
      "bg-[#82FAFA] border-[#82FAFA] text-black": isActive,
      "bg-[#82FAFA]/20 border-[#82FAFA] text-[#82FAFA]": isCompleted && !isActive,
      "bg-transparent border-gray-600 text-gray-400 hover:border-[#82FAFA] hover:text-[#82FAFA]":
        !isActive && !isCompleted,
    }),
    outline: cn("border-2 bg-transparent", {
      "border-[#82FAFA] text-[#82FAFA] shadow-lg shadow-[#82FAFA]/20": isActive,
      "border-[#82FAFA]/60 text-[#82FAFA]/60": isCompleted && !isActive,
      "border-gray-600 text-gray-400 hover:border-[#82FAFA] hover:text-[#82FAFA]": !isActive && !isCompleted,
    }),
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant])}
      aria-label={`Mystery ${number}${isActive ? " (current)" : ""}${isCompleted ? " (completed)" : ""}`}
    >
      {number}
    </button>
  )
}
