import type { RosaryElement, MysteryData } from "@/lib/types"
import { PRAYERS } from "./prayer-templates"
import { MYSTERY_IMAGES } from "@/constants"

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
  "cross",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "M1/Final",
  ...Array.from({ length: 10 }, (_, i) => `1.${i + 1}`),
  "M2",
  ...Array.from({ length: 10 }, (_, i) => `2.${i + 1}`),
  "M3",
  ...Array.from({ length: 10 }, (_, i) => `3.${i + 1}`),
  "M4",
  ...Array.from({ length: 10 }, (_, i) => `4.${i + 1}`),
  "M5",
  ...Array.from({ length: 10 }, (_, i) => `5.${i + 1}`),
  "M1/Final",
]

export const rosaryConnections = [
  ["cross", "S1"],
  ["S1", "S2"],
  ["S2", "S3"],
  ["S3", "S4"],
  ["S4", "S5"],
  ["S5", "M1/Final"],
  ["M1/Final", "1.1"],
  ["1.1", "1.2"],
  ["1.2", "1.3"],
  ["1.3", "1.4"],
  ["1.4", "1.5"],
  ["1.5", "1.6"],
  ["1.6", "1.7"],
  ["1.7", "1.8"],
  ["1.8", "1.9"],
  ["1.9", "1.10"],
  ["1.10", "M2"],
  ["M2", "2.1"],
  ["2.1", "2.2"],
  ["2.2", "2.3"],
  ["2.3", "2.4"],
  ["2.4", "2.5"],
  ["2.5", "2.6"],
  ["2.6", "2.7"],
  ["2.7", "2.8"],
  ["2.8", "2.9"],
  ["2.9", "2.10"],
  ["2.10", "M3"],
  ["M3", "3.1"],
  ["3.1", "3.2"],
  ["3.2", "3.3"],
  ["3.3", "3.4"],
  ["3.4", "3.5"],
  ["3.5", "3.6"],
  ["3.6", "3.7"],
  ["3.7", "3.8"],
  ["3.8", "3.9"],
  ["3.9", "3.10"],
  ["3.10", "M4"],
  ["M4", "4.1"],
  ["4.1", "4.2"],
  ["4.2", "4.3"],
  ["4.3", "4.4"],
  ["4.4", "4.5"],
  ["4.5", "4.6"],
  ["4.6", "4.7"],
  ["4.7", "4.8"],
  ["4.8", "4.9"],
  ["4.9", "4.10"],
  ["4.10", "M5"],
  ["M5", "5.1"],
  ["5.1", "5.2"],
  ["5.2", "5.3"],
  ["5.3", "5.4"],
  ["5.4", "5.5"],
  ["5.5", "5.6"],
  ["5.6", "5.7"],
  ["5.7", "5.8"],
  ["5.8", "5.9"],
  ["5.9", "5.10"],
  ["5.10", "M1/Final"],
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

export const getMysteryBackgroundImage = (mysterySet: number): string => {
  // Mystery sets: 1 = Joyful, 2 = Luminous, 3 = Sorrowful, 4 = Glorious
  // MYSTERY_IMAGES array: [0] = Joyful, [1] = Luminous, [2] = Sorrowful, [3] = Glorious
  return MYSTERY_IMAGES[mysterySet - 1] || MYSTERY_IMAGES[0]
}

export const buildRosaryElements = (mysteryData: MysteryData): RosaryElement[] => {
  // Use a sequence without the duplicate M1/Final at the end for layout purposes.
  const rosaryLayoutSequence = rosarySequence.slice(0, -1)

  return rosaryLayoutSequence.map((id) => {
    const baseElement = { id, title: "", content: [], type: "spacer" as RosaryElement["type"] }

    if (id.includes(".")) {
      const [, bead] = id.split(".")
      return {
        ...baseElement,
        type: "hail-mary",
        title: `Hail Mary ${bead}`,
        content: PRAYERS.HAIL_MARY.content,
      }
    }

    switch (id) {
      case "cross":
        return { ...baseElement, type: "cross", ...PRAYERS.SIGN_OF_THE_CROSS }
      case "S1":
        return { ...baseElement, type: "stem", ...PRAYERS.APOSTLES_CREED }
      case "S2":
        return { ...baseElement, type: "stem", ...PRAYERS.OUR_FATHER }
      case "S3":
        return {
          ...baseElement,
          type: "stem",
          title: "Hail Mary (1st)",
          content: [{ subtitle: "For the increase of Faith", text: "" }, ...PRAYERS.HAIL_MARY.content],
        }
      case "S4":
        return {
          ...baseElement,
          type: "stem",
          title: "Hail Mary (2nd)",
          content: [{ subtitle: "For the increase of Hope", text: "" }, ...PRAYERS.HAIL_MARY.content],
        }
      case "S5":
        return {
          ...baseElement,
          type: "stem",
          title: "Hail Mary (3rd)",
          content: [{ subtitle: "For the increase of Charity", text: "" }, ...PRAYERS.HAIL_MARY.content],
        }
      case "M1/Final":
        // Initial state is the First Mystery. The final prayer state is handled by getDynamicM1Content.
        return {
          ...baseElement,
          type: "mystery",
          title: "First Mystery / Final Prayer",
          content: [
            ...PRAYERS.GLORY_BE.content,
            {
              subtitle: `The First Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[0].title}`,
              text: `${mysteryData.mysteries[0].significance} ${mysteryData.mysteries[0].reflection}`,
            },
            ...PRAYERS.OUR_FATHER.content,
          ],
        }
      case "M2":
      case "M3":
      case "M4":
      case "M5":
        const mysteryIndex = Number.parseInt(id.charAt(1)) - 1
        const mysteryTitles = ["Second", "Third", "Fourth", "Fifth"]
        return {
          ...baseElement,
          type: "mystery",
          title: `${mysteryTitles[mysteryIndex - 1]} Mystery`,
          content: [
            ...PRAYERS.GLORY_BE.content,
            ...PRAYERS.FATIMA_PRAYER.content,
            {
              subtitle: `The ${mysteryTitles[mysteryIndex - 1]} Mystery of the ${mysteryData.title}: ${
                mysteryData.mysteries[mysteryIndex].title
              }`,
              text: `${mysteryData.mysteries[mysteryIndex].significance} ${mysteryData.mysteries[mysteryIndex].reflection}`,
            },
            ...PRAYERS.OUR_FATHER.content,
          ],
        }
      default:
        return baseElement
    }
  })
}

export const getDynamicM1Content = (previousStepId: string | null, mysteryData: MysteryData) => {
  if (previousStepId === "5.10") {
    return [...PRAYERS.GLORY_BE.content, ...PRAYERS.HAIL_HOLY_QUEEN.content]
  }
  // Default to First Mystery content (covers initial state and coming from S5)
  return [
    ...PRAYERS.GLORY_BE.content,
    {
      subtitle: `The First Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[0].title}`,
      text: `${mysteryData.mysteries[0].significance} ${mysteryData.mysteries[0].reflection}`,
    },
    ...PRAYERS.OUR_FATHER.content,
  ]
}
