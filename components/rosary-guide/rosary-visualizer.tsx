"use client"

import { useMemo } from "react"
import type { RosaryElement } from "@/types"
import { useRosaryLayout } from "@/hooks/use-rosary-layout"
import { rosaryConnections } from "@/lib/rosary-utils"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  const { getRosaryElementPosition } = useRosaryLayout()

  // 1. Fix Hydration Error and remove duplicates by creating a stable, unique list of elements.
  const uniqueRosaryElements = useMemo(() => {
    const seen = new Set()
    return rosaryElements.filter((el) => {
      const duplicate = seen.has(el.id)
      seen.add(el.id)
      return !duplicate
    })
  }, [rosaryElements])

  // 2. Memoize bead positions for performance.
  const beadPositions = useMemo(() => {
    const positions: { [key: string]: { x: number; y: number } } = {}
    uniqueRosaryElements.forEach((el) => {
      const pos = getRosaryElementPosition(el.id)
      // Convert percentage strings to numbers for SVG coordinates
      positions[el.id] = {
        x: Number.parseFloat(pos.left),
        y: Number.parseFloat(pos.top),
      }
    })
    return positions
  }, [uniqueRosaryElements, getRosaryElementPosition])

  const getBeadRadius = (type: RosaryElement["type"]) => {
    switch (type) {
      case "cross":
        return 5 // Make cross larger
      case "mystery":
        return 3.5
      case "stem":
        return 2.5
      case "hail-mary":
        return 1.5
      default:
        return 0
    }
  }

  const renderBead = (element: RosaryElement) => {
    const pos = beadPositions[element.id]
    if (!pos || element.type === "spacer") return null

    const isActive = element.id === currentStepId
    const radius = getBeadRadius(element.type)

    const beadColor = "rgba(255, 255, 255, 0.2)"
    const beadBorder = "rgba(255, 255, 255, 0.4)"
    const activeColor = "#FFE552"

    return (
      <g
        key={element.id}
        transform={`translate(${pos.x}, ${pos.y})`}
        onClick={() => onBeadClick(element.id)}
        className="cursor-pointer group"
        aria-label={element.title}
      >
        <circle
          r={radius}
          fill={isActive ? activeColor : beadColor}
          stroke={isActive ? activeColor : beadBorder}
          strokeWidth={0.3}
          className="transition-transform duration-200 group-hover:scale-125"
          style={{ transform: isActive ? "scale(1.5)" : "scale(1)" }}
        />
        {element.type === "cross" && (
          <>
            <line
              x1="0"
              y1={-radius * 0.8}
              x2="0"
              y2={radius * 0.8}
              stroke={isActive ? "black" : "white"}
              strokeWidth="0.5"
            />
            <line
              x1={-radius * 0.5}
              y1="0"
              x2={radius * 0.5}
              y2="0"
              stroke={isActive ? "black" : "white"}
              strokeWidth="0.5"
            />
          </>
        )}
      </g>
    )
  }

  // Check for unique connections to avoid duplicate lines
  const uniqueConnections = useMemo(() => {
    const seen = new Set<string>()
    return rosaryConnections.filter((conn) => {
      const key = conn.sort().join("-")
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }, [])

  return (
    // 3. Make the component responsive.
    <div className="w-full lg:w-[45%] max-w-2xl mx-auto p-2 sm:p-4">
      <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl aspect-[1/1.2]">
        <svg viewBox="-5 -20 110 140" className="w-full h-full absolute inset-0">
          <g>
            {/* Render Connection Lines */}
            {uniqueConnections.map(([startId, endId], index) => {
              const startPos = beadPositions[startId]
              const endPos = beadPositions[endId]
              if (!startPos || !endPos) return null

              return (
                <line
                  key={`line-${index}`}
                  x1={startPos.x}
                  y1={startPos.y}
                  x2={endPos.x}
                  y2={endPos.y}
                  className="stroke-white/30"
                  strokeWidth="0.2"
                />
              )
            })}

            {/* Render Beads */}
            {uniqueRosaryElements.map(renderBead)}
          </g>
        </svg>
      </div>
    </div>
  )
}
