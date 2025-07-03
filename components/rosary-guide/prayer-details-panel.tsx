"use client"

import type { RosaryElement } from "@/types"

interface PrayerDetailsPanelProps {
  currentStep: RosaryElement
}

export function PrayerDetailsPanel({ currentStep }: PrayerDetailsPanelProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">{currentStep.title}</h2>

        <div className="space-y-4">
          {currentStep.content.map((item, index) => (
            <div key={index} className="text-white/90">
              {item.subtitle && <h3 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h3>}
              <p className="leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
