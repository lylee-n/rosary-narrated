import type React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "yellow"
  showArrow?: boolean
}

export function CustomButton({
  children,
  className,
  size = "md",
  variant = "default",
  showArrow = true,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border-2 font-medium uppercase tracking-normal transition-all duration-300",
        {
          "border-[#82FAFA] bg-transparent text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black": variant === "default",
          "border-[#FFE552] bg-transparent text-[#FFE552] hover:bg-[#FFE552] hover:text-black": variant === "yellow",
          "px-6 py-2 text-xs": size === "sm",
          "px-8 py-3 text-sm": size === "md",
          "px-10 py-4 text-base": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight size={16} />}
    </button>
  )
}
