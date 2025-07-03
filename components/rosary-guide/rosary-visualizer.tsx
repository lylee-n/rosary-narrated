import type React from "react"

interface Bead {
  id: string
  type: "large" | "small" | "crucifix" | "spacer"
  x: number
  y: number
}

interface RosaryVisualizerProps {
  beads: Bead[]
}

const RosaryVisualizer: React.FC<RosaryVisualizerProps> = ({ beads }) => {
  const renderBead = (bead: Bead) => {
    if (bead.type === "large") {
      return (
        <div
          key={bead.id}
          className="w-8 h-8 rounded-full bg-blue-500"
          style={{
            position: "absolute",
            left: `${bead.x}px`,
            top: `${bead.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )
    }

    if (bead.type === "small") {
      return (
        <div
          key={bead.id}
          className="w-4 h-4 rounded-full bg-gray-400"
          style={{
            position: "absolute",
            left: `${bead.x}px`,
            top: `${bead.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )
    }

    if (bead.type === "crucifix") {
      return (
        <div
          key={bead.id}
          className="w-12 h-12 bg-red-500"
          style={{
            position: "absolute",
            left: `${bead.x}px`,
            top: `${bead.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )
    }

    if (bead.type === "spacer") {
      return (
        <div
          key={bead.id}
          className="w-2 h-2 opacity-0"
          style={{
            position: "absolute",
            left: `${bead.x}px`,
            top: `${bead.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )
    }

    return null
  }

  return <div className="relative w-full h-full">{beads.map((bead) => renderBead(bead))}</div>
}

export default RosaryVisualizer
