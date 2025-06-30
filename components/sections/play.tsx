import type React from "react"

interface DailyScheduleItem {
  day: string
  mystery: string
}

const dailySchedule: DailyScheduleItem[] = [
  { day: "Mon", mystery: "1-2" },
  { day: "Tue", mystery: "3-4" },
  { day: "Wed", mystery: "5-6" },
  { day: "Thu", mystery: "7-8" },
  { day: "Fri", mystery: "9-10" },
  { day: "Sat", mystery: "11-12" },
  { day: "Sun", mystery: "13+" },
]

const isToday = (index: number): boolean => {
  const today = new Date().getDay()
  // Adjust index to match day of the week (Monday is 0 in dailySchedule)
  const adjustedIndex = (index + 1) % 7
  return adjustedIndex === today
}

const PlaySection: React.FC = () => {
  return (
    <section id="play" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-white font-sora text-3xl md:text-4xl font-bold text-center mb-8">How to Play</h2>

        {/* Daily Schedule */}
        <div className="mb-12">
          <h3 className="text-white font-sora text-xl md:text-2xl font-bold text-center mb-6">As a general rule:</h3>
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {dailySchedule.map((day, index) => (
              <div key={index} className="text-center">
                <div
                  className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
                    isToday(index)
                      ? "bg-[#FFE552]/20 border border-[#FFE552]/50"
                      : "bg-black/20 border border-gray-700/50"
                  }`}
                >
                  <div
                    className={`font-sora text-xs md:text-sm font-bold mb-1 ${
                      isToday(index) ? "text-[#FFE552]" : "text-white"
                    }`}
                  >
                    {day.day}
                  </div>
                  <div
                    className={`font-inter text-xs md:text-sm mb-1 ${
                      isToday(index) ? "text-[#FFE552]" : "text-gray-300"
                    }`}
                  >
                    {day.mystery}
                  </div>
                  <div className={`font-inter text-xs ${isToday(index) ? "text-[#FFE552]" : "text-gray-400"}`}>
                    Mysteries
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rest of the Play Section Content (if any) */}
        {/* Add more content here as needed */}
      </div>
    </section>
  )
}

export default PlaySection
