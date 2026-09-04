import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  Scale,
  Users,
} from 'lucide-react'
import {
  FadeIn,
  ScrollLine,
  StaggerReveal,
  staggerItem,
} from '../components/Motion'
import ExecutiveSection from '../components/management/ExecutiveSection'
import {
  PageContainer,
  SectionAccent,
  SectionBackdrop,
} from '../components/project/ProjectChrome'
import EnquireButton from '../components/mak-crm/EnquireButton'
import { leaders } from '../data/content'
import { managementNav, managementProfiles } from '../data/managementProfiles'

const HERO =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=80'

const sectionThemes = ['cream', 'white', 'mist', 'pearl', 'sand'] as const

function shortName(name: string) {
  return name.replace(/^Mr\.\s*/i, '')
}

function buildNavItems() {
  return managementNav.map((item, i) => {
    if (item.id === 'board') return { ...item, label: 'Board' }
    const person = leaders[i - 1]
    return { ...item, label: person ? shortName(person.name) : item.id }
  })
}

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const onScroll = () => {
      const offset = window.innerWidth >= 768 ? 150 : 130
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

export default function Management() {
  const navItems = buildNavItems()
  const activeSection = useScrollSpy(managementNav.map((n) => n.id))

  return (
    <>
      {/* Hero */}
      <section className="relative h-[58vh] min-h-[380px] overflow-hidden bg-ink sm:h-[65vh] sm:min-h-[440px] lg:h-[70vh]">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

        <PageContainer className="relative z-10 flex h-full flex-col justify-end pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase sm:text-[11px]">
              MAK Projects Private Limited
            </p>
            <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-white">
              Board of Directors
            </h1>
            <div className="mt-4 h-px w-20 bg-gold" />
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Seasoned leadership across real estate, hospitality, finance and
              governance.
            </p>
            <a
              href="#board"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase hover:bg-gold-soft sm:mt-8 sm:px-7 sm:text-xs"
            >
              Meet the board <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </PageContainer>

        <a
          href="#board"
          aria-label="Scroll down"
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-white/40 hover:text-gold-soft sm:bottom-6"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* Sticky sub-nav — sits below main header (Board + directors) */}
      <nav
        aria-label="Leadership sections"
        className="sticky top-[4.75rem] z-[48] border-b border-ink/10 bg-white py-2.5 shadow-[0_4px_20px_rgba(7,17,14,0.08)] sm:py-3 md:top-20"
      >
        <PageContainer>
          <p className="mb-1.5 text-center text-[11px] font-semibold tracking-[0.2em] text-stone uppercase sm:mb-2 sm:text-[11px]">
            Jump to director
          </p>
          <div
            className="grid grid-cols-3 gap-1 rounded-2xl border border-ink/[0.08] bg-[#faf8f5] p-1 sm:grid-cols-6 sm:rounded-full sm:p-1.5"
            role="tablist"
          >
            {navItems.map((item) => {
              const on = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  role="tab"
                  aria-selected={on}
                  title={item.label}
                  className={`flex min-h-[38px] items-center justify-center rounded-xl px-1 py-2 text-center text-[11px] font-semibold leading-tight transition sm:min-h-[40px] sm:rounded-full sm:px-2 sm:text-[11px] lg:text-[11px] ${
                    item.id === 'board' ? 'uppercase tracking-[0.1em]' : 'normal-case'
                  } ${
                    on
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-stone hover:bg-white hover:text-ink'
                  }`}
                >
                  <span className="line-clamp-2 px-0.5">{item.label}</span>
                </a>
              )
            })}
          </div>
        </PageContainer>
      </nav>

      {/* Board overview */}
      <section id="board" className="relative scroll-mt-[9.5rem] overflow-hidden md:scroll-mt-[10rem]">
        <SectionBackdrop theme="cream" />
        <SectionAccent variant="sage" />
        <PageContainer className="relative py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-end">
            <FadeIn>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Governance
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Experience that steers delivery
              </h2>
              <div className="mt-3 h-px w-14 bg-gold" />
              <p className="mt-4 text-sm leading-relaxed text-[#4a5560] sm:text-[15px]">
                The MAK board brings together hospitality enterprise leadership,
                construction delivery, and finance &amp; legal oversight.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { v: `${leaders.length}`, l: 'Board members', i: Users },
                { v: '165+', l: 'Years combined', i: Award },
                { v: 'Realty', l: 'Core focus', i: Building2 },
                { v: 'Finance', l: 'Oversight', i: Scale },
              ].map((m) => {
                const Icon = m.i
                return (
                  <div
                    key={m.l}
                    className="rounded-xl border border-ink/[0.07] bg-white px-3 py-4 sm:rounded-2xl sm:px-4 sm:py-5"
                  >
                    <Icon className="h-4 w-4 text-sage" strokeWidth={1.7} />
                    <p className="mt-2 text-lg font-bold text-ink sm:text-xl">{m.v}</p>
                    <p className="mt-0.5 text-[11px] font-semibold tracking-[0.12em] text-stone uppercase sm:text-[11px]">
                      {m.l}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Team grid */}
      <section className="border-y border-ink/[0.06] bg-white py-10 md:py-14">
        <PageContainer>
          <div className="mb-6 text-center sm:mb-8">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
              Leadership team
            </p>
            <ScrollLine className="mt-4" />
          </div>

          <StaggerReveal
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5 md:gap-4"
            stagger={0.05}
          >
            {leaders.map((person, i) => {
              const meta = managementProfiles[i]
              if (!meta) return null
              return (
                <motion.a
                  key={person.name}
                  href={`#${meta.sectionId}`}
                  variants={staggerItem}
                  className="group overflow-hidden rounded-xl border border-ink/[0.07] bg-[#faf8f5] sm:rounded-2xl"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover object-[center_15%] transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-sage uppercase sm:text-[11px]">
                      {meta.eyebrow}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-snug text-ink sm:text-xs">
                      {shortName(person.name)}
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone sm:text-[11px]">{person.years}</p>
                  </div>
                </motion.a>
              )
            })}
          </StaggerReveal>
        </PageContainer>
      </section>

      {/* Profiles */}
      <div id="leadership">
        {leaders.map((person, i) => {
          const meta = managementProfiles[i]
          if (!meta) return null
          return (
            <ExecutiveSection
              key={meta.sectionId}
              sectionId={meta.sectionId}
              index={i}
              total={leaders.length}
              name={person.name}
              shortName={shortName(person.name)}
              years={person.years}
              image={person.image}
              eyebrow={meta.eyebrow}
              focusLine={meta.focusLine}
              bio={person.bio}
              creds={meta.creds}
              spotlight={meta.spotlight}
              theme={sectionThemes[i % sectionThemes.length]}
            />
          )
        })}
      </div>

      {/* CTA */}
      <section className="bg-ink py-12 md:py-16">
        <PageContainer className="max-w-xl text-center">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
              Institutional enquiries
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Connect with MAK Projects
            </h2>
            <p className="mt-3 text-sm text-white/60">
              For project discussions, site visits, or corporate correspondence.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <EnquireButton className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase">
                Contact office <ArrowUpRight className="h-3.5 w-3.5" />
              </EnquireButton>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase"
              >
                Company profile
              </Link>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </>
  )
}
