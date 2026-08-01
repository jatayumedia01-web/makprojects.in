import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import { MakLogo, BtrLogo } from './BrandLogos'
import { ProjectsDropdown, ContactDropdown } from './NavMenus'

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects', dropdown: 'projects' as const },
  { label: 'BTR Serenity', to: '/btr-serenity' },
  { label: 'Villa Plots', to: '/btr-villa-plots' },
  { label: 'BTR Villas', to: '/btr-villas' },
  { label: 'Amenities', to: '/amenities' },
  { label: 'Contact', to: '/contact', dropdown: 'contact' as const },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileProjects, setMobileProjects] = useState(false)
  const [mobileContact, setMobileContact] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMobileProjects(false)
    setMobileContact(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const floating = isHome && !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        floating
          ? 'bg-transparent'
          : scrolled || !isHome
            ? 'glass-nav-solid'
            : 'glass-nav'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="MAK Projects Home">
          <div
            className={`rounded-2xl px-2 py-1.5 transition duration-300 ${
              floating ? 'bg-white/95 shadow-lg shadow-black/10' : ''
            }`}
          >
            <MakLogo className="h-12 max-h-14 w-auto md:h-14" />
          </div>
        </Link>

        <nav
          className={`hidden items-center gap-0.5 rounded-full px-1.5 py-1 xl:flex ${
            floating
              ? 'border border-white/25 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-2xl'
              : 'border border-ink/5 bg-mist/50'
          }`}
        >
          {mainLinks.map((l) => {
            if (l.dropdown === 'projects') {
              return <ProjectsDropdown key={l.to} floating={floating} />
            }
            if (l.dropdown === 'contact') {
              return <ContactDropdown key={l.to} floating={floating} />
            }
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => linkClass(isActive, floating)}
              >
                {l.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/projects"
            className={`hidden overflow-hidden rounded-xl transition duration-300 md:block ${
              floating ? 'shadow-md ring-1 ring-white/30' : 'hover:opacity-90'
            }`}
            aria-label="BTR — Life is Beautiful"
          >
            <BtrLogo className="h-11 w-auto" />
          </Link>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full xl:hidden ${
              floating
                ? 'bg-white/15 text-white backdrop-blur-md'
                : 'bg-mist text-[#222]'
            }`}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[68px] z-40 bg-ink/40 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-black/5 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col px-4 py-2">
                {mainLinks.map((l) => {
                  if (l.dropdown === 'projects') {
                    return (
                      <div key={l.to} className="border-b border-black/5">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-[#222]"
                          onClick={() => setMobileProjects((v) => !v)}
                        >
                          Projects
                          <ChevronRight
                            className={`h-4 w-4 transition ${
                              mobileProjects ? 'rotate-90 text-sage' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileProjects && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pb-3"
                            >
                              {projects.slice(0, 4).map((p) => (
                                <Link
                                  key={p.slug}
                                  to={p.href}
                                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-mist"
                                >
                                  <img
                                    src={p.image}
                                    alt=""
                                    className="h-11 w-11 rounded-lg object-cover"
                                  />
                                  <span>
                                    <span className="block text-sm font-semibold">
                                      {p.title}
                                    </span>
                                    <span className="block text-[11px] text-stone">
                                      {p.status}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                              <Link
                                to="/projects"
                                className="mt-1 block px-2 py-2 text-xs font-semibold tracking-wider text-sage uppercase"
                              >
                                View all projects →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }
                  if (l.dropdown === 'contact') {
                    return (
                      <div key={l.to} className="border-b border-black/5">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-[#222]"
                          onClick={() => setMobileContact((v) => !v)}
                        >
                          Contact
                          <ChevronRight
                            className={`h-4 w-4 transition ${
                              mobileContact ? 'rotate-90 text-sage' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileContact && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pb-3 pl-2"
                            >
                              <Link to="/contact" className="block py-2.5 text-sm">
                                Contact Us
                              </Link>
                              <Link to="/about" className="block py-2.5 text-sm">
                                About Us
                              </Link>
                              <Link
                                to="/management"
                                className="block py-2.5 text-sm"
                              >
                                Management
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }
                  return (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        `border-b border-black/5 py-4 text-[15px] font-medium ${
                          isActive ? 'text-sage' : 'text-[#222]'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function linkClass(isActive: boolean, floating: boolean) {
  const base =
    'relative rounded-full px-3.5 py-2.5 text-[12px] font-medium tracking-wide transition duration-300'
  if (floating) {
    return `${base} text-white/90 hover:bg-white/15 hover:text-white ${
      isActive ? 'bg-white/15 text-white' : ''
    }`
  }
  return `${base} text-[#1a1a1a] hover:bg-white hover:text-sage ${
    isActive ? 'bg-white text-sage shadow-sm' : ''
  }`
}
