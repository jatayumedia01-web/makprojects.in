import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '../components/Motion'
import { SoftScene } from '../components/project/ProjectChrome'

/**
 * About — modern editorial UI/UX
 */

const HERO =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80'

const EASE = [0.22, 1, 0.36, 1] as const

const chapters = [
  { id: 'who-we-are', label: 'Our story' },
  { id: 'guiding-principles', label: 'Principles' },
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
    title: 'Prime locations',
    body: 'Every site is evaluated with precision before a single foundation is planned.',
  },
  {
    title: 'Superior build',
    body: 'International standards guide infrastructure quality and engineering excellence.',
  },
  {
    title: 'Trusted support',
    body: 'Customer delight at every touchpoint — beyond handovers and promises.',
  },
]

const guiding = [
  {
    index: '01',
    title: 'Vision',
    accent: 'Respect · Delight · Sustainability',
    body: 'Be the most respected realty developer, sustainably delivering customer delight and well being for our communities and environment.',
    items: null as string[] | null,
  },
  {
    index: '02',
    title: 'Mission',
    accent: 'Experience · Excellence · Synergy',
    body: null as string | null,
    items: [
      'Positive Customer Experience at every touch point',
      'Operational Excellence',
      'Design Innovation and Digitization',
      'Team and Group synergy leverage',
    ],
  },
  {
    index: '03',
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
  },
]

const philosophy =
  'We believe to do a little extra, reach a little higher, and press on a little further each day shows your dedication to continuous improvement and excellence. It’s this relentless pursuit of betterment that ensures the quality of life for your customers is constantly enhanced and elevated to higher levels.'

const stats = [
  { value: '20+', label: 'Years of excellence' },
  { value: '7+', label: 'Landmark projects' },
  { value: 'Hyd', label: 'Home market' },
]

