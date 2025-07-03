"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Heart } from "lucide-react"
import { useApp } from "@/components/app-provider"

export function FloatingSupportButton() {
  const { setView } = useApp()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const supportButtonElement = (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setView("SUPPORT")}
        className="relative flex items-center justify-center text-black hover:scale-110 transition-all duration-300 group"
        aria-label="Donate"
      >
        <Heart
          size={60}
          className="fill-[#FFE552] text-[#FFE552] group-hover:fill-[#FFE552]/90 group-hover:text-[#FFE552]/90 transition-colors duration-200"
        />
        <span className="absolute top-1/2 -translate-y-[60%] left-0 right-0 flex items-center justify-center text-[10px] font-semibold text-black pointer-events-none leading-none font-inter">
          {"support  "}
          <br />
          {"us"}
        </span>
      </button>
    </div>
  )

  return createPortal(supportButtonElement, document.body)
}
