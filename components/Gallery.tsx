'use client'

import { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    title: 'Солтүстік Арал',
    subtitle: 'Судың оралуы',
    emoji: '🌊',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3d6b 50%, #2c5fa0 100%)',
    color: '#3b8ef1',
    description: 'Қоқарал бөгетінен кейін Арал теңізінің Солтүстік бөлігіне су оралып, жануарлар мен балықтар тіршілік ете бастады.',
    facts: ['Су деңгейі +4 м', 'Балықтар оралды', 'Фламинго ұялайды'],
    media: [
      { type: 'image', url: 'https://qaz.ulysmedia.kz/cache/imagine/1200/uploads/news/2024/06/24/66791a67e7c4e663252070.jpg' },
      { type: 'image', url: 'https://baq.kz/storage/cache_resize/news/2025/02/10/oBwoxKHwefC4d6DuFDP0WzGfKP7ZFk5FdYQEIouT.jpg_width=1200Xheight=autoXtype=1.jpg' },
      { type: 'image', url: 'https://kaz.zakon.kz/pbi/WEBP/2026-01-26/file-42a34820-d12a-4e82-93b0-fc6ff508ebfd/800x450.orig.webp' },
      { type: 'video', url: 'https://www.youtube.com/embed/NxFNoHBCuwA?rel=0' }
    ]
  },
  {
    id: 2,
    title: 'Сырдария жайылмасы',
    subtitle: 'Тоғай ормандары',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #071a0c 0%, #0f3320 50%, #1a5c38 100%)',
    color: '#52a869',
    description: 'Өзен бойындағы тоғайлар — Орта Азиядағы ең бай биологиялық аймақтардың бірі. Мұнда 156-дан астам құс түрі тіршілік етеді.',
    facts: ['156+ құс түрі', '42 балық түрі', 'Тоғай ормандары'],
    media: [
      { type: 'image', url: 'https://aqmeshit-zhastary.kz/wp-content/uploads/2023/01/1610551500_syrdarya-river-syrdarya-reka-3.jpg' },
      { type: 'image', url: 'https://gdb.rferl.org/01000000-c0a8-0242-d4dc-08dcbb7fdd99_cx0_cy8_cw0_w1071_r1_d3.jpg' },
      { type: 'image', url: 'https://tirshilik-tynysy.kz/uploads/posts/2021-06/1623761631_163940_1575530713-1.jpg'},
      { type: 'video', url: 'https://www.youtube.com/embed/MVcnbhQ4Sbs?rel=0' } // Мысал ретінде YouTube сілтемесі
    ]
  },
  {
    id: 3,
    title: 'Қызылқұм',
    subtitle: 'Саксаул ормандары',
    emoji: '🏜️',
    gradient: 'linear-gradient(135deg, #1a0c00 0%, #3d1f00 50%, #6b3a00 100%)',
    color: '#c97d1e',
    description: 'Саксаул ағаштары шөл жерінде судың нағыз қорғаушысы. Тамыры 30 метрге жетеді, топырақты бекітіп ұстайды.',
    facts: ['1000+ өсімдік', 'Жейран мекені', 'Варан тіршілейді'],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80' },
      { type: 'image', url: 'https://aqiqat.kazgazeta.kz/wp-content/uploads/2019/05/46951007_318701928979408_8605856715330786883_n.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=f0ba29bed475f07d2546b261e19da81f0f0f90b9-4724925-images-thumbs&n=13' },
      {type: 'video', url: 'https://www.youtube.com/embed/9HcXjmb1cjs?rel=0'}
    ]
  },
  {
    id: 4,
    title: 'Қарақұйрық',
    subtitle: 'Сирек жануар',
    emoji: '🦌',
    gradient: 'linear-gradient(135deg, #1a1208 0%, #3d2a10 50%, #6b4a20 100%)',
    color: '#e8b96e',
    description: 'Қарақұйрық— Қызылорда облысының символы. Браконьерліктен кейін саны азайып, қазір қорғалуда.',
    facts: ['Қорғалатын түр', 'Жылдамдығы 80 км/с', 'Шөлде тіршілік етеді'],
    media: [
      { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi0yLVC8ab26YUCYlhYKNvdmVMEBXEtzdgcA&s' },
      { type: 'image', url: 'https://www.matritca.kz/uploads/posts/2020-04/1588223558_mar.jpg' },
      { type: 'image', url: 'https://inbusiness.kz/uploads/2022-7/axi0KKhZ.jpeg' },
      {type: 'video', url: 'https://www.youtube.com/embed/gxEZRFj-Nc4?rel=0'}
    ]
  },
  {
    id: 5,
    title: 'Байқоңыр аймағы',
    subtitle: 'Шөл ортасындағы ғылым',
    emoji: '🚀',
    gradient: 'linear-gradient(135deg, #080a1a 0%, #151f3d 50%, #1e3060 100%)',
    color: '#9b7de8',
    description: 'Байқоңыр ғарыш айлағы орналасқан аймақта ерекше экожүйе қалыптасқан — адам іс-әрекетімен табиғаттың бірегей үйлесімі.',
    facts: ['Шөл экожүйесі', 'Ерекше биоаймақ', 'Зерттеу объектісі'],
    media: [
      { type: 'image', url: 'https://bilim-all.kz//uploads/images/2024/03/16/original/44ac7c993a9b8d1a4414a06d7e03c170.jpg' },
      { type: 'image', url: 'https://qazir.kz/uploads/36e7b0a9cf40fe3f75449f6cad570e8a.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=21637bab6361e8a9a16e78b5e315e5db4df73bf0-5896716-images-thumbs&n=13' },
      {type: 'video', url: 'https://www.youtube.com/embed/A2wzRL6JcYg?rel=0'}
    ]
  },
  {
    id: 6,
    title: 'Тырна',
    subtitle: 'Сырдарияның символы',
    emoji: '🦩',
    gradient: 'linear-gradient(135deg, #071412 0%, #0f2a24 50%, #1a4a40 100%)',
    color: '#5ecfbf',
    description: 'Тырна (Grus grus) — Сырдарияның жайылмасы мен Арал аймағында ұялайтын аса сирек және сұлу құс.',
    facts: ['Ұялайды', 'Ұзақ уақыт ұшады', 'Жұптасып тіршілейді'],
    media: [
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Demoiselle_crane_anthropoides_virgo.jpg' },
      { type: 'image', url: 'https://wild-life.kz/wp-content/uploads/2024/11/66e7cc2c70fd2f97c57c46e2__vt_9112.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=bcf9c4bd86d5ce03621768b185b696d340ce8533-10702829-images-thumbs&n=13' },
      { type: 'image', url: 'https://zooldata.kz/static/images/ANTHVIRG/MAIN/Anthropoides%20virgo.jpg' },
    ]
  },
]

