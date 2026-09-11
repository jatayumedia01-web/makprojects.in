import type { LucideIcon } from 'lucide-react'
import { Award, Landmark, ShieldCheck, Star, Trophy } from 'lucide-react'

export type AwardGalleryItem = {
  id: string
  src: string
  alt: string
  title: string
  caption: string
  year?: string
}

export type AwardItem = {
  id: string
  year: string
  title: string
  body: string
  category: 'National' | 'Regional'
  icon: LucideIcon
  image?: string
  imageFit?: 'cover' | 'contain'
  featured?: boolean
}

export const awardsPage = {
  hero: {
    eyebrow: 'Recognition & Excellence',
    title: 'Awards & Achievements',
    subtitle:
      'Two decades of trusted delivery in Hyderabad real estate - from national leadership honours to RERA-approved communities families are proud to call home.',
    image: '/media/awards/emerging-india-award-presentation.jpg',
  },
  intro: {
    eyebrow: 'Built on Trust',
    title: 'Excellence recognised at every level',
    body:
      'MAK Projects carries forward a legacy of hospitality, construction quality, and master-planned development. Our awards reflect leadership depth, regulatory compliance, and the confidence of hundreds of families across South Hyderabad.',
  },
  stats: [
    { value: '20+', label: 'Years of excellence' },
    { value: '2026', label: 'ET Excellence Telangana Award' },
    { value: '650+', label: 'Families at MAK - BTR' },
    { value: '260+', label: 'Acres delivered' },
  ],
  featuredAwards: [
    {
      year: '2007',
      title: 'CNBC-TV-18 Emerging India Award',
      honourLabel: 'Flagship honour',
      sourceLabel: 'CNBC-TV-18',
      presenter: 'Hon’ble Prime Minister of India, Dr. Manmohan Singh',
      recipient: 'Mr. Murali Krishna Reddy',
      role: 'Chairman of the Group · MAK Projects Private Limited',
      body:
        'Mr. Murali Krishna Reddy, Chairman of the Group, is a recipient of the coveted CNBC-TV-18 “Emerging India Award – 2007” from the Hon’ble Prime Minister of India, Dr. Manmohan Singh — a national honour recognising enterprise leadership through the award-winning Green Park Group of Hotels and a distinguished legacy in infrastructure and hospitality.',
      images: [
        {
          src: '/media/awards/emerging-india-award-presentation.jpg',
          alt: 'Mr. Murali Krishna Reddy receiving the CNBC-TV-18 Emerging India Award from Dr. Manmohan Singh',
          caption: 'Award presentation · 2007',
        },
        {
          src: '/media/awards/emerging-india-award-stage.jpg',
          alt: 'CNBC-TV-18 Emerging India Award ceremony on stage',
          caption: 'CNBC-TV-18 · Emerging India Award',
        },
      ],
    },
    {
      year: '2026',
      title: 'Economic Times Excellence Telangana 2026',
      honourLabel: 'Latest honour',
      sourceLabel: 'The Economic Times',
      presenter: 'The Economic Times · Excellence Telangana 2026',
      recipient: 'MAK Projects Private Limited',
      role: 'Excellence in Luxury Villa Residential Development',
      body:
        'We are honoured to receive the Economic Times Excellence Telangana 2026 Award for Excellence in Luxury Villa Residential Development. This prestigious recognition reflects the trust and confidence of our valued customers, as well as the unwavering commitment and dedication of the entire MAK Projects team. It further strengthens our resolve to continue our mission of creating world-class luxury communities, guided by our vision of “Clean, Green, Healthy Living.”',
      images: [
        {
          src: '/media/awards/et-excellence-telangana-2026.jpg',
          alt: 'MAK Projects receiving the Economic Times Excellence Telangana 2026 Award for Luxury Villa Residential Development',
          caption: 'ET Excellence Telangana · 2026',
        },
      ],
    },
  ],
  gallery: {
    eyebrow: 'Award Gallery',
    title: 'Moments of recognition',
    body:
      'From national leadership honours and industry accolades to Telangana’s finest — a visual journey through MAK Projects’ legacy of excellence.',
    items: [
      {
        id: 'et-2026',
        src: '/media/awards/gallery/et-excellence-ceremony-2026.jpg',
        alt: 'MAK Projects receiving the Economic Times Excellence Telangana 2026 Award',
        title: 'Economic Times Excellence Telangana 2026',
        caption: 'Excellence in Luxury Villa Residential Development',
        year: '2026',
      },
      {
        id: 'cnbc-stage',
        src: '/media/awards/gallery/cnbc-emerging-india-stage.jpg',
        alt: 'CNBC-TV-18 Emerging India Award ceremony on stage',
        title: 'CNBC-TV-18 Emerging India Award',
        caption: 'National honour presented on stage · 2007',
        year: '2007',
      },
      {
        id: 'cnbc-presentation',
        src: '/media/awards/gallery/cnbc-emerging-india-presentation.jpg',
        alt: 'Mr. Murali Krishna Reddy receiving award from Dr. Manmohan Singh',
        title: 'Award from the Prime Minister',
        caption: 'Mr. Murali Krishna Reddy · Dr. Manmohan Singh',
        year: '2007',
      },
      {
        id: 'chairman-moment',
        src: '/media/awards/gallery/chairman-award-moment.jpg',
        alt: 'Chairman receiving the Emerging India Award',
        title: 'Chairman’s award moment',
        caption: 'Emerging India Award presentation · 2007',
        year: '2007',
      },
      {
        id: 'times-business-2018',
        src: '/media/awards/gallery/awards-ceremony-01.jpg',
        alt: 'Times Business Awards Hyderabad 2018 presentation',
        title: 'Times Business Awards Hyderabad',
        caption: 'Hyderabad business excellence recognition',
        year: '2018',
      },
      {
        id: 'indywood-2018',
        src: '/media/awards/gallery/awards-event-01.jpg',
        alt: 'Indywood Excellence Awards 2018 certificate presentation',
        title: 'Indywood Excellence Awards 2018',
        caption: 'Certificate of Excellence · Indywood',
        year: '2018',
      },
      {
        id: 'greatest-leader',
        src: '/media/awards/gallery/leadership-recognition.jpg',
        alt: 'Greatest Leader award presentation',
        title: 'Greatest Leader Award',
        caption: 'Leadership recognition at international forum',
      },
      {
        id: 'best-brand-2018',
        src: '/media/awards/gallery/best-brand-year-2018.jpg',
        alt: 'Best Brand of the Year India 2018 award',
        title: 'Best Brand of the Year · India',
        caption: 'Consumer & industry validated · 2018',
        year: '2018',
      },
      {
        id: 'corporate-awards-2018',
        src: '/media/awards/gallery/awards-ceremony-02.jpg',
        alt: 'Corporate awards ceremony with certificate and trophy',
        title: 'Corporate Excellence Awards',
        caption: 'Industry recognition ceremony · 2018',
        year: '2018',
      },
    ] satisfies AwardGalleryItem[],
  },
  pillars: [
    {
      icon: Trophy,
      title: 'National honours',
      body: 'Leadership recognised at the highest levels of Indian enterprise.',
    },
    {
      icon: ShieldCheck,
      title: 'Regulatory compliance',
      body: 'RERA-registered projects with transparent approvals and delivery.',
    },
    {
      icon: Landmark,
      title: 'Master-planned scale',
      body: '260+ acres of integrated community development on Srisailam Highway.',
    },
    {
      icon: Star,
      title: 'Resident confidence',
      body: '650+ families living across apartments, villas, and villa plots.',
    },
  ],
  awards: [
    {
      id: 'emerging-india',
      year: '2007',
      title: 'CNBC-TV-18 Emerging India Award',
      body: 'Mr. Murali Krishna Reddy, Chairman of the Group, received the coveted CNBC-TV-18 “Emerging India Award – 2007” from the Hon’ble Prime Minister of India, Dr. Manmohan Singh.',
      category: 'National',
      icon: Trophy,
      image: '/media/awards/emerging-india-award-presentation.jpg',
      featured: true,
    },
    {
      id: 'et-excellence-telangana',
      year: '2026',
      title: 'Economic Times Excellence Telangana 2026',
      body:
        'We are honoured to receive the Economic Times Excellence Telangana 2026 Award for Excellence in Luxury Villa Residential Development. This prestigious recognition reflects the trust and confidence of our valued customers, as well as the unwavering commitment and dedication of the entire MAK Projects team. It further strengthens our resolve to continue our mission of creating world-class luxury communities, guided by our vision of “Clean, Green, Healthy Living.”',
      category: 'Regional',
      icon: Award,
      image: '/media/awards/et-excellence-telangana-2026.jpg',
      featured: true,
    },
  ] satisfies AwardItem[],
  cta: {
    eyebrow: 'Experience the Legacy',
    title: 'See the communities behind our recognition',
    body: 'Visit MAK - BTR or explore our latest launch - Fern by MAK Projects at Tukkuguda.',
  },
} as const

export const awardCategoryTone: Record<
  AwardItem['category'],
  { label: string; className: string }
> = {
  National: {
    label: 'National',
    className: 'border-gold/35 bg-gold/10 text-gold',
  },
  Regional: {
    label: 'Regional',
    className: 'border-gold/25 bg-[#fdf6ea] text-[#8a6b2e]',
  },
}
