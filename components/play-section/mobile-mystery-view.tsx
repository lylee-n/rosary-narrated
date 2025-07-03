"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MysteryBead } from "@/components/ui/mystery-bead"
import { MysteryContent } from "./mystery-content"
import { PerspectiveSelector } from "./perspective-selector"
import type { Mystery, Perspective } from "@/types"

interface MobileMysteryViewProps {
  mysteries: Mystery[]
  currentMysteryIndex: number
  selectedPerspective: Perspective
  onMysteryChange: (index: number) => void
  onPerspectiveChange: (perspective: Perspective) => void
  completedMysteries: Set<number>
}

export function MobileMysteryView({
  mysteries,
  currentMysteryIndex,
  selectedPerspective,
  onMysteryChange,
  onPerspectiveChange,
  completedMysteries,
}: MobileMysteryViewProps) {
  const currentMystery = mysteries[currentMysteryIndex]
  const availablePerspectives = currentMystery?.perspectives.map((p) => p.type) || []

  const goToPrevious = () => {
    if (currentMysteryIndex > 0) {
      onMysteryChange(currentMysteryIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentMysteryIndex < mysteries.length - 1) {
      onMysteryChange(currentMysteryIndex + 1)
    }
  }

  return (
    <div className="md:hidden h-full flex flex-col">
      {/* Header with Navigation */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700/50">
        {/* Mystery Beads Row */}
        <div className="flex justify-center space-x-2 mb-4 overflow-x-auto pb-2">
          {mysteries.map((_, index) => (
            <MysteryBead
              key={index}
              number={index + 1}
              isActive={currentMysteryIndex === index}
              isCompleted={completedMysteries.has(index)}
              onClick={() => onMysteryChange(index)}
              size="sm"
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrevious}
            disabled={currentMysteryIndex === 0}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous mystery"
          >
            <ChevronLeft size={24} />
          </button>

          <span className="text-white font-sora font-semibold text-sm">
            {currentMysteryIndex + 1} of {mysteries.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentMysteryIndex === mysteries.length - 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next mystery"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentMystery && (
          <>
            {/* Perspective Selector */}
            <PerspectiveSelector
              perspectives={availablePerspectives}
              selectedPerspective={selectedPerspective}
              onPerspectiveChange={onPerspectiveChange}
              className="mb-6"
              variant="compact"
            />

            {/* Mystery Content */}
            <MysteryContent mystery={currentMystery} selectedPerspective={selectedPerspective} />
          </>
        )}
      </div>
    </div>
  )
}
