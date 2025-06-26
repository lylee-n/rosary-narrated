"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Plus, Youtube, Linkedin, Mail, PlayCircle, PauseCircle, Rewind, FastForward } from "lucide-react" // Added Rewind and FastForward
import { audioData } from "@/lib/audio-data" // English audio data
import { rosaryMysteriesDataVi, cardDataVi, mysteryTitlesVi } from "@/lib/rosary-data-vi" // Vietnamese text data
import { audioDataVi } from "@/lib/audio-data-vi" // Vietnamese audio data

// English Rosary mysteries data (Original)
const rosaryMysteriesDataEn = {
  1: {
    title: "Joyful Mysteries",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg",
    mysteries: [
      {
        title: "The Annunciation",
        significance:
          "The Annunciation marks the beginning of the Incarnation, where God became human in the person of Jesus Christ.",
        reflection:
          "This mystery encourages reflection on God's love and trust in our lives, and on the importance of responding to God's call with humility and faith.",
      },
      {
        title: "The Visitation",
        significance:
          "Mary visits her cousin Elizabeth, who is pregnant with John the Baptist. Elizabeth's baby leaps in her womb upon hearing Mary's greeting.",
        reflection:
          "This mystery teaches us about service to others and the joy that comes from sharing God's blessings with those we love.",
      },
      {
        title: "The Nativity",
        significance:
          "Jesus is born in Bethlehem, fulfilling the prophecies of the Old Testament and bringing salvation to the world.",
        reflection:
          "This mystery invites us to contemplate the humility of God, who chose to be born in poverty and simplicity.",
      },
      {
        title: "The Presentation",
        significance:
          "Mary and Joseph present the infant Jesus in the Temple, where Simeon and Anna recognize Him as the Messiah.",
        reflection:
          "This mystery reminds us of the importance of dedication to God and the wisdom that comes from a life of prayer and devotion.",
      },
      {
        title: "Finding Jesus in the Temple",
        significance:
          "The twelve-year-old Jesus is found in the Temple, discussing with the teachers and amazing them with His understanding.",
        reflection:
          "This mystery teaches us about the importance of seeking God in our lives and the wisdom that comes from studying His word.",
      },
    ],
  },
  2: {
    title: "Luminous Mysteries",
    backgroundImage: "/images/Jesus-baptized.png", // Using local image
    mysteries: [
      {
        title: "The Baptism of Jesus",
        significance:
          "Jesus is baptized by John the Baptist in the Jordan River, and the Holy Spirit descends upon Him like a dove.",
        reflection: "This mystery reminds us of our own baptism and our call to live as children of God.",
      },
      {
        title: "The Wedding at Cana",
        significance: "Jesus performs His first miracle, turning water into wine at the wedding feast in Cana.",
        reflection:
          "This mystery teaches us about Jesus' care for human joy and celebration, and Mary's role as intercessor.",
      },
      {
        title: "The Proclamation of the Kingdom",
        significance: "Jesus preaches the Gospel, calling people to repentance and announcing the Kingdom of Heaven.",
        reflection:
          "This mystery invites us to examine our own response to Jesus' call to conversion and discipleship.",
      },
      {
        title: "The Transfiguration",
        significance: "Jesus is transfigured before Peter, James, and John, revealing His divine glory.",
        reflection:
          "This mystery encourages us to seek moments of prayer and contemplation where we can encounter God's glory.",
      },
      {
        title: "The Institution of the Eucharist",
        significance:
          "Jesus institutes the Eucharist at the Last Supper, giving us His Body and Blood as spiritual food.",
        reflection:
          "This mystery deepens our appreciation for the Mass and the gift of Jesus' real presence in the Eucharist.",
      },
    ],
  },
  3: {
    title: "Sorrowful Mysteries",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg",
    mysteries: [
      {
        title: "The Agony in the Garden",
        significance:
          "Jesus prays in the Garden of Gethsemane, accepting the Father's will despite His human fear and anguish.",
        reflection:
          "This mystery teaches us about surrendering to God's will, even when it involves suffering or sacrifice.",
      },
      {
        title: "The Scourging at the Pillar",
        significance: "Jesus is brutally scourged by Roman soldiers as part of His condemnation.",
        reflection: "This mystery invites us to contemplate the physical suffering Jesus endured for our salvation.",
      },
      {
        title: "The Crowning with Thorns",
        significance: "Jesus is mocked and crowned with thorns by the soldiers, who ridicule His claim to kingship.",
        reflection:
          "This mystery reminds us of the humility of Christ and calls us to reject worldly pride and ambition.",
      },
      {
        title: "The Carrying of the Cross",
        significance:
          "Jesus carries His cross to Calvary, falling three times under its weight but continuing his journey to save us.",
        reflection:
          "This mystery teaches us about perseverance in our own crosses and the importance of helping others carry theirs.",
      },
      {
        title: "The Crucifixion",
        significance: "Jesus dies on the cross, offering His life as a sacrifice for the sins of humanity.",
        reflection: "This mystery is the heart of our faith, showing us the ultimate expression of God's love for us.",
      },
    ],
  },
  4: {
    title: "Glorious Mysteries",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg",
    mysteries: [
      {
        title: "The Resurrection",
        significance:
          "Jesus rises from the dead on the third day, conquering sin and death and opening the gates of heaven.",
        reflection:
          "This mystery fills us with hope and reminds us that death is not the end, but the beginning of eternal life.",
      },
      {
        title: "The Ascension",
        significance:
          "Jesus ascends into heaven forty days after His resurrection, taking His place at the right hand of the Father.",
        reflection:
          "This mystery reminds us of our own destiny and calls us to keep our eyes fixed on heavenly things.",
      },
      {
        title: "The Descent of the Holy Spirit",
        significance: "The Holy Spirit descends upon the apostles at Pentecost, empowering them to spread the Gospel.",
        reflection: "This mystery invites us to be open to the gifts and guidance of the Holy Spirit in our own lives.",
      },
      {
        title: "The Assumption of Mary",
        significance: "Mary is taken up into heaven, body and soul, at the end of her earthly life.",
        reflection:
          "This mystery shows us the dignity of the human person and the glory that awaits those who are faithful to God.",
      },
      {
        title: "The Coronation of Mary",
        significance: "Mary is crowned as Queen of Heaven and Earth, interceding for all humanity.",
        reflection:
          "This mystery reminds us of Mary's special role in salvation history and her continued care for us as our spiritual mother.",
      },
    ],
  },
}

