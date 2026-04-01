'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Aral3DTour() {
  // Өзіңнің Kuula-дан алған сілтемеңді мына жерге қой:
  const kuulaLink = "https://kuula.co/share/collection/7M1cM?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Кері қайту */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10 text-sm font-black text-slate-400 hover:text-blue-600 transition-all">
          ← БАСТЫ БЕТКЕ ОРАЛУ
        </Link>

        {/* Тақырып бөлімі */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-blue-50 text-blue-600 border border-blue-100 mb-6">
            Виртуалды саяхат
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Арал теңізі: <span className="text-blue-500 italic">360° Тур</span>
          </h1>
          <p className="max-w-2xl text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Телефонды немесе тышқанды пайдаланып, Арал теңізінің экожүйесін жан-жағынан зерттеңіз. 
            Бұл панорама нақты локацияның 3D көрінісін береді.
          </p>
        </div>

        {/* ── ПАНОРАМА ТЕРЕЗЕСІ (Embed) ── */}
        <div className="relative group">
          {/* Сәндік фондық жарқыл */}
          <div className="absolute -inset-4 bg-blue-400/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
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
              🖱️ Айналдыру үшін басыңыз
            </div>
            <div className="px-5 py-2.5 rounded-full bg-blue-600 shadow-lg text-[10px] font-black uppercase tracking-widest text-white">
              Full 360° View
            </div>
          </div>
        </div>

        {/* Қосымша мәліметтер */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '📱', title: 'Смартфон', desc: 'Телефонды айналдыру арқылы гироскопты қолданыңыз' },
            { icon: '👓', title: 'VR Режим', desc: 'VR көзілдірік болса, арнайы батырманы басыңыз' },
            { icon: '🔍', title: 'Жақындату', desc: 'Тышқан дөңгелегі арқылы детальдарды көріңіз' }
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