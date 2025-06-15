"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown, Plus, Youtube, Linkedin } from "lucide-react"

// Rosary mysteries data
const rosaryMysteries = {
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
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jesus%20baptized.png-sZEYyB7s82b78YVh6vDJmGLyHb8Nqu.jpeg",
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

const cardData = [
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
      "Jesus said, Where two or three are gathered in my name, I am there among them (Matthew 18:20). He longs for us to pray together, for one another. Who better to pray with us than the one who walked every step of His earthly life beside Him—His own mother? Mary isn't distant. She is the Queen Mother of Heaven, always interceding for us with tender love. Pray for one another, that you may be healed. The prayer of a righteous person has great power (James 5:16). All these with one accord were devoting themselves to prayer, together with... Mary the mother of Jesus (Acts 1:14).",
  },
  {
    number: "3",
    shortText: "Mary continues to intercede for us—because she loves as only a mother can.",
    fullText:
      "On the Cross, Jesus gave us everything: His body, His blood, His heart—and His mother. Woman, behold your son... Son, behold your mother (John 19:26–27). Mary stood at the foot of the Cross, silent in sorrow, enduring the pain of watching her Son—God Himself—scourged, mocked, and crucified. And yet, she didn't turn away. Her soul pierced by sorrow (Luke 2:35), she became our mother too. His face was like the sun shining in full strength (Revelation 1:16). God did not spare His own Son, but gave Him up for us all (Romans 8:32). Mary continues to intercede for us—because she loves as only a mother can.",
  },
]

const mysteryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jesus%20baptized.png-sZEYyB7s82b78YVh6vDJmGLyHb8Nqu.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg",
]

