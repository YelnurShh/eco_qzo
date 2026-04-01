'use client'

import React, { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    title: 'Арал теңізі',
    subtitle: 'Теңіз тарихы',
    emoji: '🌊',
    // Опаситиді көбейттік (0.15 -> 0.6) және градиент түстерін қанық еттік
    gradient: 'linear-gradient(135deg, rgba(186, 230, 253, 0.4) 0%, rgba(56, 189, 248, 0.2) 100%)',
    color: '#0369a1',
    description: 'Арал теңізі – Қазақстанның інжу-маржаны, шөл белде-міндегі бірден-бір көгілдір су айдыны еді. Оның апатқа ұшырағанға дейінгі көлемі – 1066 км³, тереңдігі – 30-60 метр, тұздылығы – 10-12% болған. Қойнауы кәсіптік бағалы балықтарға бай, жағасы қоға мен қамысты теңіз еді.',
    facts: ['Ең терең жері 22 метр', '24 түрлі жануар', 'Арал теңізі апаты'],
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
    gradient: 'linear-gradient(135deg, rgba(187, 247, 208, 0.5) 0%, rgba(74, 222, 128, 0.2) 100%)',
    color: '#15803d',
    description: 'Өзен бойындағы тоғайлар — Орта Азиядағы ең бай биологиялық аймақтардың бірі. Мұнда 156-дан астам құс түрі тіршілік етеді.',
    facts: ['156+ құс түрі', '42 балық түрі', 'Тоғай ормандары'],
    media: [
      { type: 'image', url: 'https://aqmeshit-zhastary.kz/wp-content/uploads/2023/01/1610551500_syrdarya-river-syrdarya-reka-3.jpg' },
      { type: 'image', url: 'https://gdb.rferl.org/01000000-c0a8-0242-d4dc-08dcbb7fdd99_cx0_cy8_cw0_w1071_r1_d3.jpg' },
      { type: 'image', url: 'https://tirshilik-tynysy.kz/uploads/posts/2021-06/1623761631_163940_1575530713-1.jpg'},
      { type: 'video', url: 'https://www.youtube.com/embed/MVcnbhQ4Sbs?rel=0' }
    ]
  },
  {
    id: 3,
    title: 'Қызылқұм',
    subtitle: 'Саксаул ормандары',
    emoji: '🏜️',
    gradient: 'linear-gradient(135deg, rgba(253, 230, 138, 0.5) 0%, rgba(251, 191, 36, 0.2) 100%)',
    color: '#b45309',
    description: 'Саксаул ағаштары шөл жерінде судың нағыз қорғаушысы. Тамыры 30 метрге жетеді, топырақты бекітіп ұстайды.',
    facts: ['1000+ өсімдік', 'Жейран мекені', 'Варан тіршілейді'],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80' },
      { type: 'image', url: 'https://aqiqat.kazgazeta.kz/wp-content/uploads/2019/05/46951007_318701928979408_8605856715330786883_n.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=f0ba29bed475f07d2546b261e19da81f0f0f90b9-4724925-images-thumbs&n=13' },
      { type: 'video', url: 'https://www.youtube.com/embed/9HcXjmb1cjs?rel=0' }
    ]
  },
  {
    id: 4,
    title: 'Қарақұйрық',
    subtitle: 'Сирек жануар',
    emoji: '🦌',
    gradient: 'linear-gradient(135deg, rgba(254, 215, 170, 0.6) 0%, rgba(251, 146, 60, 0.2) 100%)',
    color: '#b45309',
    description: 'Қарақұйрық— Қызылорда облысының символы. Браконьерліктен кейін саны азайып, қазір қорғалуда.',
    facts: ['Қорғалатын түр', 'Жылдамдығы 80 км/с', 'Шөлде тіршілік етеді'],
    media: [
      { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi0yLVC8ab26YUCYlhYKNvdmVMEBXEtzdgcA&s' },
      { type: 'image', url: 'https://www.matritca.kz/uploads/posts/2020-04/1588223558_mar.jpg' },
      { type: 'image', url: 'https://inbusiness.kz/uploads/2022-7/axi0KKhZ.jpeg' },
      { type: 'video', url: 'https://www.youtube.com/embed/gxEZRFj-Nc4?rel=0' }
    ]
  },
  {
    id: 5,
    title: 'Байқоңыр аймағы',
    subtitle: 'Шөл ортасындағы ғылым',
    emoji: '🚀',
    gradient: 'linear-gradient(135deg, rgba(221, 214, 254, 0.6) 0%, rgba(167, 139, 250, 0.2) 100%)',
    color: '#6d28d9',
    description: 'Байқоңыр ғарыш айлағы орналасқан аймақта ерекше экожүйе қалыптасқан — адам іс-әрекетімен табиғаттың бірегей үйлесімі.',
    facts: ['Шөл экожүйесі', 'Ерекше биоаймақ', 'Зерттеу объектісі'],
    media: [
      { type: 'image', url: 'https://bilim-all.kz//uploads/images/2024/03/16/original/44ac7c993a9b8d1a4414a06d7e03c170.jpg' },
      { type: 'image', url: 'https://qazir.kz/uploads/36e7b0a9cf40fe3f75449f6cad570e8a.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=21637bab6361e8a9a16e78b5e315e5db4df73bf0-5896716-images-thumbs&n=13' },
      { type: 'video', url: 'https://www.youtube.com/embed/A2wzRL6JcYg?rel=0' }
    ]
  },
  {
    id: 6,
    title: 'Тырна',
    subtitle: 'Сырдарияның символы',
    emoji: '🦩',
    gradient: 'linear-gradient(135deg, rgba(167, 243, 208, 0.6) 0%, rgba(52, 211, 153, 0.2) 100%)',
    color: '#15803d',
    description: 'Тырна (Grus grus) — Сырдарияның жайылмасы мен Арал аймағында ұялайтын аса сирек және сұлу құс.',
    facts: ['Ұялайды', 'Ұзақ уақыт ұшады', 'Жұптасып тіршілейді'],
    media: [
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Demoiselle_crane_anthropoides_virgo.jpg' },
      { type: 'image', url: 'https://wild-life.kz/wp-content/uploads/2024/11/66e7cc2c70fd2f97c57c46e2__vt_9112.jpg' },
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=bcf9c4bd86d5ce03621768b185b696d340ce8533-10702829-images-thumbs&n=13' },
      { type: 'image', url: 'https://zooldata.kz/static/images/ANTHVIRG/MAIN/Anthropoides%20virgo.jpg' },
    ]
  },
  {
    id: 7,
    title: 'Сексеуіл',
    subtitle: 'Шөлдің қорғаушысы',
    emoji: '🌳',
    gradient: 'linear-gradient(135deg, rgba(163, 163, 163, 0.4) 0%, rgba(120, 113, 108, 0.2) 100%)',
    color: '#78716c',
    description: 'Сексеуіл — шөлді аймақтардың экологиялық тепе-теңдігін сақтауда басты рөл атқарады. Оның тамыры құмды тоқтатып, шөлейттенуге жол бермейді.',
    facts: ['Тамыры 30 м жетеді', 'Отын ретінде тыйым салынған', '1 тонна су сақтайды'],
    media: [
      { type: 'image', url: 'https://turkystan.kz/uploads/cache/1200x630/resized-images/2019/08/42685903f061698e8b8522c8d6d98bb6.jpg' },
      { type: 'image', url: 'https://kaz.zakon.kz/pbi/WEBP/2024-11-01/file-29e176bc-33e3-4716-99c6-5d02ca0be2e3/800x450.webp' },
      { type: 'image', url: 'https://qarmaqshy-tany.kz/uploads/posts/2018-09/1537444699_01-3.jpg' },
      { type: 'video', url: 'https://www.youtube.com/embed/m_L54BKkyRM?rel=0' }
    ]
  },
  {
    id: 8,
    title: 'Жусан',
    subtitle: 'Дала жұпары',
    emoji: '🌱',
    gradient: 'linear-gradient(135deg, rgba(217, 249, 157, 0.4) 0%, rgba(132, 204, 22, 0.2) 100%)',
    color: '#65a30d',
    description: 'Жусан — қазақ даласының символы. Қызылорда өңірінде оның бірнеше түрі өседі, әсіресе дәрілік және құнарлы мал азығы ретінде бағаланады.',
    facts: ['Дәрілік қасиеті бар', 'Ыстыққа өте төзімді', 'Топырақты қорғайды'],
    media: [
      { type: 'image', url: 'https://bilim-all.kz//uploads/images/2017/05/01/original/b30acbbd6fdcfe6fe4a165309d75312e.jpg' },
      { type: 'image', url: 'https://bilim-all.kz//uploads/images/2017/05/01/original/f05c56d23bfa04ca209402b41b55f3d9.jpg' },
      { type: 'image', url: 'https://rast.kz/wp-content/uploads/jwsan1.jpg' },
      { type: 'video', url: 'https://www.youtube.com/embed/1tPiK83IZXc?rel=0' }
    ]
  },
  {
    id: 9,
    title: 'Шренк қызғалдағы',
    subtitle: 'Көктем гүлі',
    emoji: '🌷',
    // Қызыл-қызғылт реңкті қанық градиент
    gradient: 'linear-gradient(135deg, rgba(254, 202, 202, 0.6) 0%, rgba(248, 113, 113, 0.2) 100%)',
    color: '#e11d48', // Қанық қызыл (Rose-600)
    description: 'Шренк қызғалдағы — Қазақстанның Қызыл кітабына енген бірегей өсімдік. Ол қазіргі мәдени қызғалдақтардың арғы атасы болып саналады және сұлулығымен ерекшеленеді.',
    facts: ['Қызыл кітапқа енген', 'Жұлуға тыйым салынған', 'Сәуірде гүлдейді'],
    media: [
      { type: 'image', url: 'https://avatars.mds.yandex.net/i?id=21189009925fc86361de9543ffce39e40a0a6537-4076134-images-thumbs&n=13' },
      { type: 'image', url: 'https://lh4.googleusercontent.com/proxy/xuTIw3-61NgBrFXJ20yBaLrlT-ePyLNP7mCVa8h6jA0pSw9uVayrhvMOeptIwgzLW2LaulGqYPYePvE06oNJY994iPlPh7UA4jfO-uiPjbWPVC_5aL4GqDbIbECBWVl15rqLBby_9KjGZvhiYMse_MGbeWjowoo0AzBJBsIZpzed3k8TOnU' },
      { type: 'image', url: 'https://kazgazeta.kz/media/2021/03/07/ooooooooooooooooooooo.jpg' },
      { type: 'video', url: 'https://www.youtube.com/embed/4JAae2tvKsA?rel=0' }
    ]
  },
]

