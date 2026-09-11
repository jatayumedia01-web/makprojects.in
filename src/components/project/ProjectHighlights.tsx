import { useMemo, useState } from 'react'
import {
  Briefcase,
  Car,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn, StaggerReveal, staggerItem } from '../Motion'
import { CardShell, SectionAccent, SectionBackdrop } from './ProjectChrome'
import { btrProjectHighlights, type HighlightItem } from '../../data/content'

const EASE = [0.22, 1, 0.36, 1] as const

const categoryIcons: Record<string, LucideIcon> = {
  connectivity: Car,
  healthcare: HeartPulse,
  education: GraduationCap,
  business: Briefcase,
  leisure: MapPin,
}

const categoryAccent: Record<
  string,
  {
    iconBg: string
    iconColor: string
    stripe: string
    badge: string
    headerBg: string
    bodyBg: string
  }
> = {
  connectivity: {
    iconBg: 'bg-sage/15',
    iconColor: 'text-sage',
    stripe: 'from-sage via-sage/50 to-transparent',
    badge: 'bg-sage/12 text-sage ring-sage/20',
    headerBg: 'from-[#eef6f2] to-white',
    bodyBg: 'bg-[#f8faf9]',
  },
  healthcare: {
    iconBg: 'bg-[#fceeee]',
    iconColor: 'text-[#9b5050]',
    stripe: 'from-[#c98888] via-[#c98888]/40 to-transparent',
    badge: 'bg-[#fceeee] text-[#9b5050] ring-[#c98888]/25',
    headerBg: 'from-[#fdf5f5] to-white',
    bodyBg: 'bg-[#fdfafa]',
  },
  education: {
    iconBg: 'bg-gold/15',
    iconColor: 'text-[#a07820]',
    stripe: 'from-gold via-gold/45 to-transparent',
    badge: 'bg-gold/12 text-[#a07820] ring-gold/25',
    headerBg: 'from-[#faf6eb] via-[#fdf9f2] to-white',
    bodyBg: 'bg-[#faf8f4]',
  },
  business: {
    iconBg: 'bg-ink/8',
    iconColor: 'text-ink',
    stripe: 'from-ink/60 via-ink/25 to-transparent',
    badge: 'bg-ink/8 text-ink ring-ink/10',
    headerBg: 'from-[#f0f2f4] to-white',
    bodyBg: 'bg-[#f9fafb]',
  },
  leisure: {
    iconBg: 'bg-[#edf5f0]',
    iconColor: 'text-[#3d6b55]',
    stripe: 'from-[#5a8f72] via-[#5a8f72]/35 to-transparent',
    badge: 'bg-[#edf5f0] text-[#3d6b55] ring-[#5a8f72]/20',
    headerBg: 'from-[#f0f7f3] to-white',
    bodyBg: 'bg-[#f7fbf8]',
  },
}

const quickStats = [
  { value: '12', unit: 'min', label: 'ORR Exit 14', icon: Car },
  { value: '20', unit: 'min', label: 'RGIA Airport', icon: MapPin },
  { value: '40', unit: 'min', label: 'Gachibowli', icon: Briefcase },
] as const

type FilterId = 'all' | (typeof btrProjectHighlights.categories)[number]['id']

