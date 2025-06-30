"use client"

import { useApp } from "@/components/app-provider"
import { translations } from "@/lib/i18n/translations"

export function useTranslations() {
  const { language } = useApp()
  return translations[language]
}
