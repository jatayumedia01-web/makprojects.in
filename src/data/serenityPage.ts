import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpDown,
  Baby,
  BedDouble,
  BookOpen,
  Building2,
  Camera,
  Car,
  CircleDot,
  Dumbbell,
  Droplets,
  Fence,
  Flame,
  Flower2,
  Footprints,
  Gamepad2,
  Landmark,
  Mic2,
  Phone,
  Recycle,
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

/** Primary Serenity elevation - user-provided official render */
export const serenityBrandImage = '/media/serenity/elevation.jpg'
export const serenityAerialImage = '/media/serenity/render-aerial.jpg'
export const serenityCardImage = serenityBrandImage

/** Gallery item - brochure PNGs use contain; photo renders use cover */
export type SerenityGalleryItem = {
  id: string
  title: string
  caption: string
  image: string
  fit?: 'contain' | 'cover'
}

/** Media from official BTR Serenity brochure + project renders */
export const serenityMedia = {
  hero: serenityBrandImage,
  gallery: [
    {
      id: 'render-day',
      title: 'Elevation',
      caption: 'BTR Serenity - day view with landscaped greens',
      image: serenityBrandImage,
      fit: 'contain',
    },
    {
      id: 'render-aerial',
      title: 'Aerial View',
      caption: 'Central courtyard, clubhouse & amenity spaces',
      image: '/media/serenity/render-aerial.jpg',
      fit: 'contain',
    },
    {
      id: 'site-plan',
      title: 'Master Layout',
      caption: '150 apartments · clubhouse · play areas · basketball court',
      image: '/media/serenity/site-plan.jpg',
      fit: 'contain',
    },
    {
      id: 'render-clubhouse',
      title: 'Clubhouse',
      caption: 'Glass pyramid skylight · landscaped arrival court',
      image: '/media/serenity/gallery/render-1.jpg',
      fit: 'cover',
    },
    {
      id: 'render-playground',
      title: 'Children Play Area',
      caption: 'Sand pit · slides · seesaw & merry-go-round',
      image: '/media/serenity/gallery/render-2.jpg',
      fit: 'cover',
    },
    {
      id: 'render-pergola',
      title: 'Outdoor Seating',
      caption: 'Shaded pergola with lounge seating by the lawn',
      image: '/media/serenity/gallery/render-3.jpg',
      fit: 'cover',
    },
    {
      id: 'render-playground-aerial',
      title: 'Play Area Overview',
      caption: 'Community playground surrounded by greenery',
      image: '/media/serenity/gallery/render-4.jpg',
      fit: 'cover',
    },
    {
      id: 'render-basketball',
      title: 'Basketball Court',
      caption: 'Half-court with professional markings & hoop',
      image: '/media/serenity/gallery/render-5.jpg',
      fit: 'cover',
    },
    {
      id: 'render-courtyard',
      title: 'Central Lawn',
      caption: 'Landscaped courtyard with pergola seating & bougainvillea',
      image: '/media/serenity/gallery/render-6.jpg',
      fit: 'cover',
    },
  ] satisfies readonly SerenityGalleryItem[],
  featuredVideo: {
    src: '/media/serenity/videos/serenity-tour.mp4',
    poster: serenityBrandImage,
    title: 'BTR Serenity - Project Walkthrough',
    blurb:
      'Experience serene living - 3 & 4 BHK luxury flats from 1334 to 3068 sft.',
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
  { id: 'serenity-map', label: 'Location' },
  { id: 'serenity-faq', label: 'FAQ' },
] as const

export type SerenityChapterId = (typeof serenityChapters)[number]['id']

export const serenityHero = {
  badge: 'MAK Projects · Life is Beautiful',
  status: 'Ready to Move-In',
  titleLead: 'BTR -',
  titleAccent: 'Serenity',
  body: 'Experience serene at BTR - 3 & 4 BHK luxury flats from 1334 to 3068 sft on 3 acres of prime land.',
  location: 'Srisailam Highway (NH-765) · Thummalur · Hyderabad',
  rera: 'P02400002599',
}

export const serenityMetrics = [
  { value: '150', label: 'Apartments', icon: Building2 },
  { value: '3 Ac', label: 'Prime land', icon: Trees },
  { value: '1334-3068', label: 'SFT range', icon: BedDouble },
  { value: 'OC ✓', label: 'RERA approved', icon: ShieldCheck },
] as const

export const serenityDetails = [
  { label: 'Project Size', value: '3 Acres' },
  { label: 'Project Type', value: 'Residential Apartments' },
  { label: 'Configuration', value: '3 & 4 BHK Luxury Flats' },
  { label: 'Total Units', value: '150' },
  { label: 'Size Range', value: '1334 - 3068 SFT' },
  { label: 'Status', value: 'Ready To Move-In' },
  { label: 'OC Obtained', value: 'Yes' },
  { label: 'RERA ID', value: serenityHero.rera },
] as const

export const serenityOverview = {
  eyebrow: 'A truly redefined way of life',
  title: 'Quiet Splendour at BTR Serenity',
  aboutTitle: 'About the project',
  body: 'MAK Projects presents the prestigious BTR Serenity Apartments - 150 residential units on 3 acres of prime land. Luxurious 3 & 4 BHK flats are nested in landscaped spaces, redefining the concept of living in quiet splendour with world-class amenities thoughtfully planned for families.',
}

export const serenityExperience = [
  'Pleasant life with luxury',
  'Beautiful moments with loved ones',
  'Healthy lifestyle with safe surroundings',
  'Serene, fresh air and green living',
] as const

export type SerenityAmenity = { name: string; icon: LucideIcon }

/** Amenities & facilities - per official BTR Serenity brochure */
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
      { name: 'Children Play Area', icon: Baby },
      { name: 'Jogging Track', icon: Footprints },
      { name: 'Amphitheater', icon: Mic2 },
      { name: 'Barbeque Zone', icon: Flame },
      { name: 'Car Wash', icon: Car },
      { name: 'Basketball Court', icon: CircleDot },
    ] satisfies SerenityAmenity[],
  },
  {
    title: 'Facilities',
    items: [
      { name: 'Elevators', icon: ArrowUpDown },
      { name: 'Intercom', icon: Phone },
      { name: 'Solar Fencing', icon: Fence },
      { name: 'Tree-Lined Vistas', icon: Trees },
      { name: 'Surveillance Cameras', icon: Camera },
      { name: 'Water Softening Plant', icon: Droplets },
      { name: 'Broadband Connectivity', icon: Wifi },
      { name: 'Power Backup (Common)', icon: Zap },
      { name: 'Sewerage Treatment Plant', icon: Recycle },
      { name: '24/7 Security', icon: ShieldCheck },
    ] satisfies SerenityAmenity[],
  },
] as const

export const serenityConnectivity = [
  '5 mins - Outer Ring Road (Exit 14)',
  '10 mins - Adibatla / Aerospace SEZ',
  '15 mins - Rajiv Gandhi International Airport',
  '30 mins - Gachibowli & Financial District',
] as const

export const serenityMap = {
  embed:
    'https://maps.google.com/maps?q=Thummalur%20Maheswaram%20Srisailam%20Highway%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed',
  link: 'https://maps.google.com/?q=Thummalur+Maheswaram+Srisailam+Highway+Hyderabad',
  line: 'Srisailam Highway (NH-765) · Near ORR Exit 14 · Thummalur, Hyderabad',
}
