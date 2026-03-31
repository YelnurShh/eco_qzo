import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemCard from '@/components/EcosystemCard'
import { ecosystems } from '@/app/data/ecosystems'

export default function AralPage() {
  const eco = ecosystems.find((e) => e.id === 'aral')!

  return (
    <main>
      <Navbar />
      <section
        className="min-h-screen pt-28 pb-20 px-6"
        style={{ background: eco.bgGradient }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-sm hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
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
