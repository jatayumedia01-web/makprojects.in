import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Home,
  Landmark,
  MapPin,
  Route,
  ShieldCheck,
  Trees,
  Users,
  Waves,
} from 'lucide-react'
import { FadeIn } from '../components/Motion'
import { ScrollSection } from '../components/ScrollSection'
import { ScrollSpyRail } from '../components/ScrollSpyRail'
import { CardShell, SoftScene } from '../components/project/ProjectChrome'
import BtrClubShowcase from '../components/project/BtrClubShowcase'
import ClubPavilionShowcase from '../components/project/ClubPavilionShowcase'
import TownshipAmenitiesGallery from '../components/project/TownshipAmenitiesGallery'
import { btrTownship } from '../data/content'
import { townshipPage } from '../data/projectPages'

/**
 * MAK — BTR Township — full master page
 * Content aligned to township story, mix, amenities, offerings & map.
 */

const HERO_IMAGE =
  '/media/villas/hero.jpg'

const EASE = [0.22, 1, 0.36, 1] as const

const chapters = [
  { id: 'btr-township', label: 'Township' },
  { id: 'township-amenities', label: 'Amenities' },
  { id: 'township-clubhouse', label: 'Club' },
  { id: 'township-pavilion', label: 'Club Pavilion' },
  { id: 'offerings', label: 'Offerings' },
  { id: 'township-gallery', label: 'Gallery' },
  { id: 'township-map', label: 'Map' },
] as const

const groupIcons = {
  community: Users,
  sports: Trees,
  lifestyle: Waves,
  safety: ShieldCheck,
} as const

const inventoryIcons = {
  villas: Home,
  apartments: Building2,
  plots: Trees,
  roads: Route,
} as const

const inventoryLinks: Record<string, string | undefined> = {
  villas: '/btr-villas',
  apartments: '/btr-serenity',
  plots: '/btr-villa-plots',
}