export default function About() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<(typeof chapters)[number]['id']>(
    'who-we-are',
  )

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
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.55] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-ink md:h-[76vh]">
        <motion.img
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 10, ease: 'easeOut' }}
          src={HERO}
          alt="About MAK Projects"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              MAK Projects
            </p>
            <h1 className="text-[clamp(2.2rem,5.8vw,4.4rem)] font-semibold leading-[1.04] tracking-tight text-white uppercase">
              About
              <br />
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                Who we are
              </span>
            </h1>
            <div className="mt-5 h-px w-36 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/72 md:text-base">
              Two decades of building places people trust — infrastructure,
              housing, and communities across Hyderabad.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#who-we-are"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                Our story <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/management"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
              >
                Leadership
              </Link>
            </div>
          </motion.div>
        </div>

        <a
          href="#who-we-are"
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/45"
          aria-label="Scroll to story"
        >
          <span className="text-[9px] tracking-[0.28em] uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* Chapter nav */}
      {/* Chapter nav — aligned with main navbar style */}
      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-30 border-b border-ink/6 bg-cream/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl justify-center px-5 py-3 sm:px-8">
          <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-ink/8 bg-white/90 p-1 shadow-[0_8px_28px_rgba(7,17,14,0.05)] scrollbar-none">
            {chapters.map((item) => {
              const on = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition"
                >
                  {on && (
                    <motion.span
                      layoutId="aboutChapter"
                      className="absolute inset-0 rounded-full bg-ink shadow-md"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span
                    className={`relative ${on ? 'text-cream' : 'text-stone hover:text-ink'}`}
                  >
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Stats strip */}
      <section className="relative border-b border-ink/6 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-ink/6">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="px-4 py-7 text-center sm:px-8 sm:py-9 md:py-10">
                <p className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight text-ink">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold tracking-[0.22em] text-stone uppercase sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Who Are We — open editorial layout */}
      <section
        id="who-we-are"
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <FadeIn className="lg:col-span-4">
              <div className="lg:sticky lg:top-36">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  About MAK
                </p>
                <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-ink uppercase">
                  Who
                  <br />
                  Are We?
                </h2>
                <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

                <div className="relative mt-10 overflow-hidden rounded-[22px] bg-ink px-7 py-8 text-center shadow-[0_24px_60px_rgba(7,17,14,0.18)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.2),_transparent_60%)]" />
                  <div className="relative">
                    <p className="text-[clamp(3rem,6vw,3.75rem)] font-semibold leading-none tracking-tight text-gold-soft">
                      20<span className="text-[0.45em] align-super">+</span>
                    </p>
                    <p className="mt-3 text-[11px] font-semibold tracking-[0.28em] text-cream/55 uppercase">
                      Years of excellence
                    </p>
                    <p className="mx-auto mt-4 max-w-[200px] text-[12px] leading-relaxed text-cream/40">
                      Real estate &amp; infrastructure across Hyderabad
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="lg:col-span-8">
              <FadeIn>
                <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] text-sage uppercase">
                  Company profile · Innovation · Reliability · Accomplishment
                </p>
                <div className="space-y-5 text-[14px] leading-[1.85] text-[#3f4a52] text-justify hyphens-auto [text-align-last:left] sm:text-[15px] sm:leading-[1.9]">
                  {whoWeAre.map((para, i) => (
                    <p key={para.slice(0, 36)} className="text-pretty">
                      {i === 0 ? (
                        <>
                          <span className="mr-1 font-semibold text-ink">
                            {para.slice(0, para.indexOf('.') + 1)}
                          </span>
                          {para.slice(para.indexOf('.') + 1)}
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.08} className="mt-10">
                <div className="grid gap-4 sm:grid-cols-3">
                  {pillars.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                      className="border-t border-gold/50 pt-4"
                    >
                      <p className="text-[10px] font-semibold tracking-[0.22em] text-gold uppercase">
                        0{i + 1}
                      </p>
                      <h3 className="mt-2 text-[13px] font-bold tracking-[0.06em] text-ink uppercase">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-stone">
                        {p.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Vision · Mission · Values — modern panels */}
      <section
        id="guiding-principles"
        className="relative scroll-mt-36 overflow-hidden bg-white py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  Guiding principles
                </p>
                <h2 className="mt-2 text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-tight text-ink uppercase">
                  Vision · Mission · Values
                </h2>
                <div className="mt-4 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-stone md:text-right">
                The compass behind every community we build.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 lg:grid-cols-3">
            {guiding.map((row, i) => (
              <FadeIn key={row.title} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/8 bg-[#f8f6f1] transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_24px_50px_rgba(7,17,14,0.1)]">
                  <div className="flex items-center justify-between border-b border-ink/6 bg-ink px-5 py-4">
                    <span className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
                      {row.index}
                    </span>
                    <h3 className="text-[13px] font-bold tracking-[0.2em] text-cream uppercase">
                      {row.title}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-sage uppercase">
                      {row.accent}
                    </p>

                    {row.body ? (
                      <p className="mt-4 text-[13.5px] leading-[1.8] text-[#3f4a52] text-justify [text-align-last:left]">
                        {row.body}
                      </p>
                    ) : null}

                    {row.items ? (
                      <ul className="mt-4 space-y-2.5">
                        {row.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[13px] leading-snug text-[#3f4a52]"
                          >
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-auto pt-8">
                      <div className="h-px w-full origin-left scale-x-50 bg-gradient-to-r from-gold/70 to-transparent transition duration-500 group-hover:scale-x-100" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy — editorial quote */}
      <section
        id="philosophy"
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.16),_transparent_50%)]" />
              <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sage/25 blur-3xl" />

              <div className="relative mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  Our Philosophy
                </p>
                <div className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent" />

                <p className="mt-8 text-[clamp(1.15rem,2.4vw,1.65rem)] font-medium leading-[1.65] tracking-tight text-cream/90 text-justify [text-align-last:center]">
                  “{philosophy}”
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
                  {[
                    'A little extra',
                    'A little higher',
                    'A little further',
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-cream/55 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/management"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:-translate-y-0.5 hover:bg-sage"
            >
              Meet the leadership <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:border-ink hover:bg-ink hover:text-cream"
            >
              View projects
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
