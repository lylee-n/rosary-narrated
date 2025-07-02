"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function WhySection() {
  const { setView } = useApp()

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

        {/* New Card with 15 Promises */}
        <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-16">
          <h2 className="text-white font-sora text-xl md:text-2xl font-semibold mb-6">
            The 15 Promises of Our Lady to Those Who Pray the Rosary
          </h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 font-inter leading-relaxed">
            <li>
              To all those who shall recite my rosary devoutly, I promise my special protection and very great graces.
            </li>
            <li>Those who shall persevere in the recitation of my rosary shall receive signal graces.</li>
            <li>
              The rosary shall be a very powerful armor against hell; it will destroy vice, deliver from sin, and dispel
              heresy.
            </li>
            <li>
              The rosary will make virtue and good works flourish, and will obtain for souls the most abundant divine
              mercies; it will draw the hearts of men from the love of the world to the love of God, and will lift them
              to the desire of eternal things. How many souls shall sanctify themselves by this means!
            </li>
            <li>Those who trust themselves to me through the rosary shall not perish.</li>
            <li>
              Those who shall recite my rosary devoutly, meditating on its mysteries, shall not be overwhelmed by
              misfortune. The sinner shall be converted; the just shall grow in grace and become worthy of eternal life.
            </li>
            <li>Those truly devoted to my rosary shall not die without the Sacraments of the Church.</li>
            <li>
              Those who faithfully recite my rosary shall find during their life and at the hour of their death the
              light of God, the fullness of his graces, and shall share in the merits of the blessed.
            </li>
            <li>I shall deliver very promptly from purgatory the souls devoted to my rosary.</li>
            <li>The true children of my rosary shall enjoy great glory in heaven.</li>
            <li>What you ask through my rosary, you shall obtain.</li>
            <li>Those who propagate my rosary will be aided by me in all their necessities.</li>
            <li>
              I have obtained from my Son that all the members of the Rosary Confraternity shall have as their
              intercessors, in life and in death, the entire celestial court.
            </li>
            <li>
              Those who recite my rosary faithfully are all my beloved children, the brothers and sisters of Jesus
              Christ.
            </li>
            <li>Devotion to my rosary is a great sign of predestination.</li>
          </ul>
          <p className="text-sm italic text-gray-400 mt-6 text-right">
            (Given to St. Dominic and Blessed Alan de la Roche).
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <CustomButton onClick={() => setView("PLAY")} size="lg">
            <span className="hidden md:inline">Pray the Rosary</span>
            <span className="md:hidden">Pray</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
