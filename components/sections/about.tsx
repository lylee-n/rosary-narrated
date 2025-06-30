"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function AboutSection() {
  const { setView } = useApp()
  const [currentStep, setCurrentStep] = useState(1)
  const [isRosaryGuideOpen, setIsRosaryGuideOpen] = useState(false)

  const steps = [
    {
      number: "1",
      title: "Choose Your Mystery Set",
      description:
        "Select from Joyful, Luminous, Sorrowful, or Glorious Mysteries based on the day or your preference.",
    },
    {
      number: "2",
      title: "Listen & Meditate",
      description:
        "Follow along with guided audio narration while viewing beautiful visuals that bring each mystery to life.",
    },
    {
      number: "3",
      title: "Pray & Reflect",
      description: "Engage in deep prayer and reflection as you journey through the life of Christ with Mary.",
    },
  ]

  const rosarySteps = [
    {
      number: "1a",
      title: "Make the Sign of the Cross",
      content: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
    },
    {
      number: "1b",
      title: "The Apostle's Creed",
      content:
        "I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son, Our Lord, Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified; died, and was buried. He descended into Hell; the third day He arose again from the dead; He ascended into Heaven, sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen.",
    },
    {
      number: "2",
      title: "Our Father",
      content:
        "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil, Amen.",
    },
    {
      number: "3",
      title: "Say 3 Hail Marys",
      content:
        "Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.",
    },
    {
      number: "4",
      title: "Glory be to the Father",
      content:
        "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
    },
    {
      number: "5",
      title: "Announce the First Mystery",
      content: "Then say the Our Father (2).",
    },
    {
      number: "6",
      title: "On the Ten Small Beads of Each Decade",
      content: "Say ten Hail Marys (3), while meditating on the Mystery.",
    },
    {
      number: "7",
      title: "Glory be to the Father",
      content:
        'After each decade say the following prayer requested by the Blessed Virgin Mary at Fatima: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy."',
    },
    {
      number: "8",
      title: "Announce the Second Mystery",
      content:
        "Then say the Our Father (2). Repeat 6 and 7 and continue with the Third, Fourth, and Fifth Mysteries in the same manner.",
    },
    {
      number: "9",
      title: "Hail, Holy Queen",
      content:
        "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope, to thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this vale of tears; turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.",
    },
  ]

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber)
  }

  const handleArrowClick = (currentStepNumber: number) => {
    if (currentStepNumber < 3) {
      setCurrentStep(currentStepNumber + 1)
    }
  }

  return (
    <section className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8 md:mb-16">
            About This Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
            This is an audiovisual guided experience designed to help you meditate on the life of Christ based on the
            Rosary.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h3 className="text-white font-sora text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h3>

          {/* Step Navigation Bubbles */}
          <div className="flex justify-center items-center mb-12 space-x-4">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    currentStep === step
                      ? "bg-[#FFE552] border-[#FFE552] text-black"
                      : "bg-transparent border-gray-600 text-gray-400 hover:border-gray-400"
                  }`}
                >
                  {step}
                </button>
                {index < 2 && <ArrowRight className="w-6 h-6 text-gray-600 mx-2" />}
              </div>
            ))}
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  currentStep === Number.parseInt(step.number)
                    ? "bg-white/5 border-[#FFE552]/50 backdrop-blur-sm"
                    : "bg-white/5 border-gray-700 backdrop-blur-sm hover:border-gray-600"
                }`}
                onClick={() => handleStepClick(Number.parseInt(step.number))}
              >
                {/* Step Number Badge */}
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-4 ${
                    currentStep === Number.parseInt(step.number) ? "bg-[#FFE552] text-black" : "bg-gray-700 text-white"
                  }`}
                >
                  {step.number}
                </div>

                <h4 className="text-white font-sora text-xl font-bold mb-4">Step {step.number}</h4>
                <h5 className="text-white font-sora text-lg font-semibold mb-3">{step.title}</h5>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">{step.description}</p>

                {/* Arrow for steps 1 and 2 */}
                {Number.parseInt(step.number) < 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleArrowClick(Number.parseInt(step.number))
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#FFE552]/20 hover:bg-[#FFE552]/30 transition-colors duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-[#FFE552]" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How to Pray the Rosary Section */}
        <div className="mb-20">
          <div className="bg-white/5 border border-gray-700 rounded-2xl backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setIsRosaryGuideOpen(!isRosaryGuideOpen)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
            >
              <h3 className="text-white font-sora text-2xl md:text-3xl font-bold">How to Pray the Rosary</h3>
              {isRosaryGuideOpen ? (
                <ChevronUp className="w-6 h-6 text-[#FFE552]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#FFE552]" />
              )}
            </button>

            {isRosaryGuideOpen && (
              <div className="p-6 pt-0 space-y-6">
                {rosarySteps.map((step, index) => (
                  <div key={index} className="bg-white/5 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#FFE552] text-black rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-sora text-lg font-semibold mb-3">{step.title}</h4>
                        <p className="text-gray-300 font-inter leading-relaxed">{step.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <CustomButton onClick={() => setView("WHY")} size="lg" variant="yellow">
            <span className="hidden md:inline">Why Pray the Rosary?</span>
            <span className="md:hidden">Why?</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
