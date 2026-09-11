import { useEffect, useState } from 'react'

import { Link, NavLink, useLocation } from 'react-router-dom'

import { Menu, X, ChevronRight } from 'lucide-react'

import { AnimatePresence, motion } from 'framer-motion'

import { MakLogo } from './BrandLogos'

import {

  ProjectsDropdown,

  AboutUsDropdown,

  projectMenuEntries,

  btrMobileLinks,

  aboutUsMobileLinks,

} from './NavMenus'



const FERN_HREF = '/fern/'

const FERN_LABEL = 'Fern by MAK Projects'



const mainLinks = [

  { kind: 'link' as const, label: 'Home', to: '/' },

  { kind: 'projects' as const, label: 'Projects', to: '/projects' },

  { kind: 'fern' as const, label: FERN_LABEL, href: FERN_HREF },

  { kind: 'about' as const, label: 'About Us', to: '/about' },

  { kind: 'link' as const, label: 'Contact Us', to: '/contact' },

]



export default function Navbar() {

  const [open, setOpen] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  const [mobileProjects, setMobileProjects] = useState(false)

  const [mobileBtr, setMobileBtr] = useState(false)

  const [mobileAbout, setMobileAbout] = useState(false)

  const location = useLocation()

  const isHome = location.pathname === '/'

  const isFernActive = location.pathname.startsWith('/fern')



  const fernEntry = projectMenuEntries.find((e) => e.group === 'standalone')



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 40)

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)

  }, [])



  useEffect(() => {

    setOpen(false)

    setMobileProjects(false)

    setMobileBtr(false)

    setMobileAbout(false)

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

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-2.5 sm:py-3 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-4 2xl:gap-6">

          <Link

            to="/"

            className="flex shrink-0 items-center justify-self-start"

            aria-label="MAK Projects Home"

          >

            <MakLogo

              className={`h-[60px] w-auto max-w-[144px] sm:h-16 sm:max-w-[158px] md:max-w-[166px] ${

                floating ? 'drop-shadow-md' : ''

              }`}

            />

          </Link>



          <nav

            className={`hidden items-center gap-0.5 rounded-full px-1 py-1 xl:flex xl:justify-self-center ${

              floating

                ? 'border border-white/30 bg-white/12 shadow-lg shadow-black/10 backdrop-blur-2xl'

                : 'border border-ink/8 bg-white shadow-[0_4px_24px_rgba(7,17,14,0.06)]'

            }`}

          >

            {mainLinks.map((l) => {

              if (l.kind === 'projects') {

                return <ProjectsDropdown key={l.to} floating={floating} />

              }

              if (l.kind === 'about') {

                return <AboutUsDropdown key={l.to} floating={floating} />

              }

              if (l.kind === 'fern') {

                return (

                  <a

                    key={l.href}

                    href={l.href}

                    className={`${linkClass(isFernActive, floating)} max-w-[9.5rem] text-center leading-tight xl:max-w-none xl:whitespace-nowrap xl:px-2.5 xl:text-[11px] 2xl:px-3.5 2xl:text-[13px]`}

                  >

                    {l.label}

                  </a>

                )

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



          <div className="flex items-center justify-end justify-self-end">

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

                  if (l.kind === 'projects') {

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

                              {fernEntry &&

                                (fernEntry.external ? (

                                  <a

                                    href={fernEntry.href}

                                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-mist"

                                  >

                                    <img

                                      src={fernEntry.image}

                                      alt=""

                                      className="h-11 w-11 rounded-lg object-cover"

                                    />

                                    <span>

                                      <span className="block text-sm font-semibold">

                                        {fernEntry.title}

                                      </span>

                                      <span className="block text-[11px] text-stone">

                                        {fernEntry.status}

                                      </span>

                                    </span>

                                  </a>

                                ) : (

                                  <Link

                                    to={fernEntry.href}

                                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-mist"

                                  >

                                    <img

                                      src={fernEntry.image}

                                      alt=""

                                      className="h-11 w-11 rounded-lg object-cover"

                                    />

                                    <span>

                                      <span className="block text-sm font-semibold">

                                        {fernEntry.title}

                                      </span>

                                      <span className="block text-[11px] text-stone">

                                        {fernEntry.status}

                                      </span>

                                    </span>

                                  </Link>

                                ))}



                              <button

                                type="button"

                                className="mt-2 flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-left hover:bg-mist"

                                onClick={() => setMobileBtr((v) => !v)}

                              >

                                <span>

                                  <span className="block text-sm font-semibold text-ink">

                                    MAK - BTR

                                  </span>

                                  <span className="block text-[11px] text-stone">

                                    Township · Serenity · Gardenia · Villas

                                  </span>

                                </span>

                                <ChevronRight

                                  className={`h-4 w-4 shrink-0 transition ${

                                    mobileBtr ? 'rotate-90 text-sage' : 'text-stone'

                                  }`}

                                />

                              </button>



                              <AnimatePresence>

                                {mobileBtr && (

                                  <motion.div

                                    initial={{ height: 0, opacity: 0 }}

                                    animate={{ height: 'auto', opacity: 1 }}

                                    exit={{ height: 0, opacity: 0 }}

                                    className="overflow-hidden border-l-2 border-sage/30 pl-3 ml-2"

                                  >

                                    {btrMobileLinks.map((item) => (

                                      <Link

                                        key={item.to}

                                        to={item.to}

                                        className="block py-2.5 text-sm text-ink/85"

                                      >

                                        {item.label}

                                      </Link>

                                    ))}

                                  </motion.div>

                                )}

                              </AnimatePresence>



                              <Link

                                to="/projects"

                                className="mt-2 block px-2 py-2 text-xs font-semibold tracking-wider text-sage uppercase"

                              >

                                View all projects →

                              </Link>

                            </motion.div>

                          )}

                        </AnimatePresence>

                      </div>

                    )

                  }

                  if (l.kind === 'fern') {

                    return (

                      <a

                        key={l.href}

                        href={l.href}

                        className={`border-b border-black/5 py-4 text-[15px] font-medium ${

                          isFernActive ? 'text-sage' : 'text-[#222]'

                        }`}

                      >

                        {l.label}

                      </a>

                    )

                  }

                  if (l.kind === 'about') {

                    return (

                      <div key={l.to} className="border-b border-black/5">

                        <button

                          type="button"

                          className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-[#222]"

                          onClick={() => setMobileAbout((v) => !v)}

                        >

                          About Us

                          <ChevronRight

                            className={`h-4 w-4 transition ${

                              mobileAbout ? 'rotate-90 text-sage' : ''

                            }`}

                          />

                        </button>

                        <AnimatePresence>

                          {mobileAbout && (

                            <motion.div

                              initial={{ height: 0, opacity: 0 }}

                              animate={{ height: 'auto', opacity: 1 }}

                              exit={{ height: 0, opacity: 0 }}

                              className="overflow-hidden border-l-2 border-sage/30 pb-3 pl-3 ml-2"

                            >

                              <Link to="/about" className="block py-2.5 text-sm">

                                Company Overview

                              </Link>

                              {aboutUsMobileLinks.map((item) => (

                                <Link

                                  key={item.to}

                                  to={item.to}

                                  className="block py-2.5 text-sm text-ink/85"

                                >

                                  {item.label}

                                </Link>

                              ))}

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


