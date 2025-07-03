import type { RosaryElement } from "@/types"

export function generateRosaryElements(): RosaryElement[] {
  const elements: RosaryElement[] = []

  // Cross
  elements.push({
    id: "cross",
    type: "cross",
    title: "Sign of the Cross",
    content: [
      {
        subtitle: "Begin with the Sign of the Cross",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      },
    ],
  })

  // Stem beads
  elements.push({
    id: "S1",
    type: "stem",
    title: "Apostles' Creed",
    content: [
      {
        subtitle: "Apostles' Creed",
        text: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord...",
      },
    ],
  })

  elements.push({
    id: "S2",
    type: "stem",
    title: "Our Father",
    content: [
      {
        subtitle: "Our Father",
        text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven...",
      },
    ],
  })

  // Three Hail Marys
  for (let i = 3; i <= 5; i++) {
    elements.push({
      id: `S${i}`,
      type: "stem",
      title: `Hail Mary ${i - 2}`,
      content: [
        {
          subtitle: `Hail Mary ${i - 2}`,
          text: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus...",
        },
      ],
    })
  }

  // Five decades
  for (let decade = 1; decade <= 5; decade++) {
    // Mystery bead
    elements.push({
      id: `M${decade}`,
      type: "mystery",
      title: `${decade}st Mystery`,
      content: [
        {
          subtitle: `${decade}st Mystery`,
          text: `Announce the ${decade}st mystery and pray one Our Father.`,
        },
      ],
    })

    // Ten Hail Marys
    for (let hail = 1; hail <= 10; hail++) {
      elements.push({
        id: `${decade}.${hail}`,
        type: "hail-mary",
        title: `Hail Mary ${hail}`,
        content: [
          {
            subtitle: `Hail Mary ${hail}`,
            text: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus...",
          },
        ],
      })
    }
  }

  // Final prayers
  elements.push({
    id: "final1",
    type: "final",
    title: "Hail Holy Queen",
    content: [
      {
        subtitle: "Hail Holy Queen",
        text: "Hail, Holy Queen, Mother of mercy, our life, our sweetness and our hope...",
      },
    ],
  })

  elements.push({
    id: "final2",
    type: "final",
    title: "Final Sign of the Cross",
    content: [
      {
        subtitle: "Final Sign of the Cross",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      },
    ],
  })

  return elements
}