const mysteryTitles = ["Joyful", "Luminous", "Sorrowful", "Glorious"]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function LandingPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMystery, setSelectedMystery] = useState<number | null>(null)
  const [expandedMysteryItems, setExpandedMysteryItems] = useState<number[]>([])

  const headerImageAspectRatio = (500 / 1920) * 100

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const openModal = (mysteryIndex: number) => {
    setSelectedMystery(mysteryIndex)
    setIsModalOpen(true)
    setExpandedMysteryItems([])
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMystery(null)
    setExpandedMysteryItems([])
  }

  const toggleMysteryItem = (index: number) => {
    setExpandedMysteryItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Background GIF */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.gif" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Header Section */}
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center my-32">
            <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-16">
              Welcome to Rosary Decades
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
              Explore the profound mysteries of the Rosary and deepen your spiritual journey. This platform is designed
              to guide you through each decade with rich reflections and insights.
            </p>
          </section>

          {/* Scroll Arrow */}
          <div className="flex justify-center my-40">
            <button
              onClick={() => scrollToSection("why-pray-section")}
              className="text-[#326161] hover:text-[#82FAFA] transition-all duration-300 hover:scale-110"
            >
              <ChevronDown size={40} strokeWidth={2} />
            </button>
          </div>

          {/* Why Pray Section */}
          <section id="why-pray-section" className="my-40">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-40">
              Why Pray the Rosary?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {cardData.map((card, index) => (
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
                  <p className="text-gray-300 font-inter leading-relaxed mb-4">
                    {expandedCard === index ? card.fullText : card.shortText}
                  </p>
                  <div className="mt-auto">
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

          {/* Scroll Arrow */}
          <div className="flex justify-center my-40">
            <button
              onClick={() => scrollToSection("mysteries-section")}
              className="text-[#326161] hover:text-[#82FAFA] transition-all duration-300 hover:scale-110"
            >
              <ChevronDown size={40} strokeWidth={2} />
            </button>
          </div>

          {/* Mysteries Section */}
          <section id="mysteries-section" className="my-40">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-16">
              The Mysteries of the Rosary
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed text-center mb-40">
              Click on the cards for an interactive immersive experience of our Savior's mysteries
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mysteryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => openModal(index + 1)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${mysteryTitles[index]} Mysteries`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-6">
                    <h3 className="text-3xl font-black text-[#FFE552] uppercase tracking-[0.2em] text-center transition-colors duration-300">
                      {mysteryTitles[index]}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
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
          </div>
          <p className="mb-6 text-gray-500 text-sm md:text-base">
            &copy; {new Date().getFullYear()} Rosary Narrated. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            Powered by{" "}
            <a
              href="https://www.eltaydigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFE552] hover:text-[#FFE552] transition-colors duration-300"
            >
              Eltay Digital
            </a>
          </p>
        </footer>
      </div>

      {/* Timeline Modal */}
      {isModalOpen && selectedMystery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background GIF */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/modal-background.gif" alt="Modal Background" fill className="object-cover" priority />
          </div>

          {/* Modal Content */}
          <div className="rounded-2xl w-full max-w-7xl h-[90vh] relative overflow-hidden border border-gray-300/20 z-10">
            {/* Header */}
            <div className="bg-black/90 backdrop-blur-sm p-8 text-center relative z-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white font-sora tracking-wider">
                {rosaryMysteries[selectedMystery as keyof typeof rosaryMysteries].title}
              </h2>
              <button
                onClick={closeModal}
                className="absolute top-6 right-8 text-white text-4xl transition-colors duration-300 z-20 cursor-pointer bg-black/20 rounded-full w-12 h-12 flex items-center justify-center hover:text-[#FFE552]"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Background Image */}
            <div className="relative flex-1 h-full">
              <Image
                src={
                  rosaryMysteries[selectedMystery as keyof typeof rosaryMysteries].backgroundImage || "/placeholder.svg"
                }
                alt="Mystery Background"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

              {/* Timeline Content */}
              <div className="absolute inset-0 flex flex-col pt-[10vh] p-8 z-10">
                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30 animate-[lineRevealLeftToRight_1.5s_ease-out] opacity-0"
                    style={{
                      top: "112px",
                      animationDelay: "2.5s",
                      animationFillMode: "forwards",
                    }}
                  ></div>

                  <div className="flex justify-between items-start gap-4 max-w-6xl mx-auto mt-6">
                    {rosaryMysteries[selectedMystery as keyof typeof rosaryMysteries].mysteries.map(
                      (mystery, index) => (
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
                              expandedMysteryItems.includes(index)
                                ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                                : "hover:scale-110"
                            }`}
                            onClick={() => toggleMysteryItem(index)}
                            style={{ marginTop: "66px" }}
                          >
                            {index + 1}
                          </div>

                          <div
                            className={`bg-transparent rounded-2xl p-6 text-center transition-all duration-300 min-h-[120px] ${
                              expandedMysteryItems.includes(index) ? "backdrop-blur-md bg-white/10" : ""
                            }`}
                          >
                            <h3
                              className="text-[#FFE552] text-xl font-semibold mb-4 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter"
                              onClick={() => toggleMysteryItem(index)}
                            >
                              {mystery.title}
                            </h3>

                            {expandedMysteryItems.includes(index) && (
                              <div className="text-white text-sm leading-relaxed space-y-4 animate-in fade-in duration-300">
                                <div>
                                  <strong className="text-[#FFE552] block mb-2 font-inter">Significance:</strong>
                                  <p className="font-inter">{mystery.significance}</p>
                                </div>
                                <div>
                                  <strong className="text-[#FFE552] block mb-2 font-inter">Reflection:</strong>
                                  <p className="font-inter">{mystery.reflection}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-6 overflow-y-auto max-h-[75vh] pb-32 pt-16 overscroll-contain">
                  {rosaryMysteries[selectedMystery as keyof typeof rosaryMysteries].mysteries.map((mystery, index) => (
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
                          expandedMysteryItems.includes(index)
                            ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                            : "hover:scale-105"
                        }`}
                        onClick={() => toggleMysteryItem(index)}
                      >
                        {index + 1}
                      </div>

                      <div
                        className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                          expandedMysteryItems.includes(index) ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
                        }`}
                      >
                        <h3
                          className="text-[#FFE552] text-xl font-semibold mb-4 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter"
                          onClick={() => toggleMysteryItem(index)}
                        >
                          {mystery.title}
                        </h3>

                        {expandedMysteryItems.includes(index) && (
                          <div className="text-white text-sm leading-relaxed space-y-4 animate-in fade-in duration-300 text-left">
                            <div>
                              <strong className="text-[#FFE552] block mb-2 font-inter">Significance:</strong>
                              <p className="font-inter">{mystery.significance}</p>
                            </div>
                            <div>
                              <strong className="text-[#FFE552] block mb-2 font-inter">Reflection:</strong>
                              <p className="font-inter">{mystery.reflection}</p>
                            </div>
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

          {/* Animations */}
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