export default function Township() {
  const [active, setActive] = useState<(typeof chapters)[number]['id']>(
    'btr-township',
  )
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25])

  useEffect(() => {
    const nodes = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActive(visible.target.id as (typeof chapters)[number]['id'])
        }
      },
      { rootMargin: '-32% 0px -48% 0px', threshold: [0.1, 0.28, 0.5] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[78vh] min-h-[520px] overflow-hidden bg-ink md:h-[85vh]"
      >
        <motion.img
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1.08 }}
          style={reduce ? undefined : { y: heroY }}
          transition={{ duration: reduce ? 0 : 10, ease: 'easeOut' }}
          src={HERO_IMAGE}
          alt="MAK — BTR Township"
          className="absolute inset-0 h-[115%] w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />

        <motion.div
          style={reduce ? undefined : { opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-20"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-gold-soft uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              260+ Acres of Land
            </p>
            <p className="text-[11px] font-medium tracking-[0.28em] text-gold-soft/80 uppercase">
              Completed · South Hyderabad
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-tight text-white">
              MAK — BTR
              <span className="mt-1 block text-gold-soft">Township</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70 md:text-base">
              Telangana’s pioneer integrated luxury township across 260+ acres
              of land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#btr-township"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                Explore township <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#township-amenities"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-white/10"
              >
                80+ amenities
              </a>
            </div>
          </motion.div>
        </motion.div>

        <a
          href="#btr-township"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 md:block"
          aria-label="Scroll"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-30 border-b border-ink/6 bg-cream/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2.5 scrollbar-none sm:px-8">
          {chapters.map((item) => {
            const on = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative shrink-0 px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition ${
                  on ? 'text-ink' : 'text-stone hover:text-ink'
                }`}
              >
                {item.label}
                {on && (
                  <motion.span
                    layoutId="townshipNavLine"
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
              </a>
            )
          })}
        </div>
      </nav>

      <ScrollSpyRail items={chapters} activeId={active} />

      {/* Master development */}
      <ScrollSection
        id="btr-township"
        index={0}
        bridge={false}
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-6">
              <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                Master development · Delivered
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.08] tracking-tight text-ink">
                We delivered
                <span className="mt-1 block text-sage">
                  MAK — BTR Township
                </span>
              </h2>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-stone">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                {btrTownship.location}
              </p>
            </FadeIn>

            <FadeIn delay={0.06} className="lg:col-span-6">
              <div className="grid grid-cols-3 gap-x-4 gap-y-6 border-t border-ink/8 pt-6 sm:gap-x-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {btrTownship.stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p className="text-[clamp(1.4rem,2.5vw,1.85rem)] font-semibold tracking-tight text-ink">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-[10px] font-medium leading-snug tracking-[0.12em] text-stone uppercase">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 border-t border-ink/8 pt-6 sm:gap-x-6">
                {btrTownship.stats.slice(3).map((s) => (
                  <div key={s.label}>
                    <p className="text-[clamp(1.25rem,2.2vw,1.55rem)] font-semibold tracking-tight text-ink">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-[10px] font-medium leading-snug tracking-[0.12em] text-stone uppercase">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-6">
            <FadeIn className="lg:col-span-8">
              <article className="h-full rounded-[26px] border border-ink/7 bg-white p-7 shadow-[0_18px_50px_rgba(7,17,14,0.06)] sm:p-9 lg:p-10">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-gold uppercase">
                    The story
                  </p>
                </div>
                <div className="mt-6 space-y-5 text-justify hyphens-auto [text-align-last:left]">
                  {btrTownship.summary.map((para, i) => (
                    <p
                      key={para.slice(0, 36)}
                      className={
                        i === 0
                          ? 'text-[15px] font-medium leading-[1.85] text-ink sm:text-[16px]'
                          : 'text-[14px] leading-[1.85] text-[#4a555c] sm:text-[14.5px]'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#township-amenities"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-cream uppercase transition hover:bg-sage"
                  >
                    Key features <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    to="/amenities"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase transition hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    Full amenities list
                  </Link>
                </div>
              </article>
            </FadeIn>

            <FadeIn delay={0.08} className="lg:col-span-4">
              <aside className="relative flex h-full flex-col overflow-hidden rounded-[26px] bg-ink p-7 sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.18),_transparent_55%)]" />
                <div className="relative">
                  <Landmark className="h-6 w-6 text-gold" strokeWidth={1.4} />
                  <p className="mt-5 text-[10px] font-semibold tracking-[0.24em] text-gold uppercase">
                    Easy access
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-cream/55">
                    Public transport &amp; key Hyderabad destinations from BTR
                    Township.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {btrTownship.connectivity
                      .filter((item) => item !== '& more')
                      .map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 border-b border-white/8 pb-3 text-[13.5px] text-cream/85 last:border-b-0 last:pb-0"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                  </ul>
                  <p className="mt-6 text-[11px] tracking-[0.16em] text-cream/35 uppercase">
                    &amp; more nearby
                  </p>
                </div>
              </aside>
            </FadeIn>
          </div>

          {/* Township mix */}
          <FadeIn delay={0.1} className="mt-12 md:mt-14">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                  Township mix
                </p>
                <h3 className="mt-1.5 text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-ink">
                  Living options inside BTR
                </h3>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent sm:mb-1.5" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {btrTownship.inventory.map((row, i) => {
                const Icon =
                  inventoryIcons[row.id as keyof typeof inventoryIcons] ?? Home
                const href = inventoryLinks[row.id]
                const inner = (
                  <CardShell>
                    <div className="flex h-full min-h-[200px] flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
                          <Icon
                            className="h-5 w-5 text-sage"
                            strokeWidth={1.55}
                          />
                        </span>
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                          0{i + 1}
                        </span>
                      </div>
                      <p className="mt-6 text-[10px] font-semibold tracking-[0.18em] text-stone uppercase">
                        {row.label}
                      </p>
                      <p className="mt-2 text-[1.4rem] font-semibold leading-snug tracking-tight text-ink">
                        {row.value}
                        {row.id === 'apartments' || row.id === 'villas' ? (
                          <span className="ml-1.5 text-[0.58em] font-medium text-stone">
                            units
                          </span>
                        ) : null}
                        {row.id === 'roads' ? (
                          <span className="ml-1.5 text-[0.58em] font-medium text-stone">
                            ft
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-2 text-[12.5px] leading-snug text-stone">
                        {row.detail}
                      </p>
                    </div>
                  </CardShell>
                )
                return (
                  <motion.div
                    key={row.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.05,
                      ease: EASE,
                    }}
                  >
                    {href ? (
                      <Link to={href} className="group block h-full">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </motion.div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </ScrollSection>

      {/* Amenities */}
      <ScrollSection
        id="township-amenities"
        index={1}
        className="relative scroll-mt-36 overflow-hidden bg-white py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cream to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                  Key features
                </p>
                <h2 className="mt-2 text-[clamp(1.55rem,3.1vw,2.4rem)] font-semibold tracking-tight text-ink">
                  80+ World-Class Amenities
                </h2>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <Link
                to="/amenities"
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-sage uppercase transition hover:text-ink"
              >
                See complete list <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2">
            {btrTownship.featureGroups.map((group, i) => {
              const Icon =
                groupIcons[group.id as keyof typeof groupIcons] ?? Trees
              return (
                <FadeIn key={group.id} delay={i * 0.06}>
                  <CardShell>
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-3 border-b border-ink/6 bg-ink px-5 py-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                          <Icon
                            className="h-4 w-4 text-gold"
                            strokeWidth={1.6}
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                            0{i + 1}
                          </p>
                          <h3 className="truncate text-[13px] font-bold tracking-[0.08em] text-cream uppercase">
                            {group.title}
                          </h3>
                        </div>
                      </div>
                      <ul className="space-y-3 px-5 py-5 sm:px-6">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#3f4a52]"
                          >
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection index={2} as="div" bridgeDark>
        <BtrClubShowcase id="township-clubhouse" />
      </ScrollSection>

      <ScrollSection index={3} as="div">
        <ClubPavilionShowcase id="township-pavilion" />
      </ScrollSection>

      {/* Offerings */}
      <ScrollSection
        id="offerings"
        index={4}
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                {townshipPage.offerings?.eyebrow}
              </p>
              <h2 className="mt-2 text-[clamp(1.55rem,3.1vw,2.4rem)] font-semibold tracking-tight text-ink">
                {townshipPage.offerings?.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4a5560]">
                {townshipPage.offerings?.body}
              </p>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {townshipPage.offerings?.items.map((item, i) => (
              <FadeIn key={item.href} delay={i * 0.07}>
                <Link to={item.href} className="group block h-full">
                  <CardShell>
                    <div className="overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                        <span className="absolute bottom-4 left-4 rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-ink uppercase">
                          {item.status}
                        </span>
                      </div>
                      <div className="px-6 py-6">
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-sage uppercase">
                          Part of MAK — BTR Township
                        </p>
                        <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#4a5560]">
                          {item.subtitle}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-sage uppercase transition group-hover:text-ink">
                          View details <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </CardShell>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection index={5} as="div">
        <TownshipAmenitiesGallery id="township-gallery" />
      </ScrollSection>

      {/* Map */}
      <ScrollSection
        id="township-map"
        index={6}
        bridgeDark
        className="relative scroll-mt-36 overflow-hidden bg-ink py-14 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-8 text-center md:mb-10">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                Location
              </p>
              <h2 className="text-[clamp(1.4rem,3vw,2.25rem)] font-bold tracking-[0.06em] text-cream uppercase">
                BTR Township Map
              </h2>
              <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </FadeIn>

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            <FadeIn className="lg:col-span-8">
              <div className="relative min-h-[320px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl lg:h-full lg:min-h-[380px]">
                <iframe
                  title="MAK BTR Township Location"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Thummalur%20Maheswaram%20Srisailam%20Highway%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.08} className="lg:col-span-4">
              <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                    Easy access
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    26th Milestone on Srisailam Highway — Thummalur, Maheswaram.
                    1,450+ units with public transport connectivity.
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-cream/70">
                    {btrTownship.connectivity
                      .filter((item) => item !== '& more')
                      .map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft"
                >
                  Schedule a visit <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </ScrollSection>
    </>
  )
}
