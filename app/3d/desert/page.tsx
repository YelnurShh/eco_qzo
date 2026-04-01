'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Desert3DTour() {
  // Қызылқұм панорамасының Kuula сілтемесін мына жерге қойыңыз:
  const kuulaLink = "https://kuula.co/share/collection/7M1cv?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Кері қайту */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10 text-sm font-black text-slate-400 hover:text-amber-600 transition-all">
          ← БАСТЫ БЕТКЕ ОРАЛУ
        </Link>

        {/* Тақырып бөлімі */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-50 text-amber-700 border border-amber-100 mb-6">
            Шөл экожүйесі
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Қызылқұм: <span className="text-amber-600 italic">360° Виртуалды тур</span>
          </h1>
          <p className="max-w-2xl text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Қазақстанның ең ірі шөлдерінің бірі — Қызылқұмның тылсым табиғатын зерттеңіз. 
            Сексеуіл ормандары мен құм шағылдарын (бархандарды) жақыннан тамашалаңыз.
          </p>
        </div>

        {/* ── ПАНОРАМА ТЕРЕЗЕСІ (Embed) ── */}
        <div className="relative group">
          {/* Фондық жарқыл (Сарғыш) */}
          <div className="absolute -inset-4 bg-amber-400/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-4 border-white ring-1 ring-slate-200">
            <iframe
              src={kuulaLink}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; camera; gyroscope; microphone; vr"
              allowFullScreen
              scrolling="no"
            />
          </div>

          {/* Нұсқаулық белгісі */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center pointer-events-none">
            <div className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white text-[10px] font-black uppercase tracking-widest text-slate-800">
              🏜️ Айналдыру үшін басыңыз
            </div>
            <div className="px-5 py-2.5 rounded-full bg-amber-600 shadow-lg text-[10px] font-black uppercase tracking-widest text-white">
              Desert 360° Mode
            </div>
          </div>
        </div>

        {/* Шөл туралы қысқаша мәліметтер */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🌵', title: 'Сексеуіл', desc: 'Құмды тоқтатып, шөлдің кеңеюіне жол бермейтін негізгі ағаш' },
            { icon: '🦌', title: 'Жайнуарлар', desc: 'Жейран мен қарақұйрықтардың еркін жайылатын мекені' },
            { icon: '☀️', title: 'Климат', desc: 'Экстремалды температура мен бірегей биоалуантүрлілік' }
          ].map(item => (
            <div key={item.title} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  )
}