function CountBadge({
  count,
  className,
}: {
  count: number
  className: string
}) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums ring-1 ${className}`}
    >
      {count}
    </span>
  )
}

function HighlightCard({
  catId,
  title,
  items,
  icon: Icon,
  featured = false,
  stagger = false,
  index = 0,
  className = '',
}: {
  catId: string
  title: string
  items: readonly HighlightItem[]
  icon: LucideIcon
  featured?: boolean
  stagger?: boolean
  index?: number
  className?: string
}) {
  const accent = categoryAccent[catId] ?? categoryAccent.connectivity

  function ItemChip({ item }: { item: HighlightItem }) {
    const ItemIcon = item.icon
    return (
      <li className="max-w-full">
        <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-2.5 py-2 text-[11px] leading-snug text-[#3f4a52] shadow-[0_1px_4px_rgba(7,17,14,0.04)] transition duration-200 hover:border-gold/35 hover:shadow-[0_4px_12px_rgba(7,17,14,0.07)] sm:px-3 sm:text-[11px]">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-black/[0.04] ${accent.iconBg} ${accent.iconColor}`}
          >
            <ItemIcon className="h-3 w-3" strokeWidth={2} aria-hidden />
          </span>
          <span className="whitespace-normal">{item.label}</span>
        </span>
      </li>
    )
  }

  return (
    <motion.div
      layout={stagger}
      {...(stagger
        ? { variants: staggerItem }
        : {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: index * 0.05, ease: EASE },
          })}
      className={`flex h-full min-h-0 flex-col ${className}`}
    >
      <CardShell lift={false} className="flex h-full min-h-0 flex-1 flex-col">
        <div
          className={`h-1 w-full shrink-0 bg-gradient-to-r ${accent.stripe}`}
          aria-hidden
        />
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            className={`relative shrink-0 overflow-hidden border-b border-ink/[0.06] bg-gradient-to-r ${accent.headerBg} px-4 sm:px-5 ${
              featured ? 'py-3.5 sm:py-4' : 'py-3 sm:py-3.5'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex shrink-0 items-center justify-center rounded-full ring-1 ring-black/[0.05] ${accent.iconBg} ${accent.iconColor} ${
                    featured ? 'h-11 w-11' : 'h-9 w-9'
                  }`}
                >
                  <Icon
                    className={featured ? 'h-[18px] w-[18px]' : 'h-4 w-4'}
                    strokeWidth={1.65}
                  />
                </span>
                <div className="min-w-0">
                  {featured ? (
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-sage uppercase sm:text-[11px]">
                      Nearby · Schools & Universities
                    </p>
                  ) : null}
                  <h3
                    className={`truncate font-bold tracking-[0.08em] text-ink uppercase ${
                      featured
                        ? 'text-[11px] sm:text-sm'
                        : 'text-[11px] sm:text-xs'
                    }`}
                  >
                    {title}
                  </h3>
                </div>
              </div>
              <CountBadge count={items.length} className={accent.badge} />
            </div>
          </div>

          <ul
            className={`flex flex-1 flex-wrap content-start gap-2 px-3 py-3 sm:gap-2.5 sm:px-4 sm:py-3.5 ${accent.bodyBg}`}
          >
            {items.map((item) => (
              <ItemChip key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </CardShell>
    </motion.div>
  )
}

/** Nearby connectivity, healthcare, schools & corridors - below Visual Tour gallery */
export default function ProjectHighlights({
  id = 'project-highlights',
  className = '',
}: {
  id?: string
  className?: string
}) {
  const { title, subtitle, categories } = btrProjectHighlights
  const [filter, setFilter] = useState<FilterId>('all')

  const filters: {
    id: FilterId
    label: string
    short: string
    icon?: LucideIcon
  }[] = [
    { id: 'all', label: 'All', short: 'All', icon: LayoutGrid },
    ...categories.map((c) => ({
      id: c.id as FilterId,
      label: c.title,
      short:
        c.id === 'education'
          ? 'Schools'
          : c.id === 'business'
            ? 'Business'
            : c.id === 'leisure'
              ? 'Leisure'
              : c.title.split(' ')[0],
      icon: categoryIcons[c.id],
    })),
  ]

  const visible = useMemo(() => {
    if (filter === 'all') return categories
    return categories.filter((c) => c.id === filter)
  }, [filter, categories])

  const connectivity = categories.find((c) => c.id === 'connectivity')!
  const healthcare = categories.find((c) => c.id === 'healthcare')!
  const education = categories.find((c) => c.id === 'education')!
  const business = categories.find((c) => c.id === 'business')!
  const leisure = categories.find((c) => c.id === 'leisure')!

  const showBento = filter === 'all'

  return (
    <section
      id={id}
      className={`relative scroll-mt-36 overflow-hidden py-16 md:py-24 ${className}`}
    >
      <SectionBackdrop theme="mist" fadeBottom="ink" />
      <SectionAccent variant="sage" />

      <div className="relative site-container px-5">
        <FadeIn>
          <div className="mb-10 text-center md:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-sage uppercase shadow-sm backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              Location advantage
            </span>
            <h2 className="mt-4 text-[clamp(1.55rem,3.2vw,2.45rem)] font-bold tracking-[0.06em] text-ink uppercase">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-stone">
              {subtitle}
            </p>
            <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </FadeIn>

        {/* Travel time stats */}
        <FadeIn delay={0.05}>
          <div className="relative mb-8 md:mb-10">
            <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-sage/25 to-transparent sm:block" />
            <div className="relative grid gap-4 sm:grid-cols-3">
              {quickStats.map((stat, i) => {
                const StatIcon = stat.icon
                return (
                  <CardShell key={stat.label} lift={false}>
                    <div className="relative flex items-center gap-4 px-5 py-4 sm:px-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-[0_6px_16px_rgba(12,36,28,0.22)]">
                        <StatIcon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold tracking-tight text-ink">
                            {stat.value}
                          </span>
                          <span className="text-xs font-semibold text-sage">
                            {stat.unit}
                          </span>
                        </p>
                        <p className="mt-0.5 truncate text-[11px] font-semibold tracking-[0.14em] text-stone uppercase">
                          {stat.label}
                        </p>
                      </div>
                      {i < quickStats.length - 1 ? (
                        <span className="absolute -right-2 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border-2 border-white bg-gold shadow sm:block" />
                      ) : null}
                    </div>
                  </CardShell>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.08}>
          <div className="mb-8 flex justify-center md:mb-10">
            <div className="relative inline-flex max-w-full overflow-x-auto rounded-2xl border border-ink/8 bg-white p-1 shadow-[0_8px_32px_rgba(7,17,14,0.06)] scrollbar-none">
              {filters.map((f) => {
                const on = filter === f.id
                const FIcon = f.icon
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className="relative shrink-0 rounded-xl px-3 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase sm:px-3.5 sm:text-[11px]"
                  >
                    {on ? (
                      <motion.span
                        layoutId="highlightsFilter"
                        className="absolute inset-0 rounded-xl bg-ink shadow-[0_4px_12px_rgba(7,17,14,0.18)]"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span
                      className={`relative inline-flex items-center gap-1.5 whitespace-nowrap ${
                        on ? 'text-cream' : 'text-stone hover:text-ink'
                      }`}
                    >
                      {FIcon ? (
                        <FIcon className="h-3 w-3 shrink-0" strokeWidth={2} />
                      ) : null}
                      <span className="sm:hidden">{f.short}</span>
                      <span className="hidden sm:inline">{f.label}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          {showBento ? (
            <motion.div
              key="bento"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <StaggerReveal className="flex flex-col gap-4 lg:gap-5">
                {/* Featured education - wide & compact (2 rows × 5 cols) */}
                <HighlightCard
                  catId={education.id}
                  title={education.title}
                  items={education.items}
                  icon={categoryIcons.education}
                  featured
                  stagger
                  className="w-full"
                />

                <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:gap-5">
                  <HighlightCard
                    catId={connectivity.id}
                    title={connectivity.title}
                    items={connectivity.items}
                    icon={categoryIcons.connectivity}
                    stagger
                    className="h-full"
                  />
                  <HighlightCard
                    catId={healthcare.id}
                    title={healthcare.title}
                    items={healthcare.items}
                    icon={categoryIcons.healthcare}
                    stagger
                    className="h-full"
                  />
                  <HighlightCard
                    catId={business.id}
                    title={business.title}
                    items={business.items}
                    icon={categoryIcons.business}
                    stagger
                    className="h-full"
                  />
                  <HighlightCard
                    catId={leisure.id}
                    title={leisure.title}
                    items={leisure.items}
                    icon={categoryIcons.leisure}
                    stagger
                    className="h-full"
                  />
                </div>
              </StaggerReveal>
            </motion.div>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`site-container`}
            >
              {visible.map((cat, i) => (
                <HighlightCard
                  key={cat.id}
                  catId={cat.id}
                  title={cat.title}
                  items={cat.items}
                  icon={categoryIcons[cat.id] ?? MapPin}
                  featured={cat.id === 'education'}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
