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

// ── Data ───────────────────────────────────────────────────────────────
const typeColors: Record<EcoType, string> = {
  aral:      '#3b8ef1',
  syrdarya:  '#52a869',
  desert:    '#c97d1e',
  city:      '#e0c875',
  protected: '#c060d0',
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

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
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
          opacity: 0.7,
          fillColor: color,
          fillOpacity: 0.12,
          dashArray: '6 4',
        }).addTo(map)

        polygon.bindTooltip(`
          <div style="font-family:IBM Plex Sans,sans-serif;font-size:12px;color:${color};font-weight:600;letter-spacing:.05em;">
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
      const visible =
        activeFilter === 'all' ||
        point.type === activeFilter

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
          <div class="eco-marker" style="
            width:38px;height:38px;border-radius:50%;
            background:${color}18;
            border:2px solid ${color};
            display:flex;align-items:center;justify-content:center;
            font-size:17px;
            box-shadow:0 0 16px ${color}55, inset 0 0 8px ${color}22;
            cursor:pointer;
            transition:transform .2s;
          ">${emoji}</div>
          <div style="
            position:absolute;top:-6px;left:-6px;right:-6px;bottom:-6px;
            border-radius:50%;border:1.5px solid ${color}40;
            animation:ecoP 2.2s ease-out infinite;
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
    if (!t) return '#888'
    if (t.includes('Критик')) return '#e85555'
    if (t.includes('Жоғары')) return '#e8a030'
    if (t.includes('Орташа')) return '#e8d030'
    if (t.includes('Қорғал') || t.includes('Қалпына') || t.includes('Бақыл')) return '#52c869'
    return '#93ccfb'
  }

  return (
    <section id="map" className="py-20 px-6 relative" style={{ background: '#0a0805' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4"
            style={{ background: 'rgba(59,142,241,0.1)', border: '1px solid rgba(59,142,241,0.25)', color: '#93ccfb', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            Интерактивті карта
          </div>
          <h2 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#f5ead5' }}>
            Экожүйелер{' '}
            <em className="not-italic" style={{ color: '#93ccfb' }}>картасы</em>
          </h2>
          <p style={{ color: 'rgba(245,234,213,0.5)', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '0.9rem' }}>
            Белгіні басыңыз — толық ақпарат алыңыз · Масштаб өскен сайын жаңа нүктелер пайда болады
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <button
            onClick={() => setActiveFilter('all')}
            className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
            style={activeFilter === 'all'
              ? { background: '#f5ead5', color: '#0d0a05', fontFamily: 'IBM Plex Sans, sans-serif' }
              : { background: 'rgba(245,234,213,0.08)', border: '1px solid rgba(245,234,213,0.2)', color: 'rgba(245,234,213,0.6)', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            🗺 Барлығы
          </button>
          {(Object.keys(typeColors) as EcoType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
              style={activeFilter === type
                ? { background: typeColors[type], color: '#fff', fontFamily: 'IBM Plex Sans, sans-serif', boxShadow: `0 0 16px ${typeColors[type]}60` }
                : { background: `${typeColors[type]}12`, border: `1px solid ${typeColors[type]}30`, color: typeColors[type], fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              {typeEmojis[type]} {typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Main layout: map + sidebar */}
        <div className="flex gap-4 flex-col lg:flex-row">

          {/* Map */}
          <div
            className="relative rounded-2xl overflow-hidden flex-1"
            style={{ height: '560px', border: '1px solid rgba(59,142,241,0.18)', boxShadow: '0 0 60px rgba(59,142,241,0.07)', minWidth: 0 }}
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: '#0d1a28' }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">🗺️</div>
                  <div style={{ color: 'rgba(245,234,213,0.5)', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '13px' }}>Карта жүктелуде...</div>
                </div>
              </div>
            )}
            <div ref={mapRef} className="w-full h-full" />

            {/* Zoom info badge */}
            <div
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs backdrop-blur-sm pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,234,213,0.5)', fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Масштаб: {currentZoom} · {currentZoom < 7 ? 'Жақындатыңыз — жаңа нүктелер пайда болады' : 'Барлық нүктелер көрінеді'}
            </div>

            {/* Reset button */}
            <button
              onClick={resetView}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs backdrop-blur-sm transition-all hover:opacity-100"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(245,234,213,0.7)', fontFamily: 'IBM Plex Sans, sans-serif', opacity: 0.85 }}
            >
              ⌂ Бастапқы көрініс
            </button>
          </div>

          {/* Sidebar: point detail */}
          <div
            className="lg:w-80 rounded-2xl overflow-hidden flex flex-col"
            style={{ border: '1px solid rgba(245,234,213,0.08)', background: '#100d08', minHeight: '560px' }}
          >
            {selectedPoint ? (
              <div className="flex flex-col h-full">
                {/* Point header */}
                <div
                  className="p-5"
                  style={{ background: `linear-gradient(135deg, ${typeColors[selectedPoint.type]}18, ${typeColors[selectedPoint.type]}08)`, borderBottom: `1px solid ${typeColors[selectedPoint.type]}20` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{typeEmojis[selectedPoint.type]}</div>
                    <button
                      onClick={() => setSelectedPoint(null)}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: 'rgba(245,234,213,0.08)', color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: typeColors[selectedPoint.type], fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {typeLabels[selectedPoint.type]}
                  </div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#f5ead5', fontSize: '1.15rem', lineHeight: 1.3 }}>
                    {selectedPoint.name}
                  </h3>
                  {selectedPoint.threat && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs mt-1"
                      style={{ background: `${threatColor(selectedPoint.threat)}18`, border: `1px solid ${threatColor(selectedPoint.threat)}40`, color: threatColor(selectedPoint.threat), fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: threatColor(selectedPoint.threat) }} />
                      {selectedPoint.threat}
                    </div>
                  )}
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'thin' }}>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,234,213,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {selectedPoint.description}
                  </p>

                  {/* Area */}
                  {selectedPoint.area && selectedPoint.area !== '—' && (
                    <div className="rounded-xl p-3" style={{ background: `${typeColors[selectedPoint.type]}0a`, border: `1px solid ${typeColors[selectedPoint.type]}20` }}>
                      <div className="text-xs mb-0.5" style={{ color: 'rgba(245,234,213,0.35)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Аумақ</div>
                      <div className="text-sm font-semibold" style={{ color: typeColors[selectedPoint.type], fontFamily: 'IBM Plex Sans, sans-serif' }}>{selectedPoint.area}</div>
                    </div>
                  )}

                  {/* Flora */}
                  {selectedPoint.flora && selectedPoint.flora.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#52a869', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        🌱 Флора
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPoint.flora.map((f) => (
                          <span key={f} className="text-xs px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(82,168,105,0.12)', border: '1px solid rgba(82,168,105,0.25)', color: '#a8d8b0', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fauna */}
                  {selectedPoint.fauna && selectedPoint.fauna.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#e8a030', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        🦅 Фауна
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPoint.fauna.map((f) => (
                          <span key={f} className="text-xs px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(232,160,48,0.12)', border: '1px solid rgba(232,160,48,0.25)', color: '#f5c870', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fact */}
                  {selectedPoint.fact && (
                    <div className="rounded-xl p-3" style={{ background: 'rgba(245,234,213,0.04)', border: '1px solid rgba(245,234,213,0.1)' }}>
                      <div className="text-xs mb-1" style={{ color: 'rgba(245,234,213,0.35)', fontFamily: 'IBM Plex Sans, sans-serif' }}>💡 Қызықты факт</div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,234,213,0.6)', fontFamily: 'IBM Plex Sans, sans-serif', fontStyle: 'italic' }}>
                        {selectedPoint.fact}
                      </p>
                    </div>
                  )}

                  {/* Fly to button */}
                  <button
                    onClick={() => flyTo(selectedPoint.coords, 9)}
                    className="w-full py-2.5 rounded-xl text-xs font-medium transition-all hover:opacity-90"
                    style={{ background: typeColors[selectedPoint.type], color: '#fff', fontFamily: 'IBM Plex Sans, sans-serif', boxShadow: `0 0 20px ${typeColors[selectedPoint.type]}40` }}
                  >
                    📍 Картада табу
                  </button>
                </div>
              </div>
            ) : (
              // Empty state + quick nav
              <div className="p-5 flex flex-col h-full">
                <div className="text-center mb-6 pt-4">
                  <div className="text-4xl mb-3">📍</div>
                  <p className="text-sm" style={{ color: 'rgba(245,234,213,0.4)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Картадан нүктені басыңыз — толық ақпарат осы жерде шығады
                  </p>
                </div>

                <div className="text-xs font-semibold mb-3" style={{ color: 'rgba(245,234,213,0.3)', fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Жылдам навигация
                </div>

                <div className="space-y-2 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
                  {ALL_POINTS.filter(p => !p.minZoom || currentZoom >= p.minZoom)
                    .filter(p => activeFilter === 'all' || p.type === activeFilter)
                    .map((point) => (
                      <button
                        key={point.id}
                        onClick={() => { flyTo(point.coords, 9); setSelectedPoint(point) }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 hover:opacity-90"
                        style={{ background: `${typeColors[point.type]}0d`, border: `1px solid ${typeColors[point.type]}20` }}
                      >
                        <span className="text-base flex-shrink-0">{typeEmojis[point.type]}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium truncate" style={{ color: '#f5ead5', fontFamily: 'IBM Plex Sans, sans-serif' }}>{point.name}</div>
                          {point.threat && (
                            <div className="text-xs" style={{ color: threatColor(point.threat), fontFamily: 'IBM Plex Sans, sans-serif' }}>{point.threat}</div>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {(Object.keys(typeColors) as EcoType[]).map((type) => (
            <div
              key={type}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ background: `${typeColors[type]}10`, border: `1px solid ${typeColors[type]}28`, color: typeColors[type], fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: typeColors[type] }} />
              {typeEmojis[type]} {typeLabels[type]}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ecoP {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .eco-tooltip {
          background: #100d08 !important;
          border: 1px solid rgba(245,234,213,0.15) !important;
          color: #f5ead5 !important;
          font-family: 'IBM Plex Sans', sans-serif !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
        }
        .eco-tooltip::before { display: none !important; }
        .leaflet-popup-content-wrapper {
          background: #100d08 !important;
          border: 1px solid rgba(245,234,213,0.12) !important;
          border-radius: 14px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
        }
        .leaflet-popup-tip { background: #100d08 !important; }
      `}</style>
    </section>
  )
}