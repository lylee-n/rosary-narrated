"use client"

import { useState, useCallback } from "react"

import useMysterySetIndex from "@/hooks/use-mystery-set-index"
import useSound from "use-sound"
import { getMysterySetKey } from "@/lib/utils/mystery-utils"

interface usePlayModalProps {
  onOpen: () => void
  onClose: () => void
}

const usePlayModal = ({ onOpen, onClose }: usePlayModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedMysterySetIndex } = useMysterySetIndex()

  const onOpenPlayModal = useCallback(() => {
    setIsOpen(true)
    onOpen()
  }, [onOpen])

  const onClosePlayModal = useCallback(() => {
    setIsOpen(false)
    onClose()
  }, [onClose])

  const [play, { stop }] = useSound("", {
    interrupt: true,
    volume: 0.5,
  })

  const playAudio = useCallback(
    (mysteryItemIndex: number, perspective: 3 | 7 | 12) => {
      const mysterySetKey = getMysterySetKey(selectedMysterySetIndex)
      play(mysterySetKey, mysteryItemIndex, perspective)
    },
    [selectedMysterySetIndex, play],
  )

  return {
    isOpen,
    onOpenPlayModal,
    onClosePlayModal,
    playAudio,
    stopAudio: stop,
  }
}

export default usePlayModal
