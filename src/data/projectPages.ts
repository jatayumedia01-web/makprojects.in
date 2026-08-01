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
  badge: 'BTR Township · Premium Villa Plots',
  titleLead: 'BTR —',
  titleAccent: 'Gardenia',
  heroImage:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    'Premium residential plots from 325 to 1000 sq.yds across 193 acres — ready to build your dream home.',
  secondaryCta: { label: 'View plot sizes', href: '#plot-sizes' },
  metrics: [
    { value: '193 Ac', label: 'Master plan', icon: 'trees' },
    { value: '590', label: 'Villa plots', icon: 'home' },
    { value: '325–1000', label: 'Sq.yds range', icon: 'ruler' },
    { value: 'RERA', label: 'HMDA approved', icon: 'shield' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Exclusive Plots, Impeccable Planning',
  overviewBody:
    'BTR Gardenia offers the flexibility to choose your ideal plot size and build your dream home. Wide roads, underground utilities, playgrounds and dual clubhouses elevate everyday living inside the BTR township on Srisailam Highway.',
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
  badge: 'Luxury Golf Community · Completed',
  titleLead: 'BTR —',
  titleAccent: 'Villas',
  heroImage:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    '333 luxury villas across 260 acres — designed by SA Architects SDN BHD, Malaysia, in Hyderabad’s Knowledge City.',
  secondaryCta: { label: 'View configurations', href: '#plot-sizes' },
  metrics: [
    { value: '333', label: 'Luxury villas', icon: 'home' },
    { value: '260 Ac', label: 'Township land', icon: 'trees' },
    { value: '2900–4000', label: 'Sft homes', icon: 'ruler' },
    { value: 'SA Arch', label: 'Malaysia design', icon: 'landmark' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'East Meets West Living',
  overviewBody:
    'Elegant sit-outs, open lawns and serene vistas define BTR Villas. A 10-hole golf course, dual clubhouses, spa, mini theatre and Apollo hospital services complete a world-class lifestyle — minutes from ORR and the airport.',
  locationLine: '26th Milestone · Srisailam Highway · Knowledge City, Hyderabad',
  details: [
    { label: 'Project Size', value: '260 Acres' },
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
  badge: 'New Launch · By MAK Projects',
  titleLead: 'Fern',
  titleAccent: 'Villas',
  heroImage:
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    'A fresh chapter of premium villa living — refined homes for modern families, backed by the MAK legacy.',
  secondaryCta: { label: 'Register interest', href: '/contact' },
  metrics: [
    { value: 'New', label: 'Launch', icon: 'sparkles' },
    { value: 'Villa', label: 'Residences', icon: 'home' },
    { value: 'MAK', label: 'Craftsmanship', icon: 'shield' },
    { value: 'Green', label: 'Living focus', icon: 'trees' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Coming Into Focus',
  overviewBody:
    'Fern Villas by MAK Projects is our newest villa offering — thoughtfully planned residences with greenery, modern comfort, and the trusted craftsmanship of MAK. Floor plans, RERA details, and gallery assets will continue to be updated as the launch unfolds.',
  locationLine: 'Hyderabad · Exact site coordinates shared on enquiry',
  details: [
    { label: 'Developer', value: 'MAK Projects' },
    { label: 'Project Type', value: 'Residential' },
    { label: 'Property Type', value: 'Villa' },
    { label: 'Status', value: 'New Launch' },
    { label: 'Focus', value: 'Modern families' },
    { label: 'Design', value: 'Premium finish' },
    { label: 'Enquiry', value: 'Open' },
    { label: 'Updates', value: 'Rolling' },
  ],
  galleryTitle: 'Vision Gallery',
  gallery: [
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
    {
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      label: 'Lounge',
    },
  ],
  sizeSection: {
    eyebrow: 'Launch',
    title: 'What to Expect',
    items: [
      { size: 'Villa', unit: 'Homes', note: 'Premium family residences', tag: 'Core' },
      { size: 'Green', unit: 'Spaces', note: 'Landscaped living', tag: 'Lifestyle' },
      { size: 'MAK', unit: 'Quality', note: 'Trusted delivery', tag: 'Brand' },
      { size: 'Soon', unit: 'Plans', note: 'Floor plans upcoming', tag: 'Update' },
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
      q: 'What is Fern Villas?',
      a: 'Fern Villas is a new villa launch by MAK Projects — premium residences with a green, modern living focus.',
    },
    {
      q: 'Are floor plans available?',
      a: 'Detailed floor plans and unit inventory will be published as launch assets are finalized. Register interest to receive updates first.',
    },
    {
      q: 'How do I book a preview?',
      a: 'Contact our sales team via the Contact page or call +91 99127 97979 to schedule a briefing.',
    },
  ],
  faqAsideTitle: 'Be the\nfirst to know',
  faqAsideBody:
    'Register your interest and our team will share launch updates, plans, and visit slots for Fern Villas.',
  ctaEyebrow: 'New launch',
  ctaTitle: 'Register for Fern Villas',
  ctaBody:
    'Speak with MAK sales for early interest registration and upcoming site previews.',
}

export const canadianPage: ProjectPageData = {
  slug: 'canadian',
  badge: 'Signature Residence · Exclusive',
  titleLead: 'Canadian Wood',
  titleAccent: 'Villa',
  heroImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    'A rare signature residence of 8,750 SFT — crafted for those who seek unmatched scale, privacy, and presence inside the BTR ecosystem.',
  secondaryCta: { label: 'Request details', href: '/contact' },
  metrics: [
    { value: '8,750', label: 'SFT residence', icon: 'ruler' },
    { value: '1', label: 'Signature villa', icon: 'home' },
    { value: 'Wood', label: 'Crafted finish', icon: 'sparkles' },
    { value: 'BTR', label: 'Township living', icon: 'trees' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'A Residence Apart',
  overviewBody:
    'Canadian Wood Villa is MAK’s statement home — expansive living spaces, refined materiality, and the privacy of a true signature residence. Built for discerning families who want scale without leaving the connectivity and lifestyle of BTR Township.',
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

export const greensPage: ProjectPageData = {
  slug: 'greens',
  badge: 'Residential Plots · Completed',
  titleLead: 'BTR —',
  titleAccent: 'Greens',
  heroImage:
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=80',
  heroBody:
    'Completed residential plots from 325 to 1000 sq.yds — green, planned living within the BTR township corridor.',
  secondaryCta: { label: 'View plot band', href: '#plot-sizes' },
  metrics: [
    { value: '325–1000', label: 'Sq.yds plots', icon: 'ruler' },
    { value: 'Done', label: 'Completed', icon: 'shield' },
    { value: 'Green', label: 'Planned layout', icon: 'trees' },
    { value: 'BTR', label: 'Township link', icon: 'building' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Plotted Living, Completed',
  overviewBody:
    'BTR Greens delivers completed residential plots for families seeking a quieter, greener base with township connectivity. Wide layout planning and access to BTR amenities make it a strong long-term address on Srisailam Highway.',
  locationLine: '26th Milestone · Srisailam Highway · Thummalur, Hyderabad',
  details: [
    { label: 'Property Type', value: 'Residential Plot' },
    { label: 'Plot Range', value: '325–1000 Sq.Yds' },
    { label: 'Status', value: 'Completed' },
    { label: 'Project Type', value: 'Residential' },
    { label: 'Location', value: 'BTR Corridor' },
    { label: 'Utilities', value: 'Township linked' },
    { label: 'Lifestyle', value: 'Green living' },
    { label: 'Enquiry', value: 'Open' },
  ],
  galleryTitle: 'Greens Atmosphere',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
      label: 'Open land',
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
      label: 'Greenery',
    },
    {
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      label: 'Homes',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      label: 'Streetscape',
    },
  ],
  sizeSection: {
    eyebrow: 'Inventory',
    title: 'Plot Band',
    items: [
      { size: '325', unit: 'Sq.Yds', note: 'Starter plots', tag: 'Entry' },
      { size: '400', unit: 'Sq.Yds', note: 'Balanced homes', tag: 'Popular' },
      { size: '500', unit: 'Sq.Yds', note: 'Larger footprints', tag: 'Premium' },
      { size: '1000', unit: 'Sq.Yds', note: 'Estate plots', tag: 'Signature' },
    ],
  },
  amenities: townshipAmenities.slice(0, 8),
  faqs: [
    {
      q: 'What is BTR Greens?',
      a: 'BTR Greens is a completed residential plotted development within the BTR corridor, offering plots typically from 325 to 1000 sq.yds.',
    },
    {
      q: 'Is infrastructure ready?',
      a: 'As a completed plotted community, roads and core layout infrastructure are in place; confirm plot-specific status with our sales team.',
    },
    {
      q: 'Can I still purchase a plot?',
      a: 'Availability varies. Contact MAK for current inventory, documentation, and site visit scheduling.',
    },
  ],
  faqAsideTitle: 'Check\navailability',
  faqAsideBody:
    'Ask about remaining plots, documentation, and a guided visit for BTR Greens.',
  ctaEyebrow: 'Completed plots',
  ctaTitle: 'Explore BTR Greens',
  ctaBody:
    'Speak with our team about available residential plots in BTR Greens.',
}

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
