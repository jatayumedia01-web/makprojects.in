import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Dumbbell,
  Fence,
  Home,
  Landmark,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  Waves,
  Zap,
} from 'lucide-react'
import { nearby, plotFaqs, villaFaqs } from './content'

export type MetricIcon =
  | 'building'
  | 'trees'
  | 'home'
  | 'shield'
  | 'ruler'
  | 'landmark'
  | 'sparkles'
  | 'waves'
  | 'dumbbell'
  | 'zap'
  | 'fence'

export const metricIcons: Record<MetricIcon, LucideIcon> = {
  building: Building2,
  trees: Trees,
  home: Home,
  shield: ShieldCheck,
  ruler: Ruler,
  landmark: Landmark,
  sparkles: Sparkles,
  waves: Waves,
  dumbbell: Dumbbell,
  zap: Zap,
  fence: Fence,
}

export type ProjectPageData = {
  slug: string
  badge: string
  titleLead: string
  titleAccent: string
  heroImage: string
  heroBody: string
  secondaryCta?: { label: string; href: string }
  metrics: { value: string; label: string; icon: MetricIcon }[]
  overviewEyebrow: string
  overviewTitle: string
  overviewBody: string
  locationLine: string
  details: { label: string; value: string }[]
  galleryTitle: string
  gallery: { src: string; label: string }[]
  /** Plot / villa size cards (instead of apartment floor plans) */
  sizeSection?: {
    eyebrow: string
    title: string
    items: { size: string; unit: string; note: string; tag?: string }[]
  }
  /** Nested offerings under a parent project (e.g. Township → Serenity / Gardenia / Villas / Canadian) */
  offerings?: {
    eyebrow: string
    title: string
    body: string
    items: {
      title: string
      subtitle: string
      status: string
      image: string
      href: string
    }[]
  }
  amenities: { name: string; icon: MetricIcon }[]
  faqs: { q: string; a: string }[]
  faqAsideTitle: string
  faqAsideBody: string
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
}

const townshipAmenities: ProjectPageData['amenities'] = [
  { name: 'Club House', icon: 'sparkles' },
  { name: 'Swimming Pool', icon: 'waves' },
  { name: '10-Hole Golf', icon: 'trees' },
  { name: 'Gym', icon: 'dumbbell' },
  { name: 'Yoga Room', icon: 'sparkles' },
  { name: 'Jogging Track', icon: 'trees' },
  { name: 'Cricket Ground', icon: 'trees' },
  { name: 'Basketball Court', icon: 'sparkles' },
  { name: 'EV Charging', icon: 'zap' },
  { name: '24/7 Security', icon: 'shield' },
  { name: 'Solar Fencing', icon: 'fence' },
  { name: 'Power Backup', icon: 'zap' },
]

