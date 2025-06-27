"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, RotateCcw, Clock, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { rosaryData } from "@/lib/rosary-data-en"
import { audioData } from "@/lib/audio-data"
import type { RosaryMystery, AudioTrack } from "@/lib/types"

// --- make sure we can always iterate safely -------------------------------
const rosaryArray = Array.isArray(rosaryData)
  ? rosaryData
  : Object.entries(rosaryData).map(([key, value]: any) => ({
      id: Number(key),
      title: value.title,
      type: value.title,
      significance: value.mysteries?.[0]?.significance ?? "",
      scriptural: value.mysteries?.[0]?.significance ?? "",
      mystical: value.mysteries?.[0]?.significance ?? "",
      personal: value.mysteries?.[0]?.reflection ?? "",
    }))

interface PlaySectionProps {
  selectedMystery?: RosaryMystery
}

export function PlaySection({ selectedMystery }: PlaySectionProps) {
  const [currentMystery, setCurrentMystery] = useState<RosaryMystery | null>(selectedMystery || null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [showTimeline, setShowTimeline] = useState(false)
  const [selectedPerspective, setSelectedPerspective] = useState<string>("traditional")
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTracks = currentMystery ? audioData[currentMystery.id] || [] : []
  const currentTrack = currentTracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (currentTrackIndex < currentTracks.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1)
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
        setCurrentTrackIndex(0)
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrackIndex, currentTracks.length])

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url
      audioRef.current.load()
    }
  }, [currentTrack])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const resetAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setCurrentTrackIndex(0)
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMysterySelect = (mystery: RosaryMystery) => {
    setCurrentMystery(mystery)
    setCurrentTrackIndex(0)
    setCurrentTime(0)
    setIsPlaying(false)
    setShowTimeline(false)
  }

  const handleTimelineClick = (track: AudioTrack, index: number) => {
    setCurrentTrackIndex(index)
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const getPerspectiveContent = (mystery: RosaryMystery, perspective: string) => {
    switch (perspective) {
      case "traditional":
        return mystery.significance
      case "scriptural":
        return mystery.scriptural || mystery.significance
      case "mystical":
        return mystery.mystical || mystery.significance
      case "personal":
        return mystery.personal || mystery.significance
      default:
        return mystery.significance
    }
  }

  if (!currentMystery) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8">
            Choose a Mystery
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-12">
            Select one of the mysteries below to begin your prayer journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {rosaryArray.map((mystery) => (
              <Card
                key={mystery.id}
                className="bg-black/30 backdrop-blur-sm border border-gray-700/50 hover:border-[#FFE552]/50 transition-all duration-300 cursor-pointer group"
                onClick={() => handleMysterySelect(mystery)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFE552] to-[#82FAFA] flex items-center justify-center">
                    <span className="text-black font-bold text-lg">{mystery.id}</span>
                  </div>
                  <h3 className="text-white font-sora text-lg font-semibold mb-2 group-hover:text-[#FFE552] transition-colors">
                    {mystery.title}
                  </h3>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-300">
                    {mystery.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white font-sora text-3xl md:text-5xl font-semibold mb-4">{currentMystery.title}</h1>
          <Badge variant="secondary" className="bg-[#FFE552]/20 text-[#FFE552] mb-6">
            {currentMystery.type}
          </Badge>
        </div>

        {/* Audio Player */}
        <Card className="bg-black/30 backdrop-blur-sm border border-gray-700/50 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">{currentTrack?.title || "Select a track"}</h3>
                <p className="text-gray-400 text-sm">
                  Track {currentTrackIndex + 1} of {currentTracks.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={resetAudio} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <RotateCcw size={16} />
                </Button>
                <Button
                  onClick={() => setShowTimeline(!showTimeline)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Clock size={16} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Button
                onClick={togglePlayPause}
                disabled={!currentTrack}
                className="bg-[#FFE552] hover:bg-[#FFE552]/80 text-black"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#FFE552] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <audio ref={audioRef} />
          </CardContent>
        </Card>

        {/* Mystery Content */}
        <Card className="bg-black/30 backdrop-blur-sm border border-gray-700/50 mb-8">
          <CardContent className="p-8">
            <div className="mb-6">
              <h3 className="text-white font-sora text-xl font-semibold mb-4">Choose Perspectives</h3>
              <div className="flex flex-wrap gap-2">
                {["traditional", "scriptural", "mystical", "personal"].map((perspective) => (
                  <Button
                    key={perspective}
                    onClick={() => setSelectedPerspective(perspective)}
                    variant={selectedPerspective === perspective ? "default" : "ghost"}
                    size="sm"
                    className={
                      selectedPerspective === perspective
                        ? "bg-[#FFE552] text-black hover:bg-[#FFE552]/80"
                        : "text-gray-400 hover:text-white"
                    }
                  >
                    {perspective.charAt(0).toUpperCase() + perspective.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-700 mb-6" />

            <div>
              <h4 className="text-white font-sora text-lg font-semibold mb-3">Significance</h4>
              <p className="text-gray-300 font-inter leading-relaxed">
                {getPerspectiveContent(currentMystery, selectedPerspective)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Modal */}
        {showTimeline && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 backdrop-blur-md border border-gray-700/50 rounded-lg w-full max-w-[90vw] h-[105vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="text-center flex-1">
                  <h2 className="text-white font-sora text-2xl font-semibold mb-2">{currentMystery.title}</h2>
                  <Badge variant="secondary" className="bg-[#FFE552]/20 text-[#FFE552]">
                    {currentMystery.type}
                  </Badge>
                </div>
                <Button
                  onClick={() => setShowTimeline(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white ml-4"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden" style={{ height: `calc(105vh - 60px)` }}>
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <h3 className="text-white font-sora text-xl font-semibold mb-6">Prayer Timeline</h3>
                    <div className="space-y-4">
                      {currentTracks.map((track, index) => (
                        <div
                          key={index}
                          onClick={() => handleTimelineClick(track, index)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                            index === currentTrackIndex
                              ? "bg-[#FFE552]/10 border-[#FFE552] text-white"
                              : "bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{track.title}</h4>
                              <p className="text-sm opacity-80">{track.description}</p>
                            </div>
                            <div className="text-sm opacity-60 ml-4">{formatTime(track.duration)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}

        {/* Back to Selection */}
        <div className="text-center">
          <Button onClick={() => setCurrentMystery(null)} variant="ghost" className="text-gray-400 hover:text-white">
            <ChevronDown className="rotate-90 mr-2" size={16} />
            Choose Different Mystery
          </Button>
        </div>
      </div>
    </div>
  )
}
