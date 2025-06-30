"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function AboutSection() {
  const { setView } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [showRosaryGuide, setShowRosaryGuide] = useState(false)

  const steps = [
    {
      title: "Choose Your Mystery Set",
      description: "Select from Joyful, Luminous, Sorrowful, or Glorious Mysteries",
      image: "/images/rosary-decades-header.png",
    },
    {
      title: "Select Your Perspectives",
      description: "Select your perspectives set (3, 7 or 12).",
      image: "/images/Jesus-baptized-new.jpeg",
    },
    {
      title: "Begin Your Prayer",
      description: "Follow along with guided narration and beautiful visuals",
      image: "/images/luminous-mysteries.jpeg",
    },
  ]

  const rosarySteps = [
    {
      step: "1a",
      title: "Make the Sign of the Cross",
      prayer: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
    },
    {
      step: "1b",
      title: "The Apostle's Creed",
      prayer:
        "I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son, Our Lord, Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified; died, and was buried. He descended into Hell; the third day He arose again from the dead; He ascended into Heaven, sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen.",
    },
    {
      step: "2",
      title: "Our Father",
      prayer:
        "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
    },
    {
      step: "3",
      title: "Say 3 Hail Marys",
      prayer:
        "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
    },
    {
      step: "4",
      title: "Glory be to the Father",
      prayer:
        "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
    },
    {
      step: "5",
      title: "Announce the First Mystery",
      prayer: "Then say the Our Father (2).",
    },
    {
      step: "6",
      title: "On the Ten Small Beads of Each Decade",
      prayer: "Say ten Hail Marys (3), while meditating on the Mystery.",
    },
    {
      step: "7",
      title: "Glory be to the Father",
      prayer:
        'After each decade say the following prayer requested by the Blessed Virgin Mary at Fatima: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy."',
    },
    {
      step: "8",
      title: "Announce the Second Mystery",
      prayer:
        "Then say the Our Father (2). Repeat 6 and 7 and continue with the Third, Fourth, and Fifth Mysteries in the same manner.",
    },
    {
      step: "9",
      title: "Hail, Holy Queen",
      prayer:
        "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope, to thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this vale of tears; turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.",
    },
  ]

  return (
    <section className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
            Welcome to Rosary Narrated
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-inter font-light leading-relaxed">
            This is an audiovisual guided experience designed to help you meditate on the life of Christ based on the
            Rosary.
          </p>
        </div>

        {/* How it works section */}
        <div className="mb-16">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          {/* Step indicators - numbered bubbles with arrows */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-12 h-12 border-2 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep === index
                        ? "border-[#82FAFA] text-[#82FAFA] bg-[#82FAFA]/10"
                        : "border-gray-600 text-gray-400 hover:border-[#82FAFA] hover:text-[#82FAFA]"
                    }`}
                  >
                    {index + 1}
                  </button>
                  {index < steps.length - 1 && <ArrowRight size={20} className="text-[#82FAFA] mx-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-[#82FAFA] font-sora text-lg font-bold mr-3">Step {currentStep + 1}</span>
                </div>
                <h3 className="text-white font-sora text-2xl md:text-3xl font-bold mb-4">{steps[currentStep].title}</h3>
                <p className="text-gray-300 font-inter text-lg leading-relaxed">{steps[currentStep].description}</p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={steps[currentStep].image || "/placeholder.svg"}
                  alt={steps[currentStep].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Arrow for steps 1 and 2 */}
            {currentStep < 2 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block hover:scale-110 transition-transform duration-300"
              >
                <ArrowRight size={24} className="text-[#82FAFA] hover:text-[#FFE552]" />
              </button>
            )}
          </div>
        </div>

        {/* How to Pray the Rosary section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowRosaryGuide(!showRosaryGuide)}
              className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-8 py-4 hover:bg-black/40 transition-all duration-300"
            >
              <h2 className="text-white font-sora text-2xl md:text-3xl font-bold">How to Pray the Rosary</h2>
              {showRosaryGuide ? (
                <ChevronUp size={24} className="text-[#82FAFA]" />
              ) : (
                <ChevronDown size={24} className="text-[#82FAFA]" />
              )}
            </button>
          </div>

          {showRosaryGuide && (
            <div className="bg-black/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 md:p-8">
              <div className="grid gap-6">
                {rosarySteps.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#82FAFA]/20 border border-[#82FAFA]/50 rounded-full flex items-center justify-center">
                        <span className="text-[#82FAFA] font-bold text-sm">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-sora text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-300 font-inter text-sm md:text-base leading-relaxed italic">
                          "{item.prayer}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <CustomButton onClick={() => setView("WHY")} size="lg">
            <span className="hidden md:inline">Why Pray the Rosary</span>
            <span className="md:hidden">Why</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
