import { Home, Play, Heart, Users, Compass } from "lucide-react"
import type { NavItem, MysterySetKey, PerspectiveType } from "@/types"

// Theme colors
export const COLORS = {
  primary: "#82FAFA",
  secondary: "#FFE552",
  accent: "#326161",
  background: {
    modal: "bg-black/20",
    card: "bg-black/30",
    overlay: "bg-black/50",
  },
  text: {
    primary: "text-[#82FAFA]",
    secondary: "text-[#FFE552]",
    accent: "text-[#326161]",
    white: "text-white",
    gray: "text-gray-300",
  },
  border: {
    primary: "border-[#82FAFA]",
    secondary: "border-[#FFE552]",
  },
  hover: {
    primary: "hover:bg-[#82FAFA]",
    secondary: "hover:bg-[#FFE552]",
    text: "hover:text-white",
  },
} as const

// Audio configuration
export const AUDIO_CONFIG = {
  defaultSpeed: 1,
  speedOptions: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  seekStep: 10, // seconds
  preloadTimeout: 5000, // ms
} as const

// Animation timings
export const ANIMATIONS = {
  beadRevealDelay: 0.4, // seconds between each bead
  lineRevealDelay: 2.5, // seconds before line appears
  modalTransition: 300, // ms
  fadeIn: "animate-in fade-in duration-300",
  fadeOut: "animate-out fade-out duration-300",
} as const

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { name: "ABOUT", label: "ABOUT", icon: Home },
  { name: "WHY", label: "WHY", icon: Compass },
  { name: "PLAY", label: "PRAY", icon: Play },
  { name: "COMMUNITY", label: "COMMUNITY", icon: Users },
  { name: "SUPPORT", label: "SUPPORT", icon: Heart },
]

// Mystery set configuration
export const MYSTERY_SETS: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]

export const MYSTERY_IMAGES = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg",
  "/images/Jesus-baptized-new.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg",
] as const

// Perspectives configuration
export const PERSPECTIVES: PerspectiveType[] = [3, 7, 12]

// Contact information
export const CONTACT = {
  email: "rosarynarrated@gmail.com",
  youtube: "https://www.youtube.com/@20RosaryDecades-Narrated",
  linkedin: "https://www.linkedin.com/company/20rosarydecades-narrated/",
} as const

// External links
export const EXTERNAL_LINKS = {
  monthlySupport: "https://stripe.com/monthly-support",
  oneTimeDonation: "https://stripe.com/one-time-donation",
  eltayDigital: "https://www.eltaydigital.com/",
} as const

// Responsive breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// Z-index layers
export const Z_INDEX = {
  modal: 100,
  overlay: 50,
  dropdown: 40,
  header: 30,
  footer: 20,
  content: 10,
} as const
