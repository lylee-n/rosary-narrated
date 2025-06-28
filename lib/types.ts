export type ViewType = "ABOUT" | "WHY" | "PLAY" | "SUPPORT" | "CONTACT"

export interface NavItem {
  name: ViewType
  label: string
}

export const navItems: NavItem[] = [
  { name: "ABOUT", label: "ABOUT" },
  { name: "WHY", label: "WHY" },
  { name: "PLAY", label: "PRAY" },
  { name: "SUPPORT", label: "SUPPORT" },
  { name: "CONTACT", label: "CONTACT" },
]

export type Language = "en" | "vi"
