"use client"

import { Youtube, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="text-gray-500 text-center font-inter">
      <div className="flex justify-center items-center gap-8 mb-5">
        <a
          href="https://www.youtube.com/@20RosaryDecades-Narrated"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
        >
          <Youtube size={22} />
        </a>
        <a
          href="https://www.linkedin.com/company/20rosarydecades-narrated/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
        >
          <Linkedin size={22} />
        </a>
        <a
          href="mailto:rosarynarrated@gmail.com"
          className="text-gray-500 hover:text-[#FFE552] transition-colors duration-300"
        >
          <Mail size={22} />
        </a>
      </div>
      <p className="mb-3 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rosary Narrated. All rights reserved.
      </p>
      <p className="text-gray-500 text-sm">
        Powered by{" "}
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
  )
}
