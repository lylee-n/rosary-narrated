interface PlaceholderSectionProps {
  title: string
}

export function PlaceholderSection({ title }: PlaceholderSectionProps) {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-sora mb-4">{title}</h1>
        <p className="text-2xl text-gray-400">Coming Soon</p>
      </div>
    </div>
  )
}
