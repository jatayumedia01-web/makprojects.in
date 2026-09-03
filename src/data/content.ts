import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookMarked,
  BookOpen,
  Building,
  Building2,
  Cpu,
  Factory,
  FerrisWheel,
  Globe,
  GraduationCap,
  HeartPulse,
  Hospital,
  Landmark,
  Languages,
  Library,
  Plane,
  Route,
  School,
  Sprout,
  Stethoscope,
  TrendingUp,
  Warehouse,
} from 'lucide-react'
import { serenityCardImage } from './serenityPage'

export type HighlightItem = { label: string; icon: LucideIcon }

export const contact = {
  email: 'info@makprojects.com',
  web: 'www.makprojects.com',
  corporate:
    'Park Citi Plaza, 4th Floor, Road No.1, Banjara Hills, Hyderabad – 500034',
  project:
    'BTR Township – 26th Milestone on Srisailam Highway, Thummalur (V), Maheswaram (M), Ranga Reddy (D) – 501359',
  hours: 'Mon–Sat 09:00–18:00 · Sunday Holiday',
  responseNote: 'Our team typically responds within one business day.',
}

export const contactProjectOptions = [
  { value: 'general', label: 'General enquiry' },
  { value: 'serenity', label: 'BTR Serenity — 3 & 4 BHK Apartments' },
  { value: 'gardenia', label: 'BTR Gardenia — Villa Plots' },
  { value: 'villas', label: 'BTR Villas' },
  { value: 'township', label: 'MAK — BTR Township' },
  { value: 'canadian-wood', label: 'Canadian Wood Villa' },
  { value: 'fern', label: 'Fern by MAK — Tukkuguda Villas' },
  { value: 'site-visit', label: 'Schedule a site visit' },
] as const

