/**
 * Rosary helpers – **one single source of truth**
 * ------------------------------------------------
 * • Visual-layout helpers (positions & SVG links)
 * • Logical helpers (dailyMysteries, buildRosaryElements …)
 * ------------------------------------------------
 * Nothing is imported from a non-existent module any more.
 */

import type { RosaryElement, MysteryData } from "@/types"

/* ────────────────────────────────────
   BASIC DATA
   ──────────────────────────────────── */

export const dailyMysteries = [
  { day: "Monday", mystery: "Joyful", index: 0 },
  { day: "Tuesday", mystery: "Sorrowful", index: 2 },
  { day: "Wednesday", mystery: "Glorious", index: 3 },
  { day: "Thursday", mystery: "Luminous", index: 1 },
  { day: "Friday", mystery: "Sorrowful", index: 2 },
  { day: "Saturday", mystery: "Joyful", index: 0 },
  { day: "Sunday", mystery: "Glorious", index: 3 },
]

export const rosarySequence = [
  "✝",
  "S1",
  "S2",
  "S3",
  "S4",
  "M1",
  ...Array.from({ length: 10 }, (_, i) => `H1-${i + 1}`),
  "M2",
  ...Array.from({ length: 10 }, (_, i) => `H2-${i + 1}`),
  "M3",
  ...Array.from({ length: 10 }, (_, i) => `H3-${i + 1}`),
  "M4",
  ...Array.from({ length: 10 }, (_, i) => `H4-${i + 1}`),
  "M5",
  ...Array.from({ length: 10 }, (_, i) => `H5-${i + 1}`),
  "M1/Final",
]

export const getMysterySetForDay = (dayOfWeek: number): number => {
  switch (dayOfWeek) {
    case 1:
    case 6:
      return 1 // Joyful
    case 2:
    case 5:
      return 3 // Sorrowful
    case 3:
    case 0:
      return 4 // Glorious
    case 4:
      return 2 // Luminous
    default:
      return 1
  }
}

export const getMysterySetForDayName = (dayName: string): number => {
  switch (dayName) {
    case "Monday":
    case "Saturday":
      return 1
    case "Tuesday":
    case "Friday":
      return 3
    case "Wednesday":
    case "Sunday":
      return 4
    case "Thursday":
      return 2
    default:
      return 1
  }
}

/* ────────────────────────────────────
   LAYOUT HELPERS  (Visual positions)
   ──────────────────────────────────── */

/** Absolute positions (% of wrapper) so the **cross is at the bottom** */
export const getRosaryElementPosition = (id: string): { top: string; left: string } => {
  // (Only the special beads are enumerated; hail-Mary beads are laid out
  //  programmatically by RosaryVisualizer if desired.)
  const positions: Record<string, { top: string; left: string }> = {
    "✝": { top: "95%", left: "50%" },
    S1: { top: "85%", left: "50%" },
    S2: { top: "75%", left: "50%" },
    S3: { top: "65%", left: "50%" },
    S4: { top: "55%", left: "50%" },

    M1: { top: "15%", left: "50%" },
    M2: { top: "73%", left: "71%" },
    M3: { top: "45%", left: "18%" },
    M4: { top: "39%", left: "80%" },
    M5: { top: "76%", left: "35%" },

    "M1/Final": { top: "45%", left: "50%" },
  }

  return positions[id] ?? { top: "50%", left: "50%" }
}

/** SVG connections between beads (cross first) */
export const rosaryConnections: [string, string][] = [
  ["✝", "S1"],
  ["S1", "S2"],
  ["S2", "S3"],
  ["S3", "S4"],
  ["S4", "M1"],
  // Decade 1
  ...Array.from({ length: 10 }, (_, i) => [i === 0 ? "M1" : `H1-${i}`, `H1-${i + 1}`]),
  ["H1-10", "M2"],
  // Decade 2
  ...Array.from({ length: 10 }, (_, i) => [i === 0 ? "M2" : `H2-${i}`, `H2-${i + 1}`]),
  ["H2-10", "M3"],
  // Decade 3
  ...Array.from({ length: 10 }, (_, i) => [i === 0 ? "M3" : `H3-${i}`, `H3-${i + 1}`]),
  ["H3-10", "M4"],
  // Decade 4
  ...Array.from({ length: 10 }, (_, i) => [i === 0 ? "M4" : `H4-${i}`, `H4-${i + 1}`]),
  ["H4-10", "M5"],
  // Decade 5
  ...Array.from({ length: 10 }, (_, i) => [i === 0 ? "M5" : `H5-${i}`, `H5-${i + 1}`]),
  ["H5-10", "M1"], // close the loop
]

/* ────────────────────────────────────
   CONTENT HELPERS
   ──────────────────────────────────── */

export const buildRosaryElements = (mysteryData: MysteryData): RosaryElement[] => [
  {
    id: "✝",
    type: "cross",
    title: "Make the Sign of the Cross",
    content: [
      {
        subtitle: "Sign of the Cross",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      },
    ],
  },
  { id: "S1", type: "stem", title: "The Apostles' Creed", content: [] },
  { id: "S2", type: "stem", title: "Our Father", content: [] },
  { id: "S3", type: "stem", title: "Hail Mary 1", content: [] },
  { id: "S4", type: "stem", title: "Hail Mary 2", content: [] },

  // Five mystery beads (M1…M5) and 50 hail-Mary beads (H1-1 … H5-10)
  ...Array.from({ length: 5 }, (_, decade) => {
    const mId = `M${decade + 1}` as const
    const decadeElements: RosaryElement[] = [
      {
        id: mId,
        type: "mystery",
        title: `${decade + 1}ᵗʰ Mystery`,
        content: [],
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `H${decade + 1}-${i + 1}`,
        type: "hail-mary" as const,
        title: `Hail Mary ${i + 1}`,
        content: [],
      })),
    ]
    return decadeElements
  }).flat(),

  {
    id: "M1/Final",
    type: "mystery",
    title: "Glory Be / Hail, Holy Queen",
    content: [],
  },
]

export const getDynamicM1Content = (previousStep: string | null, mysteryData: MysteryData) => {
  // Simple example – modify to suit your full content needs
  if (previousStep === "H5-10") {
    return [
      {
        subtitle: "Hail, Holy Queen",
        text: "Hail, Holy Queen, Mother of Mercy…",
      },
    ]
  }
  return [
    {
      subtitle: `First Mystery of the ${mysteryData.title}`,
      text: mysteryData.mysteries[0].significance,
    },
  ]
}

/* ────────────────────────────────────
   EXPORTED API
   ──────────────────────────────────── */
