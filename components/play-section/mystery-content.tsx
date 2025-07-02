"use client"
import { MysteryTitle } from "@/components/ui/mystery-title"
import type { Mystery, Perspective } from "@/types"

interface MysteryContentProps {
  mystery: Mystery
  selectedPerspective: Perspective
  className?: string
}

export function MysteryContent({ mystery, selectedPerspective, className }: MysteryContentProps) {
  const perspectiveContent = mystery.perspectives.find((p) => p.type === selectedPerspective)

  if (!perspectiveContent) {
    return (
      <div className={className}>
        <MysteryTitle title={mystery.title} subtitle="Content not available for this perspective" />
      </div>
    )
  }

  return (
    <div className={className}>
      <MysteryTitle title={mystery.title} subtitle={perspectiveContent.description} className="mb-6" />

      {perspectiveContent.content && (
        <div className="space-y-4">
          {perspectiveContent.content.map((paragraph, index) => (
            <p key={index} className="text-gray-300 font-inter leading-relaxed text-sm md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {perspectiveContent.reflection && (
        <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700/50">
          <h3 className="text-[#82FAFA] font-sora font-semibold mb-2 text-sm md:text-base">Reflection</h3>
          <p className="text-gray-300 font-inter leading-relaxed text-sm md:text-base">
            {perspectiveContent.reflection}
          </p>
        </div>
      )}
    </div>
  )
}
