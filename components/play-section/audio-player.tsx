"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { dataService } from "@/lib/services/data-service" // Updated import
import type { PlaylistItem } from "@/lib/types"
import { useSession } from "next-auth/react"

interface AudioPlayerProps {
  playlist: PlaylistItem[]
  onEnded?: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ playlist, onEnded }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })

      audioRef.current.addEventListener("ended", () => {
        handleNextTrack()
        if (onEnded) {
          onEnded()
        }
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", () => {})
        audioRef.current.removeEventListener("timeupdate", () => {})
        audioRef.current.removeEventListener("ended", () => {})
      }
    }
  }, [onEnded])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex].url
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrackIndex, playlist, isPlaying])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNextTrack = () => {
    setCurrentTime(0)
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      setCurrentTrackIndex(0) // Loop back to the beginning
    }
  }

  const handlePreviousTrack = () => {
    setCurrentTime(0)
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      setCurrentTrackIndex(playlist.length - 1) // Loop back to the end
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = Number.parseFloat(e.target.value)
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const currentTrack = playlist[currentTrackIndex]

  const handleLike = async () => {
    if (!session?.user?.email) {
      alert("Please sign in to like this track.")
      return
    }

    try {
      const response = await dataService.likeTrack(currentTrack.id, session.user.email)
      if (response.success) {
        // Optimistically update the UI
        alert("Track liked!")
      } else {
        alert("Failed to like track.")
      }
    } catch (error) {
      console.error("Error liking track:", error)
      alert("Error liking track.")
    }
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
      <div className="track-info">
        <h3>{currentTrack.title}</h3>
        <p>{currentTrack.artist}</p>
      </div>
      <div className="controls">
        <button onClick={handlePreviousTrack}>Previous</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNextTrack}>Next</button>
        <button onClick={handleLike}>Like</button>
      </div>
      <div className="progress">
        <input type="range" ref={progressBarRef} value={currentTime} max={duration} onChange={handleSeek} />
        <div className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
