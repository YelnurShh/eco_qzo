export interface EcoZone {
  id: string
  name: string
  subtitle: string
  description: string
  longDescription: string
  color: string
  accentColor: string
  glowClass: string
  icon: string
  area: string
  species: number
  threat: string
  flora: string[]
  fauna: string[]
  facts: { label: string; value: string }[]
  mapCenter: [number, number]
  mapZoom: number
  gradient: string
  bgGradient: string
}

export const ecosystems: EcoZone[] = [
  {
    id: 'aral',
    name: 'Арал теңізі',
    subtitle: 'Жоғалған теңіздің трагедиясы мен үміті',
    description:
      'Бір кезде әлемдегі ең ірі көлдердің бірі болған Арал теңізі XX ғасырдың орта кезінен бастап кеуіп, экологиялық апатқа айналды. Бүгінде ондаған жыл өткен соң, табиғат жаңаруға бастады.',
    longDescription:
      'Арал теңізі — XX ғасырдың ең ірі экологиялық апаттарының бірі. 1960 жылдары Сырдария мен Әмударияның суы мақта алқаптарына бұрылғаннан кейін теңіз жылдам кеуіп бастады. Бүгінде Солтүстік Арал суды қайта қабылдай бастады — Қоқарал бөгеті салынғаннан кейін су деңгейі 4 метрге көтерілді. Ерекше флора мен фауна қайта оралып жатыр.',
    color: '#3b8ef1',
    accentColor: '#93ccfb',
    glowClass: 'glow-blue',
    icon: '🌊',
    area: '17 000 км²',
    species: 24,
    threat: 'Критикалық',
    flora: [
      'Сасыр (Halocnemum strobilaceum)',
      'Теңіз жусаны (Artemisia maritima)',
      'Қызыл гүл (Kalidium foliatum)',
      'Тузлук шөбі',
    ],
    fauna: [
      'Сазан балығы',
      'Дала қыраны (Aquila nipalensis)',
      'Фламинго',
      'Тырна',
      'Стрепет (Tetrax tetrax)',
    ],
    facts: [
      { label: 'Бастапқы ауданы', value: '68 000 км²' },
      { label: 'Қазіргі ауданы', value: '17 000 км²' },
      { label: 'Су деңгейі', value: '+4 м (2005-дан)' },
      { label: 'Балық түрлері', value: '24 түр' },
    ],
    mapCenter: [45.5, 60.5],
    mapZoom: 7,
    gradient: 'from-aral-900 via-aral-800 to-aral-700',
    bgGradient: 'linear-gradient(135deg, #0a1628 0%, #0f2a4a 50%, #1a3d6b 100%)',
  },
  {
    id: 'syrdarya',
    name: 'Сырдария өзені',
    subtitle: 'Тіршіліктің қайнар көзі — ұлы өзен алқабы',
    description:
      'Орта Азиядағы ең ұзын өзен — Сырдария Қызылорда арқылы ағып өтеді. Оның алқабы бай флора мен фауна үшін аса маңызды экологиялық дәліз болып табылады.',
    longDescription:
      'Сырдария — ұзындығы 2 212 км, бассейні 782 000 км² жерді алып жатқан ірі өзен. Қызылорда облысының батыс бөлігімен ағып өтетін бұл өзен жайылма орманын, тоғандарын, тоғайларын мекен ететін жүздеген жануар мен өсімдік түрлерінің мекені. Дарияның жайылма тоғайлары — Орта Азиядағы сирек кездесетін экожүйелердің бірі.',
    color: '#52a869',
    accentColor: '#a8d8b0',
    glowClass: 'glow-green',
    icon: '🌿',
    area: '782 000 км²',
    species: 156,
    threat: 'Орташа',
    flora: [
      'Жиде (Elaeagnus angustifolia)',
      'Тал ағашы (Salix)',
      'Қамыс (Phragmites australis)',
      'Теректер (Populus)',
      'Жолдық шөп (Typha)',
    ],
    fauna: [
      'Тырна (Grus grus)',
      'Балапан үйрек',
      'Орта Азия тасбақасы',
      'Бозторғай',
      'Жыланбалық (Silurus glanis)',
    ],
    facts: [
      { label: 'Ұзындығы', value: '2 212 км' },
      { label: 'Бассейні', value: '782 000 км²' },
      { label: 'Балық түрлері', value: '42 түр' },
      { label: 'Құс түрлері', value: '156 түр' },
    ],
    mapCenter: [44.5, 65.5],
    mapZoom: 7,
    gradient: 'from-green-900 via-green-800 to-emerald-700',
    bgGradient: 'linear-gradient(135deg, #071a0c 0%, #0f3320 50%, #1a5c38 100%)',
  },
  {
    id: 'desert',
    name: 'Қызылқұм шөлі',
    subtitle: 'Өмір демін тыю мүмкін емес — тіпті шөлде де',
    description:
      'Қызылқұм — Орта Азиядағы ең ірі шөлдердің бірі. Аты айтып тұрғандай, қызыл құмнан тұратын бұл шөл тіршіліксіз емес — мыңдаған жыл бойы бейімделген флора мен фауна бар.',
    longDescription:
      'Қызылқұм шөлі Қызылорда облысының оңтүстік-шығыс бөлігін алып жатыр. Ауданы шамамен 300 000 км². Шөлдің климаты экстремальды — жазда +40°C-ден асады, қыста -20°C-ге дейін суылайды. Дегенмен мұнда 1000-нан аса өсімдік түрі, 50-ден астам сүтқоректілер, 300-ден астам құс түрі тіршілік етеді. Саксаул, жусан, эфемерлер — шөлдің нағыз иелері.',
    color: '#c97d1e',
    accentColor: '#e8b96e',
    glowClass: 'glow-text',
    icon: '🏜️',
    area: '300 000 км²',
    species: 89,
    threat: 'Жоғары',
    flora: [
      'Саксаул (Haloxylon ammodendron)',
      'Жусан (Artemisia)',
      'Кеуел (Calligonum)',
      'Эфемерлер (Carex physodes)',
      'Шырша (Salsola)',
    ],
    fauna: [
      'Жейран (Gazella subgutturosa)',
      'Варан (Varanus griseus)',
      'Тасбақа (Testudo horsfieldii)',
      'Үлкен тарбаған',
      'Шөл бүркіті',
    ],
    facts: [
      { label: 'Ауданы', value: '300 000 км²' },
      { label: 'Жазғы максимум', value: '+45°C' },
      { label: 'Өсімдік түрлері', value: '1000+' },
      { label: 'Жануар түрлері', value: '89 сүтқорек.' },
    ],
    mapCenter: [43.5, 63.0],
    mapZoom: 7,
    gradient: 'from-sand-900 via-sand-800 to-amber-700',
    bgGradient: 'linear-gradient(135deg, #1a0c00 0%, #3d1f00 50%, #6b3a00 100%)',
  },
]

