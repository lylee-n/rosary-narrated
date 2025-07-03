import type { StaticImageData } from "next/image"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface Prayer {
  id: string
  title: string
  content: string[]
  audioSrc?: string
}

export interface RosaryElement {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final" | "spacer"
  title: string
  content: Prayer[]
}

export interface MysterySet {
  id: string
  title: string
  mysteries: Mystery[]
}

export interface Mystery {
  id: string
  title: string
  scripture: string
  image: StaticImageData
  prayers: RosaryElement[]
}

export interface RosaryMysteriesData {
  [key: string]: MysterySet
}

export interface DailyMystery {
  day: string
  mysteryKey: string
}
