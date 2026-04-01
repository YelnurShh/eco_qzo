'use client'

import { useEffect, useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────
type EcoType = 'aral' | 'syrdarya' | 'desert' | 'city' | 'protected'

interface MapPoint {
  id: string
  name: string
  coords: [number, number]
  type: EcoType
  description: string
  area?: string
  threat?: string
  flora?: string[]
  fauna?: string[]
  fact?: string
  minZoom?: number // only show at this zoom level or higher
}

// ── Data (Ашық фон үшін түстер қоюлатылды) ──────────────────────────────
const typeColors: Record<EcoType, string> = {
  aral:      '#0369a1', // Қою көк
  syrdarya:  '#15803d', // Қою жасыл
  desert:    '#b45309', // Қою сарғыш/қоңыр
  city:      '#d97706', // Сарғыш/Янтарь
  protected: '#6d28d9', // Қою күлгін
}
const typeEmojis: Record<EcoType, string> = {
  aral:      '🌊',
  syrdarya:  '🌿',
  desert:    '🏜️',
  city:      '🏙️',
  protected: '🛡️',
}
const typeLabels: Record<EcoType, string> = {
  aral:      'Арал теңізі',
  syrdarya:  'Сырдария',
  desert:    'Шөл аймағы',
  city:      'Қала',
  protected: 'Қорғалатын аймақ',
}

const ALL_POINTS: MapPoint[] = [
  // ── Aral Sea ────────────────────────────────────────────────
  {
    id: 'north-aral',
    name: 'Солтүстік Арал теңізі',
    coords: [46.8, 61.2],
    type: 'aral',
    area: '3 300 км²',
    threat: 'Қалпына келуде',
    description: 'Қоқарал бөгетінен кейін су деңгейі 4 метрге көтерілді. Балық аулау қайта жандана бастады.',
    flora: ['Сасыр', 'Теңіз жусаны', 'Қызыл гүл'],
    fauna: ['Сазан', 'Фламинго', 'Тырна', 'Стрепет'],
    fact: '2005 жылдан бастап судың деңгейі тұрақты өсуде',
  },
  {
    id: 'kokaral-dam',
    name: 'Қоқарал бөгеті',
    coords: [46.05, 61.95],
    type: 'aral',
    area: '13 км ұзындық',
    threat: 'Жақсы күйде',
    description: 'Дүниежүзілік банктің қаржыландыруымен 2005 жылы салынған. Арал теңізін қалпына келтіру жобасының негізі.',
    flora: ['Жағалау шөбі', 'Қамыс'],
    fauna: ['Сазан', 'Жайын', 'Шортан'],
    fact: 'Бөгет салынғаннан кейін 24 түр балық тіршілік ете бастады',
  },
  {
    id: 'aral-delta',
    name: 'Сырдария дельтасы',
    coords: [46.55, 61.05],
    type: 'aral',
    area: '2 100 км²',
    threat: 'Орташа',
    description: 'Өзеннің теңізге құятын дельтасы — тоғай жүйесі мен су құстарының мекені.',
    flora: ['Қамыс', 'Рогоз', 'Жолдық шөп'],
    fauna: ['Тырна', 'Бақылдақ', 'Үйрек', 'Қаз'],
    fact: 'Дельта аймағы 150-ден астам су құсы түрінің ұялау орны',
    minZoom: 7,
  },
  {
    id: 'aral-ship-graveyard',
    name: 'Мойнақ кеме зираты',
    coords: [43.77, 59.02],
    type: 'aral',
    area: '—',
    threat: 'Апат аймағы',
    description: 'Кезінде теңіз жағасында тұрған Мойнақ қалашығы. Бүгінде ескі кемелер құм ішінде қалды.',
    flora: ['Шөл өсімдіктері'],
    fauna: ['Шөл жануарлары'],
    fact: 'Мойнақ — Арал апатының символы. Жыл сайын мыңдаған турист келеді',
  },
  // ── Syrdarya River ──────────────────────────────────────────
  {
    id: 'kyzylorda-city',
    name: 'Қызылорда қаласы',
    coords: [44.853, 65.509],
    type: 'city',
    area: '—',
    description: 'Облыс орталығы. Халқы 340 000 адам. Сырдария жағасында орналасқан.',
    fact: '1853 жылы Ресей империясы кезінде Форт-Перовск деп аталған',
  },
  {
    id: 'syrdarya-upper',
    name: 'Сырдария жоғарғы ағысы',
    coords: [44.2, 67.1],
    type: 'syrdarya',
    area: '—',
    threat: 'Орташа',
    description: 'Өзеннің жоғарғы ағысы — тоғай ормандары мен жайылма алқаптары.',
    flora: ['Жиде', 'Тал', 'Теректер'],
    fauna: ['Тырна', 'Бозторғай', 'Бақа'],
    fact: 'Сырдария ұзындығы 2 212 км — Орта Азиядағы ең ұзын өзен',
  },
  {
    id: 'syrdarya-togai',
    name: 'Сырдария тоғайлары',
    coords: [45.1, 63.8],
    type: 'syrdarya',
    area: '12 000 га',
    threat: 'Жоғары',
    description: 'Сырдария жайылмасының тоғай ормандары — Орта Азиядағы сирек экожүйе.',
    flora: ['Жиде', 'Тал', 'Қара терек', 'Жыңғыл'],
    fauna: ['Тырна', 'Орта Азия тасбақасы', 'Шаян', 'Жыланбалық'],
    fact: 'Тоғай ормандарының 80% XX ғасырда жойылды',
    minZoom: 7,
  },
  {
    id: 'zhanadarya',
    name: 'Жаңадария өзені',
    coords: [45.8, 63.0],
    type: 'syrdarya',
    area: '—',
    threat: 'Критикалық',
    description: 'Сырдарияның ескі арнасы. Бірте-бірте кеуіп, экологиялық дағдарысқа ұшырауда.',
    flora: ['Қамыс', 'Жусан'],
    fauna: ['Шөл жануарлары'],
    fact: 'Жаңадария бірде Аралға дербес жететін ірі өзен болған',
    minZoom: 7,
  },
  {
    id: 'baikonur',
    name: 'Байқоңыр',
    coords: [45.965, 63.305],
    type: 'city',
    area: '—',
    description: 'Ғарыш айлағы орналасқан қала. Шөл ортасындағы бірегей экологиялық аймақ.',
    fact: '1957 жылы Спутник-1 осы жерден ұшырылды',
  },
  {
    id: 'syrdarya-lower',
    name: 'Сырдария төменгі ағысы',
    coords: [45.9, 62.1],
    type: 'syrdarya',
    area: '—',
    threat: 'Жоғары',
    description: 'Өзеннің Аралға жақын бөлігі — судың мөлшері айтарлықтай азайған.',
    flora: ['Қамыс', 'Жолдық шөп'],
    fauna: ['Сазан', 'Шортан', 'Тырна'],
    fact: 'Бұл аймақта су ресурстарын тиімді пайдалану мәселесі өткір тұр',
    minZoom: 7,
  },
  // ── Desert ──────────────────────────────────────────────────
  {
    id: 'kyzylkum-north',
    name: 'Қызылқұм (Солтүстік)',
    coords: [43.8, 63.5],
    type: 'desert',
    area: '90 000 км²',
    threat: 'Жоғары',
    description: 'Қызылорда облысының оңтүстік бөлігіндегі Қызылқұм шөлінің солтүстік секторы.',
    flora: ['Сексеуіл', 'Жусан', 'Кеуел', 'Эфемерлер'],
    fauna: ['Жейран', 'Варан', 'Тасбақа', 'Шөл бүркіті'],
    fact: 'Қызылқұм — «Қызыл құм» деген мағынаны білдіреді',
  },
  {
    id: 'saxaul-forest',
    name: 'Сексеуіл ормандары',
    coords: [43.2, 64.8],
    type: 'desert',
    area: '15 000 га',
    threat: 'Орташа',
    description: 'Сексеуіл — шөлдің нағыз иесі. Тамыры 30 м тереңдікке жетеді, топырақты бекітеді.',
    flora: ['Сексеуіл (ақ)', 'Сексеуіл (қара)', 'Кеуел'],
    fauna: ['Жейран', 'Тасбақа', 'Кесіртке'],
    fact: 'Сексеуіл тамыры 1 тонна суды сіңіре алады',
    minZoom: 7,
  },
  {
    id: 'gazelle-habitat',
    name: 'Қарақұйрықтардың мекені',
    coords: [42.9, 65.5],
    type: 'desert',
    area: '5 000 км²',
    threat: 'Критикалық',
    description: 'Жейранның (Gazella subgutturosa) негізгі тіршілік ету аймағы. Браконьерліктен қорғалуда.',
    flora: ['Жусан', 'Эфемерлер', 'Боз шөп'],
    fauna: ['Жейран', 'Қасқыр', 'Шөл бүркіті', 'Тасбақа'],
    fact: 'Жейран жылдамдығы 80 км/сағ жетеді',
    minZoom: 7,
  },
  {
    id: 'desert-center',
    name: 'Қызылқұм (Орталық)',
    coords: [42.0, 64.0],
    type: 'desert',
    area: '120 000 км²',
    threat: 'Жоғары',
    description: 'Шөлдің орталық бөлігі — экстремалды климат, уникальды биоалуантүрлілік.',
    flora: ['Сексеуіл', 'Жусан', 'Кеуел', 'Шырша'],
    fauna: ['Варан', 'Жейран', 'Тасбақа', 'Қырғауыл'],
    fact: 'Жазда температура +45°C-ге дейін көтеріледі',
  },
  // ── Protected areas ─────────────────────────────────────────
  {
    id: 'barsakelmes',
    name: 'Барсакелмес қорығы',
    coords: [45.7, 59.8],
    type: 'protected',
    area: '160 000 га',
    threat: 'Қорғалатын',
    description: 'Қазақстанның ең ескі қорықтарының бірі. Кулан мен жейранды қорғау үшін құрылған.',
    flora: ['Жусан', 'Теңіз жусаны', 'Шөл өсімдіктері'],
    fauna: ['Кулан', 'Жейран', 'Ақтырна', 'Фламинго'],
    fact: '1939 жылы құрылған. Кулан мен жейранды жойылудан сақтады',
  },
  {
    id: 'altyn-emel',
    name: 'Қызылорда экологиялық аймағы',
    coords: [44.0, 66.5],
    type: 'protected',
    area: '24 000 га',
    threat: 'Бақылауда',
    description: 'Сырдария алқабының қорғалатын аймағы — тоғай экожүйесін сақтау жобасы.',
    flora: ['Жиде', 'Тал', 'Терек'],
    fauna: ['Тырна', 'Орта Азия тасбақасы', 'Жыланбалық'],
    fact: 'Тоғай ормандарын қалпына келтіру бағдарламасы жүргізілуде',
    minZoom: 7,
  },
  {
    id: 'aral-biosphere',
    name: 'Арал биосфералық резерваты',
    coords: [46.2, 60.5],
    type: 'protected',
    area: '200 000 га',
    threat: 'Қалпына келуде',
    description: 'Арал теңізі маңайындағы экожүйені қорғайтын халықаралық резерват.',
    flora: ['Сасыр', 'Теңіз жусаны', 'Тузлук шөбі'],
    fauna: ['Фламинго', 'Тырна', 'Стрепет', 'Сазан'],
    fact: 'ЮНЕСКО бағдарламасы аясында зерттелуде',
  },
  // ── More cities ─────────────────────────────────────────────
  {
    id: 'aralsk',
    name: 'Арал қаласы',
    coords: [46.79, 61.67],
    type: 'city',
    area: '—',
    description: 'Бұрынғы теңіз порты қаласы. Арал апатының тікелей зардабын тартқан аймақ.',
    fact: '1960-жылдары Аралда жыл сайын 40 000 тонна балық ауланған',
  },
  {
    id: 'zhosaly',
    name: 'Жосалы',
    coords: [45.49, 64.09],
    type: 'city',
    description: 'Қармақшы ауданының орталығы. Шөл мен жайылма экожүйелерінің шекарасында.',
    fact: 'Жосалы — Байқоңыр ғарыш айлағына жақын орналасқан',
    minZoom: 7,
  },
]

// ── Ecosystem polygons (approximate) ──────────────────────────
const ECO_POLYGONS = [
  {
    id: 'aral-zone',
    type: 'aral' as EcoType,
    name: 'Арал теңізі аймағы',
    coords: [
      [47.5, 59.0], [47.8, 61.5], [47.2, 63.0],
      [46.0, 63.5], [45.0, 62.8], [44.5, 61.0],
      [45.2, 59.5], [46.5, 58.8],
    ] as [number, number][],
  },
  {
    id: 'syrdarya-zone',
    type: 'syrdarya' as EcoType,
    coords: [
      [44.0, 67.5], [45.0, 66.5], [46.2, 65.0],
      [46.8, 63.5], [47.0, 62.0], [46.5, 61.5],
      [45.8, 61.8], [45.2, 62.5], [44.8, 63.5],
      [44.2, 65.0], [43.8, 66.5],
    ] as [number, number][],
    name: 'Сырдария өзені алқабы',
  },
  {
    id: 'desert-zone',
    type: 'desert' as EcoType,
    coords: [
      [44.5, 61.0], [44.8, 63.5], [44.2, 65.0],
      [43.8, 66.5], [43.0, 67.0], [42.0, 66.0],
      [41.5, 64.0], [41.8, 62.0], [42.5, 60.5],
      [43.5, 60.0],
    ] as [number, number][],
    name: 'Қызылқұм шөлі',
  },
]

// ── Component ─────────────────────────────────────────────────
export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const polygonsRef = useRef<any[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState<EcoType | 'all'>('all')
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [currentZoom, setCurrentZoom] = useState(6)

  // Init map once
  useEffect(() => {
    if (!mapRef.current) return
    let map: any = null

    const init = async () => {
      const L = (await import('leaflet')).default

      const container = mapRef.current as any
      if (container._leaflet_id != null) {
        container._leaflet_id = null
        container.innerHTML = ''
      }

      map = L.map(container, {
        center: [44.8, 62.5],
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
        minZoom: 5,
        maxZoom: 13,
      })
      leafletRef.current = map

      // Ашық (Light) карта стилі (Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      // Track zoom
      map.on('zoom', () => setCurrentZoom(map.getZoom()))

      // ── Polygons ───────────────────────────────────────────
      ECO_POLYGONS.forEach((poly) => {
        const color = typeColors[poly.type]
        const polygon = L.polygon(poly.coords, {
          color: color,
          weight: 2,
          opacity: 0.8,
          fillColor: color,
          fillOpacity: 0.15,
          dashArray: '6 4',
        }).addTo(map)

        polygon.bindTooltip(`
          <div style="font-family:'Montserrat',sans-serif;font-size:12px;color:#0f172a;font-weight:700;letter-spacing:.05em;">
            ${typeEmojis[poly.type]} ${poly.name}
          </div>
        `, { sticky: true, className: 'eco-tooltip' })

        polygonsRef.current.push({ poly: polygon, type: poly.type })
      })

      // ── Markers ────────────────────────────────────────────
      buildMarkers(L, map)

      setMapLoaded(true)
    }

    init()
    return () => {
      map?.remove()
      leafletRef.current = null
    }
  }, [])

  // Re-filter markers when filter changes
  useEffect(() => {
    const map = leafletRef.current
    if (!map) return

    markersRef.current.forEach(({ marker, point }) => {
      const visible = activeFilter === 'all' || point.type === activeFilter

      if (visible) {
        if (!map.hasLayer(marker)) marker.addTo(map)
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker)
      }
    })

    // Polygons
    polygonsRef.current.forEach(({ poly, type }) => {
      const visible = activeFilter === 'all' || type === activeFilter
      if (visible) {
        if (!map.hasLayer(poly)) poly.addTo(map)
      } else {
        if (map.hasLayer(poly)) map.removeLayer(poly)
      }
    })
  }, [activeFilter])

  function buildMarkers(L: any, map: any) {
    markersRef.current = []

    ALL_POINTS.forEach((point) => {
      const color = typeColors[point.type]
      const emoji = typeEmojis[point.type]

      const icon = L.divIcon({
        html: `
          <div class="eco-marker bg-white" style="
            width:38px;height:38px;border-radius:50%;
            border:2px solid ${color};
            display:flex;align-items:center;justify-content:center;
            font-size:17px;
            box-shadow:0 4px 12px ${color}50;
            cursor:pointer;
            transition:transform .2s;
            z-index: 10;
          ">${emoji}</div>
          <div style="
            position:absolute;top:-6px;left:-6px;right:-6px;bottom:-6px;
            border-radius:50%;border:1.5px solid ${color}60;
            animation:ecoP 2.2s ease-out infinite;
            z-index: 1;
          "></div>
        `,
        className: '',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      })

      const marker = L.marker(point.coords, { icon }).addTo(map)

      marker.on('click', () => {
        setSelectedPoint(point)
        map.flyTo(point.coords, Math.max(map.getZoom(), 8), { duration: 1.2 })
      })

      // Zoom-dependent: hide detail markers when zoomed out
      if (point.minZoom) {
        map.on('zoom', () => {
          if (map.getZoom() < (point.minZoom || 0)) {
            if (map.hasLayer(marker)) map.removeLayer(marker)
          } else if (activeFilter === 'all' || point.type === activeFilter) {
            if (!map.hasLayer(marker)) marker.addTo(map)
          }
        })
        // Initially hide if below minZoom
        if (map.getZoom() < point.minZoom) map.removeLayer(marker)
      }

      markersRef.current.push({ marker, point })
    })
  }

  const flyTo = (coords: [number, number], zoom = 9) => {
    leafletRef.current?.flyTo(coords, zoom, { duration: 1.5 })
  }

  const resetView = () => {
    leafletRef.current?.flyTo([44.8, 62.5], 6, { duration: 1.2 })
    setSelectedPoint(null)
  }

  const threatColor = (t?: string) => {
    if (!t) return '#64748b' // slate-500
    if (t.includes('Критик') || t.includes('Апат')) return '#e11d48' // rose-600
    if (t.includes('Жоғары')) return '#d97706' // amber-600
    if (t.includes('Орташа')) return '#ca8a04' // yellow-600
    if (t.includes('Қорғал') || t.includes('Қалпына') || t.includes('Бақыл') || t.includes('Жақсы')) return '#16a34a' // green-600
    return '#0284c7' // sky-600
  }

  return (
    <div className="w-full relative bg-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm"
          style={activeFilter === 'all'
            ? { background: '#0f172a', color: '#fff' } // slate-900
            : { background: '#ffffff', border: '1px solid #e2e8f0', color: '#475569' }} // slate-600
        >
          🗺 Барлығы
        </button>
        {(Object.keys(typeColors) as EcoType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm"
            style={activeFilter === type
              ? { background: typeColors[type], color: '#fff', boxShadow: `0 4px 15px ${typeColors[type]}40` }
              : { background: '#ffffff', border: '1px solid #e2e8f0', color: typeColors[type] }}
          >
            {typeEmojis[type]} {typeLabels[type]}
          </button>
        ))}
      </div>

      {/* Main layout: map + sidebar */}
      <div className="flex gap-4 flex-col lg:flex-row relative">

        {/* Map */}
        <div
          className="relative rounded-3xl overflow-hidden flex-1 border border-slate-200 shadow-inner bg-slate-50"
          style={{ height: '600px', minWidth: 0 }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-100">
              <div className="text-center animate-pulse">
                <div className="text-4xl mb-3">🗺️</div>
                <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">Карта жүктелуде...</div>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full z-0 relative" />

          {/* Zoom info badge */}
          <div
            className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md pointer-events-none z-10 shadow-md"
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.05)', color: '#475569' }}
          >
            Масштаб: <span className="text-slate-900">{currentZoom}</span> · {currentZoom < 7 ? 'Жақындатыңыз' : 'Барлық нүкте көрінеді'}
          </div>

          {/* Reset button */}
          <button
            onClick={resetView}
            className="absolute top-6 left-6 px-4 py-2.5 rounded-full text-xs font-bold backdrop-blur-md transition-all hover:-translate-y-0.5 z-10 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.05)', color: '#0f172a' }}
          >
            ⌂ БАСТАПҚЫ КӨРІНІС
          </button>
        </div>

        {/* Sidebar: point detail */}
        <div
          className="lg:w-96 rounded-3xl overflow-hidden flex flex-col bg-white border border-slate-200 shadow-xl relative z-10"
          style={{ minHeight: '600px' }}
        >
          {selectedPoint ? (
            <div className="flex flex-col h-full">
              {/* Point header */}
              <div
                className="p-6 border-b"
                style={{ background: `linear-gradient(135deg, ${typeColors[selectedPoint.type]}10, #ffffff)`, borderColor: `${typeColors[selectedPoint.type]}20` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">{typeEmojis[selectedPoint.type]}</div>
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: typeColors[selectedPoint.type] }}>
                  {typeLabels[selectedPoint.type]}
                </div>
                <h3 className="font-black text-slate-900 text-2xl leading-tight mb-2">
                  {selectedPoint.name}
                </h3>
                {selectedPoint.threat && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold mt-2"
                    style={{ background: `${threatColor(selectedPoint.threat)}15`, border: `1px solid ${threatColor(selectedPoint.threat)}30`, color: threatColor(selectedPoint.threat) }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: threatColor(selectedPoint.threat) }} />
                    {selectedPoint.threat}
                  </div>
                )}
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: 'thin' }}>

                {/* Description */}
                <p className="text-sm leading-relaxed font-medium text-slate-600" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {selectedPoint.description}
                </p>

                {/* Area */}
                {selectedPoint.area && selectedPoint.area !== '—' && (
                  <div className="rounded-2xl p-4 bg-slate-50 border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-400">Аумақ</div>
                    <div className="text-sm font-black" style={{ color: typeColors[selectedPoint.type] }}>{selectedPoint.area}</div>
                  </div>
                )}

                {/* Flora */}
                {selectedPoint.flora && selectedPoint.flora.length > 0 && (
                  <div>
                    <div className="text-xs font-black mb-3 flex items-center gap-2 text-emerald-700 uppercase tracking-wider">
                      🌱 Флора
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.flora.map((f) => (
                        <span key={f} className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 shadow-sm" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fauna */}
                {selectedPoint.fauna && selectedPoint.fauna.length > 0 && (
                  <div>
                    <div className="text-xs font-black mb-3 flex items-center gap-2 text-amber-700 uppercase tracking-wider">
                      🦅 Фауна
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.fauna.map((f) => (
                        <span key={f} className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 shadow-sm" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fact */}
                {selectedPoint.fact && (
                  <div className="rounded-2xl p-4 bg-slate-50 border-l-4 shadow-sm" style={{ borderColor: typeColors[selectedPoint.type] }}>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-400">💡 Қызықты факт</div>
                    <p className="text-sm leading-relaxed font-semibold text-slate-700 italic" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      "{selectedPoint.fact}"
                    </p>
                  </div>
                )}

                {/* Fly to button */}
                <button
                  onClick={() => flyTo(selectedPoint.coords, 9)}
                  className="w-full py-3.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-1 shadow-md text-white mt-4"
                  style={{ background: typeColors[selectedPoint.type] }}
                >
                  📍 КАРТАДАН КӨРСЕТУ
                </button>
              </div>
            </div>
          ) : (
            // Empty state + quick nav
            <div className="p-6 flex flex-col h-full">
              <div className="text-center mb-8 pt-6">
                <div className="text-5xl mb-4 opacity-50">🗺️</div>
                <p className="text-sm font-semibold text-slate-500" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  Картадан кез келген белгіні басыңыз.
                  <br />Толық ақпарат осында пайда болады.
                </p>
              </div>

              <div className="text-[10px] font-black mb-4 text-slate-400 tracking-[0.1em] uppercase border-b border-slate-100 pb-2">
                Жылдам навигация
              </div>

              <div className="space-y-2 overflow-y-auto flex-1 pr-2" style={{ scrollbarWidth: 'thin' }}>
                {ALL_POINTS.filter(p => !p.minZoom || currentZoom >= p.minZoom)
                  .filter(p => activeFilter === 'all' || p.type === activeFilter)
                  .map((point) => (
                    <button
                      key={point.id}
                      onClick={() => { flyTo(point.coords, 9); setSelectedPoint(point) }}
                      className="w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center gap-4 hover:bg-slate-50 border border-transparent hover:border-slate-200 group"
                    >
                      <span className="text-2xl flex-shrink-0 drop-shadow-sm transition-transform group-hover:scale-110">{typeEmojis[point.type]}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{point.name}</div>
                        {point.threat && (
                          <div className="text-[10px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: threatColor(point.threat) }}>{point.threat}</div>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ecoP {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        /* Ашық фонға арналған Tooltip (Қалқымалы жазу) */
        .eco-tooltip {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
          padding: 6px 12px !important;
        }
        .eco-tooltip::before { border-top-color: #ffffff !important; }
        
        /* Лифлеттің стандартты попабын (қажет болса) ашық ету */
        .leaflet-popup-content-wrapper {
          background: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        .leaflet-popup-tip { background: #ffffff !important; }
      `}</style>
    </div>
  )
}