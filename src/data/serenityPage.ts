import type { LucideIcon } from 'lucide-react'
import {
  BedDouble,
  BookOpen,
  Building2,
  Camera,
  Car,
  Dumbbell,
  Droplets,
  Fence,
  Flame,
  Flower2,
  Gamepad2,
  Landmark,
  Phone,
  ShieldCheck,
  Trees,
  Users,
  Wifi,
  Zap,
} from 'lucide-react'

export { serenityPlanCatalog, getSerenityPlansByBhk } from './serenityPlans'
export type { SerenityPlan, PlanFacing } from './serenityPlans'

export const serenityBrochure = {
  pdf: '/media/serenity/brochure/btr-serenity-brochure.pdf',
  label: 'Download Brochure',
}

/** Media from official BTR Serenity brochure + project video */
export const serenityMedia = {
  hero: '/media/serenity/hero.jpg',
  gallery: [
    {
      id: 'render-day',
      title: 'Elevation',
      caption: 'BTR Serenity — day view with landscaped greens',
      image: '/media/serenity/render-day.png',
    },
    {
      id: 'render-aerial',
      title: 'Aerial View',
      caption: 'Central courtyard, clubhouse & amenity spaces',
      image: '/media/serenity/render-aerial.png',
    },
    {
      id: 'site-plan',
      title: 'Master Layout',
      caption: '150 apartments · clubhouse · play areas · basketball court',
      image: '/media/serenity/site-plan.png',
    },
  ] as const,
  featuredVideo: {
    src: '/media/serenity/videos/serenity-tour.mp4',
    poster: '/media/serenity/hero.jpg',
    title: 'BTR Serenity — Project Walkthrough',
    blurb:
      'Experience serene living — 3 & 4 BHK luxury flats from 1334 to 3068 sft.',
  },
  extraVideos: [] as {
    id: string
    src: string
    poster: string
    label: string
    title: string
    blurb: string
  }[],
}

export const serenityChapters = [
  { id: 'serenity-overview', label: 'Overview' },
  { id: 'serenity-video', label: 'Tour' },
  { id: 'serenity-gallery', label: 'Gallery' },
  { id: 'serenity-plans', label: 'Plans' },
  { id: 'serenity-amenities', label: 'Amenities' },
  { id: 'serenity-specs', label: 'Specs' },
  { id: 'serenity-map', label: 'Location' },
  { id: 'serenity-faq', label: 'FAQ' },
] as const

export type SerenityChapterId = (typeof serenityChapters)[number]['id']

export const serenityHero = {
  badge: 'MAK Projects · Life is Beautiful',
  status: 'Ready to Move-In',
  titleLead: 'BTR —',
  titleAccent: 'Serenity',
  body: 'Experience serene at BTR — 3 & 4 BHK luxury flats from 1334 to 3068 sft on 3 acres of prime land.',
  location: 'Srisailam Highway (NH-765) · Thummalur · Hyderabad',
  rera: 'P02400002599 / P02400001288 / P02400001289',
}

export const serenityMetrics = [
  { value: '150', label: 'Apartments', icon: Building2 },
  { value: '3 Ac', label: 'Prime land', icon: Trees },
  { value: '1334–3068', label: 'SFT range', icon: BedDouble },
  { value: 'OC ✓', label: 'RERA approved', icon: ShieldCheck },
] as const

export const serenityDetails = [
  { label: 'Project Size', value: '3 Acres' },
  { label: 'Project Type', value: 'Residential Apartments' },
  { label: 'Configuration', value: '3 & 4 BHK Luxury Flats' },
  { label: 'Total Units', value: '150' },
  { label: 'Size Range', value: '1334 – 3068 SFT' },
  { label: 'Status', value: 'Ready To Move-In' },
  { label: 'OC Obtained', value: 'Yes' },
  { label: 'RERA ID', value: serenityHero.rera },
] as const

export const serenityOverview = {
  eyebrow: 'A truly redefined way of life',
  title: 'Quiet Splendour at BTR Serenity',
  aboutTitle: 'About the project',
  body: 'MAK Projects presents the prestigious BTR Serenity Apartments — 150 residential units on 3 acres of prime land. Luxurious 3 & 4 BHK flats are nested in landscaped spaces, redefining the concept of living in quiet splendour with world-class amenities thoughtfully planned for families.',
}

export const serenityExperience = [
  'Pleasant life with luxury',
  'Beautiful moments with loved ones',
  'Healthy lifestyle with safe surroundings',
  'Serene, fresh air and green living',
] as const

export type SerenityAmenity = { name: string; icon: LucideIcon }

