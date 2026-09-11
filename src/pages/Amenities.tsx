import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Building2,
  CreditCard,
  Dumbbell,
  Fence,
  Landmark,
  LayoutGrid,
  ShieldCheck,
  Trees,
  Waves,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from '../components/Motion'
import {
  CardShell,
  SectionHead,
  SoftScene,
} from '../components/project/ProjectChrome'
import EnquireButton from '../components/mak-crm/EnquireButton'
import BtrClubShowcase from '../components/project/BtrClubShowcase'
import ClubPavilionShowcase from '../components/project/ClubPavilionShowcase'
import LifestylePillars from '../components/project/LifestylePillars'
import ProjectHighlights from '../components/project/ProjectHighlights'
import TownshipAmenitiesGallery from '../components/project/TownshipAmenitiesGallery'
import { btrClubhouse } from '../data/content'

/**
 * Amenities - advanced lifestyle page (Serenity-parity card UI)
 */

const HERO = btrClubhouse.poster

type Category = 'all' | 'club' | 'sports' | 'security' | 'infra'

type AmenityItem = {
  name: string
  blurb: string
  category: Exclude<Category, 'all'>
  icon: LucideIcon
}

const amenityItems: AmenityItem[] = [
  {
    name: 'Club House',
    blurb: 'Dual clubhouses for community gatherings and leisure.',
    category: 'club',
    icon: Landmark,
  },
  {
    name: 'Swimming Pool',
    blurb: 'Resort-style pool for everyday recreation.',
    category: 'club',
    icon: Waves,
  },
  {
    name: '10-Hole Golf Course',
    blurb: 'Play and unwind on the township golf course.',
    category: 'sports',
    icon: Trees,
  },
  {
    name: 'Gym',
    blurb: 'Fully equipped fitness centre for daily training.',
    category: 'sports',
    icon: Dumbbell,
  },
  {
    name: 'Yoga Room',
    blurb: 'Calm indoor space for yoga and wellness.',
    category: 'club',
    icon: Activity,
  },
  {
    name: 'Jogging Track',
    blurb: 'Tree-lined tracks for morning and evening runs.',
    category: 'sports',
    icon: Trees,
  },
  {
    name: 'Cricket Ground',
    blurb: 'Open ground for cricket and community sports.',
    category: 'sports',
    icon: Activity,
  },
  {
    name: 'Basketball Court',
    blurb: 'Dedicated court for active family play.',
    category: 'sports',
    icon: Activity,
  },
  {
    name: 'EV Charging',
    blurb: 'Provision for EV charging for modern mobility.',
    category: 'infra',
    icon: Zap,
  },
  {
    name: '24/7 Security',
    blurb: 'Round-the-clock gated community security.',
    category: 'security',
    icon: ShieldCheck,
  },
  {
    name: 'Solar Fencing',
    blurb: 'Perimeter solar fencing for added safety.',
    category: 'security',
    icon: Fence,
  },
  {
    name: 'STP & Water Softening',
    blurb: 'Sustainable water treatment and softening plant.',
    category: 'infra',
    icon: Waves,
  },
  {
    name: 'ATM',
    blurb: 'On-campus convenience for everyday banking.',
    category: 'infra',
    icon: CreditCard,
  },
  {
    name: 'Ambulance',
    blurb: 'Emergency medical response within the township.',
    category: 'security',
    icon: Ambulance,
  },
  {
    name: 'Tree-lined Vistas',
    blurb: 'Landscaped avenues and green visual corridors.',
    category: 'club',
    icon: Trees,
  },
  {
    name: 'Power Backup',
    blurb: 'Reliable backup for uninterrupted living.',
    category: 'infra',
    icon: Zap,
  },
]

const filters: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'club', label: 'Club' },
  { id: 'sports', label: 'Sports' },
  { id: 'security', label: 'Security' },
  { id: 'infra', label: 'Infra' },
]

const metrics = [
  { value: '80+', label: 'World-class amenities', icon: LayoutGrid },
  { value: '10', label: 'Hole golf course', icon: Trees },
  { value: '2', label: 'Clubhouses', icon: Building2 },
  { value: '24/7', label: 'Secured living', icon: ShieldCheck },
]

