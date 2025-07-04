"use client"

import { Youtube, Linkedin, Mail, Shield } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { CONTACT } from "@/constants"

interface FooterProps {
  onViewChange?: (view: string) => void
}

export function Footer({ onViewChange }: FooterProps) {
  const t = useTranslations()

  const handlePrivacyClick = () => {
    if (onViewChange) {
      onViewChange("PRIVACY")
    }
  }

  return (
    <footer className="bg-black border-t border-white/10 text-gray-500 text-center font-inter">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-8 mb-5">
          <button
            onClick={handlePrivacyClick}
            className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300 flex items-center gap-2"
            aria-label="Privacy Policy"
          >
            <Shield size={18} />
            <span className="text-sm">Privacy Policy</span>
          </button>
          <div className="w-px h-6 bg-gray-600"></div>
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
        <div className="text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Rosary Narrated. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
