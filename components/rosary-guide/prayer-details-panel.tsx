"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { Cross } from "lucide-react"
import type { RosaryElement } from "@/types"

interface PrayerDetailsPanelProps {
  stepData?: RosaryElement
  onNextClick: () => void
}

export const PrayerDetailsPanel = ({ stepData, onNextClick }: PrayerDetailsPanelProps) => {
  if (!stepData) {
    return <div className="lg:w-[65%]" /> // Render an empty spacer to maintain layout
  }

  return (
    <div className="lg:w-[65%] flex items-start justify-center">
      <div className="bg-white/5 border border-[#FFE552]/50 rounded-2xl p-5 backdrop-blur-sm w-full h-[650px] lg:h-[600px] flex flex-col">
        <div className="flex items-center space-x-3 mb-4 flex-shrink-0">
          <div className="w-7 h-7 bg-[#FFE552] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {stepData.type === "cross" ? (
              <Cross size={14} />
            ) : stepData.type === "hail-mary" ? (
              ""
            ) : (
              <span className="text-[10px]">{stepData.id.length > 3 ? "M1" : stepData.id}</span>
            )}
          </div>
          <h4 className="text-white font-sora text-lg font-bold">{stepData.title}</h4>
        </div>
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {stepData.content.map((item, index) => (
              <div key={index}>
                <h5 className="text-[#FFE552] font-sora text-base font-semibold mb-2">{item.subtitle}</h5>
                <p className="text-gray-300 font-inter text-sm leading-relaxed whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center flex-shrink-0">
          <CustomButton onClick={onNextClick} size="md" variant="yellow">
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
