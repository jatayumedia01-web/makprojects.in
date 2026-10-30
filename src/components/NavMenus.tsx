import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Users,
  Trophy,
  MessageSquareQuote,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { serenityCardImage } from '../data/serenityPage'
import NavDropdown from './NavDropdown'

const btrActivePaths = [
  '/btr-township',
  '/btr-serenity',
  '/btr-villa-plots',
  '/btr-villas',
  '/btr-greens',
  '/btr-golf-plots',
  '/amenities',
]

export type ProjectMenuEntry = {
  key: string
  title: string
  subtitle: string
  size: string
  status: string
  image: string
  href: string
  external?: boolean
  group: 'standalone' | 'btr'
}

/** Flat list for mega-menu preview + hover (Fern, then MAK - BTR sub-items) */
export const projectMenuEntries: ProjectMenuEntry[] = [
  {
    key: 'fern',
    title: 'Fern by MAK Projects',
    subtitle: '4BHK + Home Theatre Villas · Tukkuguda',
    size: '15 acres · 109 villas · Club Fernessa',
    status: 'New Launch',
    image: '/media/fern/hero.jpg',
    href: '/fern/index.html',
    external: true,
    group: 'standalone',
  },
  {
    key: 'township',
    title: 'MAK - BTR Overview',
    subtitle: 'Serenity · Gardenia · Villas',
    size: '260+ acres · 1,450+ units · 80+ amenities',
    status: 'Completed',
    image: '/media/gardenia/hero.jpg',
    href: '/btr-township',
    group: 'btr',
  },
  {
    key: 'serenity',
    title: 'BTR Serenity',
    subtitle: '3 & 4 BHK ready-to-move apartments',
    size: '3 acres · 150 apartments',
    status: 'Ready to Move-In',
    image: serenityCardImage,
    href: '/btr-serenity',
    group: 'btr',
  },
  {
    key: 'gardenia',
    title: 'BTR Gardenia',
    subtitle: 'Premium villa plots',
    size: '193 acres · 590 plots',
    status: 'Part of MAK - BTR',
    image: '/media/gardenia/hero.jpg',
    href: '/btr-villa-plots',
    group: 'btr',
  },
  {
    key: 'villas',
    title: 'BTR Villas',
    subtitle: 'Luxury golf community villas',
    size: 'Golf-facing residences',
    status: 'Part of MAK - BTR',
    image: '/media/home/btr-villas.jpg',
    href: '/btr-villas',
    group: 'btr',
  },
  {
    key: 'amenities',
    title: 'Amenities',
    subtitle: 'Clubhouse · Golf · Sports · Parks',
    size: '80+ lifestyle amenities',
    status: 'MAK - BTR',
    image: '/media/township-amenities/golf-course.jpg',
    href: '/amenities',
    group: 'btr',
  },
]

export const btrMobileLinks = projectMenuEntries
  .filter((e) => e.group === 'btr')
  .map((e) => ({ label: e.title, to: e.href }))

export const aboutUsItems = [
  {
    to: '/management',
    title: 'Leadership Team',
    desc: 'Board of directors & leadership',
    icon: Users,
    tone: 'from-[#2d5a4a] to-[#0f2a22]',
  },
  {
    to: '/awards',
    title: 'Awards',
    desc: 'Recognition & achievements',
    icon: Trophy,
    tone: 'from-[#8a6b12] to-[#5c4708]',
  },
  {
    to: '/testimonials',
    title: 'Testimonials',
    desc: 'Stories from our homeowners',
    icon: MessageSquareQuote,
    tone: 'from-[#3d5a6a] to-[#1a2a32]',
  },
] as const

export const aboutUsMobileLinks = aboutUsItems.map((item) => ({
  label: item.title,
  to: item.to,
}))

function DropdownLinkList({
  items,
  close,
}: {
  items: ReadonlyArray<{
    to: string
    title: string
    desc: string
    icon: typeof Users
    tone: string
  }>
  close: () => void
}) {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
          >
            <Link
              to={item.to}
              onClick={close}
              className="group flex items-center gap-3 rounded-2xl p-2.5 transition duration-300 hover:bg-mist"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-md transition duration-300 group-hover:scale-105`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink group-hover:text-sage">
                  {item.title}
                </span>
                <span className="block text-[11px] text-stone">{item.desc}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-ink/15 transition group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

function ProjectMenuRow({
  entry,
  index,
  active,
  close,
  onHover,
  nested = false,
}: {
  entry: ProjectMenuEntry
  index: number
  active: number
  close: () => void
  onHover: (i: number) => void
  nested?: boolean
}) {
  const itemClass = `group flex items-center gap-3 rounded-2xl transition duration-300 ${
    nested ? 'ml-2 px-2.5 py-2 pl-3' : 'px-3 py-3'
  } ${active === index ? 'bg-mist shadow-sm' : 'hover:bg-mist/70'}`

  const inner = (
    <>
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl ${
          nested ? 'h-10 w-10' : 'h-12 w-12'
        }`}
      >
        <img
          src={entry.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{entry.title}</p>
        <p className="truncate text-[11px] text-stone">{entry.subtitle}</p>
      </div>
      <ArrowUpRight
        className={`h-4 w-4 shrink-0 transition ${
          active === index
            ? 'text-sage translate-x-0.5 -translate-y-0.5'
            : 'text-ink/20'
        }`}
      />
    </>
  )

  if (entry.external) {
    return (
      <a
        href={entry.href}
        onClick={close}
        onMouseEnter={() => onHover(index)}
        className={itemClass}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      to={entry.href}
      onClick={close}
      onMouseEnter={() => onHover(index)}
      className={itemClass}
    >
      {inner}
    </Link>
  )
}

