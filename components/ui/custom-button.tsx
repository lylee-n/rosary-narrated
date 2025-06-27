import type React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "cyan"
}

export function CustomButton({ children, className, size = "md", variant = "default", ...props }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full border-2 font-medium uppercase tracking-wider transition-all duration-300",
        {
          "border-[#FFE552] bg-transparent text-[#FFE552] hover:bg-[#FFE552] hover:text-black": variant === "default",
          "border-[#82FAFA] bg-transparent text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black": variant === "cyan",
        },
        "text-base", // All buttons use the same text size as Contact form
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight size={16} />
    </button>
  )
}
