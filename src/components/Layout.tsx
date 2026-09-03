import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import EnquireButton from './mak-crm/EnquireButton'
import { ScrollProgress } from './Motion'
import ScrollToHash from './ScrollToHash'
const PROJECT_PATHS = [
  '/',
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
      {hasMobileEnquireBar && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur-xl md:hidden">
            <EnquireButton className="flex w-full items-center justify-center rounded-full bg-ink py-3 text-[11px] font-semibold tracking-[0.14em] text-cream uppercase">
              Enquire
            </EnquireButton>
          </div>          <div className="h-16 md:hidden" aria-hidden />
        </>
      )}
    </div>
  )
}
