import { Link, Outlet, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCTAs from './FloatingCTAs'
import { ScrollProgress } from './Motion'
import ScrollToHash from './ScrollToHash'
import { contact } from '../data/content'

const PROJECT_PATHS = [
  '/projects',
  '/btr-serenity',
  '/btr-villa-plots',
  '/btr-villas',
  '/fern-villas',
  '/canadian-wood-villa',
  '/btr-greens',
  '/btr-township',
  '/amenities',
  '/management',
  '/about',
  '/contact',
]

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const hasMobileEnquireBar = PROJECT_PATHS.includes(pathname)

  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {!isHome && (
        <FloatingCTAs
          className={hasMobileEnquireBar ? 'bottom-20 md:bottom-6' : undefined}
        />
      )}
      {hasMobileEnquireBar && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur-xl md:hidden">
            <div className="flex gap-2">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/12 py-3 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <Link
                to="/contact"
                className="flex flex-1 items-center justify-center rounded-full bg-ink py-3 text-[11px] font-semibold tracking-[0.14em] text-cream uppercase"
              >
                Enquire
              </Link>
            </div>
          </div>
          <div className="h-16 md:hidden" aria-hidden />
        </>
      )}
    </div>
  )
}
