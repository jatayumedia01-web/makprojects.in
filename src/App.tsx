import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import About from './pages/About'
import Management from './pages/Management'
import Contact from './pages/Contact'

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
          <Route path="management" element={<Management />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </EnquiryProvider>
  )
}