const cardDataEn = [
  {
    number: "1",
    shortText: "Fix your eyes on Jesus, the author and finisher of our faith.",
    fullText:
      "The Rosary is not a mindless incantation. It is a sacred meditation—a spiritual photo album that walks us through the life, love, and sacrifice of Jesus Christ. Each decade reveals a vivid mystery: His joy, His suffering, His glory. By praying the Rosary, we don't lose ourselves in words—we find His face in each mystery. Fix your eyes on Jesus, the author and finisher of our faith.",
  },
  {
    number: "2",
    shortText: "Where two or three are gathered in my name, I am there among them (Matthew 18:20)",
    fullText:
      'Jesus said "Where two or three are gathered in my name, I am there among them" (Matthew 18:20). He longs for us to pray together, for one another. Who better to pray with us than the one who walked every step of His earthly life beside Him—His own mother? Mary isn\'t distant. She is the Queen Mother of Heaven, always interceding for us with tender love. "Pray for one another, that you may be healed". "The prayer of a righteous person has great power" (James 5:16). "All these with one accord were devoting themselves to prayer, together with... Mary the mother of Jesus" (Acts 1:14).',
  },
  {
    number: "3",
    shortText: "Mary continues to intercede for us—because she loves as only a mother can.",
    fullText:
      'On the Cross, Jesus gave us everything: His body, His blood, His heart—and His mother. "Woman, behold your son... Son, behold your mother" (John 19:26–27). Mary stood at the foot of the Cross, silent in sorrow, enduring the pain of watching her Son—God Himself—scourged, mocked, and crucified. And yet, she didn\'t turn away. "Her soul pierced by sorrow" (Luke 2:35), she became our mother too. "His face was like the sun shining in full strength" (Revelation 1:16). "God did not spare His own Son, but gave Him up for us all" (Romans 8:32). Mary continues to intercede for us—because she loves as only a mother can.',
  },
]

const mysteryTitlesEn = ["Joyful", "Luminous", "Sorrowful", "Glorious"]

const mysteryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg", // Joyful
  "/images/Jesus-baptized.png", // Luminous
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg", // Sorrowful
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg", // Glorious
]

const mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "vi">("en")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const [nowPlaying, setNowPlaying] = useState<{ src: string; mysteryIndex: number; perspective: number } | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)

  const headerImageAspectRatio = (500 / 1920) * 100

  const currentRosaryData = language === "en" ? rosaryMysteriesDataEn : rosaryMysteriesDataVi
  const currentCardData = language === "en" ? cardDataEn : cardDataVi
  const currentMysteryTitles = language === "en" ? mysteryTitlesEn : mysteryTitlesVi
  const currentAudioData = language === "en" ? audioData : audioDataVi

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const openModal = (mysterySetIdx: number) => {
    setSelectedMysterySetIndex(mysterySetIdx)
    setIsModalOpen(true)
    setExpandedMysteryItem(null)
    setNowPlaying(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMysterySetIndex(null)
    setExpandedMysteryItem(null)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.src = ""
    }
    setNowPlaying(null)
    setCurrentTime(0)
    setDuration(0)
  }

  const toggleMysteryItem = (index: number) => {
    const isOpeningNewItem = expandedMysteryItem !== index
    setExpandedMysteryItem((prev) => (prev === index ? null : index))

    if (nowPlaying && nowPlaying.mysteryIndex !== index && isOpeningNewItem && audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      setNowPlaying(null)
      setCurrentTime(0)
      setDuration(0)
    } else if (
      expandedMysteryItem === index &&
      nowPlaying &&
      nowPlaying.mysteryIndex === index &&
      audioPlayerRef.current
    ) {
      audioPlayerRef.current.pause()
      setNowPlaying(null)
      setCurrentTime(0)
      setDuration(0)
    }
  }

  const playAudio = useCallback(
    (mysterySetKey: string, mysteryItemIndex: number, perspective: 3 | 7 | 12) => {
      const audioSrc = currentAudioData[mysterySetKey]?.[mysteryItemIndex]?.[perspective]

      if (!audioSrc) {
        console.warn(`Audio not found for ${mysterySetKey}, item ${mysteryItemIndex}, perspective ${perspective}`)
        return
      }

      if (!audioPlayerRef.current) {
        console.error("Audio player ref not available")
        return
      }

      if (
        nowPlaying &&
        nowPlaying.mysteryIndex === mysteryItemIndex &&
        nowPlaying.perspective === perspective &&
        !audioPlayerRef.current.paused
      ) {
        audioPlayerRef.current.pause()
        return
      }

      if (
        nowPlaying &&
        nowPlaying.mysteryIndex === mysteryItemIndex &&
        nowPlaying.perspective === perspective &&
        audioPlayerRef.current.paused &&
        audioPlayerRef.current.src === audioSrc
      ) {
        audioPlayerRef.current.play().catch((error) => console.error("Error resuming audio:", error))
        return
      }

      audioPlayerRef.current.src = audioSrc
      audioPlayerRef.current.playbackRate = playbackSpeed
      audioPlayerRef.current.load()

      audioPlayerRef.current
        .play()
        .then(() => {
          setNowPlaying({ src: audioSrc, mysteryIndex: mysteryItemIndex, perspective })
        })
        .catch((error) => {
          console.error("Play error:", error)
        })
    },
    [currentAudioData, nowPlaying, playbackSpeed],
  )

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = speed
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioPlayerRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    audioPlayerRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleRewind = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.max(0, audioPlayerRef.current.currentTime - seconds)
    }
  }

  const handleFastForward = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.min(
        audioPlayerRef.current.duration,
        audioPlayerRef.current.currentTime + seconds,
      )
    }
  }

  useEffect(() => {
    const audio = audioPlayerRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setNowPlaying(null)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause()
        audioPlayerRef.current.src = ""
      }
    }
  }, [])

  const currentMysterySetDetails =
    selectedMysterySetIndex !== null
      ? currentRosaryData[(selectedMysterySetIndex + 1) as keyof typeof currentRosaryData]
      : null

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <audio ref={audioPlayerRef} preload="none">
        Your browser does not support the audio tag.
      </audio>

      <div className="fixed inset-0 z-0">
        <Image src="/images/background.gif" alt="Background" fill className="object-cover" priority />
      </div>

      <div className="relative z-10">
        <header className="relative w-full overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: `${headerImageAspectRatio}%` }}>
            <Image
              src="/images/rosary-decades-header.png"
              alt="Rosary Decades Header"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        <div className="container mx-auto px-4 py-4 text-center sticky top-0 z-50 backdrop-blur-sm bg-transparent">
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded-md mr-2 text-sm md:text-base transition-colors duration-200 ${language === "en" ? "bg-[#FFE552] text-gray-900 font-semibold shadow-lg" : "bg-gray-700/70 text-white hover:bg-gray-600/70"}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("vi")}
            className={`px-4 py-2 rounded-md text-sm md:text-base transition-colors duration-200 ${language === "vi" ? "bg-[#FFE552] text-gray-900 font-semibold shadow-lg" : "bg-gray-700/70 text-white hover:bg-gray-600/70"}`}
          >
            Tiếng Việt
          </button>
        </div>

        <main className="container mx-auto px-4 py-8">
          <section className="text-center my-16 md:my-32">
            <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8 md:mb-16">
              {language === "en" ? "Welcome to Rosary Narrated" : "Chào Mừng Đến Với Kinh Mân Côi Tường Thuật"}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
              {language === "en"
                ? "Explore the profound mysteries of the Rosary and deepen your spiritual journey. This platform is designed to guide you through each decade with rich reflections and insights."
                : "Khám phá những mầu nhiệm sâu sắc của Kinh Mân Côi và đào sâu hành trình tâm linh của bạn. Nền tảng này được thiết kế để hướng dẫn bạn qua mỗi chục kinh với những suy niệm và hiểu biết phong phú."}
            </p>
          </section>

          <div className="flex justify-center my-20 md:my-40">
            <button
              onClick={() => scrollToSection("why-pray-section")}
              className="text-[#326161] hover:text-[#82FAFA] transition-all duration-300 hover:scale-110"
            >
              <ChevronDown size={40} strokeWidth={2} />
            </button>
          </div>

          <section id="why-pray-section" className="my-20 md:my-40">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-20 md:mb-40">
              {language === "en" ? "Why Pray the Rosary?" : "Tại Sao Nên Lần Hạt Mân Côi?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {currentCardData.map((card, index) => (
                <div
                  key={index}
                  className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className={`w-10 h-10 bg-transparent border-2 border-[#82FAFA] text-[#82FAFA] rounded-full flex items-center justify-center font-bold text-sm mb-6 transition-all duration-300 ${
                      expandedCard === index ? "shadow-[0_0_20px_rgba(130,250,250,0.8)] scale-110" : ""
                    }`}
                  >
                    {card.number}
                  </div>
                  <p className="text-gray-300 font-inter leading-relaxed mb-4 md:mb-6">
                    {expandedCard === index ? card.fullText : card.shortText}
                  </p>
                  <div className="mt-auto md:pt-4">
                    <Plus
                      className={`w-5 h-5 text-[#326161] hover:text-[#82FAFA] transition-all duration-300 hover:scale-110 ${
                        expandedCard === index ? "rotate-45 text-[#82FAFA]" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center my-20 md:my-40">
            <button
              onClick={() => scrollToSection("mysteries-section")}
              className="text-[#326161] hover:text-[#82FAFA] transition-all duration-300 hover:scale-110"
            >
              <ChevronDown size={40} strokeWidth={2} />
            </button>
          </div>

          <section id="mysteries-section" className="my-20 md:my-40">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-8 md:mb-16">
              {language === "en" ? "The Mysteries of the Rosary" : "Các Mầu Nhiệm Kinh Mân Côi"}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed text-center mb-20 md:mb-40">
              {language === "en"
                ? "Learn more about our Savior and Mother Mary through the Rosary Mysteries. Click on a Mysteries set for an audiovisual storytelling experience."
                : "Tìm hiểu thêm về Đấng Cứu Độ và Mẹ Maria qua các Mầu Nhiệm Kinh Mân Côi. Nhấp vào một bộ Mầu Nhiệm để có trải nghiệm kể chuyện nghe nhìn."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mysteryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${currentMysteryTitles[index]} Mysteries`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-6">
                    <h3 className="text-3xl font-black text-[#FFE552] uppercase tracking-[0.2em] text-center transition-colors duration-300">
                      {currentMysteryTitles[index]}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="text-gray-500 text-center py-8 mt-12 font-inter">
          <div className="flex justify-center items-center gap-6 mb-8">
            <a
              href="https://www.youtube.com/@20RosaryDecades-Narrated"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
            >
              <Youtube size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a
              href="https://www.linkedin.com/company/20rosarydecades-narrated/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
            >
              <Linkedin size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a
              href="mailto:rosarynarrated@gmail.com"
              className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
            >
              <Mail size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
          </div>
          <p className="mb-6 text-gray-500 text-sm md:text-base">
            &copy; {new Date().getFullYear()}{" "}
            {language === "en"
              ? "Rosary Narrated. All rights reserved."
              : "Kinh Mân Côi Tường Thuật. Bảo lưu mọi quyền."}
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            {language === "en" ? "Powered by" : "Được tạo bởi"}{" "}
            <a
              href="https://www.eltaydigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFE552] hover:text-yellow-300 transition-colors duration-300"
            >
              Eltay Digital
            </a>
          </p>
        </footer>
      </div>

      {isModalOpen && currentMysterySetDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 z-0">
            <Image src="/images/modal-background.gif" alt="Modal Background" fill className="object-cover" priority />
          </div>
          <div className="rounded-2xl w-full max-w-7xl h-[90vh] relative overflow-hidden border border-gray-300/20 z-10">
            <div className="bg-black/90 backdrop-blur-sm p-8 text-center relative z-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white font-sora tracking-wider">
                {currentMysterySetDetails.title}
              </h2>
              <button
                onClick={closeModal}
                className="absolute top-6 right-8 text-white text-4xl transition-colors duration-300 z-20 cursor-pointer bg-black/20 rounded-full w-12 h-12 flex items-center justify-center hover:text-[#FFE552]"
                type="button"
              >
                ×
              </button>
            </div>
            <div className="relative flex-1 h-full">
              <Image
                src={currentMysterySetDetails.backgroundImage || "/placeholder.svg"}
                alt="Mystery Background"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

              <div className="absolute inset-0 flex flex-col pt-[10vh] p-8 z-10">
                <div className="hidden md:block relative">
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30 ${
                      expandedMysteryItem === null ? "animate-[lineRevealLeftToRight_1.5s_ease-out] opacity-0" : ""
                    }`}
                    style={{
                      top: "112px",
                      zIndex: 1,
                      opacity: expandedMysteryItem !== null ? 0.3 : undefined,
                      animationDelay: expandedMysteryItem === null ? "2.5s" : undefined,
                      animationFillMode: expandedMysteryItem === null ? "forwards" : undefined,
                    }}
                  ></div>
                  <div className="flex justify-between items-start gap-4 max-w-6xl mx-auto mt-6 relative z-10">
                    {currentMysterySetDetails.mysteries.map((mystery, index) => (
                      <div
                        key={index}
                        className="flex-1 relative animate-[beadReveal_0.8s_ease-out] opacity-0"
                        style={{
                          animationDelay: `${index * 0.4}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <div
                          className={`w-12 h-12 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-lg cursor-pointer transition-all duration-300 mx-auto mb-8 ${
                            expandedMysteryItem === index
                              ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                              : expandedMysteryItem !== null
                                ? "hover:scale-110 opacity-30"
                                : "hover:scale-110"
                          }`}
                          onClick={() => toggleMysteryItem(index)}
                          style={{ marginTop: "66px" }}
                        >
                          {index + 1}
                        </div>
                        <div className="text-center">
                          <h3
                            className={`text-[#FFE552] text-xl font-semibold mb-4 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter ${
                              expandedMysteryItem !== null && expandedMysteryItem !== index ? "opacity-30" : ""
                            }`}
                            onClick={() => toggleMysteryItem(index)}
                          >
                            {mystery.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  {expandedMysteryItem !== null && (
                    <div className="mt-8 max-w-6xl mx-auto animate-in fade-in duration-300">
                      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8">
                        <div className="grid grid-cols-3 gap-8">
                          <div className="col-span-2 space-y-6">
                            <div>
                              <strong className="text-[#82FAFA] block mb-3 font-inter text-lg">
                                {language === "en" ? "Significance:" : "Ý Nghĩa:"}
                              </strong>
                              <p className="font-inter text-white leading-relaxed">
                                {currentMysterySetDetails.mysteries[expandedMysteryItem].significance}
                              </p>
                            </div>
                            <div>
                              <strong className="text-[#82FAFA] block mb-3 font-inter text-lg">
                                {language === "en" ? "Reflection:" : "Suy Niệm:"}
                              </strong>
                              <p className="font-inter text-white leading-relaxed">
                                {currentMysterySetDetails.mysteries[expandedMysteryItem].reflection}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1 space-y-4">
                            <h4 className="text-[#82FAFA] font-inter text-lg font-semibold mb-4">
                              {language === "en" ? "Choose Perspectives:" : "Chọn Góc Nhìn:"}
                            </h4>
                            {[3, 7, 12].map((p) => (
                              <button
                                key={p}
                                onClick={() => {
                                  if (selectedMysterySetIndex === null || expandedMysteryItem === null) return
                                  const setKey = mysterySetKeys[selectedMysterySetIndex]
                                  playAudio(setKey, expandedMysteryItem, p as 3 | 7 | 12)
                                }}
                                className={`w-full py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center font-inter border-2 ${
                                  nowPlaying &&
                                  nowPlaying.mysteryIndex === expandedMysteryItem &&
                                  nowPlaying.perspective === p
                                    ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                    : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                                }`}
                              >
                                {nowPlaying &&
                                nowPlaying.mysteryIndex === expandedMysteryItem &&
                                nowPlaying.perspective === p &&
                                audioPlayerRef.current &&
                                !audioPlayerRef.current.paused ? (
                                  <PauseCircle size={20} className="mr-2" />
                                ) : (
                                  <PlayCircle size={20} className="mr-2" />
                                )}
                                {p} {language === "en" ? "Perspectives" : "Góc Nhìn"}
                              </button>
                            ))}
                            {nowPlaying && nowPlaying.mysteryIndex === expandedMysteryItem && (
                              <div className="mt-6 space-y-4 p-4 bg-black/30 rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm text-[#82FAFA]">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                  </div>
                                  <div
                                    className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                                    onClick={handleProgressClick}
                                  >
                                    <div
                                      className="h-full bg-[#82FAFA] rounded-full transition-all duration-100"
                                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm text-[#82FAFA] font-inter">
                                    {language === "en" ? "Speed:" : "Tốc độ:"} {playbackSpeed}x
                                  </label>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.25"
                                    value={playbackSpeed}
                                    onChange={(e) => handleSpeedChange(Number.parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                  />
                                  <div className="flex justify-between text-xs text-gray-400">
                                    <span>0.5x</span>
                                    <span>1x</span>
                                    <span>1.5x</span>
                                    <span>2x</span>
                                  </div>
                                </div>
                                <div className="flex justify-center gap-4">
                                  <button
                                    onClick={() => handleRewind(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Rewind 10 seconds"
                                  >
                                    <Rewind size={24} />
                                  </button>
                                  {/* New global play/pause button */}
                                  <button
                                    onClick={() => {
                                      if (audioPlayerRef.current) {
                                        if (audioPlayerRef.current.paused) {
                                          audioPlayerRef.current
                                            .play()
                                            .catch((error) => console.error("Error resuming audio:", error))
                                        } else {
                                          audioPlayerRef.current.pause()
                                        }
                                      }
                                    }}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label={audioPlayerRef.current?.paused ? "Play" : "Pause"}
                                    disabled={!nowPlaying} // Disable if no track is loaded
                                  >
                                    {audioPlayerRef.current && !audioPlayerRef.current.paused ? (
                                      <PauseCircle size={24} />
                                    ) : (
                                      <PlayCircle size={24} />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleFastForward(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Fast forward 10 seconds"
                                  >
                                    <FastForward size={24} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:hidden space-y-6 overflow-y-auto max-h-[calc(90vh-10vh-80px)] pb-32 pt-16 overscroll-contain">
                  {currentMysterySetDetails.mysteries.map((mystery, index) => (
                    <div
                      key={index}
                      className="relative animate-[beadReveal_0.8s_ease-out] opacity-0"
                      style={{
                        animationDelay: `${index * 0.4}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div
                        className={`w-10 h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-base cursor-pointer transition-all duration-300 mx-auto mb-4 ${
                          expandedMysteryItem === index
                            ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                            : "hover:scale-105"
                        }`}
                        onClick={() => toggleMysteryItem(index)}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                          expandedMysteryItem === index ? "backdrop-blur-md bg-white/10" : "bg-transparent"
                        }`}
                      >
                        <h3
                          className={`text-xl font-semibold mb-4 cursor-pointer transition-colors duration-300 font-inter ${
                            expandedMysteryItem === index
                              ? "text-white hover:text-gray-300"
                              : "text-[#FFE552] hover:text-yellow-300"
                          }`}
                          onClick={() => toggleMysteryItem(index)}
                        >
                          {mystery.title}
                        </h3>
                        {expandedMysteryItem === index && (
                          <div className="text-white text-sm leading-relaxed space-y-4 animate-in fade-in duration-300 text-left">
                            <div>
                              <strong className="text-[#82FAFA] block mb-2 font-inter">
                                {language === "en" ? "Significance:" : "Ý Nghĩa:"}
                              </strong>
                              <p className="font-inter">{mystery.significance}</p>
                            </div>
                            <div>
                              <strong className="text-[#82FAFA] block mb-2 font-inter">
                                {language === "en" ? "Reflection:" : "Suy Niệm:"}
                              </strong>
                              <p className="font-inter">{mystery.reflection}</p>
                            </div>
                            <div className="mt-6">
                              <h4 className="text-[#82FAFA] font-inter text-sm font-semibold mb-3">
                                {language === "en" ? "Choose Perspectives:" : "Chọn Góc Nhìn:"}
                              </h4>
                              <div className="space-y-2 flex flex-col items-center">
                                {[3, 7, 12].map((p) => (
                                  <button
                                    key={p}
                                    onClick={() => {
                                      if (selectedMysterySetIndex === null) return
                                      const setKey = mysterySetKeys[selectedMysterySetIndex]
                                      playAudio(setKey, index, p as 3 | 7 | 12)
                                    }}
                                    className={`w-full text-sm py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center border-2 ${
                                      nowPlaying && nowPlaying.mysteryIndex === index && nowPlaying.perspective === p
                                        ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                        : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                                    }`}
                                  >
                                    {nowPlaying &&
                                    nowPlaying.mysteryIndex === index &&
                                    nowPlaying.perspective === p &&
                                    audioPlayerRef.current &&
                                    !audioPlayerRef.current.paused ? (
                                      <PauseCircle size={16} className="mr-2" />
                                    ) : (
                                      <PlayCircle size={16} className="mr-2" />
                                    )}
                                    {p} {language === "en" ? "Perspectives" : "Góc Nhìn"}
                                  </button>
                                ))}
                              </div>
                            </div>
                            {nowPlaying && nowPlaying.mysteryIndex === index && (
                              <div className="mt-4 space-y-3 p-3 bg-black/30 rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-[#82FAFA]">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                  </div>
                                  <div
                                    className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                                    onClick={handleProgressClick}
                                  >
                                    <div
                                      className="h-full bg-[#82FAFA] rounded-full transition-all duration-100"
                                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs text-[#82FAFA] font-inter">
                                    {language === "en" ? "Speed:" : "Tốc độ:"} {playbackSpeed}x
                                  </label>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.25"
                                    value={playbackSpeed}
                                    onChange={(e) => handleSpeedChange(Number.parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                  />
                                </div>
                                <div className="flex justify-center gap-4">
                                  <button
                                    onClick={() => handleRewind(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Rewind 10 seconds"
                                  >
                                    <Rewind size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleFastForward(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Fast forward 10 seconds"
                                  >
                                    <FastForward size={20} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="mb-24" />
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes beadReveal {
              0% {
                opacity: 0;
                transform: translateY(20px) scale(0.8);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            .slider::-webkit-slider-thumb {
              appearance: none;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              background: #82FAFA;
              cursor: pointer;
            }

            .slider::-moz-range-thumb {
              height: 16px;
              width: 16px;
              border-radius: 50%;
              background: #82FAFA;
              cursor: pointer;
              border: none;
            }

            @keyframes lineRevealLeftToRight {
              0% {
                opacity: 0;
                clip-path: inset(0 100% 0 0);
              }
              100% {
                opacity: 1;
                clip-path: inset(0 0 0 0);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
