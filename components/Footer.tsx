export default function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ borderColor: 'rgba(201,125,30,0.15)', background: '#080604' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-3 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center text-lg">
                🌿
              </div>
              <div>
                <div className="text-sand-300 font-semibold leading-none">Туған елке</div>
                <div className="text-sand-600 text-xs tracking-widest uppercase">Табиғаты</div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'rgba(245,234,213,0.4)',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Қызылорда облысының бірегей экожүйелерін танып-білуге арналған виртуалды экскурсия жобасы.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 tracking-wide"
              style={{ color: '#e8b96e', fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Бөлімдер
            </h4>
            <ul className="space-y-2">
              {['Экожүйелер', 'Интерактивті карта', 'Галерея', 'Ғылыми деректер'].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm cursor-pointer hover:text-sand-300 transition-colors"
                    style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystems */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 tracking-wide"
              style={{ color: '#93ccfb', fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Экожүйелер
            </h4>
            <ul className="space-y-2">
              {[
                { label: '🌊 Арал теңізі', color: '#3b8ef1' },
                { label: '🌿 Сырдария өзені', color: '#52a869' },
                { label: '🏜️ Қызылқұм шөлі', color: '#c97d1e' },
              ].map((item) => (
                <li key={item.label}>
                  <span
                    className="text-sm"
                    style={{ color: item.color + '90', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(201,125,30,0.1)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(245,234,213,0.25)', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            © 2025 Туған елке табиғаты · Қызылорда облысы · Экологиялық білім беру жобасы
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(245,234,213,0.2)', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            «Туған елке табиғаты» бағыты · Next.js + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