export interface MapPoint {
  id: string
  name: string
  coords: [number, number]
  type: 'aral' | 'syrdarya' | 'desert' | 'city'
  description: string
}

export const mapPoints: MapPoint[] = [
  {
    id: 'kyzylorda-city',
    name: 'Қызылорда қаласы',
    coords: [44.853, 65.509],
    type: 'city',
    description: 'Облыс орталығы. Халқы 340 000 адам.',
  },
  {
    id: 'north-aral',
    name: 'Солтүстік Арал',
    coords: [46.5, 61.0],
    type: 'aral',
    description: 'Қоқарал бөгетінен кейін су деңгейі қалпына келе бастады.',
  },
  {
    id: 'kokaral-dam',
    name: 'Қоқарал бөгеті',
    coords: [46.0, 61.8],
    type: 'aral',
    description: '2005 жылы салынған. Арал теңізін қалпына келтіру жобасы.',
  },
  {
    id: 'syrdarya-delta',
    name: 'Сырдария дельтасы',
    coords: [46.2, 61.2],
    type: 'syrdarya',
    description: 'Өзеннің теңізге құятын жері. Бай тоғай экожүйесі.',
  },
  {
    id: 'baikonur',
    name: 'Байқоңыр',
    coords: [45.965, 63.305],
    type: 'desert',
    description: 'Шөл ортасындағы ғарыш айлағы. Бірегей экологиялық аймақ.',
  },
  {
    id: 'qyzylqum',
    name: 'Қызылқұм шөлі',
    coords: [42.5, 64.0],
    type: 'desert',
    description: 'Саксаул, жейран және шөл жануарлары мекені.',
  },
]
