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
  { label: 'BTR Township', to: '/btr-township' },
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
      className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-all duration-500 ${
        floating
          ? 'bg-transparent'
          : scrolled || !isHome
            ? 'glass-nav-solid'
            : 'glass-nav'
      }`}
    >
      <div className="site-container-hero px-4 lg:px-8">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-2.5 sm:py-3 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-6">
          {/* MAK logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center justify-self-start"
            aria-label="MAK Projects Home"
          >
            <MakLogo
              className={`h-9 w-auto max-w-[112px] sm:h-10 sm:max-w-[124px] md:max-w-[132px] ${
                floating ? 'drop-shadow-md' : ''
              }`}
            />
          </Link>

          {/* Desktop nav — true center column */}
          <nav
            className={`hidden items-center gap-0.5 rounded-full px-1.5 py-1 xl:flex xl:justify-self-center ${
              floating
                ? 'border border-white/30 bg-white/12 shadow-lg shadow-black/10 backdrop-blur-2xl'
                : 'border border-ink/8 bg-white shadow-[0_4px_24px_rgba(7,17,14,0.06)]'
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

          {/* BTR logo + mobile menu */}
          <div className="flex items-center justify-end justify-self-end gap-2 sm:gap-3">
            <Link
              to="/btr-township"
              className={`hidden shrink-0 transition duration-300 md:block ${
                floating ? 'drop-shadow-md' : 'opacity-95 hover:opacity-100'
              }`}
              aria-label="BTR — Life is Beautiful"
            >
              <BtrLogo className="h-8 w-auto max-w-[88px] sm:h-9 sm:max-w-[96px]" />
            </Link>

            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-full xl:hidden ${
                floating
                  ? 'border border-white/25 bg-white/15 text-white backdrop-blur-md'
                  : 'border border-ink/10 bg-mist text-ink'
              }`}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[60px] z-40 bg-ink/40 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="max-h-[calc(100vh-60px)] overflow-y-auto border-t border-black/5 bg-white shadow-2xl"
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
                              {projects.slice(0, 4).map((p) =>
                                p.href.startsWith('/fern') ? (
                                  <a
                                    key={p.slug}
                                    href={p.href}
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
                                  </a>
                                ) : (
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
                                ),
                              )}
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
    'relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition duration-300'
  if (floating) {
    return `${base} text-white/92 hover:bg-white/15 hover:text-white ${
      isActive ? 'bg-white/18 text-white' : ''
    }`
  }
  return `${base} text-ink/85 hover:bg-mist/80 hover:text-sage ${
    isActive ? 'bg-mist text-sage font-semibold' : ''
  }`
}
