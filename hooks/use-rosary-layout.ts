"use client"

import { useMemo } from "react"

export const useRosaryLayout = () => {
  const layout = useMemo(() => {
    const positions: { [key: string]: { top: number; left: number } } = {}
    const hBeadSpacing = 4.5
    const vBeadSpacing = 2.8
    const stemVSpacing = 3.0
    const mysteryVSpace = 2.5
    const mysteryHSpace = 2.5
    const verticalOffset = -5

    const hRowTop = 85 + verticalOffset - 6 * vBeadSpacing
    const rowFor1_1_to_1_5_top = hRowTop + vBeadSpacing

    positions["M1/Final"] = { top: rowFor1_1_to_1_5_top + vBeadSpacing + mysteryVSpace, left: 50 }

    for (let i = 1; i <= 5; i++) {
      positions[`1.${i}`] = { top: rowFor1_1_to_1_5_top, left: 50 - i * hBeadSpacing }
    }

    const stemTopPosition = positions["M1/Final"].top + vBeadSpacing + mysteryVSpace
    positions["S5"] = { top: stemTopPosition, left: 50 }
    for (let i = 4; i >= 1; i--) {
      positions[`S${i}`] = { top: stemTopPosition + (5 - i) * stemVSpacing, left: 50 }
    }
    positions["cross"] = { top: positions["S1"].top + stemVSpacing + mysteryVSpace, left: 50 }

    const firstColumnX = positions["1.5"].left - hBeadSpacing
    for (let i = 6; i <= 10; i++) {
      positions[`1.${i}`] = { top: rowFor1_1_to_1_5_top - (i - 5) * vBeadSpacing, left: firstColumnX }
    }

    positions["M2"] = { top: positions["1.10"].top - vBeadSpacing - mysteryVSpace, left: firstColumnX }

    for (let i = 1; i <= 10; i++) {
      positions[`2.${i}`] = { top: positions["M2"].top - mysteryVSpace - i * vBeadSpacing, left: firstColumnX }
    }

    positions["M3"] = { top: positions["2.10"].top - vBeadSpacing - mysteryVSpace, left: firstColumnX }

    const thirdDecadeTop = positions["M3"].top - vBeadSpacing - mysteryVSpace
    for (let i = 1; i <= 10; i++) {
      positions[`3.${i}`] = { top: thirdDecadeTop, left: positions["M3"].left + i * hBeadSpacing }
    }

    positions["M4"] = { top: thirdDecadeTop, left: positions["3.10"].left + hBeadSpacing + mysteryHSpace }

    const secondColumnX = positions["M4"].left + hBeadSpacing + mysteryHSpace
    for (let i = 1; i <= 10; i++) {
      positions[`4.${i}`] = { top: positions["M4"].top + mysteryVSpace + i * vBeadSpacing, left: secondColumnX }
    }

    positions["M5"] = { top: positions["4.10"].top + vBeadSpacing + mysteryVSpace, left: secondColumnX }

    for (let i = 1; i <= 5; i++) {
      positions[`5.${i}`] = { top: positions["M5"].top + mysteryVSpace + i * vBeadSpacing, left: secondColumnX }
    }
    positions[`5.6`] = { top: positions["5.5"].top + vBeadSpacing, left: secondColumnX - hBeadSpacing }
    for (let i = 7; i <= 10; i++) {
      positions[`5.${i}`] = { top: positions["5.6"].top, left: positions["5.6"].left - (i - 6) * hBeadSpacing }
    }

    const getRosaryElementPosition = (id: string) => {
      const pos = positions[id]
      return pos ? { top: `${pos.top}%`, left: `${pos.left}%` } : { top: "0%", left: "0%" }
    }

    return { positions, getRosaryElementPosition }
  }, [])

  return layout
}
