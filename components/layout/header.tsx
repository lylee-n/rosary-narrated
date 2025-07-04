// No changes needed for this file. Since there was no existing code, I will create a basic header component.

import type React from "react"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        {/* Add navigation links here */}
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header
