import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  Compass,
  Eye,
  Handshake,
  Heart,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
  LayoutGrid,
  KeyRound,
  Home,
  Trees,
} from 'lucide-react'
import {
  FadeIn,
  ParallaxBlock,
  ScrollLine,
  ScrollProgress,
  StaggerReveal,
  staggerItem,
} from '../components/Motion'
import {
  PageContainer,
  SectionAccent,
  SectionBackdrop,
} from '../components/project/ProjectChrome'
import { leaders } from '../data/content'
import { managementProfiles } from '../data/managementProfiles'

const HERO = '/media/clubhouse/btr-club-exterior-pool.jpg'
const STORY_IMAGE = '/media/township-amenities/golf-course.jpg'
const STORY_SIDE = '/media/clubhouse/btr-club-lounge.jpg'

const chapters = [
  { id: 'who-we-are', label: 'Story' },
  { id: 'guiding-principles', label: 'Principles' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'philosophy', label: 'Philosophy' },
] as const

const whoWeAre = [
  'MAK Projects emerges as a leading force in infrastructure, housing, and development, guided by a vision centered on innovation and excellence. By consistently elevating its performance standards, MAK maintains its position as a pinnacle of professionalism, reliability, and accomplishment in the real estate industry.',
  'The company’s commitment to delivering value, prime locations, superior construction, and reliable support underscores its dedication to customer satisfaction. MAK Projects goes beyond mere promises, ensuring that each aspect of its service exceeds expectations.',
  'With a meticulous approach to location selection and a team of highly qualified managers and engineers, MAK Projects ensures that every potential development opportunity is thoroughly evaluated and executed with precision. Collaboration with top architects, contractors, and project managers further enhances the quality and success of each project.',
  'Embracing international standards in its operations, MAK Projects sets the bar high for system efficiency, infrastructure quality, and engineering excellence. This unwavering commitment to excellence extends beyond individual projects, reflecting MAK’s broader dedication to its customers and partners.',
]

const pillars = [
  {
    icon: MapPin,
    title: 'Prime locations',
    body: 'Every site is evaluated with precision before a single foundation is planned.',
  },
  {
    icon: ShieldCheck,
    title: 'Superior build',
    body: 'International standards guide infrastructure quality and engineering excellence.',
  },
  {
    icon: Handshake,
    title: 'Trusted support',
    body: 'Customer delight at every touchpoint — beyond handovers and promises.',
  },
] as const

const guiding = [
  {
    index: '01',
    icon: Eye,
    title: 'Vision',
    accent: 'Respect · Delight · Sustainability',
    body: 'Be the most respected realty developer, sustainably delivering customer delight and well being for our communities and environment.',
    items: null as string[] | null,
    ring: 'ring-sage/15',
  },
  {
    index: '02',
    icon: Target,
    title: 'Mission',
    accent: 'Experience · Excellence · Synergy',
    body: null as string | null,
    items: [
      'Positive Customer Experience at every touch point',
      'Operational Excellence',
      'Design Innovation and Digitization',
      'Team and Group synergy leverage',
    ],
    ring: 'ring-gold/20',
  },
  {
    index: '03',
    icon: Compass,
    title: 'Values',
    accent: 'Focus · Integrity · Delivery',
    body: null as string | null,
    items: [
      'Customer Focus',
      'Innovation',
      'Delivering Promises',
      'Synergy',
      'Ethics and Transparency',
    ],
    ring: 'ring-ink/10',
  },
] as const

const philosophy =
  'We believe to do a little extra, reach a little higher, and press on a little further each day shows your dedication to continuous improvement and excellence. It’s this relentless pursuit of betterment that ensures the quality of life for your customers is constantly enhanced and elevated to higher levels.'

const stats = [
  { value: '20+', label: 'Years of excellence', icon: Award },
  { value: '260+', label: 'Acres · BTR Township', icon: Landmark },
  { value: '650+', label: 'Families living here', icon: Users },
  { value: '7+', label: 'Landmark projects', icon: Building2 },
] as const

const exploreLinks = [
  { label: 'BTR Township', to: '/btr-township', icon: Landmark },
  { label: 'BTR Serenity', to: '/btr-serenity', icon: Building2 },
  { label: 'Management', to: '/management', icon: Users },
  { label: 'Contact Us', to: '/contact', icon: Phone },
] as const