export const gardeniaPage: ProjectPageData = {
  slug: 'gardenia',
  badge: 'Part of MAK — BTR Township · Villa Plots',
  titleLead: 'BTR —',
  titleAccent: 'Gardenia',
  heroImage: '/media/gardenia/hero.jpg',
  heroBody:
    'Premium residential plots from 325 to 1000 sq.yds across 193 acres — ready to build your dream home.',
  secondaryCta: { label: 'View plot sizes', href: '#plot-sizes' },
  metrics: [
    { value: '193 Ac', label: 'Master plan', icon: 'trees' },
    { value: '590', label: 'Villa plots', icon: 'home' },
    { value: '325–1000', label: 'Sq.yds range', icon: 'ruler' },
    { value: 'RERA', label: 'HMDA approved', icon: 'shield' },
  ],
  overviewEyebrow: 'Part of MAK — BTR Township',
  overviewTitle: 'Exclusive Plots, Impeccable Planning',
  overviewBody:
    'BTR Gardenia is a villa-plots offering under MAK — BTR Township. Choose your ideal plot size and build your dream home — including golf-facing residential plot options. Wide roads, underground utilities, playgrounds and dual clubhouses elevate everyday living inside the township on Srisailam Highway.',
  locationLine: '26th Milestone · Srisailam Highway · Thummalur, Hyderabad',
  details: [
    { label: 'Project Size', value: '193 Acres' },
    { label: 'Project Type', value: 'Residential' },
    { label: 'Property Type', value: 'Villa Plot' },
    { label: 'Total Units', value: '590' },
    { label: 'Status', value: 'Ready To Build' },
    { label: 'OC', value: 'Yes' },
    { label: 'RERA', value: 'P02400001288' },
    { label: 'RERA (One)', value: 'P02400001289' },
  ],
  galleryTitle: 'Life at Gardenia',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
      label: 'Landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      label: 'Homes',
    },
    {
      src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
      label: 'Streets',
    },
    {
      src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80',
      label: 'Golf',
    },
  ],
  sizeSection: {
    eyebrow: 'Inventory',
    title: 'Plot Sizes',
    items: [
      { size: '325', unit: 'Sq.Yds', note: 'Compact family plots', tag: 'Entry' },
      { size: '400', unit: 'Sq.Yds', note: 'Popular mid-size', tag: 'Popular' },
      { size: '500', unit: 'Sq.Yds', note: 'Spacious living', tag: 'Premium' },
      { size: '1000', unit: 'Sq.Yds', note: 'Signature residences', tag: 'Signature' },
    ],
  },
  amenities: townshipAmenities,
  faqs: plotFaqs,
  faqAsideTitle: 'Still have\nquestions?',
  faqAsideBody:
    'Our team can walk you through plot sizes, building norms, and a site visit for BTR Gardenia.',
  ctaEyebrow: 'Ready to build',
  ctaTitle: 'Discover BTR Gardenia',
  ctaBody:
    'Schedule a site visit or speak with our team about available villa plot inventory.',
}

export const villasPage: ProjectPageData = {
  slug: 'villas',
  badge: 'Part of MAK — BTR Township · Luxury Villas',
  titleLead: 'BTR —',
  titleAccent: 'Villas',
  heroImage: '/media/villas/hero.jpg',
  heroBody:
    '333 luxury villas within MAK — BTR Township’s 260+ acres of land — designed by SA Architects SDN BHD, Malaysia, in Hyderabad’s Knowledge City.',
  secondaryCta: { label: 'View configurations', href: '#plot-sizes' },
  metrics: [
    { value: '333', label: 'Luxury villas', icon: 'home' },
    { value: '260+', label: 'Acres of land', icon: 'trees' },
    { value: '2900–4000', label: 'Sft homes', icon: 'ruler' },
    { value: 'SA Arch', label: 'Malaysia design', icon: 'landmark' },
  ],
  overviewEyebrow: 'Part of MAK — BTR Township',
  overviewTitle: 'East Meets West Living',
  overviewBody:
    'BTR Villas sit within MAK — BTR Township — elegant sit-outs, open lawns and serene vistas. A 10-hole golf course, dual clubhouses, spa, mini theatre and Apollo hospital services complete a world-class lifestyle — minutes from ORR and the airport.',
  locationLine: '26th Milestone · Srisailam Highway · Knowledge City, Hyderabad',
  details: [
    { label: 'Project Size', value: '260+ Acres' },
    { label: 'Project Type', value: 'Residential' },
    { label: 'Property Type', value: 'Villa' },
    { label: 'Total Villas', value: '333' },
    { label: 'Status', value: 'Completed' },
    { label: 'Bedrooms', value: '3 & 4 BHK' },
    { label: 'Built-up', value: '2900–4000 SFT' },
    { label: 'Approval', value: 'HMDA / RERA' },
  ],
  galleryTitle: 'Inside BTR Villas',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      label: 'Facade',
    },
    {
      src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
      label: 'Courtyard',
    },
    {
      src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80',
      label: 'Living',
    },
    {
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      label: 'Poolside',
    },
  ],
  sizeSection: {
    eyebrow: 'Homes',
    title: 'Configurations',
    items: [
      { size: '3', unit: 'Bed', note: '~2900–3200 SFT', tag: 'Family' },
      { size: '4', unit: 'Bed', note: '~3500–4000 SFT', tag: 'Premium' },
      { size: '400', unit: 'Sq.Yds', note: 'Typical plot band', tag: 'Plot' },
      { size: '600', unit: 'Sq.Yds', note: 'Larger residences', tag: 'Signature' },
    ],
  },
  amenities: townshipAmenities,
  faqs: villaFaqs,
  faqAsideTitle: 'Need a\nwalkthrough?',
  faqAsideBody:
    'Ask about available villas, golf membership access, and a guided tour of BTR Villas.',
  ctaEyebrow: 'Completed community',
  ctaTitle: 'Experience BTR Villas',
  ctaBody:
    'Speak with our team about resale / inventory opportunities in this luxury golf community.',
}

