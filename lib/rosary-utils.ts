import type { MysteryData, RosaryElement } from "@/types"

export const getMysterySetForDay = (dayOfWeek: number): number => {
  const mysteryMap = {
    0: 1, // Sunday - Joyful
    1: 1, // Monday - Joyful
    2: 2, // Tuesday - Sorrowful
    3: 3, // Wednesday - Glorious
    4: 4, // Thursday - Luminous
    5: 2, // Friday - Sorrowful
    6: 1, // Saturday - Joyful
  }
  return mysteryMap[dayOfWeek as keyof typeof mysteryMap] || 1
}

export const getMysterySetForDayName = (dayName: string): number => {
  const dayMap = {
    Sunday: 1,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 2,
    Saturday: 1,
  }
  return dayMap[dayName as keyof typeof dayMap] || 1
}

export const buildRosaryElements = (mysteryData: MysteryData): RosaryElement[] => {
  const elements: RosaryElement[] = []

  // Cross
  elements.push({
    id: "cross",
    type: "cross",
    title: "Sign of the Cross",
    content: [
      {
        subtitle: "Sign of the Cross",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      },
    ],
  })

  // Stem beads
  elements.push({
    id: "S1",
    type: "stem",
    title: "Our Father",
    content: [
      {
        subtitle: "Our Father",
        text: "Our Father, who art in heaven, hallowed be thy name...",
      },
    ],
  })

  for (let i = 2; i <= 4; i++) {
    elements.push({
      id: `S${i}`,
      type: "stem",
      title: "Hail Mary",
      content: [
        {
          subtitle: "Hail Mary",
          text: "Hail Mary, full of grace, the Lord is with thee...",
        },
      ],
    })
  }

  elements.push({
    id: "S5",
    type: "stem",
    title: "Glory Be",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit...",
      },
    ],
  })

  // Main decades
  for (let decade = 1; decade <= 5; decade++) {
    // Mystery bead
    elements.push({
      id: `M${decade}`,
      type: "mystery",
      title: `${decade}${decade === 1 ? "st" : decade === 2 ? "nd" : decade === 3 ? "rd" : "th"} Mystery`,
      content: [
        {
          subtitle: mysteryData.mysteries[decade - 1]?.title || `Mystery ${decade}`,
          text: mysteryData.mysteries[decade - 1]?.significance || "Mystery meditation",
        },
      ],
    })

    // 10 Hail Mary beads
    for (let bead = 1; bead <= 10; bead++) {
      elements.push({
        id: `${decade}.${bead}`,
        type: "hail-mary",
        title: "Hail Mary",
        content: [
          {
            subtitle: "Hail Mary",
            text: "Hail Mary, full of grace, the Lord is with thee...",
          },
        ],
      })
    }
  }

  // Final prayers
  elements.push({
    id: "M1/Final",
    type: "final",
    title: "Final Prayers",
    content: [
      {
        subtitle: "Hail Holy Queen",
        text: "Hail, Holy Queen, Mother of mercy, our life, our sweetness, and our hope...",
      },
    ],
  })

  return elements
}

export const getDynamicM1Content = (previousStepId: string | null, mysteryData: MysteryData) => {
  if (previousStepId === "5.10") {
    return [
      {
        subtitle: "Hail Holy Queen",
        text: "Hail, Holy Queen, Mother of mercy, our life, our sweetness, and our hope...",
      },
    ]
  }
  return [
    {
      subtitle: mysteryData.mysteries[0]?.title || "First Mystery",
      text: mysteryData.mysteries[0]?.significance || "First mystery meditation",
    },
  ]
}

export const rosarySequence = [
  "cross",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "M1",
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "1.5",
  "1.6",
  "1.7",
  "1.8",
  "1.9",
  "1.10",
  "M2",
  "2.1",
  "2.2",
  "2.3",
  "2.4",
  "2.5",
  "2.6",
  "2.7",
  "2.8",
  "2.9",
  "2.10",
  "M3",
  "3.1",
  "3.2",
  "3.3",
  "3.4",
  "3.5",
  "3.6",
  "3.7",
  "3.8",
  "3.9",
  "3.10",
  "M4",
  "4.1",
  "4.2",
  "4.3",
  "4.4",
  "4.5",
  "4.6",
  "4.7",
  "4.8",
  "4.9",
  "4.10",
  "M5",
  "5.1",
  "5.2",
  "5.3",
  "5.4",
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10",
  "M1/Final",
]
