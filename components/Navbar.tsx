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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d0a05]/90 backdrop-blur-md border-b border-sand-800/40 py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center text-lg shadow-lg shadow-sand-900/50 group-hover:scale-110 transition-transform">
            🌿
          </div>
          <div>
            <div className="text-sand-300 text-sm font-semibold leading-none tracking-wide">
              Туған елке
            </div>
            <div className="text-sand-500 text-[10px] tracking-widest uppercase">
              Табиғаты
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sand-400 hover:text-sand-200 text-sm tracking-wide transition-colors duration-300 relative group"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-sand-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-sand-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-sand-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-sand-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0a05]/95 backdrop-blur-xl border-t border-sand-800/30 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sand-400 hover:text-sand-200 text-sm border-b border-sand-900/50 last:border-0 transition-colors"
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
