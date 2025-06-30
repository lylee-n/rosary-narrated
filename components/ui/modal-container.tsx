"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Image from "next/image"

interface ModalContainerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  backgroundImage?: string
  className?: string
}

export function ModalContainer({ isOpen, onClose, children, backgroundImage, className = "" }: ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      modalRef.current?.focus()
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-1">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-black/50"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        {backgroundImage && (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Modal Background"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`rounded-2xl w-full max-w-[90vw] h-screen relative overflow-hidden border border-gray-300/20 z-10 bg-black/20 backdrop-blur-sm ${className}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}
