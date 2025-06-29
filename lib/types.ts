export type ViewType = "ABOUT" | "WHY" | "PLAY" | "COMMUNITY" | "SUPPORT"

export interface NavItem {
  name: ViewType
  label: string
}

export const navItems: NavItem[] = [
  { name: "ABOUT", label: "ABOUT" },
  { name: "WHY", label: "WHY" },
  { name: "PLAY", label: "PLAY" },
  { name: "COMMUNITY", label: "COMMUNITY" },
  { name: "SUPPORT", label: "SUPPORT" },
]

export type Language = "en" | "vi"
