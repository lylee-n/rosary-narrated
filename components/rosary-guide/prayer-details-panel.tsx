import { memo } from "react"

interface PrayerDetailsPanelProps {
  title: string
  description: string
  scripture?: string
}

export const PrayerDetailsPanel = memo(function PrayerDetailsPanel({
  title,
  description,
  scripture,
}: PrayerDetailsPanelProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
      {scripture && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Scripture:</h3>
          <p className="text-gray-700 italic">{scripture}</p>
        </div>
      )}
    </div>
  )
})
