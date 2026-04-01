'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── 1. Деректер базасы (Түстер ашық фонға лайықталып, қоюлатылды) ──────────────
const didYouKnow = [
  { id: 1, emoji: '🌊', color: '#0369a1', category: 'Арал теңізі', fact: 'Арал теңізі 1960 жылдары әлемдегі 4-ші ірі көл болған. Оның ауданы 68 000 км² — Ирландия еліндей!' },
  { id: 2, emoji: '🐟', color: '#0369a1', category: 'Арал теңізі', fact: 'Бір кезде Аралда жыл сайын 40 000 тонна балық ауланған. Бүгінде Солтүстік Аралда балық аулау қайта жандануда.' },
  { id: 3, emoji: '🏗️', color: '#0369a1', category: 'Арал теңізі', fact: 'Қоқарал бөгеті салынғаннан кейін (2005) су деңгейі 4 метрге көтеріліп, 24 түр балық оралды.' },
  { id: 4, emoji: '🌿', color: '#15803d', category: 'Сырдария', fact: 'Сырдария — Орта Азиядағы ең ұзын өзен. Ұзындығы 2 212 км. Тянь-Шань тауынан бастау алып, Аралға құяды.' },
  { id: 5, emoji: '🌳', color: '#15803d', category: 'Сырдария', fact: 'Сырдария тоғай ормандарының 80% XX ғасырда жойылды. Тоғай — Орта Азиядағы ең сирек экожүйелердің бірі.' },
  { id: 6, emoji: '🦩', color: '#15803d', category: 'Сырдария', fact: 'Сырдария алқабы 156-дан астам құс түрінің ұялау орны. Соның ішінде сирек кездесетін тырна да бар.' },
  { id: 7, emoji: '🏜️', color: '#b45309', category: 'Қызылқұм', fact: 'Қызылқұм шөлінің ауданы 300 000 км²-ден асады. «Қызылқұм» — қазақша «қызыл құм» деген мағынаны білдіреді.' },
  { id: 8, emoji: '🌵', color: '#b45309', category: 'Қызылқұм', fact: 'Сексеуіл ағашының тамыры 30 метр тереңдікке жетеді және 1 тонна суды сіңіре алады. Шөлдің нағыз қорғаушысы!' },
  { id: 9, emoji: '🦌', color: '#b45309', category: 'Қызылқұм', fact: 'Қарақұйрық жылдамдығы 80 км/сағ жетеді. Бұл — кейбір автомобильдерден де жылдам!' },
  { id: 10, emoji: '☀️', color: '#b45309', category: 'Қызылқұм', fact: 'Қызылқұмда жазда температура +45°C-ге дейін жетеді, қыста -25°C-ге дейін суиды. Экстремалды климат!' },
  { id: 11, emoji: '🚀', color: '#6d28d9', category: 'Байқоңыр', fact: '1957 жылы Байқоңыр ғарыш айлағынан алғашқы жасанды серік — Спутник-1 ұшырылды.' },
  { id: 12, emoji: '🦢', color: '#0369a1', category: 'Арал теңізі', fact: 'Фламинго мен тырналар Солтүстік Арал жағасында қайта ұялай бастады — бұл тіршіліктің оралуының белгісі.' },
]

const aralData = [
  { year: '1960', area: 68000, level: 53.4, color: '#0369a1' },
  { year: '1970', area: 60000, level: 51.5, color: '#0ea5e9' },
  { year: '1980', area: 45000, level: 46.0, color: '#38bdf8' },
  { year: '1990', area: 33000, level: 38.5, color: '#f59e0b' },
  { year: '2000', area: 18000, level: 31.0, color: '#ef4444' },
  { year: '2005', area: 17000, level: 30.5, color: '#b91c1c' },
  { year: '2010', area: 13500, level: 33.0, color: '#16a34a' },
  { year: '2015', area: 13200, level: 34.5, color: '#22c55e' },
  { year: '2020', area: 13000, level: 35.2, color: '#4ade80' },
  { year: '2024', area: 12800, level: 35.8, color: '#86efac' },
]

const links = [
  {
    category: 'Арал теңізі',
    color: '#0369a1',
    emoji: '🌊',
    items: [
      { label: 'Арал теңізі — Уикипедия', url: 'https://kk.wikipedia.org/wiki/Арал_теңізі', type: 'wiki' },
      { label: 'Арал теңізінің тарихы', url: 'https://youtu.be/S_rOTOcZxqY', type: 'youtube' },
      { label: 'NASA: Аралдың жоғалуы (фото)', url: 'https://earthobservatory.nasa.gov/world-of-change/AralSea', type: 'site' },
    ],
  },
  {
    category: 'Сырдария өзені',
    color: '#15803d',
    emoji: '🌿',
    items: [
      { label: 'Сырдария — Уикипедия', url: 'https://kk.wikipedia.org/wiki/Сырдария', type: 'wiki' },
      { label: 'Сырдария тоғай ормандары', url: 'https://youtu.be/DkNZX6rDzV4', type: 'youtube' },
      { label: 'Орта Азия өзендері', url: 'https://stud.kz/referat/show/60721', type: 'site' },
    ],
  },
  {
    category: 'Қызылқұм шөлі',
    color: '#b45309',
    emoji: '🏜️',
    items: [
      { label: 'Қызылқұм — Уикипедия', url: 'https://kk.wikipedia.org/wiki/Қызылқұм', type: 'wiki' },
      { label: 'Қарақұйрық қорығы туралы', url: 'https://youtu.be/wsdslqAz8V4', type: 'youtube' },
      { label: 'Сексеуіл ормандары туралы зерттеу', url: 'https://ojs.wkau.kz/index.php/gbj/article/view/3276', type: 'site' },
    ],
  },
]

