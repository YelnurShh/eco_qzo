'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  emoji: string
  color: string
  category: string
}

// ── 50 сұрақ банкі (Түстер ашық фонға лайықталып қоюлатылды) ────────────────
const QUESTION_BANK: Question[] = [
  // АРАЛ ТЕҢІЗІ 
  { id: 1, emoji: '🌊', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі ең ірі болған кезде оның ауданы қанша болды?', options: ['28 000 км²', '68 000 км²', '45 000 км²', '100 000 км²'], correct: 1, explanation: 'Арал теңізі 1960-жылдары 68 000 км² алып жатты — әлемдегі 4-ші ірі көл болды.' },
  { id: 2, emoji: '🏗️', color: '#0369a1', category: 'Арал теңізі', question: 'Көкарал бөгеті қай жылы салынды?', options: ['1990', '1999', '2005', '2010'], correct: 2, explanation: '2005 жылы Дүниежүзілік банктің қаржыландыруымен салынған Көкарал бөгеті су деңгейін 4 метрге көтерді.' },
  { id: 3, emoji: '🐟', color: '#0369a1', category: 'Арал теңізі', question: 'Көкарал бөгетінен кейін Солтүстік Аралда неше түр балық тіршілік ете бастады?', options: ['8 түр', '15 түр', '24 түр', '50 түр'], correct: 2, explanation: 'Бөгет салынғаннан кейін 24 түр балық Солтүстік Аралда тіршілік ете бастады.' },
  { id: 4, emoji: '🌊', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі бірінші рет екіге қай жылы бөлінді?', options: ['1975', '1987', '1993', '2000'], correct: 1, explanation: '1987 жылы теңіз Солтүстік және Оңтүстік деп екіге бөлінді.' },
  { id: 5, emoji: '🏭', color: '#0369a1', category: 'Арал теңізі', question: 'Аралдың кеуіп кетуінің негізгі себебі не?', options: ['Жаһандық жылыну', 'Суару арналарына су бұру', 'Жер сілкінісі', 'Вулкан атқылауы'], correct: 1, explanation: 'Сырдария мен Әмудария суларының мақта алқаптарына бұрылуы теңіздің кеуіп кетуіне алып келді.' },
  { id: 6, emoji: '🦩', color: '#0369a1', category: 'Арал теңізі', question: 'Солтүстік Арал жағасында қайта ұялай бастаған сирек құс қайсы?', options: ['Үкі', 'Фламинго', 'Тауыс', 'Қарлығаш'], correct: 1, explanation: 'Фламинго мен тырналар Солтүстік Арал жағасында теңіз қалпына келе бастағаннан кейін ұялай бастады.' },
  { id: 7, emoji: '📉', color: '#0369a1', category: 'Арал теңізі', question: 'Аралда бір кезде жылына қанша тонна балық ауланды?', options: ['5 000 тонна', '20 000 тонна', '40 000 тонна', '100 000 тонна'], correct: 2, explanation: '1960-жылдары Аралда жыл сайын 40 000 тонна балық ауланған.' },
  { id: 8, emoji: '🏝️', color: '#0369a1', category: 'Арал теңізі', question: 'Көкарал — бұл не?', options: ['Қала атауы', 'Өзен атауы', 'Бөгет атауы', 'Арал мен шөлді бөлетін жер жолағы'], correct: 3, explanation: 'Көкарал — Солтүстік Аралды Оңтүстіктен бөлетін жер жолағы. Осы жерде бөгет салынды.' },
  { id: 9, emoji: '💧', color: '#0369a1', category: 'Арал теңізі', question: 'Көкарал бөгеті салынғаннан кейін су деңгейі қанша көтерілді?', options: ['1 метр', '2 метр', '4 метр', '10 метр'], correct: 2, explanation: 'Бөгет салынғаннан кейін Солтүстік Арал деңгейі 4 метрге көтерілді.' },
  { id: 10, emoji: '🌍', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі апатын қай ұйым «ХХ ғасырдың ең ірі экологиялық апаты» деп атады?', options: ['НАТО', 'БҰҰ', 'НАТО', 'G20'], correct: 1, explanation: 'Біріккен Ұлттар Ұйымы (БҰҰ) Арал апатын ХХ ғасырдың ең ірі экологиялық апаты деп жариялады.' },
  { id: 11, emoji: '🚢', color: '#0369a1', category: 'Арал теңізі', question: 'Мойнақ қалашығы неліктен танымал?', options: ['Ірі порт қаласы', 'Ескі кеме зираты', 'Мұнай кен орны', 'Туристік курорт'], correct: 1, explanation: 'Мойнақта теңіз кеуіп кеткеннен кейін жағада қалып қойған ескі кемелер зираты бар.' },
  { id: 12, emoji: '🧂', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі кеуігеннен кейін пайда болған негізгі экологиялық проблема қайсы?', options: ['Жер сілкінісі', 'Тұз бен химикаттардың желмен таралуы', 'Сел тасқыны', 'Орман өртенуі'], correct: 1, explanation: 'Кеуіген теңіз түбінен тұз бен пестицидтер желмен таралып, аймақта тыныс ауруларын тудырды.' },
  { id: 13, emoji: '🌡️', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі кеуіген сайын аймақтың климаты қалай өзгерді?', options: ['Жылы және ылғалды болды', 'Салқын және ылғалды болды', 'Континентальды — ыстық жаз, суық қыс', 'Өзгерген жоқ'], correct: 2, explanation: 'Теңіз жоғалғаннан кейін аймақ климаты шектен тыс континентальды болды: жаз ыстығырақ, қыс суығырақ.' },
  { id: 14, emoji: '🗺️', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізі қай елдердің шекарасында орналасқан?', options: ['Қазақстан мен Өзбекстан', 'Қазақстан мен Ресей', 'Өзбекстан мен Түрікменстан', 'Қазақстан мен Қырғызстан'], correct: 0, explanation: 'Арал теңізі Қазақстан мен Өзбекстанның шекарасында орналасқан.' },
  { id: 15, emoji: '🌱', color: '#0369a1', category: 'Арал теңізі', question: 'Арал теңізінің кеуіген түбінде қандай өсімдіктер өсе бастады?', options: ['Орман ағаштары', 'Сасыр мен теңіз жусаны', 'Жүгері', 'Гүлдер'], correct: 1, explanation: 'Кеуіген Арал түбінде тұзға төзімді сасыр мен теңіз жусаны өсе бастады.' },
  { id: 16, emoji: '💰', color: '#0369a1', category: 'Арал теңізі', question: 'Көкарал бөгетін салуды қаржыландырған ұйым қайсы?', options: ['Еуропалық одақ', 'Дүниежүзілік банк', 'АҚШ үкіметі', 'Ресей үкіметі'], correct: 1, explanation: 'Дүниежүзілік банк Көкарал бөгетін салу үшін 85 млн доллар бөлді.' },
  { id: 17, emoji: '🎣', color: '#0369a1', category: 'Арал теңізі', question: 'Арал балық аулау өнеркәсібі толық тоқтаған жыл қайсы?', options: ['1970', '1982', '1991', '2000'], correct: 2, explanation: '1991 жылы Арал теңізіндегі балық аулау өнеркәсібі толықтай тоқтады.' },

  // СЫРДАРИЯ 
  { id: 18, emoji: '🌿', color: '#15803d', category: 'Сырдария', question: 'Сырдария өзенінің ұзындығы қанша?', options: ['1 100 км', '1 800 км', '2 212 км', '3 000 км'], correct: 2, explanation: 'Сырдария — ұзындығы 2 212 км. Орта Азиядағы ең ұзын өзен.' },
  { id: 19, emoji: '🌳', color: '#15803d', category: 'Сырдария', question: 'Сырдария тоғай ормандарының қанша пайызы XX ғасырда жойылды?', options: ['20%', '50%', '65%', '80%'], correct: 3, explanation: 'XX ғасырда суару жүйелерінің кеңеюіне байланысты тоғай ормандарының 80% жойылды.' },
  { id: 20, emoji: '🦢', color: '#15803d', category: 'Сырдария', question: 'Сырдария алқабы неше түр құстың ұялау орны болып табылады?', options: ['50+', '100+', '156+', '300+'], correct: 2, explanation: 'Сырдария алқабы 156-дан астам құс түрінің тіршілік ету ортасы.' },
  { id: 21, emoji: '🏔️', color: '#15803d', category: 'Сырдария', question: 'Сырдария қай тауда бастау алады?', options: ['Алтай', 'Памир', 'Тянь-Шань', 'Қарпат'], correct: 2, explanation: 'Сырдария Тянь-Шань тауынан бастау алып, Аралға дейін ағады.' },
  { id: 22, emoji: '🐠', color: '#15803d', category: 'Сырдария', question: 'Сырдариядағы балық түрлерінің саны қанша?', options: ['10 түр', '25 түр', '42 түр', '80 түр'], correct: 2, explanation: 'Сырдарияда 42 түр балық тіршілік етеді.' },
  { id: 23, emoji: '🌾', color: '#15803d', category: 'Сырдария', question: 'Сырдария жайылмасындағы қамыс экожүйесі нені білдіреді?', options: ['Ауыл шаруашылығы жері', 'Су құстарының мекені', 'Өнеркәсіп аймағы', 'Тас жер'], correct: 1, explanation: 'Қамыс тоғандары — су құстарының, бақалардың және балықтардың маңызды мекені.' },
  { id: 24, emoji: '🌊', color: '#15803d', category: 'Сырдария', question: 'Жаңадария — бұл не?', options: ['Жаңа қала', 'Сырдарияның ескі арнасы', 'Тау өзені', 'Жасанды канал'], correct: 1, explanation: 'Жаңадария — Сырдарияның ескі арнасы, бірте-бірте кеуіп жатыр.' },
  { id: 25, emoji: '🦩', color: '#15803d', category: 'Сырдария', question: 'Тырна (Grus grus) қай маусымда Сырдария алқабынан өтеді?', options: ['Тек жазда', 'Тек қыста', 'Көктем мен күзде', 'Жыл бойы'], correct: 2, explanation: 'Тырналар Сырдария алқабын көктем мен күзде қоныс аудару кезінде пайдаланады.' },
  { id: 26, emoji: '💧', color: '#15803d', category: 'Сырдария', question: 'Сырдария суының негізгі тұтынушысы кім?', options: ['Қалалар', 'Ауыл шаруашылығы (суару)', 'Өнеркәсіп', 'Электр станциялары'], correct: 1, explanation: 'Сырдария суының 90%-дан астамы ауыл шаруашылығын суаруға жұмсалады.' },
  { id: 27, emoji: '🌱', color: '#15803d', category: 'Сырдария', question: 'Жиде (Elaeagnus) ағашы Сырдария алқабында не үшін маңызды?', options: ['Тек жеміс береді', 'Жағалауды бекітеді және жануарлар мекені', 'Суды тазартады', 'Тек сәндік үшін'], correct: 1, explanation: 'Жиде өзен жағалауын эрозиядан қорғайды және жануарлар мен құстар үшін маңызды мекен.' },
  { id: 28, emoji: '🐢', color: '#15803d', category: 'Сырдария', question: 'Орта Азия тасбақасы қай жерде қысқы ұйқыға кетеді?', options: ['Өзенде', 'Жер астында', 'Ағаш қуысында', 'Тас астында'], correct: 1, explanation: 'Орта Азия тасбақасы қыста жер астына 1-2 метр тереңдікке кіріп қысқы ұйқыға кетеді.' },
  { id: 29, emoji: '🌿', color: '#15803d', category: 'Сырдария', question: 'Барсакелмес қорығы қай жылы құрылды?', options: ['1920', '1939', '1960', '1985'], correct: 1, explanation: 'Барсакелмес қорығы 1939 жылы кулан мен жейранды қорғау үшін құрылды.' },
  { id: 30, emoji: '🏞️', color: '#15803d', category: 'Сырдария', question: 'Сырдария бассейнінің жалпы ауданы қанша?', options: ['150 000 км²', '400 000 км²', '782 000 км²', '1 200 000 км²'], correct: 2, explanation: 'Сырдария бассейні 782 000 км² жерді алып жатыр.' },

  // ҚЫЗЫЛҚҰМ 
  { id: 31, emoji: '🏜️', color: '#b45309', category: 'Қызылқұм', question: '«Қызылқұм» сөзі қазақша не деген мағынаны білдіреді?', options: ['Үлкен шөл', 'Қызыл құм', 'Ыстық жер', 'Тас дала'], correct: 1, explanation: '«Қызыл» + «құм» — қызыл реңді құм шөлі.' },
  { id: 32, emoji: '🌵', color: '#b45309', category: 'Қызылқұм', question: 'Сексеуіл ағашының тамыры қанша тереңдікке жетеді?', options: ['5 метр', '10 метр', '20 метр', '30 метр'], correct: 3, explanation: 'Сексеуіл тамыры 30 метрге дейін жетеді — жер асты суын іздейді.' },
  { id: 33, emoji: '🦌', color: '#b45309', category: 'Қызылқұм', question: 'Қарақұйрық максималды жылдамдығы қанша?', options: ['40 км/сағ', '60 км/сағ', '80 км/сағ', '120 км/сағ'], correct: 2, explanation: 'Жейран 80 км/сағ жылдамдыққа жетеді.' },
  { id: 34, emoji: '☀️', color: '#b45309', category: 'Қызылқұм', question: 'Қызылқұмда жазғы максималды температура қанша болады?', options: ['+35°C', '+40°C', '+45°C', '+55°C'], correct: 2, explanation: 'Қызылқұмда жазда температура +45°C-ге дейін жетеді.' },
  { id: 35, emoji: '🏜️', color: '#b45309', category: 'Қызылқұм', question: 'Қызылқұм шөлінің жалпы ауданы қанша?', options: ['50 000 км²', '150 000 км²', '300 000 км²', '500 000 км²'], correct: 2, explanation: 'Қызылқұм шөлінің ауданы 300 000 км²-ден асады.' },
  { id: 36, emoji: '❄️', color: '#b45309', category: 'Қызылқұм', question: 'Қызылқұмда қысқы минималды температура қанша болуы мүмкін?', options: ['-5°C', '-15°C', '-25°C', '-40°C'], correct: 2, explanation: 'Қызылқұмда қыста температура -25°C-ге дейін төмендеуі мүмкін.' },
  { id: 37, emoji: '🦎', color: '#b45309', category: 'Қызылқұм', question: 'Варан (Varanus griseus) — бұл не?', options: ['Жылан түрі', 'Ірі кесіртке', 'Тасбақа', 'Кемірушілер'], correct: 1, explanation: 'Варан — Қызылқұмда тіршілік ететін ірі кесіртке, ұзындығы 1,5 метрге дейін жетеді.' },
  { id: 38, emoji: '🌱', color: '#b45309', category: 'Қызылқұм', question: 'Шөлде тіршілік ете алатын өсімдіктер қалай аталады?', options: ['Гидрофиттер', 'Ксерофиттер', 'Мезофиттер', 'Тропофиттер'], correct: 1, explanation: 'Ксерофиттер — құрғақшылыққа төзімді өсімдіктер. Сексеуіл, жусан — ксерофиттер.' },
  { id: 39, emoji: '🌵', color: '#b45309', category: 'Қызылқұм', question: 'Сексеуіл тамыры 1 тонна суды неге сіңіре алады?', options: ['Тамыр өте жіңішке', 'Тамыр өте кең және тармақты', 'Жапырақтары үлкен', 'Климат жылы'], correct: 1, explanation: 'Сексеуіл тамыры жан-жаққа кеңінен тарайды және тереңге кетеді, көп су жинайды.' },
  { id: 40, emoji: '🦅', color: '#b45309', category: 'Қызылқұм', question: 'Шөл бүркіті (Aquila nipalensis) негізінен не жейді?', options: ['Балық', 'Кемірушілер мен жыландар', 'Жеміс-жидек', 'Шөп'], correct: 1, explanation: 'Шөл бүркіті кемірушілерді, жыландарды және кесірткелерді аулайды.' },
  { id: 41, emoji: '🏔️', color: '#b45309', category: 'Қызылқұм', question: 'Қызылқұмда қандай пайдалы қазба бар?', options: ['Тек темір', 'Алтын, уран, табиғи газ', 'Тек мұнай', 'Пайдалы қазба жоқ'], correct: 1, explanation: 'Қызылқұм қойнауында алтын, уран кен орындары, сонымен қатар табиғи газ бар.' },
  { id: 42, emoji: '🌊', color: '#b45309', category: 'Қызылқұм', question: 'Шөлде жаңбыр жауған кезде бірінші өсетін өсімдіктер қалай аталады?', options: ['Суккуленттер', 'Эфемерлер', 'Мүктер', 'Папоротниктер'], correct: 1, explanation: 'Эфемерлер — жаңбырдан кейін тез өсіп, тұқым шашып, кеуіп кететін өсімдіктер.' },
  { id: 43, emoji: '🐫', color: '#b45309', category: 'Қызылқұм', question: 'Шөлде тіршілік ететін жануарлардың ең белсенді уақыты қашан?', options: ['Күндіз ыстықта', 'Таң мен кеш, түнде', 'Тек қыста', 'Жыл бойы бірдей'], correct: 1, explanation: 'Шөл жануарлары ыстықтан қашып, негізінен таңертең, кешке және түнде белсенді болады.' },
  { id: 44, emoji: '🌿', color: '#b45309', category: 'Қызылқұм', question: 'Кеуел (Calligonum) өсімдігі шөлде қандай рөл атқарады?', options: ['Тек жануарларды тамақтандырады', 'Құмды бекітеді', 'Ауаны тазартады', 'Жарық береді'], correct: 1, explanation: 'Кеуел — шөлді жерлердегі жылжымалы құмдарды бекітетін маңызды өсімдік.' },
  { id: 45, emoji: '🐢', color: '#b45309', category: 'Қызылқұм', question: 'Орта Азия тасбақасы (Testudo horsfieldii) жылына қанша ай белсенді тіршілік етеді?', options: ['2-3 ай', '6 ай', '9 ай', '12 ай'], correct: 0, explanation: 'Тасбақа жылына тек 2-3 ай белсенді болады: көктемде оянып, жаздың ыстығына дейін ұйқыға кетеді.' },

  // ҚЫЗЫЛОРДА / БАЙҚОҢЫР
  { id: 46, emoji: '🏙️', color: '#15803d', category: 'Қызылорда', question: 'Қызылорда қаласының халқы қанша адам?', options: ['100 000', '200 000', '340 000', '500 000'], correct: 2, explanation: 'Қызылорда қаласының халқы шамамен 340 000 адам.' },
  { id: 47, emoji: '🚀', color: '#6d28d9', category: 'Байқоңыр', question: 'Байқоңыр ғарыш айлағынан алғашқы жасанды серік қай жылы ұшырылды?', options: ['1950', '1957', '1961', '1969'], correct: 1, explanation: '1957 жылы Байқоңырдан Спутник-1 — алғашқы жасанды жер серігі ұшырылды.' },
  { id: 48, emoji: '🌍', color: '#6d28d9', category: 'Байқоңыр', question: 'Байқоңыр ғарыш айлағы қай елдің территориясында орналасқан?', options: ['Ресей', 'Өзбекстан', 'Қазақстан', 'Түрікменстан'], correct: 2, explanation: 'Байқоңыр Қазақстанның Қызылорда облысында орналасқан, бірақ Ресей жалға алады.' },
  { id: 49, emoji: '🌿', color: '#15803d', category: 'Қызылорда', question: 'Қызылорда облысы қай экожүйелердің қиылысу нүктесі?', options: ['Тундра мен орман', 'Шөл, жайылма және теңіз экожүйелері', 'Тау мен дала', 'Тек шөл'], correct: 1, explanation: 'Қызылорда — Қызылқұм шөлі, Сырдария жайылмасы және Арал теңізі экожүйелерінің бірегей қиылысу аймағы.' },
  { id: 50, emoji: '🌱', color: '#15803d', category: 'Қызылорда', question: 'Қызылорда облысында жыл сайын қандай экологиялық мәселе өткір тұр?', options: ['Орман өртенуі', 'Су тапшылығы және шөлейттену', 'Вулкан белсенділігі', 'Жер сілкінісі'], correct: 1, explanation: 'Су тапшылығы, шөлейттену және Арал апатының салдары — Қызылорда облысының негізгі экологиялық мәселелері.' },
]

const QUIZ_SIZE = 5

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_SIZE).fill(null))
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const shuffled = shuffle(QUESTION_BANK).slice(0, QUIZ_SIZE)
    setQuestions(shuffled)
    setReady(true)
  }, [])

  // Жүктелу (Loading) экраны — Ашық фонға өзгертілді
  if (!ready || questions.length === 0) {
    return (
      <main className="bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="text-slate-500 font-bold font-sans animate-pulse text-lg tracking-widest uppercase">
          Жүктелуде...
        </div>
      </main>
    )
  }

  const q = questions[current]
  const isAnswered = selected !== null

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelected(idx)
    const newAnswers = [...answers]
    newAnswers[current] = idx
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(answers[current + 1])
    } else {
      setFinished(true)
    }
  }

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1)
      setSelected(answers[current - 1])
    }
  }

  const score = answers.filter((a, i) => questions[i] && a === questions[i].correct).length

  const restart = () => {
    window.location.reload()
  }

  const getGrade = () => {
    if (score === 5) return { label: 'Тамаша! 🏆', color: '#16a34a', desc: 'Барлық сұраққа дұрыс жауап бердіңіз — Қызылорда табиғатының нағыз білгірісіз!' }
    if (score === 4) return { label: 'Өте жақсы! 🌟', color: '#d97706', desc: '4/5 — керемет нәтиже! Тек бір сұрақта қателестіңіз.' }
    if (score === 3) return { label: 'Жақсы! 👍', color: '#0284c7', desc: '3/5 — орта деңгей. Сайтты тереңірек зерттесеңіз, тіпті жақсы болады!' }
    if (score === 2) return { label: 'Жаттығыңыз керек 📚', color: '#ea580c', desc: '2/5 — экожүйелер бетіне оралып, қайта оқып шығыңыз!' }
    return { label: 'Тағы бір рет көріңіз 💪', color: '#e11d48', desc: '0-1/5 — уайымдамаңыз, жаңа нұсқамен тағы бір рет тапсырыңыз!' }
  }

  // ── НӘТИЖЕЛЕР ЭКРАНЫ ─────────────────────────────────────────────────────────
  if (finished) {
    const grade = getGrade()
    return (
      <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <Navbar />
        <div className="pt-28 pb-20 px-6 flex items-center min-h-screen">
          <div className="max-w-2xl mx-auto w-full text-center">
            
            <div className="text-7xl mb-6 animate-bounce">{score === 5 ? '🏆' : score >= 3 ? '🌟' : '📚'}</div>
            <h1 className="mb-3 font-black text-slate-900" style={{ fontSize: '2.5rem' }}>
              {grade.label}
            </h1>
            
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl mb-4 bg-white shadow-xl border border-slate-100">
              <span className="font-black" style={{ fontSize: '3rem', color: grade.color }}>
                {score}
              </span>
              <span className="text-slate-400 font-bold" style={{ fontSize: '1.2rem', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                / {QUIZ_SIZE}
              </span>
            </div>
            
            <p className="mb-10 text-slate-600 font-medium max-w-md mx-auto" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {grade.desc}
            </p>

            <div className="bg-white rounded-[2rem] overflow-hidden mb-10 shadow-lg border border-slate-100 text-left">
              {questions.map((q, i) => {
                const ans = answers[i]
                const isCorrect = ans === q.correct
                return (
                  <div key={q.id} className={`flex items-start gap-4 p-5 border-b border-slate-100 last:border-0 ${isCorrect ? 'bg-emerald-50/50' : 'bg-rose-50/50'}`}>
                    <span className="text-xl flex-shrink-0 mt-1">{isCorrect ? '✅' : '❌'}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black tracking-wider uppercase mb-1" style={{ color: q.color }}>
                        {q.emoji} {q.category}
                      </div>
                      <div className="text-sm font-bold text-slate-800 mb-1.5" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                        {q.question}
                      </div>
                      {!isCorrect && (
                        <div className="text-xs font-semibold text-emerald-700 bg-emerald-100/50 inline-block px-2 py-1 rounded" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                          ✓ Дұрыс: {q.options[q.correct]}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={restart} className="px-8 py-3.5 rounded-full text-sm font-bold transition-all hover:-translate-y-1 shadow-lg text-white"
                style={{ background: '#0f172a' }}>
                🔄 ЖАҢА НҰСҚА
              </button>
              <Link href="/" className="px-8 py-3.5 rounded-full text-sm font-bold transition-all hover:bg-slate-50 bg-white border border-slate-200 text-slate-600 shadow-sm inline-block text-center"
                style={{ textDecoration: 'none' }}>
                ← БАСТЫ БЕТКЕ
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // ── БЕЛСЕНДИ ВИКТОРИНА ЭКРАНЫ ───────────────────────────────────────────────
  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      <div className="pt-28 pb-20 px-6 flex items-start min-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          
          {/* Кері қайту */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-slate-500 hover:text-emerald-700 transition-colors">
            ← БАСТЫ БЕТКЕ ОРАЛУ
          </Link>

          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4"
              style={{ background: `${q.color}15`, border: `1px solid ${q.color}30`, color: q.color }}>
              ❓ Шағын викторина
            </div>
            <h1 className="font-black text-slate-900" style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
              Біліміңді <span className="italic" style={{ color: q.color }}>тексер</span>
            </h1>
          </div>

          {/* Прогресс жолағы */}
          <div className="mb-10">
            <div className="flex justify-between mb-2 font-bold uppercase tracking-wider text-[10px]">
              <span className="text-slate-400">
                {current + 1} / {QUIZ_SIZE} сұрақ
              </span>
              <span style={{ color: q.color }}>
                {q.emoji} {q.category}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((current + 1) / QUIZ_SIZE) * 100}%`, background: q.color }} />
            </div>
          </div>

          {/* Сұрақ карточкасы */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 mb-8 border border-slate-100 shadow-xl relative">
            <div className="text-5xl mb-6 text-center animate-bounce">{q.emoji}</div>
            <h2 className="text-center mb-10 font-bold text-slate-900"
              style={{ fontSize: 'clamp(1.1rem,3vw,1.4rem)', fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {q.question}
            </h2>

            <div className="space-y-3.5">
              {q.options.map((opt, i) => {
                let bg = 'bg-white'
                let border = 'border-slate-200'
                let text = 'text-slate-700'
                let iconText = 'text-slate-500'
                let iconBg = 'bg-slate-50'
                let icon = ['A', 'B', 'C', 'D'][i]

                if (isAnswered) {
                  if (i === q.correct) { 
                    bg = 'bg-emerald-50'; border = 'border-emerald-500'; text = 'text-emerald-800 font-bold'; iconText = 'text-emerald-600'; iconBg = 'bg-emerald-100'; icon = '✓' 
                  }
                  else if (i === selected) { 
                    bg = 'bg-rose-50'; border = 'border-rose-500'; text = 'text-rose-800 font-bold'; iconText = 'text-rose-600'; iconBg = 'bg-rose-100'; icon = '✗' 
                  }
                  else {
                    bg = 'bg-slate-50 opacity-60'; border = 'border-slate-200';
                  }
                }

                return (
                  <button key={i} onClick={() => handleSelect(i)}
                    className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all duration-200 border-2 ${bg} ${border} ${!isAnswered && 'hover:border-slate-400 hover:bg-slate-50 shadow-sm hover:shadow'}`}
                    style={{ cursor: isAnswered ? 'default' : 'pointer' }}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black ${iconBg} ${iconText}`}>
                      {icon}
                    </span>
                    <span className={`${text}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem' }}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Түсіндірме (Тек жауап берген соң шығады) */}
            {isAnswered && (
              <div className={`mt-6 p-5 rounded-xl border animate-fadeInUp ${selected === q.correct ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <p className={`text-sm font-semibold leading-relaxed ${selected === q.correct ? 'text-emerald-800' : 'text-rose-800'}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Басқару батырмалары */}
          <div className="flex gap-4">
            <button onClick={handlePrev} disabled={current === 0}
              className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all ${current === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-sm'}`}>
              ← АРТҚА
            </button>
            <button onClick={handleNext} disabled={!isAnswered}
              className={`flex-[2] py-4 rounded-2xl text-sm font-bold transition-all shadow-md`}
              style={{
                background: isAnswered ? q.color : '#f1f5f9', // slate-100
                color: isAnswered ? '#ffffff' : '#cbd5e1', // white / slate-300
                cursor: isAnswered ? 'pointer' : 'not-allowed',
                transform: isAnswered ? 'translateY(-2px)' : 'none',
                boxShadow: isAnswered ? `0 10px 25px ${q.color}40` : 'none'
              }}>
              {current === questions.length - 1 ? '🏁 НӘТИЖЕНІ КӨРУ' : 'КЕЛЕСІ СҰРАҚ →'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}