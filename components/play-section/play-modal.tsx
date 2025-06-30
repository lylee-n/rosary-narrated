"use client"

import { useState } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react"
import { dataService } from "@/lib/services/data-service"

interface PlayModalProps {
  isOpen: boolean
  onOpenChange: () => void
  gameId: string | undefined
}

export function PlayModal({ isOpen, onOpenChange, gameId }: PlayModalProps) {
  const [playerName, setPlayerName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinGame = async () => {
    if (!playerName) {
      setErrorMessage("Please enter your name.")
      return
    }

    if (!gameId) {
      setErrorMessage("Game ID is missing.")
      return
    }

    setIsJoining(true)
    setErrorMessage("") // Clear any previous errors

    try {
      const result = await dataService.joinGame(gameId, playerName)

      if (result && result.success) {
        // Handle successful join - maybe redirect to the game or update state
        console.log("Successfully joined game:", result)
        onOpenChange() // Close the modal
        // Optionally, redirect to the game page or update the game state
      } else {
        // Handle join failure
        setErrorMessage(result?.message || "Failed to join game. Please try again.")
        console.error("Failed to join game:", result)
      }
    } catch (error: any) {
      setErrorMessage(error?.message || "An unexpected error occurred. Please try again.")
      console.error("Error joining game:", error)
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Join Game</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Your Name"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              {errorMessage && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errorMessage}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleJoinGame} isLoading={isJoining}>
                Join
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
