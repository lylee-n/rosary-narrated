"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/types"

interface CustomButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "yellow"
}

export function CustomButton({ variant = "primary", size = "md", className, children, ...props }: CustomButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
    yellow: "bg-[#FFE552] hover:bg-[#FFE552]/90 text-black font-semibold",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <Button
      className={cn("transition-all duration-200 rounded-lg", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Button>
  )
}
