/**
 * HOME PAGE SECTION NAMES
 * =======================
 * Next time cheppedi ee name tho — easy ga find/edit cheyochu.
 *
 * 1. HeroSection        → Full-screen video hero (src/components/HeroVideo.tsx)
 * 2. WelcomeSection     → Welcome to MAK + You Dream We Deliver
 * 3. OngoingProjectsSection → Apartments · Fern Villas · BTR Township
 * 4. WhyChooseUsSection → Years of Dedication · Workmanship · Quality Assurance
 * 5. LocationSection    → Prime Knowledge City address + badges
 *    Footer             → Layout (site-wide)
 *
 * PROJECTS PAGE
 * -------------
 * ProjectsHero         → Experience Luxury Living hero
 * ExploreProjectsGrid  → 6 project cards
 * ProjectsMap          → Map band
 * ProjectBrandSlider   → OUR BRANDS advanced carousel (above footer)
 */

export const HOME_SECTIONS = [
  { name: 'HeroSection', id: 'hero-section', order: 1 },
  { name: 'WelcomeSection', id: 'welcome-section', order: 2 },
  { name: 'OngoingProjectsSection', id: 'ongoing-projects-section', order: 3 },
  { name: 'WhyChooseUsSection', id: 'why-choose-us-section', order: 4 },
  { name: 'LocationSection', id: 'location-section', order: 5 },
] as const
