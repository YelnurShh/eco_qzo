import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemCard from '@/components/EcosystemCard'
import { ecosystems } from '@/app/data/ecosystems'

export default function DesertPage() {
  const eco = ecosystems.find((e) => e.id === 'desert')!

  return (
    // main тегіне ашық фон қостық (шөл далаға сай келетін өте ашық құм/крем түсі)
    <main className="bg-[#fdfcf8] min-h-screen">
      <Navbar />
      <section
        className="min-h-screen pt-28 pb-20 px-6"
        // eco.bgGradient қараңғы болса, оны мына жаңа ашық градиентке ауыстырамыз немесе жай ғана өшіріп тастаймыз (main фоны жұмыс істейді)
        style={{ background: 'linear-gradient(135deg, #fdfcf8 0%, #f4efe6 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-sm hover:opacity-70 transition-opacity font-medium"
            // Ашық фонда анық көрінуі үшін түсін қою қоңыр-алтын (#7a4e0c) түске өзгерттік
            style={{ color: '#7a4e0c', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            ← Басты бетке оралу
          </Link>
          <EcosystemCard eco={eco} index={0} />
        </div>
      </section>
      <Footer />
    </main>
  )
}