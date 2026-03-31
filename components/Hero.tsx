'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle system for sand/stars effect
    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string; type: 'sand' | 'star'
    }> = []

    const colors = ['#c97d1e', '#e8b96e', '#f2d5a8', '#3b8ef1', '#93ccfb']

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.3) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: i < 60 ? 'sand' : 'star',
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) p.y = canvas.height + 10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #1a2a0a 0%, #0d1a05 40%, #0d0a05 70%, #05080d 100%)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(59,142,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(201,125,30,0.12) 0%, transparent 50%)',
        }}
      />

      {/* Horizon line */}
      <div
        className="absolute bottom-1/3 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,125,30,0.3), rgba(136,148,57,0.4), rgba(59,142,241,0.2), transparent)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Region badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-xs tracking-widest uppercase border"
          style={{
            background: 'rgba(201,125,30,0.08)',
            borderColor: 'rgba(201,125,30,0.25)',
            color: '#e8b96e',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sand-400 animate-pulse" />
          Қызылорда облысы · Виртуалды экскурсия
        </div>

        {/* Main title */}
        <h1
          className="mb-4 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700,
            color: '#f5ead5',
          }}
        >
          Туған өлке{' '}
          <em
            className="not-italic glow-text"
            style={{ color: '#e8b96e' }}
          >
            табиғаты
          </em>
        </h1>

        <p
          className="mx-auto mb-4 leading-relaxed"
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
            color: 'rgba(245,234,213,0.65)',
            maxWidth: '640px',
            fontWeight: 300,
          }}
        >
          Арал теңізінің апаты, Сырдарияның тынысы, Қызылқұм шөлінің сырлары —
          бірегей экожүйелерді зерттейтін виртуалды саяхат
        </p>

        {/* Ecosystem pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { emoji: '🌊', label: 'Арал теңізі', color: 'rgba(59,142,241,0.15)', border: 'rgba(59,142,241,0.35)', text: '#93ccfb' },
            { emoji: '🌿', label: 'Сырдария өзені', color: 'rgba(82,168,105,0.15)', border: 'rgba(82,168,105,0.35)', text: '#a8d8b0' },
            { emoji: '🏜️', label: 'Қызылқұм шөлі', color: 'rgba(201,125,30,0.15)', border: 'rgba(201,125,30,0.35)', text: '#e8b96e' },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background: pill.color,
                border: `1px solid ${pill.border}`,
                color: pill.text,
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              <span>{pill.emoji}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#ecosystems"
            className="group px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c97d1e, #a86118)',
              color: '#fff',
              fontFamily: 'IBM Plex Sans, sans-serif',
              boxShadow: '0 0 30px rgba(201,125,30,0.3)',
            }}
          >
            Экскурсияны бастау →
          </a>
          <a
            href="#map"
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(245,234,213,0.06)',
              border: '1px solid rgba(245,234,213,0.2)',
              color: '#f5ead5',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            🗺 Картаны ашу
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(232,185,110,0.5)', fontFamily: 'IBM Plex Sans, sans-serif' }}
        >
          Төменге қарай
        </span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: 'rgba(232,185,110,0.15)' }}
        >
          <div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              height: '40%',
              background: '#e8b96e',
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollIndicator {
            0% { top: -40%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  )
}