export const contactLocations = {
  corporate: {
    id: 'corporate',
    label: 'Corporate Office',
    tabShort: 'Corporate',
    subtitle: 'Banjarah Hills · Hyderabad',
    address: 'MAK Projects Private Limited\nPark Citi Plaza, 4th Floor\nRoad No.1, Banjara Hills\nHyderabad – 500034',
    mapEmbed:
      'https://maps.google.com/maps?q=Park%20Citi%20Plaza%20Banjara%20Hills%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=Park+Citi+Plaza+Banjara+Hills+Hyderabad',
  },
  township: {
    id: 'township',
    label: 'MAK — BTR Township',
    tabShort: 'BTR Township',
    subtitle: 'BTR Township · Srisailam Highway',
    address:
      'MAK — BTR Township\n26th Milestone on Srisailam Highway\nThummalur (V), Maheswaram (M)\nRanga Reddy (D) – 501359',
    mapEmbed:
      'https://maps.google.com/maps?q=MAK+BTR+Township+Srisailam+Highway+Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=MAK+BTR+Township+Srisailam+Highway+Hyderabad',
  },
  fern: {
    id: 'fern',
    label: 'Fern by MAK Projects',
    tabShort: 'Fern',
    subtitle: 'Tukkuguda · Srisailam Highway',
    address:
      'Fern by MAK Projects\nSurvey Nos. 438 & 439, Srisailam Highway\nMalikdanguda, Maheswaram (M)\nRanga Reddy (D) – 501359',
    mapEmbed:
      'https://maps.google.com/maps?q=MAK+Fern+Malikdanguda+Tukkuguda+Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=MAK+Fern+Malikdanguda+Tukkuguda+Hyderabad',
  },
} as const

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'BTR Township', to: '/btr-township' },
  { label: 'Amenities', to: '/amenities' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** MAK — BTR Township (master development) */
export const btrTownship = {
  name: 'MAK — BTR Township',
  tagline: "Telangana’s pioneer integrated luxury township",
  location: 'South Hyderabad · 26th Milestone, Srisailam Highway',
  status: 'Completed',
  summary: [
    'We delivered MAK — BTR Township, Telangana’s pioneer integrated luxury township project located in South Hyderabad. Spanning over 260+ acres of land, this master-planned development has been successfully completed by MAK Projects Private Limited while upholding international quality standards.',
    'Today, it stands as a vibrant community home to over 650+ families. The township features wide 40, 50, and 60-feet internal roads, offering smooth connectivity across 333 luxury villas, 150 3 & 4 BHK apartment units with a clubhouse, and exclusive villa plots.',
    'The entire community spreads over 1,450+ units in MAK — BTR Township, with easy access to public transport facilities.',
  ],
  connectivity: [
    'ORR Exit 14',
    'RGI Airport',
    'Financial District',
    'Educational institutions',
    'Healthcare hubs',
    '& more',
  ],
  stats: [
    { value: '260+', label: 'Acres of land' },
    { value: '650+', label: 'Families living here' },
    { value: '1,450+', label: 'Units across township' },
    { value: '150', label: '3 & 4 BHK · Ready to move in' },
    { value: '80+', label: 'World-class amenities' },
  ],
  inventory: [
    {
      id: 'villas',
      label: 'Luxury villas',
      value: '333',
      detail: 'Completed residences',
    },
    {
      id: 'apartments',
      label: 'Apartments',
      value: '150',
      detail: '3 & 4 BHK flats, ready to move in',
    },
    {
      id: 'plots',
      label: 'Exclusive villa plots',
      value: 'Gardenia',
      detail: '& more plotted options',
    },
    {
      id: 'roads',
      label: 'Internal roads',
      value: '40 / 50 / 60',
      detail: 'Wide road connectivity',
    },
  ],
  featureGroups: [
    {
      id: 'community',
      title: 'Community & Layout',
      items: [
        'Vibrant neighborhood of 650+ families',
        'Wide 40 / 50 / 60 ft internal roads',
        'Triangle Park & children’s parks',
        'Scenic tree-lined vistas',
      ],
    },
    {
      id: 'sports',
      title: 'Sports & Recreation',
      items: [
        '14+ acre 10-hole golf course',
        'Cricket ground',
        'Pickleball, volleyball & badminton courts',
        'Multipurpose court & jogging track',
      ],
    },
    {
      id: 'lifestyle',
      title: 'Leisure & Lifestyle',
      items: [
        '2 clubhouses',
        '2 swimming pools',
        'Fully-equipped gym & yoga studio',
        'Multi-cuisine restaurant & amphitheatre',
      ],
    },
    {
      id: 'safety',
      title: 'Safety & Convenience',
      items: [
        '24/7 security with solar fencing',
        'On-site ambulance',
        'ATM',
        'Water softening plant & STP',
        'EV charging — provision for modern mobility',
      ],
    },
  ],
} as const

/** BTR Township — nearby project highlights (connectivity, healthcare, schools & more) */
export const btrProjectHighlights = {
  title: 'Project Highlights',
  subtitle:
    'Schools, healthcare, workplaces and transit — minutes from MAK — BTR Township',
  categories: [
    {
      id: 'connectivity',
      title: 'Connectivity',
      items: [
        { label: 'Just 12 mins from ORR (Exit 14)', icon: Route },
        { label: 'Just 20 mins drive to RGIA', icon: Plane },
        {
          label: 'Just 40 mins drive to Gachibowli & Financial District',
          icon: Landmark,
        },
      ],
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      items: [
        { label: 'Kondeti Super Speciality Hospital', icon: Hospital },
        { label: 'Madhavanji Super Speciality Hospital', icon: Stethoscope },
        { label: 'Prime Care Hospital', icon: HeartPulse },
      ],
    },
    {
      id: 'education',
      title: 'Educational Institutions',
      items: [
        { label: 'Delhi Public School, Aero City', icon: School },
        { label: 'The Aga Khan Academy', icon: GraduationCap },
        { label: 'Manchester Global School', icon: Globe },
        { label: 'Amity University Hyderabad', icon: Building2 },
        { label: 'GMR Chinmaya Vidyalaya', icon: BookOpen },
        { label: 'Rockwell International School', icon: Library },
        { label: 'Sanctus World School', icon: BookMarked },
        { label: 'Sloka International School', icon: Languages },
        { label: 'Bhashyam Blooms', icon: Sprout },
        { label: 'Sri Sri Academy', icon: Award },
      ],
    },
    {
      id: 'business',
      title: 'Business & IT Corridors',
      items: [
        { label: 'GMR Business Park', icon: Building },
        {
          label: 'Adibatla Aerospace & SEZ cluster — ~10 mins',
          icon: Plane,
        },
        { label: 'TCS · Wipro · Amazon warehouses', icon: Warehouse },
        { label: 'Fab City · Electronic City corridor', icon: Cpu },
        { label: 'GMR Aero Technic · Adani Aerospace', icon: Plane },
        { label: 'Foxconn · DRDO RCI · Malabar Gold campus', icon: Factory },
      ],
    },
    {
      id: 'leisure',
      title: 'Leisure & Landmarks',
      items: [
        { label: 'Wonderla Amusement Park', icon: FerrisWheel },
        { label: 'World Trade Center', icon: Landmark },
        { label: 'Tata Sikorsky · GMR Health Port', icon: Plane },
        {
          label: 'Knowledge City & Adibatla growth corridor',
          icon: TrendingUp,
        },
      ],
    },
  ],
} as const

/** @deprecated Use btrProjectHighlights — kept for legacy imports */
export const nearby = {
  schools: btrProjectHighlights.categories
    .find((c) => c.id === 'education')!
    .items.map((item) => item.label),
  locations: [
    ...btrProjectHighlights.categories
      .find((c) => c.id === 'connectivity')!
      .items.map((item) => item.label),
    ...btrProjectHighlights.categories
      .find((c) => c.id === 'business')!
      .items.slice(0, 3)
      .map((item) => item.label),
  ],
}

/** BTR Township — MAK — BTR Club showcase */
export const btrClubhouse = {
  eyebrow: 'Lifestyle · MAK — BTR Township',
  title: 'MAK — BTR Club',
  subtitle: 'The signature clubhouse for wellness, leisure, and community living.',
  body: 'MAK — BTR Club is the heart of leisure at MAK — BTR Township — resort-style pool, gym, yoga, multipurpose halls, spa, mini theatre, and landscaped social spaces. Membership opens lifetime access to curated amenities for families across the township.',
  video: '/media/clubhouse/club-house.mp4',
  poster: '/media/clubhouse/btr-club-exterior-pool.jpg',
  videoCaption: 'Walkthrough of MAK — BTR Club — pool, elevation, and lifestyle spaces.',
  highlights: [
    'Swimming Pool',
    'Fully-equipped Gym',
    'Yoga Room',
    'Multipurpose Hall',
    'Library',
    'Indoor Games',
    'Spa & Mini Theatre',
    'Landscaped Lounges',
  ],
  images: [
    {
      id: 'exterior-pool',
      title: 'Club Exterior & Pool',
      caption: 'Resort-style pool with grand clubhouse elevation',
      image: '/media/clubhouse/btr-club-exterior-pool.jpg',
      featured: true,
    },
    {
      id: 'pool-deck',
      title: 'Pool Deck & Cabanas',
      caption: 'Landscaped pool with shaded lounge pavilions',
      image: '/media/clubhouse/btr-club-pool-deck.jpg',
    },
    {
      id: 'entrance-dusk',
      title: 'Club Entrance',
      caption: 'Illuminated porte-cochère at dusk',
      image: '/media/clubhouse/btr-club-entrance-dusk.jpg',
    },
    {
      id: 'gym',
      title: 'Fitness Centre',
      caption: 'Fully-equipped gym with cardio & strength zones',
      image: '/media/clubhouse/btr-club-gym.jpg',
    },
    {
      id: 'lounge',
      title: 'Landscaped Lounge',
      caption: 'Open-air lounge with garden views',
      image: '/media/clubhouse/btr-club-lounge.jpg',
    },
  ],
} as const

export type BtrClubhouseImage = (typeof btrClubhouse.images)[number]

/** BTR Township — Club Pavilion (second clubhouse) */
export const btrClubPavilion = {
  eyebrow: 'Second Clubhouse · MAK — BTR Township',
  title: 'Club Pavilion',
  subtitle:
    'A refined community pavilion with grand reception, glass atrium entrance, and landscaped forecourt.',
  body:
    'Club Pavilion complements the signature MAK — BTR Club — offering an elegant venue for community gatherings, wellness programmes, and everyday leisure. The pavilion features a welcoming reception lounge, a marble-lined grand entrance, and a contemporary elevation framed by manicured greens.',
  highlights: [
    'Grand Reception Lounge',
    'Glass Atrium Entrance',
    'Multipurpose Community Halls',
    'Landscaped Forecourt',
    'Premium Interior Finishes',
    'Event-Ready Spaces',
  ],
  images: [
    {
      id: 'exterior',
      title: 'Pavilion Exterior',
      caption: 'Contemporary elevation with landscaped forecourt',
      image: '/media/club-pavilion/club-pavilion-exterior.jpg',
      featured: true,
    },
    {
      id: 'grand-entrance',
      title: 'Grand Entrance',
      caption: 'Marble-lined atrium with floor-to-ceiling glass',
      image: '/media/club-pavilion/club-pavilion-grand-entrance.jpg',
    },
    {
      id: 'reception-lobby',
      title: 'Reception & Lounge',
      caption: 'Wood-slatted lobby with reception and lounge seating',
      image: '/media/club-pavilion/club-pavilion-reception-lobby.jpg',
    },
  ],
} as const

export type BtrClubPavilionImage =
  (typeof btrClubPavilion.images)[number]

/** Lifestyle pillars — club, sports, security highlights */
export const lifestylePillars = {
  eyebrow: 'Experience',
  title: 'Lifestyle Pillars',
  pillars: [
    {
      id: 'club',
      title: 'Club & Leisure',
      body: 'Dual clubhouses, pool, yoga and social spaces designed for everyday joy.',
      image: '/media/club-pavilion/club-pavilion-exterior.jpg',
      alt: 'Club Pavilion at MAK — BTR Township',
    },
    {
      id: 'sports',
      title: 'Sports & Golf',
      body: '10-hole golf, cricket, basketball, gym and jogging tracks for active living.',
      image: '/media/township-amenities/golf-course.jpg',
      alt: '10-hole golf course at BTR Township',
    },
    {
      id: 'security',
      title: 'Secure Living',
      body: '24/7 security, solar fencing and emergency support across the township.',
      image: '/media/township-amenities/btr-greens-entrance.jpg',
      alt: 'Gated entrance at BTR Greens',
    },
  ],
} as const

/** BTR Township — amenities image gallery (drop images in public/media/township-amenities/) */
export const btrAmenitiesGallery = {
  eyebrow: 'Visual Tour · MAK — BTR Township',
  title: 'Amenities & Lifestyle Gallery',
  subtitle:
    'Cricket, golf, club, wide roads, parks, and everyday leisure — explore life across the township.',
  categories: [
    { id: 'all', label: 'All' },
    { id: 'golf', label: 'Golf' },
    { id: 'sports', label: 'Sports' },
    { id: 'club', label: 'Club & Pool' },
    { id: 'roads', label: 'Roads' },
    { id: 'parks', label: 'Parks & Greens' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ],
  items: [
    {
      id: 'golf-course',
      category: 'golf',
      title: '10-Hole Golf Course',
      caption: '14+ acres of golf within the township',
      image: '/media/township-amenities/golf-course.jpg',
      featured: true,
    },
    {
      id: 'cricket-ground',
      category: 'sports',
      title: 'Cricket Ground',
      caption: 'Community sports on open greens',
      image: '/media/township-amenities/cricket-ground.jpg',
      featured: true,
    },
    {
      id: 'basketball-court',
      category: 'sports',
      title: 'Basketball Court',
      caption: 'Outdoor courts with cricket nets nearby',
      image: '/media/township-amenities/basketball-court.jpg',
    },
    {
      id: 'club-exterior',
      category: 'club',
      title: 'MAK — BTR Club',
      caption: 'Grand clubhouse elevation',
      image: '/media/clubhouse/btr-club.jpg',
      featured: true,
    },
    {
      id: 'clubhouse-pool',
      category: 'club',
      title: 'Clubhouse & Pool Deck',
      caption: 'Resort-style pool with landscaped deck',
      image: '/media/township-amenities/clubhouse-pool-deck.jpg',
    },
    {
      id: 'internal-roads',
      category: 'roads',
      title: 'Internal Roads',
      caption: 'Wide 40 / 50 / 60 ft connectivity',
      image: '/media/township-amenities/internal-roads.jpg',
    },
    {
      id: 'parks-playground',
      category: 'parks',
      title: 'Parks & Playground',
      caption: 'Children’s play areas, gazebo & open lawns',
      image: '/media/township-amenities/parks-playground.jpg',
    },
    {
      id: 'indoor-badminton',
      category: 'lifestyle',
      title: 'Indoor Badminton Courts',
      caption: 'Air-conditioned indoor sports hall',
      image: '/media/township-amenities/indoor-badminton-courts.jpg',
    },
    {
      id: 'morning-walk',
      category: 'lifestyle',
      title: 'Tree-Lined Morning Walk',
      caption: 'Misty dawn along internal roads & greens',
      image: '/media/township-amenities/tree-lined-morning-walk.jpg',
    },
    {
      id: 'landscaped-roads',
      category: 'parks',
      title: 'Landscaped Internal Roads',
      caption: 'Palm trees, hedges & flowering greens',
      image: '/media/township-amenities/landscaped-internal-roads.jpg',
    },
    {
      id: 'btr-greens-entrance',
      category: 'roads',
      title: 'BTR Greens Entrance',
      caption: 'MAK Projects — master-planned township gateway',
      image: '/media/township-amenities/btr-greens-entrance.jpg',
      featured: true,
    },
  ],
} as const

export type BtrAmenityGalleryCategory =
  (typeof btrAmenitiesGallery.categories)[number]['id']

export type BtrAmenityGalleryItem =
  (typeof btrAmenitiesGallery.items)[number]

export const projects = [
  {
    slug: 'fern',
    title: 'Fern by MAK Projects',
    subtitle: '4BHK + Home Theatre Villas · Tukkuguda',
    size: '15 acres · 109 villas · Club Fernessa 30,000 Sft',
    status: 'New Launch',
    possession: 'TUKKUGUDA · NEAR ORR',
    location: 'TUKKUGUDA / MALIKDANGUDA – HYDERABAD',
    image: '/media/fern/hero.jpg',
    href: '/fern/',
    rera: 'P02400010645',
  },
  {
    slug: 'serenity',
    title: 'BTR – Serenity',
    subtitle: '3 & 4 BHK ready-to-move apartments',
    size: '3 acres · 150 apartments',
    status: 'Ready to Move-In',
    possession: 'PART OF BTR TOWNSHIP',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image: serenityCardImage,
    href: '/btr-serenity',
    rera: 'P02400002599',
  },
  {
    slug: 'township',
    title: 'MAK – BTR Township',
    subtitle: 'Serenity · Gardenia · Villas · Canadian Wood',
    size: '260+ acres · 1,450+ units · 80+ amenities',
    status: 'Completed',
    possession: 'INTEGRATED TOWNSHIP',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image: '/media/gardenia/hero.jpg',
    href: '/btr-township',
    rera: 'P02400002599 / P02400001288 / P02400001289',
  },
]

export const whyUs = [
  {
    title: 'Years of Dedication',
    body: 'Our long-standing presence is a testament to delivering projects that stand the test of time.',
  },
  {
    title: 'Workmanship Quality',
    body: 'At MAK Projects, quality isn’t just a goal — it’s a tradition upheld in every detail of craftsmanship.',
  },
  {
    title: 'Quality Assurance',
    body: 'Rigorous quality control is the cornerstone of our promise to exceed expectations.',
  },
]

export const amenities = [
  'Club House',
  'Swimming Pool',
  '10-Hole Golf Course',
  'Gym',
  'Yoga Room',
  'Jogging Track',
  'Cricket Ground',
  'Basketball Court',
  'EV Charging',
  '24/7 Security',
  'Solar Fencing',
  'STP & Water Softening',
  'ATM',
  'Ambulance',
  'Tree-lined Vistas',
  'Power Backup',
]

export const floorPlans = {
  bhk3: [
    {
      size: 1334,
      beds: 3,
      baths: 3,
      uds: 77,
      image: '/media/serenity/plans/3bhk-1334.svg',
    },
    {
      size: 1448,
      beds: 3,
      baths: 3,
      uds: 84,
      image: '/media/serenity/plans/3bhk-1448.svg',
    },
    {
      size: 1558,
      beds: 3,
      baths: 3,
      uds: 90,
      image: '/media/serenity/plans/3bhk-1558.svg',
    },
    {
      size: 1788,
      beds: 3,
      baths: 3,
      uds: 103,
      image: '/media/serenity/plans/3bhk-1788.svg',
    },
  ],
  bhk4: [
    {
      size: 2434,
      beds: 4,
      baths: 4,
      uds: 140,
      image: '/media/serenity/plans/4bhk-2434.svg',
    },
    {
      size: 2482,
      beds: 4,
      baths: 4,
      uds: 143,
      image: '/media/serenity/plans/4bhk-2482.svg',
    },
    {
      size: 2767,
      beds: 4,
      baths: 4,
      uds: 160,
      image: '/media/serenity/plans/4bhk-2767.svg',
    },
    {
      size: 3068,
      beds: 4,
      baths: 4,
      uds: 177,
      image: '/media/serenity/plans/4bhk-3068.svg',
    },
  ],
}

export const leaders = [
  {
    name: 'Mr. A. Murali Krishna Reddy',
    role: 'Chairman',
    years: '45+ years',
    image: '/media/management/murali-krishna-hq.jpg',
    bio: [
      'Mr. A. Murali Krishna Reddy’s impressive background showcases his extensive expertise and achievements in both infrastructure projects and hospitality management. With a postgraduate degree in Business Management and over 45+ years of experience, he brings a wealth of knowledge and leadership to his roles.',
      'His tenure as the Promoter and Managing Director of the award-winning Green Park Group of Hotels highlights his ability to successfully build and operate star hotels, demonstrating a keen understanding of the hospitality industry’s demands.',
      'Receiving the ‘Emerging India Award – 2007’ from the Hon’ble Prime Minister of India, Dr. Manmohan Singh, underscores Mr. Reddy’s significant contributions and recognition on a national level. This award further validates his dedication, innovation, and impact within the business landscape.',
      'Mr. Reddy’s multifaceted background and distinguished accomplishments position him as a seasoned professional capable of steering projects to success and achieving excellence across various sectors. His leadership and experience undoubtedly play a pivotal role in the success of MAK Projects.',
    ],
  },
  {
    name: 'Mr. Mir Nasir Ali Khan',
    role: 'Managing Director',
    years: '35+ years',
    image: '/media/management/mir-nasir-ali.png',
    bio: [
      'Mr. Mir Nasir Ali Khan’s background showcases a wealth of experience and expertise in the construction and real estate industry. With a postgraduate degree in Business Management and over 35+ years of hands-on experience, he brings a strong foundation of knowledge to his roles.',
      'As the Promoter and Managing Director of Frontline Constructions Ltd., Mr. Khan has played a pivotal role in spearheading the construction of numerous prestigious residential and commercial properties in prime locations across Hyderabad. This demonstrates his adeptness in overseeing complex projects and delivering high-quality developments that meet the demands of discerning clients.',
      'Mr. Khan’s leadership and strategic vision have undoubtedly contributed to the success and reputation of Frontline Constructions Ltd. His ability to navigate the dynamic landscape of the real estate industry and consistently deliver exceptional results underscores his proficiency and dedication to the field.',
      'With his extensive experience and proven track record, Mr. Mir Nasir Ali Khan brings valuable insights and leadership to the team at MAK Projects, further enhancing the company’s capabilities and standing in the industry.',
    ],
  },
  {
    name: 'Mr. K. Bharath Kumar',
    role: 'Director, MAK Projects & Vice Chairman, MAK Hotels & Resorts',
    years: '20+ years',
    image: '/media/management/bharath-kumar.jpg',
    bio: [
      'Mr. K. Bharath Kumar’s background reflects a rich and diverse career in the hospitality industry, with a strong focus on human resource management, project management, and commercial management. With a postgraduate degree in Business Administration and over 20+ years of experience, he brings a depth of knowledge and expertise to his roles.',
      'His tenure with the Green Park Group of Hotels in Hyderabad and Chennai from 2001 to 2006 highlights his significant contributions and leadership within the hospitality sector. During this time, he played a key role in managing various aspects of hotel operations, including human resources, project execution, and commercial activities.',
      'Mr. Kumar’s multifaceted experience underscores his versatility and proficiency in handling diverse responsibilities within the hospitality industry. His expertise in human resource management, project management, and commercial management has been instrumental in driving operational efficiency, enhancing guest experiences, and achieving business objectives.',
      'With his extensive background and proven track record, Mr. K. Bharath Kumar brings valuable skills and insights to the team at MAK Projects, contributing to the company’s success and growth in the real estate sector.',
    ],
  },
  {
    name: 'Mr. G. Saba Nayagam',
    role: 'Director',
    years: '35+ years',
    image: '/media/management/saba-nayagam.png',
    bio: [
      'Mr. G. Saba Nayagam brings a wealth of experience and expertise to the table, particularly in finance, accounts, and legal domains. With a strong educational background including a Commerce degree, Fellowship of the Institute of Chartered Accountants of India, and a Diploma in Central Excise and Customs, he possesses a solid foundation for his career.',
      'Having accrued over 35+ years of experience across various sectors including cultivation, manufacturing, exports, and constructions, Mr. Saba has honed his skills in finance and legal matters through diverse roles and responsibilities. His tenure as Vice President – Finance at Diana Hotels Ltd. (Green Park Group of Hotels) from 1996 to 2007 underscores his leadership and proficiency in managing accounts, financing, and budgeting for the group.',
      'His responsibilities extended beyond financial management to include project financing and project implementation, showcasing his ability to navigate complex financial landscapes and oversee successful project executions. Mr. Saba’s contributions would have been instrumental in ensuring the financial health and operational efficiency of the Green Park Group and other associated companies.',
      'With his extensive experience and comprehensive understanding of finance, accounts, and legal matters, Mr. G. Saba Nayagam adds significant value to the team at MAK Projects, contributing to the company’s strategic financial management and overall success in the real estate sector.',
    ],
  },
  {
    name: 'Mr. T. Atchi Reddy',
    role: 'Director',
    years: '30+ years',
    image: '/media/management/atchi-reddy.jpg',
    bio: [
      'Mr. T. Atchi Reddy’s impressive background in both management and law, coupled with his extensive experience in the hospitality industry, positions him as a valuable asset to any organization. With a postgraduate degree in Management and a law degree, he possesses a well-rounded skill set that encompasses both business acumen and legal expertise.',
      'His tenure at Green Park – Hyderabad, where he worked across various departments including HRD, Food & Beverages, and Housekeeping, demonstrates his versatility and proficiency in different areas of hotel operations. Progressing through the ranks to the positions of Deputy General Manager at Green Park – Hyderabad and General Manager at Green Park – Visakhapatnam, Mr. Reddy has proven his leadership capabilities and ability to drive success in challenging environments.',
      'Before joining MAK Projects, Mr. Reddy served as the Chief Executive Officer of Ramky Estates & Farms Pvt. Ltd., where he was responsible for overseeing divisional operations and driving the company’s growth. His experience in this role highlights his strategic vision, operational expertise, and commitment to achieving business objectives.',
      'With over 30+ years of experience in the hospitality industry and a track record of leadership and achievement, Mr. T. Atchi Reddy brings invaluable insights and leadership to the team at MAK Projects. His multifaceted background and proven track record make him well-equipped to contribute to the company’s continued success and growth in the real estate sector.',
    ],
  },
]

export type FaqItem = {
  q: string
  a: string
  table?: {
    headers: [string, string]
    rows: [string, string][]
  }
}

export const serenityFaqs: FaqItem[] = [
  {
    q: 'What is BTR Serenity Apartments, and where is it located within BTR Township?',
    a: 'BTR Serenity Apartments is a part of the BTR luxurious active residential township, comprising approximately 150 residential flats across 3 acres on Srisailam Highway, Thummalur.',
  },
  {
    q: 'What flat sizes are available, and what is the UDS (Undivided Share of Land) in BTR Serenity?',
    a: 'The undivided share of land refers to the portion of the total land area owned by each flat owner. Common area is approximately 20%.',
    table: {
      headers: ['Flat — SFT', 'UDS (sq.yds)'],
      rows: [
        ['1334', '77'],
        ['1448', '84'],
        ['1558', '90'],
        ['1788', '103'],
        ['2434', '140'],
        ['2482', '143'],
        ['2767', '160'],
        ['3068', '177'],
      ],
    },
  },
  {
    q: 'What are the specifications for the structure and superstructure of BTR Serenity Apartments?',
    a: 'The structure features an RCC framework. The superstructure includes external walls of 8″ thickness and internal walls of 4″ thickness with C.C. Blocks / Bricks.',
  },
  {
    q: 'What flooring options are available in BTR Serenity Apartments?',
    a: 'Flooring includes 600 mm × 600 mm vitrified flooring with skirting. Anti-skid flooring is provided in toilets, along with glazed ceramic dado tile up to a specified height in the kitchen.',
  },
  {
    q: 'Can you provide details about the doors, windows, and electrical fittings?',
    a: 'Main doors are teak wood with melamine polish; internal doors are teak wood or flush doors; windows are UPVC. Electrical wiring is concealed copper with modular switches of reputed make.',
  },
  {
    q: 'What are the sanitary fittings and water supply arrangements in the apartments?',
    a: 'Sanitary fittings are from Jaguar — including European commodes, wash basins, and CP fittings. Bore well water is used for flushing and toilets, with provision for drinking water in the kitchen and a WTP.',
  },
  {
    q: 'Is there any provision for power backup? What appliances work with backup power?',
    a: 'Yes. Power backup is available for lights, fan points, and common areas.',
  },
  {
    q: 'What security features are available in BTR Serenity Apartments?',
    a: 'Surveillance cameras at the main security and designated locations, corridor intercom system facility, and boom barriers for efficient traffic management.',
  },
  {
    q: 'How is the water management system in BTR Serenity?',
    a: 'Water is managed through a Krishna water connection for drinking and daily needs, supplemented by bore well water for common use. A water softening plant ensures water quality, while a sewerage treatment plant handles waste responsibly.',
  },
  {
    q: 'Is there any provision for telecom, cable TV, and internet connections?',
    a: 'Yes — there is provision for telephone, cable, and internet connection.',
  },
  {
    q: 'Is there any car wash facility provided?',
    a: 'Yes. A common car wash area provision is given for BTR Serenity.',
  },
  {
    q: 'What are the ongoing developments in the vicinity of BTR Serenity?',
    a: 'MAK — BTR is located near a 700-acre integrated township, Electronic City, Fab City, Tata Sikorsky, TCS, GMR Health Port, Electronic SEZ, Wipro, Amazon Warehouse, Malabar Gold & Diamonds, Adani Aerospace, Wonderla Amusement Park, Foxconn, and more.\n\nNearby schools include Manchester Global School, The Aga Khan Academy, Delhi Public School – Aero City, Bhashyam Blooms, Devendra Vidyalaya, Narayana IIT Academy, and others.',
  },
  {
    q: 'Are EV charging stations available at BTR Serenity Apartments?',
    a: 'Yes. A specified EV charging point is available at BTR Serenity, operated by the Adani Group.',
  },
  {
    q: 'What is the process for obtaining club house membership?',
    a: 'We will provide the necessary forms, details regarding membership fees, and privileges associated with MAK — BTR Club membership. A one-time subscription grants lifetime access to club amenities.',
  },
  {
    q: 'What is the “corpus fund”, and how is it calculated in BTR Serenity?',
    a: 'The corpus fund is a reserve maintained by the association for future maintenance, repair, and improvement expenses of the property. It is calculated on the flat built-up area.',
  },
  {
    q: 'What are the monthly maintenance charges in BTR Serenity?',
    a: 'Maintenance charges are calculated based on the built-up area of the flat, in accordance with association guidelines, at ₹3 + GST per sft.',
  },
]

export const plotFaqs = [
  {
    q: 'What plot sizes does BTR Gardenia offer?',
    a: 'Premium residential plots from 325 to 1000 sq.yds across 193 acres with 590 units.',
  },
  {
    q: 'Is it approved?',
    a: 'Yes — HMDA approved and registered with RERA (P02400001288 / P02400001289).',
  },
  {
    q: 'How many floors are permitted?',
    a: 'Villas must follow G+2 / Stilt+2 as per sale deed and BTROWA bye-laws.',
  },
  {
    q: 'What infrastructure is included?',
    a: 'Wide roads, underground electricity & sewerage, Krishna water, water softening plant, ECO STP, playgrounds and 2 clubhouses.',
  },
]

export const villaFaqs = [
  {
    q: 'How many villas and what area?',
    a: '333 luxury villas within MAK — BTR Township’s 260+ acres of land in Hyderabad’s Knowledge City.',
  },
  {
    q: 'Who designed the project?',
    a: 'SA Architects SDN BHD, Malaysia.',
  },
  {
    q: 'What configurations are available?',
    a: '3 & 4 bedroom villas from 2900–4000 sq.ft (approx 400–600 sq.yds).',
  },
  {
    q: 'Key amenities?',
    a: '10-hole golf course, 2 clubhouses, spa, mini theatre, cricket ground, landscaped gardens, ATM & utility shops.',
  },
]

