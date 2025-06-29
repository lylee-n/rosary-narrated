export type ViewType = "ABOUT" | "WHY" | "PLAY" | "SUPPORT" | "COMMUNITY"

export interface NavItem {
  name: ViewType
  label: string
}

export const navItems: NavItem[] = [
  { name: "ABOUT", label: "ABOUT" },
  { name: "WHY", label: "WHY" },
  { name: "PLAY", label: "PRAY" },
  { name: "SUPPORT", label: "SUPPORT" },
  { name: "COMMUNITY", label: "COMMUNITY" },
]

export type Language = "en" | "vi"
