import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'

export default function GalleryPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20" style={{ background: '#0d0a05', minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-sm hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            ← Басты бетке оралу
          </Link>
        </div>
        <Gallery />
      </div>
      <Footer />
    </main>
  )
}
