"use client"

import { memo } from "react"
import { useTranslations } from "@/hooks/use-translations"

interface DailyMysteryProps {
  selectedMysterySetIndex: number
  onMysterySetChange: (index: number) => void
}

const MYSTERY_SETS = ["joyful", "luminous", "sorrowful", "glorious"] as const

export const DailyMysterySelector = memo(function DailyMysterySelector({
  selectedMysterySetIndex,
  onMysterySetChange,
}: DailyMysteryProps) {
  // useTranslations returns an object whose keys map to translated strings
  const translations = useTranslations()
  const tr = (key: string) => (translations as Record<string, string>)[key] ?? key

  const getDayOfWeek = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = new Date().getDay()
    return days[today]
  }

  const getTodayMysteryIndex = () => {
    const today = new Date().getDay()
    const mysteryMap = [3, 0, 2, 3, 1, 2, 0] // Sunday=Glorious, Monday=Joyful, etc.
    return mysteryMap[today]
  }

  const todayMysteryIndex = getTodayMysteryIndex()
  const todayDay = getDayOfWeek()

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{tr("howToPrayRosary")}</h2>
        <p className="text-white/80 text-lg">{tr("generalRule")}</p>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { day: "monday", mystery: "joyful", index: 0 },
          { day: "tuesday", mystery: "sorrowful", index: 2 },
          { day: "wednesday", mystery: "glorious", index: 3 },
          { day: "thursday", mystery: "luminous", index: 1 },
          { day: "friday", mystery: "sorrowful", index: 2 },
          { day: "saturday", mystery: "joyful", index: 0 },
          { day: "sunday", mystery: "glorious", index: 3 },
        ].map(({ day, mystery, index }) => {
          const isToday = day === todayDay
          const isSelected = selectedMysterySetIndex === index

          return (
            <button
              key={day}
              onClick={() => onMysterySetChange(index)}
              className={`
                p-4 rounded-lg border transition-all duration-200 text-center
                ${
                  isSelected
                    ? "bg-[#82FAFA]/20 border-[#82FAFA] text-[#82FAFA]"
                    : isToday
                      ? "bg-white/10 border-white/30 text-white hover:bg-white/20"
                      : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <div className="font-semibold text-lg capitalize">
                {tr(day)} {isToday && "(Today)"}
              </div>
              <div className="text-sm opacity-80 capitalize">
                {tr(mystery)} {tr("mysteries")}
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile Grid Layout */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {[
          { day: "monday", mystery: "joyful", index: 0 },
          { day: "tuesday", mystery: "sorrowful", index: 2 },
          { day: "wednesday", mystery: "glorious", index: 3 },
          { day: "thursday", mystery: "luminous", index: 1 },
          { day: "friday", mystery: "sorrowful", index: 2 },
          { day: "saturday", mystery: "joyful", index: 0 },
          { day: "sunday", mystery: "glorious", index: 3 },
        ].map(({ day, mystery, index }) => {
          const isToday = day === todayDay
          const isSelected = selectedMysterySetIndex === index

          return (
            <button
              key={day}
              onClick={() => onMysterySetChange(index)}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-center
                ${
                  isSelected
                    ? "bg-[#82FAFA]/20 border-[#82FAFA] text-[#82FAFA]"
                    : isToday
                      ? "bg-white/10 border-white/30 text-white hover:bg-white/20"
                      : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {isToday && <div className="text-xs text-[#82FAFA] font-medium mb-1">(Today)</div>}
              <div className="font-semibold text-base capitalize">{tr(day)}</div>
              <div className="text-xs opacity-80 capitalize">
                {tr(mystery)} {tr("mysteries")}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
})
