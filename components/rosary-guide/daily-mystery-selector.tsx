"use client"

import { CustomButton } from "@/components/ui/custom-button"

interface DailyMysterySelectorProps {
  currentDay: string
  selectedDay: string | null
  onDayClick: (day: string) => void
}

const mysterySchedule = [
  { day: "Monday", mystery: "Joyful", mysteryType: "Mysteries" },
  { day: "Tuesday", mystery: "Sorrowful", mysteryType: "Mysteries" },
  { day: "Wednesday", mystery: "Glorious", mysteryType: "Mysteries" },
  { day: "Thursday", mystery: "Luminous", mysteryType: "Mysteries" },
  { day: "Friday", mystery: "Sorrowful", mysteryType: "Mysteries" },
  { day: "Saturday", mystery: "Joyful", mysteryType: "Mysteries" },
  { day: "Sunday", mystery: "Glorious", mysteryType: "Mysteries" },
]

export function DailyMysterySelector({ currentDay, selectedDay, onDayClick }: DailyMysterySelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-white/80 text-lg md:text-xl mb-8 md:mb-12">As a general rule:</p>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6">
        {mysterySchedule.map(({ day, mystery, mysteryType }) => {
          const isToday = day === currentDay
          const isSelected = day === (selectedDay || currentDay)

          return (
            <CustomButton
              key={day}
              onClick={() => onDayClick(day)}
              variant={isSelected ? "yellow" : "outline"}
              size="lg"
              className={`
                h-auto py-4 px-3 flex flex-col items-center justify-center text-center
                ${
                  isSelected
                    ? "bg-[#FFE552] text-black border-[#FFE552]"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }
              `}
            >
              <div className="font-sora font-bold text-base mb-1">
                {day}
                {isToday && <span className="text-sm font-normal ml-1">(Today)</span>}
              </div>
              <div className="font-inter text-sm opacity-80">{mystery}</div>
              <div className="font-inter text-sm opacity-80">{mysteryType}</div>
            </CustomButton>
          )
        })}
      </div>

      {/* Mobile Grid Layout */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {mysterySchedule.map(({ day, mystery, mysteryType }) => {
          const isToday = day === currentDay
          const isSelected = day === (selectedDay || currentDay)

          return (
            <CustomButton
              key={day}
              onClick={() => onDayClick(day)}
              variant={isSelected ? "yellow" : "outline"}
              size="lg"
              className={`
                h-auto py-4 px-3 flex flex-col items-center justify-center text-center
                ${
                  isSelected
                    ? "bg-[#FFE552] text-black border-[#FFE552]"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }
              `}
            >
              {/* Mobile: Show (Today) above the day name */}
              {isToday && <div className="font-inter text-xs opacity-80 mb-1">(Today)</div>}
              <div className="font-sora font-bold text-base mb-1">{day}</div>
              <div className="font-inter text-sm opacity-80">{mystery}</div>
              <div className="font-inter text-sm opacity-80">{mysteryType}</div>
            </CustomButton>
          )
        })}
      </div>
    </div>
  )
}
