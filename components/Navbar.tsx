'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Басты бет' },
  { href: '/aral', label: '🌊 Арал' },
  { href: '/syrdarya', label: '🌿 Сырдария' },
  { href: '/desert', label: '🏜️ Шөл' },
  { href: '/map', label: '🗺️ Карта' },
  { href: '/gallery', label: '🖼️ Галерея' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-500 ${
        scrolled
          ? 'bg-[#eef3e9]/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
  {/* Logo */}
  <Link
    href="/"
    className="flex items-center gap-3 group"
  >
    {/* Иконка контейнері (Скриншоттағыдай ашық жасыл, шеті жұмырланған) */}
    <div className="w-10 h-10 rounded-[12px] bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
      🌿
    </div>
    <div>
      {/* Мәтін (Өзгертілмеген, тек түсі скриншоттағыдай қою қара-көк) */}
      <div 
        className="text-[#0f172a] font-bold leading-none tracking-wide"
        style={{ 
          fontFamily: "'Montserrat', sans-serif", 
          fontSize: '20px' 
        }}
      >
        EcoMap Kyzylorda
      </div>
    </div>
  </Link>
  </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#4a5f54] hover:text-[#c2841f] text-sm font-medium tracking-wide transition-colors duration-300 relative group"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              {link.label}
              {/* Астын сызу анимациясы (Hover болғанда алтын түсті сызық шығады) */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#c2841f] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-[1.5px] bg-[#4a5f54] transition-all ${menuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-[#4a5f54] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-[#4a5f54] transition-all ${menuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#eef3e9]/95 backdrop-blur-xl border-t border-black/5 px-6 py-4 shadow-lg absolute w-full left-0 top-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-[#4a5f54] hover:text-[#c2841f] text-sm font-medium border-b border-black/5 last:border-0 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}