/** Amenities & facilities — per official BTR Serenity brochure */
export const serenityAmenityGroups = [
  {
    title: 'Amenities',
    items: [
      { name: 'Club House', icon: Landmark },
      { name: 'Yoga Room', icon: Flower2 },
      { name: 'Indoor Games', icon: Gamepad2 },
      { name: 'Library', icon: BookOpen },
      { name: 'Multipurpose Hall', icon: Users },
      { name: 'Air-Conditioned Gym', icon: Dumbbell },
      { name: 'Children Play Area', icon: Trees },
      { name: 'Jogging Track', icon: Trees },
      { name: 'Amphitheater', icon: Users },
      { name: 'Barbeque Zone', icon: Flame },
      { name: 'Car Wash', icon: Car },
      { name: 'Basketball Court', icon: Dumbbell },
    ] satisfies SerenityAmenity[],
  },
  {
    title: 'Facilities',
    items: [
      { name: 'Elevators', icon: Building2 },
      { name: 'Intercom', icon: Phone },
      { name: 'Solar Fencing', icon: Fence },
      { name: 'Tree-Lined Vistas', icon: Trees },
      { name: 'Surveillance Cameras', icon: Camera },
      { name: 'Water Softening Plant', icon: Droplets },
      { name: 'Broadband Connectivity', icon: Wifi },
      { name: 'Power Backup (Common)', icon: Zap },
      { name: 'Sewerage Treatment Plant', icon: Droplets },
      { name: '24/7 Security', icon: ShieldCheck },
    ] satisfies SerenityAmenity[],
  },
] as const

export const serenitySpecifications = [
  {
    title: 'Structure & Finishes',
    items: [
      { label: 'Structure', value: 'RCC framework structure' },
      {
        label: 'Superstructure',
        value: 'External walls 8″ · internal walls 4″ — C.C. blocks / bricks',
      },
      {
        label: 'Flooring',
        value:
          '600×600 mm vitrified with skirting · anti-skid in toilets · glazed ceramic dado up to 7 ft in kitchen',
      },
      {
        label: 'Plastering',
        value:
          'Internal: double coat cement plaster smooth finish · External: sponge finish · texture paint at designated areas',
      },
      {
        label: 'Painting',
        value:
          'Plastic emulsion (NCL Altek / Luppam) internally · waterproof cement paint externally',
      },
      {
        label: 'Waterproofing',
        value: 'Toilets, balconies & terrace with waterproofing compounds',
      },
    ],
  },
  {
    title: 'Doors, Kitchen & Utilities',
    items: [
      {
        label: 'Main doors',
        value: '8 ft teak wood frame & panelled shutter with melamine polish',
      },
      {
        label: 'Internal doors',
        value: '7.6 ft teak / flush doors with polish / paint',
      },
      { label: 'Windows', value: 'UPVC with mosquito mesh' },
      {
        label: 'Kitchen',
        value:
          'Granite platform · steel sink · 2 ft tile dado · CP fittings · exhaust & water purifier points',
      },
      {
        label: 'Sanitary',
        value: 'European commodes & wash basins — reputed CP fittings',
      },
      {
        label: 'Water supply',
        value: 'Borewell for flushing · drinking water provision in kitchens',
      },
    ],
  },
  {
    title: 'Electrical & Security',
    items: [
      {
        label: 'Electrical',
        value: 'Concealed copper wiring · modular switches · points in all rooms',
      },
      {
        label: 'Telecom & TV',
        value: 'Telephone points in bedrooms & living · cable TV provision',
      },
      { label: 'Internet', value: 'Provision for broadband connection' },
      {
        label: 'Power backup',
        value: 'Generator backup for lights & fan points (excluding AC & geysers)',
      },
      {
        label: 'Security',
        value: 'CCTV · intercom · boom barriers at entry',
      },
      {
        label: 'WTP & STP',
        value: 'Water softening plant · sewerage treatment plant of required capacity',
      },
      { label: 'Car wash', value: 'Common car wash provision' },
    ],
  },
] as const

export const serenityConnectivity = [
  '5 mins — Outer Ring Road (Exit 14)',
  '10 mins — Adibatla / Aerospace SEZ',
  '15 mins — Rajiv Gandhi International Airport',
  '30 mins — Gachibowli & Financial District',
] as const

export const serenityMap = {
  embed:
    'https://maps.google.com/maps?q=Thummalur%20Maheswaram%20Srisailam%20Highway%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed',
  link: 'https://maps.google.com/?q=Thummalur+Maheswaram+Srisailam+Highway+Hyderabad',
  line: 'Srisailam Highway (NH-765) · Near ORR Exit 14 · Thummalur, Hyderabad',
}
