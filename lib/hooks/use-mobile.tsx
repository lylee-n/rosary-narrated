"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768 // Corresponds to md: in Tailwind

export function useIsMobile(): boolean {
  // Start with `false` on the server and for the initial client render.
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // This effect only runs on the client, after hydration.
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Run the check once on mount.
    checkDevice()

    // Add a listener for window resize events.
    window.addEventListener("resize", checkDevice)

    // Cleanup the listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, []) // The empty dependency array ensures this runs only once on mount.

  return isMobile
}
