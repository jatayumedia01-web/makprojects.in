import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone, MapPin, Users, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/content'
import NavDropdown from './NavDropdown'

const featured = projects

const contactItems = [
  {
    to: '/contact',
    title: 'Contact Us',
    desc: 'Office, phone & site directions',
    icon: Phone,
    tone: 'from-[#1f6b55] to-[#0c241c]',
  },
  {
    to: '/about',
    title: 'About Us',
    desc: '20+ years of excellence',
    icon: Building2,
    tone: 'from-[#163d31] to-[#07110e]',
  },
  {
    to: '/management',
    title: 'Management',
    desc: 'Meet the leadership team',
    icon: Users,
    tone: 'from-[#2d5a4a] to-[#0f2a22]',
  },
]

export function ProjectsDropdown({ floating }: { floating: boolean }) {
  const [active, setActive] = useState(0)
  const current = featured[active] ?? featured[0]

  return (
    <NavDropdown
      label="Projects"
      to="/projects"
      floating={floating}
      align="center"
      panelWidth="w-[780px]"
    >
      {(close) => (
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          {/* Live preview */}
          <div className="relative min-h-[280px] overflow-hidden bg-ink">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.slug}
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
                key={`badge-${current.slug}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase"
              >
                {current.status}
              </motion.span>
              <motion.h3
                key={`title-${current.slug}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-3 text-2xl font-semibold text-white"
              >
                {current.title}
              </motion.h3>
              <p className="mt-1 text-sm text-white/70">{current.subtitle}</p>
              <p className="mt-2 text-xs text-white/50">{current.size}</p>
              <Link
                to={current.href}
                onClick={close}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md transition hover:bg-gold hover:text-ink"
              >
                Discover <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col bg-white/97 p-3 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between px-3 pt-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.28em] text-sage uppercase">
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
              {featured.map((p, i) => (
                <Link
                  key={p.slug}
                  to={p.href}
                  onClick={close}
                  onMouseEnter={() => setActive(i)}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition duration-300 ${
                    active === i
                      ? 'bg-mist shadow-sm'
                      : 'hover:bg-mist/70'
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {p.title}
                    </p>
                    <p className="truncate text-[11px] text-stone">{p.location}</p>
                  </div>
                  <ArrowUpRight
                    className={`h-4 w-4 shrink-0 transition ${
                      active === i
                        ? 'text-sage translate-x-0.5 -translate-y-0.5'
                        : 'text-ink/20'
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="mt-2 rounded-2xl bg-gradient-to-r from-forest to-moss px-4 py-3 text-cream">
              <p className="text-[10px] tracking-[0.2em] text-gold-soft uppercase">
                Need help choosing?
              </p>
              <a
                href="tel:+919912797979"
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold-soft"
              >
                <Phone className="h-3.5 w-3.5" /> +91 99127 97979
              </a>
            </div>
          </div>
        </div>
      )}
    </NavDropdown>
  )
}

export function ContactDropdown({ floating }: { floating: boolean }) {
  return (
    <NavDropdown
      label="Contact"
      to="/contact"
      floating={floating}
      align="right"
      panelWidth="w-[340px]"
    >
      {(close) => (
        <div className="bg-white/97 p-3 backdrop-blur-xl">
          <div className="mb-2 px-3 pt-2">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-sage uppercase">
              Company
            </p>
            <p className="text-sm font-semibold text-ink">Connect with MAK</p>
          </div>

          <div className="space-y-1.5">
            {contactItems.map((item, i) => {
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
                      <span className="block text-[11px] text-stone">
                        {item.desc}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink/15 transition group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-2 flex items-start gap-2 rounded-2xl border border-ink/5 bg-mist/80 px-3 py-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
            <p className="text-[11px] leading-relaxed text-stone">
              Park Citi Plaza, 4th Floor, Road No.1, Banjara Hills, Hyderabad
            </p>
          </div>
        </div>
      )}
    </NavDropdown>
  )
}
