"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function WhySection() {
  const { setView } = useApp()

  const promises = [
    "To all those who shall recite my rosary devoutly, I promise my special protection and very great graces.",
    "Those who shall persevere in the recitation of my rosary shall receive signal graces.",
    "The rosary shall be a very powerful armor against hell; it will destroy vice, deliver from sin, and dispel heresy.",
    "The rosary will make virtue and good works flourish, and will obtain for souls the most abundant divine mercies; it will draw the hearts of men from the love of the world to the love of God, and will lift them to the desire of eternal things. How many souls shall sanctify themselves by this means!",
    "Those who trust themselves to me through the rosary shall not perish.",
    "Those who shall recite my rosary devoutly, meditating on its mysteries, shall not be overwhelmed by misfortune. The sinner shall be converted; the just shall grow in grace and become worthy of eternal life.",
    "Those truly devoted to my rosary shall not die without the Sacraments of the Church.",
    "Those who faithfully recite my rosary shall find during their life and at the hour of their death the light of God, the fullness of his graces, and shall share in the merits of the blessed.",
    "I shall deliver very promptly from purgatory the souls devoted to my rosary.",
    "The true children of my rosary shall enjoy great glory in heaven.",
    "What you ask through my rosary, you shall obtain.",
    "Those who propagate my rosary will be aided by me in all their necessities.",
    "I have obtained from my Son that all the members of the Rosary Confraternity shall have as their intercessors, in life and in death, the entire celestial court.",
    "Those who recite my rosary faithfully are all my beloved children, the brothers and sisters of Jesus Christ.",
    "Devotion to my rosary is a great sign of predestination.",
  ]

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            Why Pray the Rosary?
          </h1>
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              The Rosary isn't a mindless incantation. It's a photobook of Christ's life, with His Mother - Mary, the
              Ark of the New Covenant - at your side. "For where two or three gather in my name, there I am with them."
              (Matthew 18: 20). Who is better to pray with us than His own Mother, who knows our Lord from her womb, and
              was with Him through every event and every pain? With the precious Mother by your side, your connection to
              Jesus will deepen in ways you never thought possible.
            </p>
          </div>
        </div>

        {/* The 15 Promises Card */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative bg-[url('/images/Mary-womb-golden-light.png')] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-lg"></div>
            <div className="relative z-10">
              {/* Heading with solid black background */}
              <div className="bg-black py-6 px-8">
                <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold text-center mb-0">
                  The 15 Promises of Our Lady to Those Who Pray the Rosary
                </h2>
              </div>
              {/* Promises content with padding */}
              <div className="p-8 pt-4">
                <div className="space-y-4">
                  {promises.map((promise, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[2.5rem_1fr] gap-3 transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="text-[#82FAFA] font-bold mt-1">{index + 1}.</span>
                      <p className="text-gray-300 font-inter leading-relaxed text-base">{promise}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-400 font-inter text-sm italic">
                    (Given to St. Dominic and Blessed Alan de la Roche)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <CustomButton onClick={() => setView("FOUNDATION")} size="lg">
            <span className="hidden md:inline">Understand the Mysteries</span>
            <span className="md:hidden">Understand the Mysteries</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