export const fernPage: ProjectPageData = {
  slug: 'fern',
  badge: 'New Launch · Tukkuguda',
  titleLead: 'Fern',
  titleAccent: 'by MAK',
  heroImage: '/media/fern/hero.jpg',
  heroBody:
    'Fern by MAK Projects at Tukkuguda — a fresh chapter of premium villa living with greenery, modern comfort, and the trusted craftsmanship of MAK.',
  secondaryCta: { label: 'Visit fernvillas.in', href: 'https://fernvillas.in' },
  metrics: [
    { value: 'New', label: 'Launch', icon: 'sparkles' },
    { value: 'Villa', label: 'Residences', icon: 'home' },
    { value: 'Tukkuguda', label: 'Hyderabad', icon: 'landmark' },
    { value: 'MAK', label: 'Craftsmanship', icon: 'shield' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Premium Villas at Tukkuguda',
  overviewBody:
    'Fern by MAK Projects brings thoughtfully planned villa residences to Tukkuguda, Hyderabad — refined design, greenery, and modern family living, backed by the MAK legacy of quality delivery.',
  locationLine: 'Tukkuguda · Hyderabad',
  details: [
    { label: 'Developer', value: 'MAK Projects' },
    { label: 'Project', value: 'Fern by MAK' },
    { label: 'Location', value: 'Tukkuguda' },
    { label: 'City', value: 'Hyderabad' },
    { label: 'Property Type', value: 'Villa' },
    { label: 'Status', value: 'New Launch' },
    { label: 'Website', value: 'fernvillas.in' },
    { label: 'Enquiry', value: 'Open' },
  ],
  galleryTitle: 'Fern at Tukkuguda',
  gallery: [
    {
      src: '/media/fern/hero.jpg',
      label: 'Fern',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      label: 'Residence',
    },
    {
      src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80',
      label: 'Interiors',
    },
    {
      src: 'https://images.unsplash.com/photo-1600566753086-00fbc71ffd8d?auto=format&fit=crop&w=1400&q=80',
      label: 'Garden',
    },
  ],
  sizeSection: {
    eyebrow: 'Launch',
    title: 'What to Expect',
    items: [
      { size: 'Villa', unit: 'Homes', note: 'Premium family residences', tag: 'Core' },
      { size: 'Tukkuguda', unit: 'Site', note: 'South Hyderabad location', tag: 'Location' },
      { size: 'Green', unit: 'Spaces', note: 'Landscaped living', tag: 'Lifestyle' },
      { size: 'MAK', unit: 'Quality', note: 'Trusted delivery', tag: 'Brand' },
    ],
  },
  amenities: [
    { name: 'Landscaped Greens', icon: 'trees' },
    { name: 'Club Amenities', icon: 'sparkles' },
    { name: 'Secure Living', icon: 'shield' },
    { name: 'Power Backup', icon: 'zap' },
    { name: 'Modern Interiors', icon: 'home' },
    { name: 'Family Spaces', icon: 'building' },
  ],
  faqs: [
    {
      q: 'What is Fern by MAK Projects?',
      a: 'Fern by MAK Projects is a new villa launch at Tukkuguda, Hyderabad — premium residences with a green, modern living focus.',
    },
    {
      q: 'Where is Fern located?',
      a: 'Fern by MAK Projects is located at Tukkuguda, Hyderabad. Visit fernvillas.in or contact our sales team for directions and a site visit.',
    },
    {
      q: 'How do I know more?',
      a: 'Explore fernvillas.in for the dedicated Fern experience, or call +91 99127 97979 / use our Contact page to schedule a briefing.',
    },
  ],
  faqAsideTitle: 'Visit\nFern',
  faqAsideBody:
    'Register your interest and our team will share launch updates, plans, and visit slots for Fern at Tukkuguda.',
  ctaEyebrow: 'New launch · Tukkuguda',
  ctaTitle: 'Discover Fern by MAK',
  ctaBody:
    'Speak with MAK sales for early interest registration and upcoming site previews at Tukkuguda.',
}


export const canadianPage: ProjectPageData = {
  slug: 'canadian',
  badge: 'Part of MAK — BTR Township · Signature Residence',
  titleLead: 'Canadian Wood',
  titleAccent: 'Villa',
  heroImage: '/media/canadian/hero.jpg',
  heroBody:
    'A rare signature residence of 8,750 SFT — crafted for those who seek unmatched scale, privacy, and presence inside the BTR ecosystem.',
  secondaryCta: { label: 'Request details', href: '/contact' },
  metrics: [
    { value: '8,750', label: 'SFT residence', icon: 'ruler' },
    { value: '1', label: 'Signature villa', icon: 'home' },
    { value: 'Wood', label: 'Crafted finish', icon: 'sparkles' },
    { value: 'BTR', label: 'Township living', icon: 'trees' },
  ],
  overviewEyebrow: 'Part of MAK — BTR Township',
  overviewTitle: 'A Residence Apart',
  overviewBody:
    'Canadian Wood Villa is MAK’s statement home within MAK — BTR Township — expansive living spaces, refined materiality, and the privacy of a true signature residence. Built for discerning families who want scale without leaving the connectivity and lifestyle of the township.',
  locationLine: '26th Milestone · Srisailam Highway · Thummalur, Hyderabad',
  details: [
    { label: 'Property Type', value: 'Signature Villa' },
    { label: 'Built-up', value: '8,750 SFT' },
    { label: 'Status', value: 'Exclusive' },
    { label: 'Finish', value: 'Premium wood craft' },
    { label: 'Location', value: 'BTR Township' },
    { label: 'Privacy', value: 'High' },
    { label: 'Lifestyle', value: 'Golf community' },
    { label: 'Enquiry', value: 'By appointment' },
  ],
  galleryTitle: 'Signature Spaces',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      label: 'Exterior',
    },
    {
      src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80',
      label: 'Living',
    },
    {
      src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80',
      label: 'Dining',
    },
    {
      src: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1400&q=80',
      label: 'Suite',
    },
  ],
  sizeSection: {
    eyebrow: 'Scale',
    title: 'Residence Profile',
    items: [
      { size: '8750', unit: 'SFT', note: 'Built-up area', tag: 'Scale' },
      { size: 'Grand', unit: 'Lobby', note: 'Arrival experience', tag: 'Entry' },
      { size: 'Multi', unit: 'Suites', note: 'Private family wings', tag: 'Living' },
      { size: 'Lawn', unit: 'Estate', note: 'Outdoor entertaining', tag: 'Garden' },
    ],
  },
  amenities: [
    { name: 'Private Lawns', icon: 'trees' },
    { name: 'Premium Interiors', icon: 'sparkles' },
    { name: 'Township Club', icon: 'waves' },
    { name: 'Golf Access', icon: 'trees' },
    { name: '24/7 Security', icon: 'shield' },
    { name: 'Power Backup', icon: 'zap' },
  ],
  faqs: [
    {
      q: 'What makes Canadian Wood Villa exclusive?',
      a: 'It is a signature 8,750 SFT residence positioned for privacy and scale — not a standard inventory villa.',
    },
    {
      q: 'Can I visit the property?',
      a: 'Yes — visits are by appointment. Contact MAK sales to schedule a private walkthrough.',
    },
    {
      q: 'Is it part of BTR Township amenities?',
      a: 'Yes. Residents benefit from the broader BTR lifestyle ecosystem including club, golf, and security.',
    },
  ],
  faqAsideTitle: 'Private\nenquiry',
  faqAsideBody:
    'This residence is shared by appointment. Our team will brief you on availability and visit protocols.',
  ctaEyebrow: 'By appointment',
  ctaTitle: 'Enquire about Canadian Wood Villa',
  ctaBody:
    'Request a private briefing with MAK sales for this signature residence.',
}