export default function Amenities() {
  const [filter, setFilter] = useState<Category>('all')
  const reduce = useReducedMotion()

  const list = useMemo(() => {
    if (filter === 'all') return amenityItems
    return amenityItems.filter((a) => a.category === filter)
  }, [filter])

  return (
    <>
      {/* Hero */}
      <section className="relative h-[72vh] min-h-[480px] overflow-hidden bg-ink md:h-[78vh]">
        <motion.img
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 10, ease: 'easeOut' }}
          src={HERO}
          alt="MAK - BTR amenities"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

        <div className="relative z-10 site-container-hero flex h-full flex-col justify-end px-6 pb-14 pt-28 sm:px-10 lg:px-14 lg:pb-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              MAK - BTR · Lifestyle
            </p>
            <h1 className="text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white uppercase">
              Amenities that
              <br />
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                Bring Joy
              </span>
            </h1>
            <div className="mt-5 h-px w-36 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Club facilities, sports, security and sustainable infrastructure -
              crafted for everyday living across the BTR township.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#amenity-grid"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                Explore amenities <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition hover:bg-white hover:text-ink"
              >
                View projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative overflow-hidden">
        <SoftScene />
        <div className="relative site-container px-5 py-10 md:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <FadeIn key={m.label} delay={i * 0.06}>
                  <CardShell>
                    <div className="flex items-center gap-4 px-5 py-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-2xl font-bold tracking-tight text-ink">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold tracking-[0.16em] text-stone uppercase">
                          {m.label}
                        </p>
                      </div>
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <BtrClubShowcase id="amenities-clubhouse" />

      <ClubPavilionShowcase id="amenities-pavilion" />

      <LifestylePillars id="lifestyle-pillars" />

      {/* Amenity grid + filters */}
      <section
        id="amenity-grid"
        className="relative scroll-mt-28 overflow-hidden py-12 md:py-16"
      >
        <SoftScene />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Directory" title="Club & Community" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mb-8 flex justify-center md:mb-10">
              <div className="relative inline-flex max-w-full overflow-x-auto rounded-full border border-ink/8 bg-white/90 p-1 shadow-[0_10px_30px_rgba(7,17,14,0.06)] backdrop-blur-sm scrollbar-none">
                {filters.map((f) => {
                  const on = filter === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className="relative z-10 shrink-0 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase sm:px-5"
                    >
                      {on && (
                        <motion.span
                          layoutId="amenitiesFilter"
                          className="absolute inset-0 rounded-full bg-ink shadow-md"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      <span
                        className={`relative ${on ? 'text-cream' : 'text-stone'}`}
                      >
                        {f.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((a, i) => {
                const Icon = a.icon
                return (
                  <motion.div
                    key={a.name}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <CardShell>
                      <div className="relative flex h-full flex-col px-4 py-5 sm:px-5 sm:py-6">
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md transition duration-500 group-hover:scale-105">
                            <Icon className="h-5 w-5" strokeWidth={1.6} />
                          </span>
                          <span className="text-[11px] font-bold tracking-[0.16em] text-ink/15 uppercase">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="mt-4 text-[11px] font-bold tracking-tight text-ink sm:text-sm">
                          {a.name}
                        </p>
                        <p className="mt-2 flex-1 text-[11px] leading-relaxed text-stone sm:text-[11px]">
                          {a.blurb}
                        </p>
                        <span className="mt-4 inline-block h-1 w-8 rounded-full bg-ink/10 transition duration-500 group-hover:w-12 group-hover:bg-gold" />
                      </div>
                    </CardShell>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <TownshipAmenitiesGallery id="amenities-visual-tour" />

      <ProjectHighlights />

      {/* CTA */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="site-container max-w-3xl px-5">
          <FadeIn>
            <CardShell dark>
              <div className="relative px-8 py-12 text-center md:px-12 md:py-14">
                <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sage/25 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 top-1/3 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  Live the lifestyle
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-tight text-cream">
                  Experience BTR amenities
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-cream/55">
                  Schedule a site visit and walk through club, sports and
                  community spaces in person.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <EnquireButton className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:-translate-y-0.5 hover:bg-gold-soft">
                    Contact us <ArrowUpRight className="h-3.5 w-3.5" />
                  </EnquireButton>
                  <Link
                    to="/btr-serenity"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-cream hover:text-ink"
                  >
                    View Serenity
                  </Link>
                </div>
              </div>
            </CardShell>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
