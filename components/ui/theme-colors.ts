import { COLORS } from "@/constants"

export const themeColors = {
  primary: `text-[${COLORS.primary}]`,
  primaryBg: `bg-[${COLORS.primary}]`,
  primaryBorder: `border-[${COLORS.primary}]`,
  primaryHover: `hover:bg-[${COLORS.primary}]`,

  secondary: `text-[${COLORS.secondary}]`,
  secondaryBg: `bg-[${COLORS.secondary}]`,
  secondaryBorder: `border-[${COLORS.secondary}]`,
  secondaryHover: `hover:bg-[${COLORS.secondary}]`,

  accent: `text-[${COLORS.accent}]`,
  accentBg: `bg-[${COLORS.accent}]`,

  modalBg: COLORS.background.modal,
  cardBg: COLORS.background.card,
  overlayBg: COLORS.background.overlay,
} as const
