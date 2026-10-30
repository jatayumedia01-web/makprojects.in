import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { EnquiryProvider } from './components/mak-crm/EnquiryContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Serenity from './pages/Serenity'
import VillaPlots from './pages/VillaPlots'
import Villas from './pages/Villas'
import FernVillas from './pages/FernVillas'
import FernRedirect from './pages/FernRedirect'
import CanadianWood from './pages/CanadianWood'
import Greens from './pages/Greens'
import Township from './pages/Township'
import GolfPlots from './pages/GolfPlots'
import Amenities from './pages/Amenities'
import Awards from './pages/Awards'
import Testimonials from './pages/Testimonials'
import About from './pages/About'
import Management from './pages/Management'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <EnquiryProvider>
      <BrowserRouter>
        <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="btr-serenity" element={<Serenity />} />
          <Route path="btr-villa-plots" element={<VillaPlots />} />
          <Route path="btr-villas" element={<Villas />} />
          <Route path="fern-villas" element={<FernVillas />} />
          <Route path="fern/*" element={<FernRedirect />} />
          <Route path="canadian-wood-villa" element={<CanadianWood />} />
          <Route path="btr-township" element={<Township />} />
          <Route path="btr-greens" element={<Greens />} />
          <Route path="btr-golf-plots" element={<GolfPlots />} />
          <Route path="amenities" element={<Amenities />} />
          <Route path="about" element={<About />} />
          <Route path="csr" element={<Navigate to="/" replace />} />
          <Route path="awards" element={<Awards />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="management" element={<Management />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about-us/*" element={<Navigate to="/about" replace />} />
          <Route path="contact-us/*" element={<Navigate to="/contact" replace />} />
          <Route path="testimonial/*" element={<Navigate to="/testimonials" replace />} />
          <Route
            path="btr-serenity-ready-to-move-in-luxury-apartments-hyderabad/*"
            element={<Navigate to="/btr-serenity" replace />}
          />
          <Route path="serenity/*" element={<Navigate to="/btr-serenity" replace />} />
          <Route path="btr/*" element={<Navigate to="/btr-township" replace />} />
          <Route path="gardenia/*" element={<Navigate to="/btr-villa-plots" replace />} />
          <Route path="plots/*" element={<Navigate to="/btr-villa-plots" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </EnquiryProvider>
  )
}