export const townshipPage: ProjectPageData = {
  slug: 'township',
  badge: 'MAK — BTR Township',
  titleLead: 'MAK — BTR',
  titleAccent: 'Township',
  heroImage: '/media/gardenia/hero.jpg',
  heroBody:
    'Telangana’s pioneer integrated luxury township — apartments, villa plots, luxury villas and a signature residence on Srisailam Highway, South Hyderabad.',
  secondaryCta: { label: 'Explore offerings', href: '#offerings' },
  metrics: [
    { value: '260+', label: 'Acres of land', icon: 'trees' },
    { value: '1,450+', label: 'Units', icon: 'building' },
    { value: '150', label: '3 & 4 BHK ready', icon: 'home' },
    { value: '80+', label: 'Amenities', icon: 'sparkles' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'One Township. Four Signature Offerings.',
  overviewBody:
    'MAK — BTR Township is the master-planned community that brings together BTR Serenity (ready-to-move apartments), BTR Gardenia (premium villa plots including golf-facing options), BTR Villas (333 luxury villas), and Canadian Wood Villa (signature residence) — with wide roads, greenery, and world-class township amenities.',
  locationLine: '26th Milestone · Srisailam Highway · Thummalur, Hyderabad',
  details: [
    { label: 'Master brand', value: 'MAK — BTR Township' },
    { label: 'Offerings', value: '4 residential' },
    { label: 'Apartments', value: '150 · Serenity' },
    { label: 'Villas', value: '333 units' },
    { label: 'Villa plots', value: 'Gardenia' },
    { label: 'Signature', value: 'Canadian Wood' },
    { label: 'Lifestyle', value: 'Golf · Club · Greens' },
    { label: 'Enquiry', value: 'Open' },
  ],
  offerings: {
    eyebrow: 'Inside the Township',
    title: 'Our Offerings',
    body: 'Every residential product below is part of MAK — BTR Township.',
    items: [
      {
        title: 'BTR — Serenity',
        subtitle: 'Ready to move-in · 3 & 4 BHK · 150 units',
        status: 'Ready to Move-In',
        image: '/media/serenity/hero.jpg',
        href: '/btr-serenity',
      },
      {
        title: 'BTR — Gardenia',
        subtitle: 'Premium villa plots · 325–1000 sq.yds',
        status: 'Ready to Build',
        image: '/media/gardenia/hero.jpg',
        href: '/btr-villa-plots',
      },
      {
        title: 'BTR — Villas',
        subtitle: '333 luxury villas · golf community',
        status: 'Completed',
        image: '/media/villas/hero.jpg',
        href: '/btr-villas',
      },
      {
        title: 'Canadian Wood Villa',
        subtitle: 'Signature residence · 8,750 SFT',
        status: 'Exclusive',
        image: '/media/canadian/hero.jpg',
        href: '/canadian-wood-villa',
      },
    ],
  },
  galleryTitle: 'Life at BTR Township',
  gallery: [
    { src: '/media/serenity/hero.jpg', label: 'Serenity' },
    { src: '/media/gardenia/hero.jpg', label: 'Gardenia' },
    { src: '/media/villas/hero.jpg', label: 'BTR Villas' },
    { src: '/media/canadian/hero.jpg', label: 'Canadian Wood' },
  ],
  sizeSection: {
    eyebrow: 'Inventory',
    title: 'What the Township Includes',
    items: [
      { size: 'Serenity', unit: '150', note: '3 & 4 BHK ready-to-move flats', tag: 'Apartments' },
      { size: 'Gardenia', unit: 'Plots', note: '325–1000 sq.yds villa plots', tag: 'Plots' },
      { size: 'Villas', unit: '333', note: 'Luxury golf community homes', tag: 'Villas' },
      { size: 'Canadian', unit: '8750', note: 'Signature wood residence (SFT)', tag: 'Exclusive' },
    ],
  },
  amenities: townshipAmenities.slice(0, 8),
  faqs: [
    {
      q: 'What is MAK — BTR Township?',
      a: 'It is MAK’s integrated luxury township on Srisailam Highway, home to Serenity apartments, Gardenia villa plots, BTR Villas, and Canadian Wood Villa.',
    },
    {
      q: 'Is Serenity part of the township?',
      a: 'Yes. BTR Serenity is the ready-to-move apartment offering within MAK — BTR Township.',
    },
    {
      q: 'Are Gardenia and BTR Villas separate projects?',
      a: 'They have dedicated detail pages, but both are offerings under MAK — BTR Township — not standalone brands outside it.',
    },
    {
      q: 'Is Canadian Wood Villa part of the township?',
      a: 'Yes. Canadian Wood Villa is the signature residence offering within MAK — BTR Township.',
    },
  ],
  faqAsideTitle: 'Explore\nthe Township',
  faqAsideBody:
    'Ask about Serenity, Gardenia plots, BTR Villas, or Canadian Wood Villa — and schedule a guided visit.',
  ctaEyebrow: 'MAK — BTR Township',
  ctaTitle: 'Discover the Township',
  ctaBody:
    'Speak with our team about apartments, plots, villas, and the signature residence inside MAK — BTR Township.',
}

/** @deprecated Use townshipPage — /btr-greens redirects to township */
export const greensPage = townshipPage


export const golfPage: ProjectPageData = {
  slug: 'golf',
  badge: 'Golf Residential Plots · Completed',
  titleLead: 'BTR —',
  titleAccent: 'Golf Plots',
  heroImage:
    'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    'Completed golf-facing residential plots from 325 to 1000 sq.yds — living beside fairways in the BTR township.',
  secondaryCta: { label: 'View plot band', href: '#plot-sizes' },
  metrics: [
    { value: '325–1000', label: 'Sq.yds plots', icon: 'ruler' },
    { value: 'Golf', label: 'Course living', icon: 'trees' },
    { value: 'Done', label: 'Completed', icon: 'shield' },
    { value: 'BTR', label: 'Township', icon: 'building' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Plots Beside the Fairway',
  overviewBody:
    'BTR Golf Residential Plots place your home address next to the lifestyle of a golf community — open vistas, planned roads, and access to township amenities. A completed plotted offering for buyers who want recreation and residence in one address.',
  locationLine: '26th Milestone · Srisailam Highway · Thummalur, Hyderabad',
  details: [
    { label: 'Property Type', value: 'Golf Residential Plot' },
    { label: 'Plot Range', value: '325–1000 Sq.Yds' },
    { label: 'Status', value: 'Completed' },
    { label: 'Highlight', value: 'Golf vicinity' },
    { label: 'Location', value: 'BTR Township' },
    { label: 'Course', value: '10-Hole Golf' },
    { label: 'Lifestyle', value: 'Recreation + home' },
    { label: 'Enquiry', value: 'Open' },
  ],
  galleryTitle: 'Golf Living',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80',
      label: 'Fairway',
    },
    {
      src: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80',
      label: 'Course',
    },
    {
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      label: 'Homes',
    },
    {
      src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
      label: 'Open sky',
    },
  ],
  sizeSection: {
    eyebrow: 'Inventory',
    title: 'Plot Band',
    items: [
      { size: '325', unit: 'Sq.Yds', note: 'Golf corridor entry', tag: 'Entry' },
      { size: '400', unit: 'Sq.Yds', note: 'Balanced living', tag: 'Popular' },
      { size: '500', unit: 'Sq.Yds', note: 'Premium frontage', tag: 'Premium' },
      { size: '1000', unit: 'Sq.Yds', note: 'Estate scale', tag: 'Signature' },
    ],
  },
  amenities: townshipAmenities,
  faqs: [
    {
      q: 'What are BTR Golf Residential Plots?',
      a: 'Completed residential plots in the BTR golf community corridor, typically ranging from 325 to 1000 sq.yds.',
    },
    {
      q: 'Do owners get golf / club access?',
      a: 'Lifestyle access is governed by township / club membership rules. Confirm current privileges with our sales team.',
    },
    {
      q: 'How do I check plot availability?',
      a: 'Contact MAK Projects for remaining inventory, documentation, and a site visit.',
    },
  ],
  faqAsideTitle: 'Fairway\nliving',
  faqAsideBody:
    'Ask about available golf-corridor plots and schedule a visit with our team.',
  ctaEyebrow: 'Golf corridor',
  ctaTitle: 'Explore BTR Golf Plots',
  ctaBody:
    'Speak with our team about completed residential plots beside the golf lifestyle.',
}

/** Shared for connectivity lists on all project pages */
export { nearby }