const quickExplore = [
  {
    label: 'BTR Serenity',
    hint: 'Ready-to-move homes',
    to: '/btr-serenity',
    icon: Building2,
    surface: 'from-[#1f6b55]/14 via-white to-[#eef8f3]',
    iconWrap: 'bg-sage text-white shadow-[0_8px_20px_rgba(31,107,85,0.25)]',
    hover: 'hover:border-sage/40',
  },
  {
    label: 'Management',
    hint: 'Leadership team',
    to: '/management',
    icon: Users,
    surface: 'from-[#d4af37]/16 via-white to-[#fffbf0]',
    iconWrap: 'bg-gold text-ink shadow-[0_8px_20px_rgba(212,175,55,0.3)]',
    hover: 'hover:border-gold/45',
  },
  {
    label: 'Projects',
    hint: 'Full portfolio',
    to: '/projects',
    icon: LayoutGrid,
    surface: 'from-ink/10 via-white to-[#f4f6f5]',
    iconWrap: 'bg-ink text-cream shadow-[0_8px_20px_rgba(7,17,14,0.2)]',
    hover: 'hover:border-ink/25',
  },
  {
    label: 'Contact',
    hint: 'Speak with us',
    to: '/contact',
    icon: Phone,
    surface: 'from-[#1f6b55]/10 via-white to-white',
    iconWrap: 'bg-forest text-white shadow-[0_8px_20px_rgba(12,36,28,0.25)]',
    hover: 'hover:border-forest/35',
  },
  {
    label: 'BTR Villas',
    hint: 'Luxury villa homes',
    to: '/btr-villas',
    icon: Home,
    surface: 'from-[#d4af37]/12 via-white to-[#faf8f5]',
    iconWrap: 'bg-gold/90 text-ink shadow-[0_8px_20px_rgba(212,175,55,0.28)]',
    hover: 'hover:border-gold/40',
  },
  {
    label: 'Amenities',
    hint: 'Clubhouse & lifestyle',
    to: '/amenities',
    icon: Trees,
    surface: 'from-[#1f6b55]/12 via-white to-[#eef8f3]',
    iconWrap: 'bg-sage/90 text-white shadow-[0_8px_20px_rgba(31,107,85,0.28)]',
    hover: 'hover:border-sage/40',
  },
] as const

const proseJustify =
  'text-justify hyphens-auto [text-align-last:left] [text-justify:inter-word]'
const bodyText = `${proseJustify} type-body sm:leading-[1.85]`
const bodyLead = 'text-left type-body-sm text-stone hyphens-none'
const cardCopy = 'text-left text-sm leading-relaxed text-stone hyphens-none'

function shortName(name: string) {
  return name.replace(/^Mr\.\s*/i, '')
}

