import HeroVideo from '../components/HeroVideo'
import WelcomeSection from '../sections/WelcomeSection'
import OngoingProjectsSection from '../sections/OngoingProjectsSection'
import WhyChooseUsSection from '../sections/WhyChooseUsSection'
import LocationSection from '../sections/LocationSection'

export default function Home() {
  return (
    <>
      {/* 1. HeroSection */}
      <div id="hero-section" data-section="HeroSection">
        <HeroVideo />
      </div>

      {/* 2. WelcomeSection */}
      <WelcomeSection />

      {/* 3. OngoingProjectsSection */}
      <OngoingProjectsSection />

      {/* 4. WhyChooseUsSection */}
      <WhyChooseUsSection />

      {/* 5. LocationSection */}
      <LocationSection />
    </>
  )
}
