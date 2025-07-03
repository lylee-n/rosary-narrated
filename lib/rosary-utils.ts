import type { RosaryElement, MysteryData } from "@/types"

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

export const buildRosaryElements = (mysteryData: MysteryData): RosaryElement[] => [
  {
    id: "cross",
    type: "cross",
    title: "Make the Sign of the Cross",
    content: [
      {
        subtitle: "Sign of the Cross",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      },
    ],
  },
  {
    id: "S1",
    type: "stem",
    title: "The Apostles' Creed",
    content: [
      {
        subtitle: "The Apostles' Creed",
        text: "I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son, Our Lord, Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified; died, and was buried. He descended into Hell; the third day He arose again from the dead; He ascended into Heaven, sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen.",
      },
    ],
  },
  {
    id: "S2",
    type: "stem",
    title: "Our Father",
    content: [
      {
        subtitle: "Our Father",
        text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
      },
    ],
  },
  {
    id: "S3",
    type: "stem",
    title: "Hail Mary (1st)",
    content: [
      { subtitle: "For the increase of Faith", text: "" },
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  },
  {
    id: "S4",
    type: "stem",
    title: "Hail Mary (2nd)",
    content: [
      { subtitle: "For the increase of Hope", text: "" },
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  },
  {
    id: "S5",
    type: "stem",
    title: "Hail Mary (3rd)",
    content: [
      { subtitle: "For the increase of Charity", text: "" },
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  },
  {
    id: "M1/Final",
    type: "mystery",
    title: "First Mystery / Final Prayer",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `1.${i + 1}`,
    type: "hail-mary" as const,
    title: `Hail Mary ${i + 1}`,
    content: [
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  })),
  {
    id: "M2",
    type: "mystery",
    title: "Second Mystery",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
      {
        subtitle: "Fatima Prayer",
        text: "O My Jesus, forgive us our sins, save us from the fires of Hell, and lead all souls to Heaven, especially those most need of Thy mercy. Amen.",
      },
      {
        subtitle: `The Second Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[1].title}`,
        text: `${mysteryData.mysteries[1].significance} ${mysteryData.mysteries[1].reflection}`,
      },
      {
        subtitle: "Our Father",
        text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
      },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `2.${i + 1}`,
    type: "hail-mary" as const,
    title: `Hail Mary ${i + 1}`,
    content: [
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  })),
  {
    id: "M3",
    type: "mystery",
    title: "Third Mystery",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
      {
        subtitle: "Fatima Prayer",
        text: "O My Jesus, forgive us our sins, save us from the fires of Hell, and lead all souls to Heaven, especially those most need of Thy mercy. Amen.",
      },
      {
        subtitle: `The Third Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[2].title}`,
        text: `${mysteryData.mysteries[2].significance} ${mysteryData.mysteries[2].reflection}`,
      },
      {
        subtitle: "Our Father",
        text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
      },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `3.${i + 1}`,
    type: "hail-mary" as const,
    title: `Hail Mary ${i + 1}`,
    content: [
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  })),
  {
    id: "M4",
    type: "mystery",
    title: "Fourth Mystery",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
      {
        subtitle: "Fatima Prayer",
        text: "O My Jesus, forgive us our sins, save us from the fires of Hell, and lead all souls to Heaven, especially those most need of Thy mercy. Amen.",
      },
      {
        subtitle: `The Fourth Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[3].title}`,
        text: `${mysteryData.mysteries[3].significance} ${mysteryData.mysteries[3].reflection}`,
      },
      {
        subtitle: "Our Father",
        text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
      },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `4.${i + 1}`,
    type: "hail-mary" as const,
    title: `Hail Mary ${i + 1}`,
    content: [
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  })),
  {
    id: "M5",
    type: "mystery",
    title: "Fifth Mystery",
    content: [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
      {
        subtitle: "Fatima Prayer",
        text: "O My Jesus, forgive us our sins, save us from the fires of Hell, and lead all souls to Heaven, especially those most need of Thy mercy. Amen.",
      },
      {
        subtitle: `The Fifth Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[4].title}`,
        text: `${mysteryData.mysteries[4].significance} ${mysteryData.mysteries[4].reflection}`,
      },
      {
        subtitle: "Our Father",
        text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
      },
    ],
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `5.${i + 1}`,
    type: "hail-mary" as const,
    title: `Hail Mary ${i + 1}`,
    content: [
      {
        subtitle: "Hail Mary",
        text: "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
      },
    ],
  })),
]

export const getDynamicM1Content = (previousStepId: string | null, mysteryData: MysteryData) => {
  if (previousStepId === "5.10") {
    return [
      {
        subtitle: "Glory Be",
        text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      },
      {
        subtitle: "Hail, Holy Queen",
        text: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope! To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn, then, O most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God. That we may be made worthy of the promises of Christ.",
      },
    ]
  }
  // Default to First Mystery content (covers initial state and coming from S5)
  return [
    {
      subtitle: "Glory Be",
      text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
    },
    {
      subtitle: `The First Mystery of the ${mysteryData.title}: ${mysteryData.mysteries[0].title}`,
      text: `${mysteryData.mysteries[0].significance} ${mysteryData.mysteries[0].reflection}`,
    },
    {
      subtitle: "Our Father",
      text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
    },
  ]
}