type GalleryItemType = typeof galleryItems[0];

export default function Gallery() {
  const [activeItem, setActiveItem] = useState<GalleryItemType | null>(null)

  return (
    <>
      <section id="gallery" className="py-12 relative w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* ── Тақырып бөлімі ── */}
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 bg-amber-50 text-amber-700 border border-amber-200">
              ТАБИҒАТ ГАЛЕРЕЯСЫ
            </div>
            <h2 className="mb-4 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Бірегей <span className="text-emerald-600 italic">көріністер</span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-500 font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              Қызылорда облысының табиғи сұлулығын суреттер мен бейнематериалдар арқылы тамашалаңыз.
            </p>
          </div>

          {/* ── Галерея торкөзі ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-2 bg-white shadow-sm hover:shadow-2xl border border-slate-100"
                style={{ height: '300px' }}
              >
                {/* Артқы фондағы үлкен эмодзи */}
                <div
                  className="absolute text-9xl transition-transform duration-700 group-hover:scale-125 select-none opacity-[0.05] grayscale group-hover:grayscale-0"
                  style={{ right: '-15px', bottom: '-20px' }}
                >
                  {item.emoji}
                </div>


<div 
  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80" 
  style={{ background: item.gradient }}
/>

                {/* Контент */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div>
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-white shadow-sm border border-slate-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ filter: `drop-shadow(0 4px 10px ${item.color}30)` }}
                    >
                      {item.emoji}
                    </div>
                    <div className="text-[10px] tracking-widest uppercase font-black mb-2" style={{ color: item.color }}>
                      {item.subtitle}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Медиа көру батырмасы */}
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-sm w-fit transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-bold text-slate-800">Медиа көру</span>
                    <span className="text-slate-400 font-bold transition-transform group-hover:translate-x-1" style={{ color: item.color }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── МОДАЛЬ ТЕРЕЗЕ ── */}
      {activeItem && (
        // items-center орнына py-10 қостық (жоғарыдан және төменнен 40px бос орын береді)
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 md:py-20 bg-slate-900/60 backdrop-blur-md" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          
          {/* Қараңғы фонды басу арқылы жабу */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveItem(null)}></div>
          
          {/* my-auto қостық (ортада тұруы үшін) және max-h өзгерді */}
          <div className="relative w-full max-w-5xl max-h-[85vh] my-auto overflow-y-auto rounded-[2.5rem] p-8 md:p-12 bg-white shadow-2xl border border-slate-200 animate-scaleUp">
            
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-20 text-xl font-bold"
            >
              ✕
            </button>

            <div className="mb-10 flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl flex-shrink-0 shadow-sm border border-slate-100"
                style={{ background: activeItem.gradient }}
              >
                {activeItem.emoji}
              </div>
              
              <div className="pt-2">
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: activeItem.color }}>
                  {activeItem.subtitle}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-slate-600 text-base md:text-lg max-w-3xl mb-6 leading-relaxed font-medium" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {activeItem.description}
                </p>
                
                <div className="flex flex-wrap gap-2.5">
                  {activeItem.facts.map((fact) => (
                    <span
                      key={fact}
                      className="text-xs px-4 py-2 rounded-xl font-bold shadow-sm border"
                      style={{
                        background: 'white',
                        borderColor: `${activeItem.color}30`,
                        color: activeItem.color,
                      }}
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {activeItem.media?.map((media, index) => (
                <div 
                  key={index} 
                  className="rounded-3xl overflow-hidden bg-slate-50 aspect-video relative group border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {media.type === 'image' ? (
                    <img 
                      src={media.url} 
                      alt={`${activeItem.title} - фото ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <iframe 
                      src={media.url} 
                      title={`${activeItem.title} video`}
                      className="w-full h-full border-none"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  )}
                  <div className="absolute inset-0 shadow-inner pointer-events-none rounded-3xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Анимация стильдері */}
      <style jsx global>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scaleUp {
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  )
}