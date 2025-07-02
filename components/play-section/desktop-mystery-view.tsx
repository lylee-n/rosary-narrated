"use client"
import { MysteryBead } from "@/components/ui/mystery-bead"
import { MysteryContent } from "./mystery-content"
import { PerspectiveSelector } from "./perspective-selector"
import type { Mystery, Perspective } from "@/types"

interface DesktopMysteryViewProps {
  mysteries: Mystery[]
  currentMysteryIndex: number
  selectedPerspective: Perspective
  onMysteryChange: (index: number) => void
  onPerspectiveChange: (perspective: Perspective) => void
  completedMysteries: Set<number>
}

export function DesktopMysteryView({
  mysteries,
  currentMysteryIndex,
  selectedPerspective,
  onMysteryChange,
  onPerspectiveChange,
  completedMysteries,
}: DesktopMysteryViewProps) {
  const currentMystery = mysteries[currentMysteryIndex]
  const availablePerspectives = currentMystery?.perspectives.map((p) => p.type) || []

  return (
    <div className="hidden md:flex h-full">
      {/* Left Sidebar - Mystery Navigation */}
      <div className="w-1/4 p-6 border-r border-gray-700/50">
        <h3 className="text-white font-sora font-semibold mb-6 text-lg">Mysteries</h3>
        <div className="space-y-4">
          {mysteries.map((mystery, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onMysteryChange(index)}
            >
              <MysteryBead
                number={index + 1}
                isActive={currentMysteryIndex === index}
                isCompleted={completedMysteries.has(index)}
                size="sm"
              />
              <span
                className={`text-sm font-inter transition-colors ${
                  currentMysteryIndex === index ? "text-[#82FAFA]" : "text-gray-400 group-hover:text-white"
                }`}
              >
                {mystery.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {currentMystery && (
          <>
            {/* Perspective Selector */}
            <PerspectiveSelector
              perspectives={availablePerspectives}
              selectedPerspective={selectedPerspective}
              onPerspectiveChange={onPerspectiveChange}
              className="mb-8"
            />

            {/* Mystery Content */}
            <MysteryContent mystery={currentMystery} selectedPerspective={selectedPerspective} />
          </>
        )}
      </div>
    </div>
  )
}
