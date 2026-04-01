import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'

export default function GalleryPage() {
  return (
    // Негізгі фон ашық сұр/ақшыл, шрифт Montserrat (Жаңа ортақ стиль)
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      {/* Қараңғы стиль алынып тасталды, оның орнына ашық әрі кеңістігі көп контейнер */}
      <div className="pt-28 pb-10 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-2">
          
          {/* Кері қайту сілтемесі (Басқа беттермен бірдей стильде) */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#d98825] transition-colors"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            ← БАСТЫ БЕТКЕ ОРАЛУ
          </Link>
          
        </div>
        
        {/* Жаңартылған ашық Галерея компоненті */}
        <Gallery />
        
      </div>
      <Footer />
    </main>
  )
}