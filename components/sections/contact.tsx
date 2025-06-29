"use client"

import type React from "react"

import { useState } from "react"
import { CustomButton } from "@/components/ui/custom-button"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData

    // Create mailto link
    const mailtoLink = `mailto:your-email@example.com?subject=New Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`

    // Open email client
    window.location.href = mailtoLink

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8">
          Contact Us
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-300 font-inter font-light leading-relaxed">
            We'd love to hear from you. Whether you have questions, suggestions, or want to support our mission, please
            don't hesitate to reach out.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8"
        >
          <div>
            <label htmlFor="name" className="block text-white font-inter font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#82FAFA] focus:border-transparent"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-inter font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#82FAFA] focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-inter font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#82FAFA] focus:border-transparent resize-vertical"
              placeholder="Your message..."
            />
          </div>

          <div className="text-center mt-8">
            <CustomButton type="submit" size="lg">
              SEND MESSAGE
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}
