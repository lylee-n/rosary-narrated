"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text } from "@nextui-org/react"
import { dataService } from "@/lib/services/data-service" // Updated import path

interface PlayModalProps {
  isOpen: boolean
  onOpenChange: () => void
  gameId: string | null
}

const PlayModalRefactored: React.FC<PlayModalProps> = ({ isOpen, onOpenChange, gameId }) => {
  const [playerName, setPlayerName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handlePlayGame = async () => {
    if (!playerName) {
      setErrorMessage("Please enter your name.")
      return
    }

    if (!gameId) {
      setErrorMessage("Game ID is missing.")
      return
    }

    setIsLoading(true)
    setErrorMessage("") // Clear any previous errors

    try {
      const result = await dataService.joinGame(gameId, playerName)

      if (result && result.success) {
        // Redirect to the game page or perform other actions upon successful join
        window.location.href = `/game/${gameId}` // Example: Redirect to game page
      } else {
        setErrorMessage(result?.message || "Failed to join the game. Please try again.")
      }
    } catch (error: any) {
      console.error("Error joining game:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setPlayerName("")
      setErrorMessage("")
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Join Game</ModalHeader>
            <ModalBody>
              {errorMessage && <Text color="danger">{errorMessage}</Text>}
              <Input
                isRequired
                type="text"
                label="Your Name"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handlePlayGame} isLoading={isLoading}>
                Play
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default PlayModalRefactored
