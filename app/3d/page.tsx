'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const tours = [
  {
    id: 'aral',
    name: 'Арал теңізі',
    description: 'Тартылған теңіз табаны мен Қоқарал бөгетінің көрінісі.',
    emoji: '🌊',
    color: '#0ea5e9',
    image: 'https://qaz.ulysmedia.kz/cache/imagine/1200/uploads/news/2024/06/24/66791a67e7c4e663252070.jpg',
    href: '/3d/aral'
  },
  {
    id: 'syrdarya',
    name: 'Сырдария өзені',
    description: 'Өзен аңғары мен жағалаудағы тоғай ормандары.',
    emoji: '🌿',
    color: '#22c55e',
    image: 'https://aqmeshit-zhastary.kz/wp-content/uploads/2023/01/1610551500_syrdarya-river-syrdarya-reka-3.jpg',
    href: '/3d/syrdarya'
  },
  {
    id: 'desert',
    name: 'Қызылқұм шөлі',
    description: 'Шексіз құм шағылдары мен сексеуіл алқаптары.',
    emoji: '🏜️',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80',
    href: '/3d/desert'
  }
]

export default function ThreeDPortal() {
  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6">
            Инновациялық білім
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Виртуалды <span className="text-indigo-600 italic">3D Экспедиция</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Төмендегі локациялардың бірін таңдап, 360° панорамалық турды бастаңыз. 
            Табиғаттың тылсым күшін телефон арқылы сезініңіз.
          </p>
        </div>

        {/* Tour Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Link key={tour.id} href={tour.href} className="group relative block">
              <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                {/* Background Image */}
                <img 
                  src={tour.image} 
                  alt={tour.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-4 border border-white/30">
                    {tour.emoji}
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                    {tour.name}
                  </h2>
                  <p className="text-white/70 text-sm mb-6 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {tour.description}
                  </p>
                  <div 
                    className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase py-3 px-6 rounded-xl bg-white text-slate-900 self-start group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                  >
                    ТУРДЫ БАСТАУ <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}