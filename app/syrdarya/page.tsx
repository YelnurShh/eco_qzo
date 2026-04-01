import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemCard from '@/components/EcosystemCard'
import { ecosystems } from '@/app/data/ecosystems'

export default function SyrdaryaPage() {
  const eco = ecosystems.find((e) => e.id === 'syrdarya')!

  return (
    // Негізгі фонды ашық жасыл реңкке ауыстырдық
    <main className="bg-[#f0fdf4] min-h-screen">
      <Navbar />
      <section
        className="min-h-screen pt-28 pb-20 px-6"
        // Сырдария өзені мен тоғайларына тән жұмсақ жасыл градиент
        style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-sm px-4 py-2 rounded-full backdrop-blur-md transition-all hover:bg-white/40 shadow-sm"
            // Ашық фонда жақсы көрінетін қою жасыл түс (#1a5930) және шыны эффектісі
            style={{ 
              color: '#1a5930', 
              fontFamily: 'IBM Plex Sans, sans-serif',
              background: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            ← Басты бетке оралу
          </Link>
          
          {/* Анимациялық нүктелер астында көрініп тұруы үшін EcosystemCard-ты Glass орауышқа саламыз */}
          <div className="backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/40">
            <EcosystemCard eco={eco} index={0} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}