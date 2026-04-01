import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemCard from '@/components/EcosystemCard'
import { ecosystems } from '@/app/data/ecosystems'

export default function AralPage() {
  const eco = ecosystems.find((e) => e.id === 'aral')!

  return (
    // Негізгі фонды ашық көгілдір реңкке ауыстырдық
    <main className="bg-[#f0f9ff] min-h-screen">
      <Navbar />
      <section
        className="min-h-screen pt-28 pb-20 px-6"
        // Арал теңізіне тән жұмсақ көк градиент
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-sm hover:opacity-70 transition-opacity font-medium"
            // Көгілдір фонда жақсы көрінетін қою теңіз көгі түсі (#0f527c)
            style={{ color: '#0f527c', fontFamily: 'IBM Plex Sans, sans-serif' }}
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