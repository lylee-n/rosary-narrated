"use client"

import { dailyMysteries } from "@/lib/rosary-utils"

interface DailyMysterySelectorProps {
  currentDay: string
  selectedDay: string
  onDayClick: (dayName: string) => void
}

export const DailyMysterySelector = ({ currentDay, selectedDay, onDayClick }: DailyMysterySelectorProps) => {
  return (
    <div className="max-w-5xl mx-auto text-center mb-16">
      <p className="text-lg md:text-xl text-gray-300 font-inter font-light leading-relaxed mb-16 text-center">
        As a general rule:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 md:gap-4 text-gray-300 text-sm md:text-base px-4 md:px-0">
        {dailyMysteries.map((item) => {
          const isToday = item.day === currentDay
          const isSelected = item.day === selectedDay
          return (
            <div key={item.day}>
              <button
                onClick={() => onDayClick(item.day)}
                className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200 hover:bg-white/10 cursor-pointer w-full h-full"
              >
                {/* For mobile view, show (Today) above the day */}
                {isToday && <p className="text-xs text-gray-400 font-inter font-light md:hidden">(Today)</p>}

                <p
                  className={`font-bold text-sm md:text-base ${isSelected ? "text-[#FFE552]" : isToday ? "text-white" : "text-gray-400"}`}
                >
                  {item.day}
                  {/* For desktop view, show (Today) inline */}
                  {isToday && <span className="hidden md:inline text-sm font-light text-gray-400"> (Today)</span>}
                </p>
                <p
                  className={`text-center leading-tight text-xs md:text-sm ${isSelected ? "text-[#FFE552]" : isToday ? "text-gray-300" : "text-gray-500"}`}
                >
                  {item.mystery}
                </p>
                <p
                  className={`text-center leading-tight text-xs md:text-sm ${isSelected ? "text-[#FFE552]" : isToday ? "text-gray-300" : "text-gray-500"}`}
                >
                  Mysteries
                </p>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
