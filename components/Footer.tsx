export default function Footer() {
  return (
    <footer
      className="py-14 px-6 border-t border-slate-200 bg-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Логотип пен сипаттама (Brand) */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shadow-sm">
                🌿
              </div>
              <div>
                <div className="text-slate-900 font-black leading-none text-xl mb-1">Туған өлке</div>
                <div className="text-emerald-600 text-[10px] font-black tracking-[0.2em] uppercase">Табиғаты</div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed text-slate-500 font-medium max-w-sm"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Қызылорда облысының бірегей экожүйелерін танып-білуге арналған виртуалды экскурсия жобасы.
            </p>
          </div>

          {/* Навигациялық сілтемелер (Links) */}
          <div>
            <h4 className="text-xs font-black mb-6 tracking-widest uppercase text-slate-400">
              Бөлімдер
            </h4>
            <ul className="space-y-3">
              {['Экожүйелер', 'Интерактивті карта', 'Галерея', 'Ғылыми деректер'].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm font-bold cursor-pointer text-slate-600 hover:text-emerald-600 transition-colors"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Экожүйелер (Ecosystems) */}
          <div>
            <h4 className="text-xs font-black mb-6 tracking-widest uppercase text-slate-400">
              Экожүйелер
            </h4>
            <ul className="space-y-3">
              {[
                { label: '🌊 Арал теңізі', color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
                { label: '🌿 Сырдария өзені', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
                { label: '🏜️ Қызылқұм шөлі', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
              ].map((item) => (
                <li key={item.label} className="flex items-center">
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border transition-all hover:-translate-y-0.5 cursor-default shadow-sm"
                    style={{
                      color: item.color,
                      backgroundColor: item.bg,
                      borderColor: item.border,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Төменгі жолақ (Bottom bar) */}
        <div
          className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs font-semibold text-slate-400"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            © 2026 Туған өлке табиғаты · Қызылорда облысы · Экологиялық білім беру жобасы
          </p>
          <p
            className="text-xs font-bold text-slate-300"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Next.js + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}