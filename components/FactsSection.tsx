'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 68000,
    suffix: 'км²',
    label: 'Аралдың бастапқы ауданы',
    color: '#3b8ef1',
    emoji: '🌊',
  },
  {
    value: 2212,
    suffix: 'км',
    label: 'Сырдарияның ұзындығы',
    color: '#52a869',
    emoji: '🌿',
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Шөлдегі өсімдік түрлері',
    color: '#c97d1e',
    emoji: '🌱',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Құс түрлері',
    color: '#e8b96e',
    emoji: '🦅',
  },
]

const timeline = [
  {
    year: '1960',
    event: 'Арал апатының басталуы',
    description: 'Сырдария мен Әмудария суларының мақта алқаптарына бұрылуы теңіздің кеуіп кетуіне алып келді.',
    color: '#e85b5b',
  },
  {
    year: '1989',
    event: 'Теңіздің екіге бөлінуі',
    description: 'Арал теңізі Солтүстік және Оңтүстік деп екіге бөлінді. Балық аулау толықтай тоқтатылды.',
    color: '#c97d1e',
  },
  {
    year: '2005',
    event: 'Қоқарал бөгетінің салынуы',
    description: 'Дүниежүзілік банктің қаржыландыруымен Қоқарал бөгеті салынды. Солтүстік Аралға су оралды.',
    color: '#3b8ef1',
  },
  {
    year: '2008',
    event: 'Балықтың оралуы',
    description: 'Судың деңгейі 4 метрге көтеріліп, балық аулау қайта жандана бастады.',
    color: '#52a869',
  },
  {
    year: '2024',
    event: 'Қалпына келу жалғасуда',
    description: 'Фламинго, тырна және басқа да құстар Солтүстік Арал жағалауында ұялай бастады.',
    color: '#9b7de8',
  },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const step = target / (duration / 16)
          let val = 0
          const timer = setInterval(() => {
            val += step
            if (val >= target) {
              val = target
              clearInterval(timer)
            }
            setCurrent(Math.floor(val))
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="stat-counter">
      {current.toLocaleString('kk-KZ')}{suffix}
    </span>
  )
}

export default function FactsSection() {
  return (
    <section
      id="facts"
      className="py-24 px-6 relative"
      style={{ background: '#090705' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(136,148,57,0.1)',
              border: '1px solid rgba(136,148,57,0.25)',
              color: '#bece7a',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            Ғылыми деректер
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#f5ead5',
            }}
          >
            Сандармен{' '}
            <em className="not-italic" style={{ color: '#bece7a' }}>
              айтқанда
            </em>
          </h2>
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 text-center"
              style={{
                background: `${stat.color}08`,
                border: `1px solid ${stat.color}25`,
              }}
            >
              <div className="text-3xl mb-3">{stat.emoji}</div>
              <div
                className="text-3xl font-bold mb-2"
                style={{
                  color: stat.color,
                  fontFamily: 'Playfair Display, serif',
                  textShadow: `0 0 20px ${stat.color}40`,
                }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{
                  color: 'rgba(245,234,213,0.5)',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <h3
            className="text-center mb-10"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.8rem',
              color: '#f5ead5',
            }}
          >
            Арал тарихы — хронология
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, #c97d1e50, #3b8ef150, transparent)',
              }}
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="flex-1 pl-14 md:pl-0">
                    <div
                      className={`rounded-2xl p-5 ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                      style={{
                        background: `${item.color}08`,
                        border: `1px solid ${item.color}25`,
                      }}
                    >
                      <div
                        className="text-xs tracking-widest uppercase mb-1 font-semibold"
                        style={{ color: item.color, fontFamily: 'IBM Plex Sans, sans-serif' }}
                      >
                        {item.year}
                      </div>
                      <h4
                        className="font-bold mb-2"
                        style={{ fontFamily: 'Playfair Display, serif', color: '#f5ead5', fontSize: '1.1rem' }}
                      >
                        {item.event}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: 'rgba(245,234,213,0.6)',
                          fontFamily: 'IBM Plex Sans, sans-serif',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-5 w-4 h-4 rounded-full -translate-x-1/2 z-10 flex-shrink-0"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 15px ${item.color}60`,
                    }}
                  />

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
