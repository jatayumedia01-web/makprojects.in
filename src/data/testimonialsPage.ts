export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  project: string
  image?: string
  featured?: boolean
}

export const testimonialsPage = {
  hero: {
    eyebrow: 'Resident Voices',
    title: 'Testimonials',
    subtitle:
      'Hear from families who chose MAK Projects - from ready-to-move apartments to villa communities on Srisailam Highway.',
    image: '/media/home/btr-villa-plots.jpg',
  },
  intro: {
    eyebrow: 'Trusted by Families',
    title: 'Real stories from real homeowners',
    body:
      'Over 650+ families call MAK - BTR home. Their experiences reflect our commitment to quality construction, thoughtful planning, and customer delight at every stage.',
  },
  stats: [
    { value: '650+', label: 'Happy families' },
    { value: '260+', label: 'Acres delivered' },
    { value: '20+', label: 'Years of trust' },
    { value: '4.8', label: 'Resident satisfaction' },
  ],
  featured: {
    quote:
      'Moving into BTR - Serenity was the best decision for our family. The quality of construction, clubhouse amenities, and the peaceful environment exceeded what we saw on paper.',
    name: 'Priya & Ramesh K.',
    role: 'BTR - Serenity residents',
    project: 'Apartments · Ready to Move-In',
  },
  testimonials: [
    {
      id: 'serenity-1',
      quote:
        'The handover was smooth and the flat quality is excellent. Wide roads, greenery, and the clubhouse make everyday living comfortable for our children and parents.',
      name: 'Anitha Reddy',
      role: 'Homeowner',
      project: 'BTR - Serenity',
      featured: true,
    },
    {
      id: 'villas-1',
      quote:
        'We chose BTR Villas for the golf community lifestyle. The villa design, sit-outs, and township amenities give us a resort-like feel every day.',
      name: 'Vikram & Swathi M.',
      role: 'Villa owners',
      project: 'BTR - Villas',
    },
    {
      id: 'gardenia-1',
      quote:
        'BTR Gardenia gave us the freedom to build our dream home on a premium plot. The layout, road width, and security gave us confidence from day one.',
      name: 'Srinivas Rao',
      role: 'Plot owner',
      project: 'BTR - Gardenia',
    },
    {
      id: 'township-1',
      quote:
        'MAK - BTR feels like a complete world - apartments, villas, parks, sports, and a club. Our extended family all found homes here.',
      name: 'Lakshmi Devi',
      role: 'Long-term resident',
      project: 'MAK - BTR',
    },
    {
      id: 'serenity-2',
      quote:
        'Location on Srisailam Highway with ORR connectivity was key for us. MAK delivered on time and the after-sales support has been responsive.',
      name: 'Arun Kumar',
      role: 'Investor & resident',
      project: 'BTR - Serenity',
    },
    {
      id: 'villas-2',
      quote:
        'The 10-hole golf course and landscaped greens set BTR apart from other projects we visited. Worth every rupee for the lifestyle upgrade.',
      name: 'Rajesh & Meena P.',
      role: 'Golf community residents',
      project: 'BTR - Villas',
    },
  ] satisfies Testimonial[],
  cta: {
    eyebrow: 'Your Turn',
    title: 'Ready to write your own MAK story?',
    body: 'Explore our projects and schedule a site visit to experience the communities our residents love.',
  },
} as const