const typeIcon: Record<string, string> = { youtube: '▶️', wiki: '📖', site: '🔗' }
const typeLabel: Record<string, string> = { youtube: 'YouTube', wiki: 'Уикипедия', site: 'Сайт' }

export default function FactsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Барлығы')
  const [flipped, setFlipped] = useState<number | null>(null)
  const [chartMetric, setChartMetric] = useState<'area' | 'level'>('area')

  const categories = ['Барлығы', 'Арал теңізі', 'Сырдария', 'Қызылқұм', 'Байқоңыр']
  const catColors: Record<string, string> = {
    'Арал теңізі': '#0369a1', 'Сырдария': '#15803d',
    'Қызылқұм': '#b45309', 'Байқоңыр': '#6d28d9',
  }

  const filtered = activeCategory === 'Барлығы'
    ? didYouKnow
    : didYouKnow.filter(f => f.category === activeCategory)

  const maxVal = Math.max(...aralData.map(d => chartMetric === 'area' ? d.area : d.level * 1000))

  return (
    // Негізгі фон ашық сұр/ақшыл, шрифт Montserrat
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Кері қайту */}
        <Link href="/" className="inline-flex items-center gap-2 mb-12 text-sm font-bold text-slate-500 hover:text-emerald-700 transition-colors">
          ← БАСТЫ БЕТКЕ ОРАЛУ
        </Link>

        {/* ══ 1-БӨЛІМ: ФАКТІЛЕР ══════════════════════════════════════════ */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
            ЭКО-МӘЛІМЕТТЕР
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            Қызықты <span className="text-emerald-600 italic">фактілер</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Аймақтың ерекше табиғаты мен экологиялық өзгерістері туралы мәліметтер жинағы. Карточканы басып, фактіні оқыңыз.
          </p>
        </div>

        {/* Фильтр */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Карточкалар */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setFlipped(flipped === item.id ? null : item.id)}
              className="relative h-64 cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full h-full transition-transform duration-500"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: flipped === item.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                
                {/* Алдыңғы беті */}
                <div 
                  className="absolute inset-0 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm group-hover:shadow-xl transition-shadow"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-5xl transition-transform group-hover:scale-110 origin-left">{item.emoji}</div>
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: item.color }}>
                      {item.category}
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                      Факт #{item.id} 
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600">→</span>
                    </div>
                  </div>
                </div>

                {/* Артқы беті (Факт жазылған жер) */}
                <div 
                  className="absolute inset-0 bg-white border-2 rounded-3xl p-8 flex items-center justify-center text-center shadow-inner"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)', 
                    borderColor: item.color 
                  }}
                >
                  <p className="text-sm font-semibold leading-relaxed text-slate-700" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {item.fact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ 2-БӨЛІМ: ДИАГРАММА ══════════════════════════════════════════ */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 border border-slate-200 shadow-xl mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, #0369a1, #16a34a)` }} />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Арал теңізінің <span className="text-blue-600">динамикасы</span>
            </h2>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setChartMetric('area')} 
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${chartMetric === 'area' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Ауданы (км²)
              </button>
              <button 
                onClick={() => setChartMetric('level')} 
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${chartMetric === 'level' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Деңгейі (м)
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between h-64 gap-2 md:gap-4 mb-8">
            {aralData.map((d) => {
              const val = chartMetric === 'area' ? d.area : d.level * 1000
              const pct = (val / maxVal) * 100
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg transition-all duration-300 whitespace-nowrap z-10 shadow-xl transform scale-90 group-hover:scale-100">
                    <div className="font-bold text-slate-300 mb-1">{d.year} жыл</div>
                    <div style={{ color: d.color }}>
                      {chartMetric === 'area' ? `${d.area.toLocaleString('kk-KZ')} км²` : `${d.level} м`}
                    </div>
                  </div>
                  
                  {/* Баған */}
                  <div className="w-full rounded-t-lg transition-all duration-1000 relative overflow-hidden" 
                       style={{ height: `${pct}%`, background: d.color, minHeight: '4px' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <span className="mt-4 text-[10px] md:text-xs font-bold text-slate-500">{d.year}</span>
                </div>
              )
            })}
          </div>
          
          {/* Легенда */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-slate-100">
            {[
              { color: '#0369a1', label: 'Қалыпты жағдай' },
              { color: '#ef4444', label: 'Апатты кезең' },
              { color: '#16a34a', label: 'Қалпына келу' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="font-semibold text-xs text-slate-600" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 3-БӨЛІМ: СІЛТЕМЕЛЕР ══════════════════════════════════════════ */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Пайдалы <span className="text-amber-600">сілтемелер</span>
            </h2>
            <p className="text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              Тақырыпты тереңірек зерттеуге арналған сенімді ресурстар
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {links.map((group) => (
              <div key={group.category} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
                <div className="px-6 py-5 border-b border-slate-100" style={{ background: `${group.color}08` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{group.emoji}</span>
                    <span className="font-bold text-lg" style={{ color: group.color }}>
                      {group.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {group.items.map((item) => (
                    <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-slate-200 group"
                      style={{ textDecoration: 'none' }}>
                      <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">{typeIcon[item.type]}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-slate-800 truncate" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                          {item.label}
                        </div>
                        <div className="text-xs font-semibold mt-0.5" style={{ color: group.color }}>
                          {typeLabel[item.type]}
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:text-slate-900 transition-colors">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  )
}