"use client"

import { Youtube, Linkedin, Mail } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { CONTACT, EXTERNAL_LINKS } from "@/constants"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="text-gray-500 text-center font-inter">
      <div className="flex justify-center items-center gap-8 mb-5">
        <a
          href={CONTACT.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
          aria-label="YouTube"
        >
          <Youtube size={22} />
        </a>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} />
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
          aria-label="Email"
        >
          <Mail size={22} />
        </a>
      </div>
      <p className="mb-3 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rosary Narrated. {t.footer.copyright}
      </p>
      <p className="text-gray-500 text-sm">
        {t.footer.poweredBy}{" "}
        <a
          href={EXTERNAL_LINKS.eltayDigital}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFE552] hover:text-yellow-300 transition-colors duration-300"
        >
          Eltay Digital
        </a>
      </p>
    </footer>
  )
}
