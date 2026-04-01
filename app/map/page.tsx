'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Картаны тек клиент жағында жүктеу (SSR қателерін болдырмау үшін)
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { ssr: false })

export default function MapPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <div className="pt-28 pb-20 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* ── Кері қайту сілтемесі ── */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            ← БАСТЫ БЕТКЕ ОРАЛУ
          </Link>

          {/* ── Тақырып бөлімі ── */}
          <div className="text-center mb-12 animate-fadeInDown">
            <div className="inline-block px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
              ИНТЕРАКТИВТІ КАРТА
            </div>
            <h2 className="mb-4 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Аймақтық <span className="text-blue-600 italic">экожүйелер</span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              Қызылорда облысының табиғи аймақтарын карта арқылы зерттеңіз. Картадағы белгілерді басып, толық ақпарат алуға болады.
            </p>
          </div>

          {/* ── Карта контейнері ── */}
          <div className="relative z-0 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white p-2 md:p-4 animate-scaleUp">
            <InteractiveMap />
          </div>

        </div>
      </div>
      
      <Footer />

      {/* Анимация стильдері */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scaleUp {
          animation: scaleUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  )
}