export default function Gallery() {
  // Енді id емес, толық объектіні сақтаймыз (Модаль ашу үшін)
  const [activeItem, setActiveItem] = useState<typeof galleryItems[0] | null>(null)

  return (
    <>
      <section
        id="gallery"
        className="py-24 px-6 relative"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(201,125,30,0.06) 0%, transparent 60%), #0d0a05',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-5"
              style={{
                background: 'rgba(232,185,110,0.1)',
                border: '1px solid rgba(232,185,110,0.25)',
                color: '#e8b96e',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Табиғат галереясы
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#f5ead5',
              }}
            >
              Бірегей{' '}
              <em className="not-italic" style={{ color: '#e8b96e' }}>
                көріністер
              </em>
            </h2>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: item.gradient,
                  border: `1px solid ${item.color}25`,
                  height: '280px',
                }}
              >
                {/* Big emoji background */}
                <div
                  className="absolute text-8xl transition-transform duration-500 group-hover:scale-110 select-none"
                  style={{
                    right: '-10px',
                    bottom: '-10px',
                    opacity: 0.15,
                    filter: 'blur(2px)',
                  }}
                >
                  {item.emoji}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div
                      className="text-3xl mb-3"
                      style={{ filter: `drop-shadow(0 0 10px ${item.color})` }}
                    >
                      {item.emoji}
                    </div>
                    <div
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: item.color, fontFamily: 'IBM Plex Sans, sans-serif' }}
                    >
                      {item.subtitle}
                    </div>
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#f5ead5',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
                    style={{ color: '#f5ead5', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    <span>Медиа көру</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${item.color}60, 0 0 30px ${item.color}20`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL (Қалқымалы терезе) */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          {/* Фонды басса жабылуы үшін */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setActiveItem(null)}
          ></div>

          {/* Модаль терезесінің өзі */}
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 shadow-2xl"
            style={{
              background: activeItem.gradient,
              border: `1px solid ${activeItem.color}40`,
            }}
          >
            {/* Жабу батырмасы */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
            >
              ✕
            </button>

            {/* Тақырып мен сипаттама */}
            <div className="mb-8">
              <div className="text-4xl mb-2">{activeItem.emoji}</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-[#f5ead5]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {activeItem.title}
              </h3>
              <p className="text-[#f5ead5]/80 text-sm md:text-base max-w-2xl mb-4 leading-relaxed">
                {activeItem.description}
              </p>
              
              {/* Фактілер */}
              <div className="flex flex-wrap gap-2">
                {activeItem.facts.map((fact) => (
                  <span
                    key={fact}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: `${activeItem.color}20`,
                      border: `1px solid ${activeItem.color}40`,
                      color: activeItem.color,
                    }}
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            {/* Медиа Галерея (Суреттер мен Видеолар) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeItem.media?.map((media, index) => (
                <div key={index} className="rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-video relative">
                  {media.type === 'image' ? (
                    <img 
                      src={media.url} 
                      alt={`${activeItem.title} - фото ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <iframe 
                      src={media.url} 
                      title={`${activeItem.title} video`}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}