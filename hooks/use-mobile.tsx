"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Returns true when the viewport width is below the mobile breakpoint.
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // SSR safety: assume desktop until we hit the client
    return typeof window === "undefined" ? false : window.innerWidth < MOBILE_BREAKPOINT
  })

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT - 1}px)`)

    const update = () => setIsMobile(mq.matches)

    update() // initialise
    mq.addEventListener("change", update)

    return () => mq.removeEventListener("change", update)
  }, [])

  return isMobile
}

/* ------------------------------------------------------------------ */
/* Aliases for backward-compatibility                                 */
/* ------------------------------------------------------------------ */
export const useIsMobile = useMobile // old name still works

export default useMobile // allow `import useMobile from '...'`