export function ProjectsDropdown({ floating }: { floating: boolean }) {
  const [active, setActive] = useState(0)
  const current = projectMenuEntries[active] ?? projectMenuEntries[0]
  const fernEntry = projectMenuEntries.find((e) => e.group === 'standalone')
  const btrEntries = projectMenuEntries.filter((e) => e.group === 'btr')

  return (
    <NavDropdown
      label="Projects"
      to="/projects"
      floating={floating}
      align="center"
      panelWidth="w-[820px]"
      activePaths={['/projects', '/fern', ...btrActivePaths]}
    >
      {(close) => (
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[300px] overflow-hidden bg-ink">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.key}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <motion.span
                key={`badge-${current.key}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-ink uppercase"
              >
                {current.status}
              </motion.span>
              <motion.h3
                key={`title-${current.key}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-3 text-2xl font-semibold text-white"
              >
                {current.title}
              </motion.h3>
              <p className="mt-1 text-sm text-white/70">{current.subtitle}</p>
              <p className="mt-2 text-xs text-white/50">{current.size}</p>
              {current.external ? (
                <a
                  href={current.href}
                  onClick={close}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md transition hover:bg-gold hover:text-ink"
                >
                  Discover <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  to={current.href}
                  onClick={close}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md transition hover:bg-gold hover:text-ink"
                >
                  Discover <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex max-h-[360px] flex-col overflow-y-auto bg-white/97 p-3 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between px-3 pt-2">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                  Portfolio
                </p>
                <p className="text-sm font-semibold text-ink">Choose a project</p>
              </div>
              <Link
                to="/projects"
                onClick={close}
                className="text-[11px] font-semibold tracking-wider text-sage uppercase hover:text-ink"
              >
                View all
              </Link>
            </div>

            <div className="flex-1 space-y-1">
              {fernEntry && (
                <ProjectMenuRow
                  entry={fernEntry}
                  index={projectMenuEntries.indexOf(fernEntry)}
                  active={active}
                  close={close}
                  onHover={setActive}
                />
              )}

              <div className="px-3 pt-3 pb-1">
                <p className="text-[10px] font-bold tracking-[0.24em] text-sage uppercase">
                  MAK - BTR
                </p>
                <p className="mt-0.5 text-[11px] text-stone">
                  Srisailam Highway · South Hyderabad
                </p>
              </div>

              <div className="space-y-0.5 border-l-2 border-sage/25 ml-4 pl-1">
                {btrEntries.map((entry) => {
                  const index = projectMenuEntries.indexOf(entry)
                  return (
                    <ProjectMenuRow
                      key={entry.key}
                      entry={entry}
                      index={index}
                      active={active}
                      close={close}
                      onHover={setActive}
                      nested
                    />
                  )
                })}
              </div>
            </div>

            <div className="mt-2 shrink-0 rounded-2xl bg-gradient-to-r from-forest to-moss px-4 py-3 text-cream">
              <p className="text-[11px] tracking-[0.2em] text-gold-soft uppercase">
                Need help choosing?
              </p>
              <Link
                to="/contact"
                onClick={close}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold-soft"
              >
                <ArrowUpRight className="h-3.5 w-3.5" /> Send an enquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </NavDropdown>
  )
}

export function AboutUsDropdown({ floating }: { floating: boolean }) {
  return (
    <NavDropdown
      label="About Us"
      to="/about"
      floating={floating}
      align="center"
      panelWidth="w-[340px]"
      activePaths={['/about', '/management', '/awards', '/testimonials']}
    >
      {(close) => (
        <div className="bg-white/97 p-3 backdrop-blur-xl">
          <div className="mb-2 px-3 pt-2">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
              About Us
            </p>
            <p className="text-sm font-semibold text-ink">Our story & recognition</p>
          </div>

          <DropdownLinkList items={aboutUsItems} close={close} />

          <div className="mt-2 rounded-2xl border border-ink/5 bg-mist/80 px-3 py-3">
            <Link
              to="/about"
              onClick={close}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-sage uppercase hover:text-ink"
            >
              Company overview <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </NavDropdown>
  )
}

