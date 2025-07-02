export type Mystery = {
  title: string
  significance: string
  reflection: string
}

export type MysteryData = {
  title: string
  mysteries: Mystery[]
}

export type RosaryElement = {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final"
  title: string
  content: { subtitle: string; text: string }[]
}
