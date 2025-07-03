export interface RosaryElement {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final" | "spacer"
  title: string
  content: { subtitle: string; text: string }[]
}

export interface MysteryContent {
  title: string
  content: { subtitle: string; text: string }[]
}

export interface MysterySet {
  title: string
  mysteries: MysteryContent[]
}

export interface RosaryData {
  cross: {
    title: string
    content: { subtitle: string; text: string }[]
  }
  stem: {
    id: string
    title: string
    content: { subtitle: string; text: string }[]
  }[]
  hailMary: {
    content: { subtitle: string; text: string }[]
  }
  mysteries: MysterySet[]
  final: {
    id: string
    title: string
    content: { subtitle: string; text: string }[]
  }[]
}
