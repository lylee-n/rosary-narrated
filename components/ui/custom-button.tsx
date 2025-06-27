import type React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
}

export function CustomButton({ children, className, size = "md", variant = "default", ...props }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border-2 border-[#FFE552] bg-transparent text-[#FFE552] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#FFE552] hover:text-black",
        {
          "px-6 py-2 text-sm": size === "sm",
          "px-8 py-3 text-base": size === "md",
          "px-10 py-4 text-lg": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight size={16} />
    </button>
  )
}
