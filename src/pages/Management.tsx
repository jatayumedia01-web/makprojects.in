import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  Quote,
  Scale,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from '../components/Motion'
import {
  SoftScene,
} from '../components/project/ProjectChrome'
import { leaders } from '../data/content'

/**
 * Management — advanced professional board UI
 */

const HERO =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=80'

const EASE = [0.22, 1, 0.36, 1] as const

function shortName(name: string) {
  return name.replace(/^Mr\.\s*/i, '')
}

type Cred = { icon: LucideIcon; label: string; value: string }
type Spotlight = {
  icon: LucideIcon
  label: string
  title: string
  body: string
}
type Leader = (typeof leaders)[number]

function ExecutiveProfile({
  person,
  sectionId,
  eyebrow,
  sectionTitle,
  profileIndex,
  badge,
  focusLine,
  tags,
  creds,
  spotlight,
  reduce,
}: {
  person: Leader
  sectionId: string
  eyebrow: string
  sectionTitle: string
  profileIndex: string
  badge: string
  focusLine: string
  tags: string[]
  creds: Cred[]
  spotlight: Spotlight
  reduce: boolean | null
}) {
  const SpotlightIcon = spotlight.icon

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-36 overflow-hidden pb-6 md:pb-8"
    >
      <SoftScene />
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                {eyebrow}
              </p>
              <h2 className="mt-1.5 text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold tracking-tight text-ink uppercase">
                {sectionTitle}
              </h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
            </div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
              Profile {profileIndex} / {String(leaders.length).padStart(2, '0')}
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-[0_18px_50px_rgba(7,17,14,0.08)]"
          >
            <div className="relative grid lg:grid-cols-12 lg:items-stretch">
              {/* Compact portrait — height follows content column */}
              <aside className="relative overflow-hidden bg-[#07110e] lg:col-span-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,_rgba(212,175,55,0.14),_transparent_55%)]" />

                <div className="relative aspect-[4/5] max-h-[360px] w-full sm:max-h-[400px] lg:absolute lg:inset-0 lg:aspect-auto lg:max-h-none">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 sm:px-6">
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] text-gold-soft uppercase backdrop-blur-md">
                      {badge}
                    </span>
                    <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.35rem]">
                      {shortName(person.name)}
                    </h3>
                    <p className="mt-1 text-[12px] text-cream/55">
                      {person.years} of leadership
                    </p>

                    {/* Compact credentials on photo */}
                    <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                      {creds.map((c) => {
                        const Icon = c.icon
                        return (
                          <li
                            key={c.label}
                            className="flex items-center gap-2 text-[11px] text-cream/75"
                          >
                            <Icon
                              className="h-3 w-3 shrink-0 text-gold"
                              strokeWidth={1.8}
                            />
                            <span className="truncate">{c.value}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Content — drives card height */}
              <div className="relative flex flex-col lg:col-span-8">
                <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/6 px-5 py-3.5 sm:px-7 md:px-8">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-sage uppercase">
                      Leadership profile
                    </p>
                    <p className="mt-0.5 text-[13px] text-stone">{focusLine}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/8 bg-mist px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-stone uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </header>

                <div className="flex-1 px-5 py-5 sm:px-7 sm:py-6 md:px-8">
                  {/* Justified biography */}
                  <div className="relative border-l-2 border-gold/50 pl-4 sm:pl-5">
                    <div className="space-y-3 text-[12.5px] leading-[1.75] text-[#3f4a52] text-justify hyphens-auto [text-align-last:left] sm:text-[13px] sm:leading-[1.8]">
                      {person.bio.slice(0, 3).map((para, i) => (
                        <p key={para.slice(0, 40)} className="text-pretty">
                          {i === 0 ? (
                            <>
                              <span className="float-left mr-1.5 mt-0.5 text-[1.85rem] font-semibold leading-none text-ink">
                                {para.charAt(0)}
                              </span>
                              {para.slice(1)}
                            </>
                          ) : (
                            para
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-gold/25 bg-gradient-to-br from-[#fbf6eb] to-[#f3ebe0] px-3.5 py-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-gold">
                      <SpotlightIcon className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-semibold tracking-[0.2em] text-ink uppercase">
                        {spotlight.label}
                      </p>
                      <p className="mt-0.5 text-[12.5px] font-semibold tracking-tight text-ink sm:text-[13px]">
                        {spotlight.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-[1.7] text-[#5a6670] text-justify [text-align-last:left]">
                        {spotlight.body}
                      </p>
                    </div>
                  </div>
                </div>

                {person.bio[3] && (
                  <footer className="relative border-t border-ink/6 bg-[#faf8f4] px-5 py-3.5 sm:px-7 md:px-8">
                    <Quote className="absolute right-4 top-3 h-7 w-7 text-gold/20" />
                    <p className="relative max-w-3xl pr-8 text-[12px] leading-[1.75] text-[#3f4a52] italic text-justify [text-align-last:left] sm:text-[12.5px]">
                      “{person.bio[3]}”
                    </p>
                  </footer>
                )}
              </div>
            </div>
          </motion.article>
        </FadeIn>
      </div>
    </section>
  )
}

const chapters = [
  { href: '#board', label: 'Board' },
  { href: '#chairman', label: 'Chairman' },
  { href: '#managing-director', label: 'MD' },
  { href: '#bharath-kumar', label: 'Director' },
  { href: '#saba-nayagam', label: 'Finance' },
  { href: '#atchi-reddy', label: 'Ops' },
]

export default function Management() {
  const reduce = useReducedMotion()
  const chairman = leaders[0]
  const managingDirector = leaders[1]
  const bharath = leaders[2]
  const saba = leaders[3]
  const atchi = leaders[4]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[68vh] min-h-[460px] overflow-hidden bg-ink md:h-[72vh]">
        <motion.img
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 9, ease: 'easeOut' }}
          src={HERO}
          alt="MAK Projects board of directors"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-12 pt-28 sm:px-10 lg:px-14 lg:pb-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-[11px] font-semibold tracking-[0.32em] text-gold-soft uppercase">
              MAK Projects Private Limited
            </p>
            <h1 className="text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white">
              Board of Directors
            </h1>
            <div className="mt-5 h-px w-24 bg-gold" />
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 md:text-base">
              Seasoned leadership across real estate, hospitality, finance and
              governance — guiding MAK Projects with clarity, discipline and
              long-term vision.
            </p>
            <a
              href="#chairman"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft"
            >
              View leadership <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Chapter nav */}
      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-30 border-b border-ink/8 bg-cream/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {chapters.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-stone uppercase transition hover:bg-white hover:text-ink"
              >
                {c.label}
              </a>
            ))}
          </div>
          <p className="hidden text-[11px] tracking-[0.12em] text-stone uppercase md:block">
            {leaders.length} directors
          </p>
        </div>
      </nav>

      {/* Board snapshot */}
      <section id="board" className="relative scroll-mt-36 overflow-hidden">
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                Governance
              </p>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.35rem)] font-bold tracking-tight text-ink">
                Experience that steers delivery
              </h2>
              <div className="mt-4 h-px w-16 bg-gold" />
              <p className="mt-5 text-[15px] leading-[1.8] text-[#4a5560]">
                The MAK board brings together hospitality enterprise leadership,
                construction delivery, and finance &amp; legal oversight —
                ensuring every project is guided with professional rigor.
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {[
                  { v: `${leaders.length}`, l: 'Board members', i: Users },
                  { v: '165+', l: 'Years combined', i: Award },
                  { v: 'Realty', l: 'Core focus', i: Building2 },
                  { v: 'Finance', l: 'Board oversight', i: Scale },
                ].map((m) => {
                  const Icon = m.i
                  return (
                    <div
                      key={m.l}
                      className="rounded-[20px] border border-ink/8 bg-white/90 px-4 py-5 shadow-[0_12px_36px_rgba(7,17,14,0.05)]"
                    >
                      <Icon className="h-4 w-4 text-sage" strokeWidth={1.7} />
                      <p className="mt-3 text-xl font-bold tracking-tight text-ink">
                        {m.v}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-stone uppercase">
                        {m.l}
                      </p>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {chairman && (
        <ExecutiveProfile
          person={chairman}
          sectionId="chairman"
          eyebrow="Chairman"
          sectionTitle="Board Leadership"
          profileIndex="01"
          badge="Chairman"
          focusLine="Infrastructure · Hospitality · Enterprise leadership"
          tags={['Hospitality', 'Infrastructure', 'Leadership']}
          reduce={reduce}
          creds={[
            {
              icon: Briefcase,
              label: 'Promoter & MD',
              value: 'Green Park Group of Hotels',
            },
            {
              icon: Award,
              label: 'National honour',
              value: 'Emerging India Award — 2007',
            },
            {
              icon: GraduationCap,
              label: 'Education',
              value: 'PG · Business Management',
            },
          ]}
          spotlight={{
            icon: Award,
            label: 'National recognition',
            title: 'Emerging India Award — 2007',
            body: 'Conferred by the Hon’ble Prime Minister of India, Dr. Manmohan Singh — recognising dedication, innovation and national impact in enterprise leadership.',
          }}
        />
      )}

      {managingDirector && (
        <ExecutiveProfile
          person={managingDirector}
          sectionId="managing-director"
          eyebrow="Managing Director"
          sectionTitle="Executive Leadership"
          profileIndex="02"
          badge="Managing Director"
          focusLine="Construction · Real estate · Strategic delivery"
          tags={['Construction', 'Real Estate', 'Leadership']}
          reduce={reduce}
          creds={[
            {
              icon: Briefcase,
              label: 'Promoter & MD',
              value: 'Frontline Constructions Ltd.',
            },
            {
              icon: Building2,
              label: 'Focus',
              value: 'Residential & commercial delivery',
            },
            {
              icon: GraduationCap,
              label: 'Education',
              value: 'PG · Business Management',
            },
          ]}
          spotlight={{
            icon: Building2,
            label: 'Delivery legacy',
            title: 'Frontline Constructions Ltd.',
            body: 'Promoter & Managing Director — leading prestigious residential and commercial developments across prime locations in Hyderabad.',
          }}
        />
      )}

      {bharath && (
        <ExecutiveProfile
          person={bharath}
          sectionId="bharath-kumar"
          eyebrow="Director"
          sectionTitle="Hospitality & Operations"
          profileIndex="03"
          badge="Director"
          focusLine="Hospitality · HR · Project & commercial management"
          tags={['Hospitality', 'HR', 'Projects']}
          reduce={reduce}
          creds={[
            {
              icon: Briefcase,
              label: 'Role',
              value: 'Director, MAK Projects',
            },
            {
              icon: Building2,
              label: 'Also',
              value: 'Vice Chairman, MAK Hotels & Resorts',
            },
            {
              icon: GraduationCap,
              label: 'Education',
              value: 'PG · Business Administration',
            },
          ]}
          spotlight={{
            icon: Building2,
            label: 'Hospitality tenure',
            title: 'Green Park Group · 2001–2006',
            body: 'Leadership across Hyderabad and Chennai properties — human resources, project execution and commercial management.',
          }}
        />
      )}

      {saba && (
        <ExecutiveProfile
          person={saba}
          sectionId="saba-nayagam"
          eyebrow="Director"
          sectionTitle="Finance & Governance"
          profileIndex="04"
          badge="Director"
          focusLine="Finance · Accounts · Legal oversight"
          tags={['Finance', 'Accounts', 'Legal']}
          reduce={reduce}
          creds={[
            {
              icon: Scale,
              label: 'Qualification',
              value: 'FCA · ICAI Fellow',
            },
            {
              icon: Briefcase,
              label: 'Former role',
              value: 'VP Finance, Diana Hotels Ltd.',
            },
            {
              icon: GraduationCap,
              label: 'Education',
              value: 'Commerce · Excise & Customs Diploma',
            },
          ]}
          spotlight={{
            icon: Scale,
            label: 'Finance leadership',
            title: 'Diana Hotels Ltd. · 1996–2007',
            body: 'Vice President – Finance for the Green Park Group — accounts, financing, budgeting, project financing and implementation.',
          }}
        />
      )}

      {atchi && (
        <ExecutiveProfile
          person={atchi}
          sectionId="atchi-reddy"
          eyebrow="Director"
          sectionTitle="Operations & Strategy"
          profileIndex="05"
          badge="Director"
          focusLine="Hospitality · Management · Law"
          tags={['Hospitality', 'Operations', 'Strategy']}
          reduce={reduce}
          creds={[
            {
              icon: Briefcase,
              label: 'Former role',
              value: 'CEO, Ramky Estates & Farms',
            },
            {
              icon: Building2,
              label: 'Hospitality',
              value: 'GM · Green Park Visakhapatnam',
            },
            {
              icon: GraduationCap,
              label: 'Education',
              value: 'PG Management · Law',
            },
          ]}
          spotlight={{
            icon: Building2,
            label: 'Leadership path',
            title: 'Green Park · Ramky Estates',
            body: 'From departmental leadership to DGM and GM at Green Park, then CEO of Ramky Estates & Farms — strategy, operations and growth.',
          }}
        />
      )}

      {/* CTA */}
      <section className="border-t border-ink/6 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
              Institutional enquiries
            </p>
            <h2 className="mt-3 text-[clamp(1.4rem,2.8vw,2rem)] font-bold tracking-tight text-ink">
              Connect with MAK Projects
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">
              For project discussions, site visits, or corporate correspondence
              with our leadership office.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-sage"
              >
                Contact office <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:border-ink hover:bg-ink hover:text-cream"
              >
                Company profile
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
