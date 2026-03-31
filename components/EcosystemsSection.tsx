'use client'

import { useEffect, useRef } from 'react'
import { ecosystems } from '@/app/data/ecosystems'
import EcosystemCard from './EcosystemCard'

export default function EcosystemsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const revealEls = sectionRef.current?.querySelectorAll('.reveal')
    revealEls?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="ecosystems"
      ref={sectionRef}
      className="relative py-24 px-6"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(136,148,57,0.06) 0%, transparent 60%), #0d0a05',
      }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(136,148,57,0.1)',
              border: '1px solid rgba(136,148,57,0.25)',
              color: '#bece7a',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            Виртуалды экскурсия
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#f5ead5',
              lineHeight: 1.2,
            }}
          >
            Қызылорданың{' '}
            <em className="not-italic" style={{ color: '#a8d8b0' }}>
              экожүйелері
            </em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '1rem',
              color: 'rgba(245,234,213,0.55)',
              maxWidth: '560px',
              fontWeight: 300,
            }}
          >
            Үш бірегей экожүйені зерттеңіз — картаны ашыңыз, флора мен фаунамен танысыңыз,
            ғылыми деректерді оқыңыз
          </p>
        </div>

        {/* Ecosystem Cards */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {ecosystems.map((eco, i) => (
            <div key={eco.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <EcosystemCard eco={eco} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