function StatPop({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {value}
      </p>
    )
  }

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
    </motion.p>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  fullWidth = false,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  fullWidth?: boolean
}) {
  const centered = align === 'center'
  const wrap = fullWidth
    ? 'w-full'
    : centered
      ? 'mx-auto max-w-2xl text-center'
      : 'max-w-2xl'
  return (
    <div className={wrap}>
      <p className="type-eyebrow text-sage">{eyebrow}</p>
      <h2 className="mt-2.5 text-[clamp(1.6rem,3.2vw,2.35rem)] font-bold tracking-tight text-ink">
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-20 bg-gradient-to-r from-gold to-transparent ${
          centered ? 'mx-auto' : ''
        }`}
      />
      {description ? (
        <p
          className={`mt-3 ${bodyLead} ${centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const onScroll = () => {
      const offset = window.innerWidth >= 768 ? 168 : 148
      let current = ids[0] ?? ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= offset) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return active
}

export default function About() {
  const reduce = useReducedMotion()
  const active = useScrollSpy(chapters.map((c) => c.id))

  return (
    <>
      <ScrollProgress />

      {/* —— Cinematic hero —— */}
      <section className="relative min-h-[68vh] overflow-hidden bg-ink sm:min-h-[74vh]">
        <motion.img
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 14, ease: 'easeOut' }}
          src={HERO}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-cinematic absolute inset-0" />
        <div className="about-hero-mesh pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-gold/10 blur-3xl about-glow-orb" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-48 w-48 rounded-full bg-sage/15 blur-3xl about-glow-orb [animation-delay:1.5s]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <PageContainer className="relative z-10 flex min-h-[68vh] flex-col justify-end pb-20 pt-28 sm:min-h-[74vh] sm:pb-24 sm:pt-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <FadeIn className="max-w-3xl">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-gold-soft uppercase backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                MAK Projects · Hyderabad
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
                About{' '}
                <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text text-transparent">
                  Us
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-left text-[15px] leading-relaxed text-white/78 hyphens-none sm:text-base sm:leading-[1.75]">
                Two decades of building{' '}
                <span className="font-medium text-gold-soft">places people trust</span>{' '}
                — infrastructure, housing, and integrated communities across
                Hyderabad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#who-we-are"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase shadow-[0_12px_32px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:bg-gold-soft"
                >
                  Our story <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#leadership"
                  className="glass-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase"
                >
                  Leadership
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="hidden lg:block">
              <div className="mb-2 flex flex-col items-end gap-3 text-right">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">
                  Scroll to explore
                </p>
                <a
                  href="#who-we-are"
                  className="scroll-cue flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/70 backdrop-blur-sm transition hover:border-gold hover:text-gold"
                  aria-label="Scroll to story"
                >
                  <ChevronDown className="h-5 w-5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
      </section>

      {/* —— Floating stats —— */}
      <section className="relative z-20 -mt-14 sm:-mt-16">
        <PageContainer>
          <StaggerReveal className="about-stat-glass about-gradient-ring grid grid-cols-2 divide-x divide-ink/[0.06] overflow-hidden rounded-2xl sm:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon
              const accents = [
                'from-gold/70 to-transparent',
                'from-sage/70 to-transparent',
                'from-gold/50 to-transparent',
                'from-sage/50 to-transparent',
              ]
              return (
                <motion.div
                  key={s.label}
                  variants={staggerItem}
                  className="group relative flex flex-col items-center overflow-hidden px-4 py-6 text-center sm:px-6 sm:py-8"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accents[i]} opacity-70 transition group-hover:opacity-100`}
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/[0.08] text-sage ring-1 ring-sage/10 transition duration-500 group-hover:scale-110 group-hover:bg-sage group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(31,107,85,0.28)]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <StatPop
                    value={s.value}
                    className="mt-4 text-[clamp(1.55rem,3.2vw,2.2rem)] font-semibold tracking-tight text-ink"
                  />
                  <p className="mt-1 text-[10px] font-semibold leading-snug tracking-[0.16em] text-stone uppercase sm:text-[11px]">
                    {s.label}
                  </p>
                </motion.div>
              )
            })}
          </StaggerReveal>
        </PageContainer>
      </section>

      {/* —— Chapter navigation —— */}
      <nav
        aria-label="On this page"
        className="sticky top-[4.75rem] z-[48] border-b border-ink/8 bg-white/90 py-3 backdrop-blur-xl sm:py-3.5 md:top-20"
      >
        <PageContainer>
          <div
            className="relative flex gap-1 overflow-x-auto rounded-full border border-ink/[0.07] bg-[#faf8f5] p-1.5 scrollbar-none sm:grid sm:grid-cols-4"
            role="tablist"
          >
            {chapters.map((item) => {
              const on = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  role="tab"
                  aria-selected={on}
                  className={`relative flex min-h-[42px] shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-center text-[11px] font-semibold tracking-[0.06em] transition sm:min-h-[44px] ${
                    on ? 'text-cream' : 'text-stone hover:text-ink'
                  }`}
                >
                  {on && !reduce ? (
                    <motion.span
                      layoutId="about-chapter-active"
                      className="absolute inset-0 rounded-full bg-ink shadow-[0_4px_16px_rgba(7,17,14,0.2)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : on ? (
                    <span className="absolute inset-0 rounded-full bg-ink shadow-sm" />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              )
            })}
          </div>
        </PageContainer>
      </nav>

      {/* —— Who we are —— */}
      <section
        id="who-we-are"
        className="relative scroll-mt-[9.5rem] overflow-hidden md:scroll-mt-[10rem]"
      >
        <SectionBackdrop theme="cream" fadeBottom="white" />
        <SectionAccent />
        <PageContainer className="relative py-14 md:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14 xl:grid-cols-[minmax(0,380px)_1fr] xl:gap-16">
            {/* Sticky editorial header */}
            <FadeIn className="lg:sticky lg:top-36 lg:self-start">
              <p className="type-eyebrow text-sage">Company profile</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,2.85rem)] font-bold leading-[1.08] tracking-tight text-ink">
                Who we are
              </h2>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-5 text-left text-[15px] leading-[1.75] text-stone hyphens-none sm:text-base">
                Innovation · Reliability · Accomplishment across real estate
                and infrastructure in Hyderabad.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-ink/[0.08]">
                <img
                  src={STORY_SIDE}
                  alt="MAK clubhouse lounge"
                  className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/12 to-white p-5 lg:block">
                <KeyRound className="h-5 w-5 text-gold" strokeWidth={1.75} />
                <p className="mt-3 text-left text-sm font-semibold text-ink">
                  You Dream · We Deliver
                </p>
                <p className="mt-2 text-left text-xs leading-relaxed text-stone hyphens-none">
                  Excellence in integrated townships and ready-to-move homes.
                </p>
              </div>
            </FadeIn>

            {/* Story content — aligned with header top on desktop */}
            <div className="flex min-w-0 flex-col gap-7 lg:gap-8">
              <FadeIn delay={0.05}>
                <div className="about-gradient-ring relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#eef8f3] via-white to-[#fffdf8] p-7 sm:p-9">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sage/[0.08] blur-3xl about-glow-orb" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
                  <p
                    className={`relative border-l-2 border-gold pl-5 sm:pl-6 ${bodyText} text-[16px] sm:text-[17px] sm:leading-[2]`}
                  >
                    <span className="font-semibold">
                      {whoWeAre[0].slice(0, whoWeAre[0].indexOf('.') + 1)}
                    </span>
                    {whoWeAre[0].slice(whoWeAre[0].indexOf('.') + 1)}
                  </p>
                </div>
              </FadeIn>

              <div className="about-prose about-story-timeline relative space-y-8">
                {whoWeAre.slice(1).map((para, i) => (
                  <FadeIn key={para.slice(0, 36)} delay={0.08 + i * 0.05}>
                    <article className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-4 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-5">
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold/70 text-[11px] font-bold text-ink shadow-[0_6px_16px_rgba(212,175,55,0.35)] ring-4 ring-cream sm:h-11 sm:w-11">
                        0{i + 2}
                      </span>
                      <p className={`min-w-0 pt-0.5 ${bodyText}`}>{para}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* —— Bento: flagship + quick links —— */}
          <div className="mt-14 grid items-stretch gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
            <FadeIn delay={0.05} className="lg:col-span-7">
              <Link to="/btr-township" className="group block h-full">
                <ParallaxBlock className="h-full min-h-[280px] rounded-3xl lg:min-h-[420px]" strength={24}>
                  <div className="project-card-shine relative h-full min-h-[280px] overflow-hidden rounded-3xl bg-ink ring-1 ring-ink/10 lg:min-h-[420px]">
                    <img
                      src={STORY_IMAGE}
                      alt="MAK — BTR Township golf community"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/10" />
                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                      <p className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
                        Flagship community
                      </p>
                      <p className="mt-3 text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight text-white">
                        MAK — BTR Township
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        260+ acres · Srisailam Highway
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition duration-300 group-hover:bg-gold-soft">
                        Explore township
                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </ParallaxBlock>
              </Link>
            </FadeIn>

            <FadeIn delay={0.08} className="flex h-full flex-col lg:col-span-5">
              <div className="mb-4 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/12 to-white p-5 lg:mb-0 lg:hidden">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                    <KeyRound className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">You Dream · We Deliver</p>
                    <p className="mt-1.5 text-sm text-stone">
                      Symbol of excellence in Hyderabad real estate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid h-full min-h-[420px] grid-cols-2 grid-rows-3 gap-3 sm:gap-3.5 lg:min-h-[420px]">
                {quickExplore.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`about-card-lift group flex h-full min-h-[118px] flex-col justify-between overflow-hidden rounded-2xl border border-ink/[0.08] bg-gradient-to-br p-4 sm:p-4 ${item.surface} ${item.hover}`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition duration-500 group-hover:scale-110 ${item.iconWrap}`}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <div className="mt-3 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug text-ink group-hover:text-sage">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-stone">
                            {item.hint}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sage" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </FadeIn>
          </div>

          {/* —— Pillars —— */}
          <FadeIn delay={0.1} className="mt-16 lg:mt-20">
            <div className="mb-8 flex flex-col gap-3 border-b border-ink/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-eyebrow text-sage">What defines us</p>
                <h3 className="mt-2.5 text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold tracking-tight text-ink">
                  Built on three pillars
                </h3>
              </div>
              <p className="max-w-xs text-sm text-stone sm:text-right">
                The foundation behind every community we deliver.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon
                const featured = i === 1
                return (
                  <article
                    key={p.title}
                    className={`about-card-lift group relative overflow-hidden rounded-3xl p-7 sm:p-8 ${
                      featured
                        ? 'bg-gradient-to-br from-ink via-[#0c241c] to-ink text-white shadow-[0_24px_56px_rgba(7,17,14,0.22)] ring-1 ring-gold/20'
                        : 'border border-ink/[0.08] bg-white'
                    }`}
                  >
                    <span
                      className={`about-watermark absolute -right-2 -top-4 text-[5.5rem] font-bold leading-none ${
                        featured ? 'text-white/[0.06]' : 'text-ink/[0.04]'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition duration-500 group-hover:scale-110 ${
                        featured
                          ? 'bg-gold/15 text-gold ring-gold/25 group-hover:bg-gold group-hover:text-ink'
                          : 'bg-sage/[0.08] text-sage ring-sage/10 group-hover:bg-sage group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3
                      className={`relative mt-5 text-lg font-bold ${featured ? 'text-white' : 'text-ink'}`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`relative mt-3 text-sm leading-relaxed hyphens-none ${
                        featured ? 'text-white/72' : 'text-stone'
                      }`}
                    >
                      {p.body}
                    </p>
                    {!featured ? (
                      <div className="about-principle-accent absolute inset-x-0 top-0 h-1 opacity-0 transition duration-300 group-hover:opacity-100" />
                    ) : (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    )}
                  </article>
                )
              })}
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* —— Vision · Mission · Values —— */}
      <section
        id="guiding-principles"
        className="relative scroll-mt-[9.5rem] overflow-hidden md:scroll-mt-[10rem]"
      >
        <SectionBackdrop theme="white" fadeBottom="mist" />
        <SectionAccent variant="fade" />
        <PageContainer className="relative py-14 md:py-20">
          <FadeIn>
            <div className="flex flex-col gap-5 border-b border-ink/8 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                fullWidth
                eyebrow="Guiding principles"
                title="Vision · Mission · Values"
              />
              <p className="max-w-sm shrink-0 text-sm leading-relaxed text-stone lg:pb-1 lg:text-right">
                The compass behind every community we build.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
            {guiding.map((row, i) => {
              const Icon = row.icon
              return (
                <FadeIn key={row.title} delay={i * 0.07} className="group h-full">
                  <article
                    className={`about-card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-[0_8px_32px_rgba(7,17,14,0.05)] ${row.ring} ring-1`}
                  >
                    <div className="flex items-center gap-3 bg-ink px-5 py-4 sm:px-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold ring-1 ring-white/10 transition duration-500 group-hover:scale-110">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                          {row.index} · {row.title}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-snug tracking-[0.1em] text-cream/55 uppercase">
                          {row.accent}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-7 sm:px-6 sm:py-8">
                      {row.body ? <p className={cardCopy}>{row.body}</p> : null}
                      {row.items ? (
                        <ul className="space-y-3.5">
                          {row.items.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              <span className={cardCopy}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </FadeIn>
              )
            })}
          </div>
        </PageContainer>
      </section>

      {/* —— Leadership —— */}
      <section
        id="leadership"
        className="relative scroll-mt-[9.5rem] overflow-hidden border-y border-ink/[0.06] bg-[#faf8f5] md:scroll-mt-[10rem]"
      >
        <PageContainer className="py-14 md:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="type-eyebrow text-sage">Leadership</p>
              <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold tracking-tight text-ink">
                Experienced board &amp; management
              </h2>
              <ScrollLine className="mt-5" />
              <p className={`mx-auto mt-5 max-w-2xl ${bodyLead}`}>
                Decades of expertise across real estate, hospitality, and
                infrastructure — tap a profile to view the full biography on
                our Management page.
              </p>
            </div>
          </FadeIn>

          <div className="about-leadership-scroll -mx-1 mt-10 flex gap-4 overflow-x-auto pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 md:grid-cols-5">
            {leaders.map((person, i) => {
              const meta = managementProfiles[i]
              if (!meta) return null

              return (
                <FadeIn key={person.name} delay={i * 0.05} className="w-[46%] shrink-0 sm:w-auto">
                  <Link
                    to={`/management#${meta.sectionId}`}
                    className="about-card-lift group block overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.06]"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover object-[center_15%] transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                        <p className="text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">
                          {meta.eyebrow}
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-snug text-white sm:text-sm">
                          {shortName(person.name)}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-white/70 sm:text-[11px]">
                          {person.role}
                        </p>
                      </div>
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="px-3 py-2.5 sm:px-3.5">
                      <p className="text-[10px] font-medium text-stone">{person.years}</p>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>

          <FadeIn delay={0.08} className="mt-10 text-center">
            <Link
              to="/management"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/12 bg-white px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase shadow-sm transition hover:border-sage hover:shadow-md"
            >
              View all executive profiles
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>
        </PageContainer>
      </section>

      {/* —— Philosophy —— */}
      <section
        id="philosophy"
        className="relative scroll-mt-[9.5rem] overflow-hidden md:scroll-mt-[10rem]"
      >
        <SectionBackdrop theme="pearl" fadeBottom="cream" />
        <PageContainer className="relative py-14 md:py-20">
          <FadeIn>
            <div className="about-philosophy-card relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
              <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-gold/18 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-sage/14 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              <div className="relative z-10 mx-auto max-w-3xl">
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold ring-1 ring-gold/25">
                    <Heart className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-5 type-eyebrow text-sage">Our philosophy</p>
                  <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                <p
                  className="mt-6 text-center font-display text-[3.5rem] leading-none text-gold/35 sm:text-[4.5rem]"
                  aria-hidden
                >
                  &ldquo;
                </p>

                <p className="relative -mt-4 text-center text-[clamp(1rem,2.2vw,1.35rem)] font-medium leading-[1.85] tracking-tight text-ink sm:leading-[1.9]">
                  {philosophy}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  {['A little extra', 'A little higher', 'A little further'].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-gold/30 bg-white/90 px-5 py-2 text-[10px] font-semibold tracking-[0.16em] text-ink uppercase shadow-sm"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* —— Explore projects —— */}
      <section className="relative overflow-hidden border-t border-ink/6 bg-white">
        <PageContainer className="py-14 md:py-20">
          <FadeIn>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader eyebrow="Explore MAK" title="Discover our projects" />
              <Link
                to="/projects"
                className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-semibold tracking-[0.16em] text-sage uppercase transition hover:text-ink lg:mb-1"
              >
                View portfolio <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {exploreLinks.map((link, i) => {
                const Icon = link.icon
                const surfaces = [
                  'from-[#eef8f3] to-white',
                  'from-[#fffbf0] to-white',
                  'from-[#f4f6f5] to-white',
                  'from-[#eef8f3] to-white',
                ]
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`about-card-lift group flex items-center gap-4 rounded-2xl border border-ink/8 bg-gradient-to-br ${surfaces[i]} px-5 py-5 transition hover:border-sage/30`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/[0.08] text-sage transition group-hover:bg-sage group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-ink group-hover:text-sage">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/20 transition group-hover:text-sage" />
                  </Link>
                )
              })}
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* —— CTA —— */}
      <section className="relative overflow-hidden bg-ink py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(31,107,85,0.25),_transparent_60%)]" />
        <PageContainer className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="type-eyebrow text-gold-soft">Partner with MAK</p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Ready to find your home?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-left text-sm leading-relaxed text-white/65 hyphens-none sm:text-center">
              Speak with our team about ready-to-move apartments, villa plots,
              and township living on Srisailam Highway.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase shadow-[0_12px_32px_rgba(212,175,55,0.3)] transition hover:-translate-y-0.5 hover:bg-gold-soft sm:w-auto"
              >
                Contact us <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </>
  )
}
