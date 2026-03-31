import type { Metadata } from 'next'
import { Playfair_Display, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

// Шрифттерді оңтайландыру (subsets қазақ тілі үшін маңызды)
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Туған өлке табиғаты — Қызылорда экожүйелері',
  description: 'Қызылорда облысының бірегей табиғи экожүйелерін зерттейтін виртуалды экскурсия: Арал теңізі, Сырдария өзені, шөл далалар.',
  keywords: 'Қызылорда, экожүйе, Арал теңізі, Сырдария, шөл, табиғат, виртуалды экскурсия',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // HTML-ге шрифт айнымалыларын қосамыз
    <html lang="kk" className={`${playfair.variable} ${ibmPlex.variable}`}>
      <body className="noise antialiased">
        {children}
      </body>
    </html>
  )
}