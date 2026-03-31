'use client'

import { useState } from 'react'
import type { EcoZone } from '@/app/data/ecosystems'

interface Props {
  eco: EcoZone
  index: number
}

export default function EcosystemCard({ eco, index }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'flora' | 'fauna' | 'facts'>('facts')

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group"
      style={{
        background: eco.bgGradient,
        border: `1px solid ${eco.color}25`,
        boxShadow: expanded ? `0 0 60px ${eco.color}20` : `0 0 20px ${eco.color}10`,
        animationDelay: `${index * 0.15}s`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top section */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          {/* Icon + Title */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${eco.color}20`, border: `1px solid ${eco.color}40` }}
            >
              {eco.icon}
            </div>
            <div>
              <div
                className="text-xs tracking-widest uppercase mb-1 font-medium"
                style={{ color: eco.accentColor, fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Экожүйе
              </div>
              <h3
                className="text-2xl font-bold leading-tight"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#f5ead5',
                  textShadow: `0 0 20px ${eco.color}40`,
                }}
              >
                {eco.name}
              </h3>
            </div>
          </div>

          {/* Expand arrow */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              background: `${eco.color}20`,
              border: `1px solid ${eco.color}30`,
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <span style={{ color: eco.accentColor, fontSize: '12px' }}>▼</span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-sm mb-5 leading-relaxed"
          style={{
            color: eco.accentColor,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 300,
          }}
        >
          {eco.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{
            color: 'rgba(245,234,213,0.7)',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          {eco.description}
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Аумақ', value: eco.area },
            { label: 'Жануарлар', value: `${eco.species} түр` },
            { label: 'Қауіп', value: eco.threat },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{ background: `${eco.color}10`, border: `1px solid ${eco.color}20` }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                {stat.label}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: eco.accentColor, fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable section */}
      {expanded && (
        <div
          className="border-t px-8 pb-8 pt-6"
          style={{ borderColor: `${eco.color}20` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['facts', 'flora', 'fauna'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 tracking-wide"
                style={
                  activeTab === tab
                    ? {
                        background: eco.color,
                        color: '#fff',
                        fontFamily: 'IBM Plex Sans, sans-serif',
                      }
                    : {
                        background: `${eco.color}15`,
                        color: eco.accentColor,
                        border: `1px solid ${eco.color}25`,
                        fontFamily: 'IBM Plex Sans, sans-serif',
                      }
                }
              >
                {tab === 'facts' ? '📊 Деректер' : tab === 'flora' ? '🌱 Флора' : '🦅 Фауна'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'facts' && (
            <div className="grid grid-cols-2 gap-3">
              {eco.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl p-4"
                  style={{ background: `${eco.color}08`, border: `1px solid ${eco.color}20` }}
                >
                  <div
                    className="text-xs mb-2"
                    style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {fact.label}
                  </div>
                  <div
                    className="text-base font-semibold"
                    style={{ color: '#f5ead5', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'flora' && (
            <div className="space-y-2">
              {eco.flora.map((plant) => (
                <div
                  key={plant}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${eco.color}08`, border: `1px solid ${eco.color}15` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: eco.accentColor }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'rgba(245,234,213,0.8)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {plant}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'fauna' && (
            <div className="space-y-2">
              {eco.fauna.map((animal) => (
                <div
                  key={animal}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${eco.color}08`, border: `1px solid ${eco.color}15` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: eco.accentColor }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'rgba(245,234,213,0.8)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {animal}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Long description */}
          <div
            className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
            style={{
              background: `${eco.color}06`,
              border: `1px solid ${eco.color}15`,
              color: 'rgba(245,234,213,0.65)',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontStyle: 'italic',
            }}
          >
            {eco.longDescription}
          </div>
        </div>
      )}

      {/* Decorative glow line at bottom */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${eco.color}60, transparent)` }}
      />
    </div>
  )
}
