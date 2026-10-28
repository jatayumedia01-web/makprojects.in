/** Canonical public origin (SEO doc targets www.makprojects.com). */
export const SEO_CANONICAL_ORIGIN = 'https://www.makprojects.com'

export type SiteSeoEntry = {
  path: string
  title: string
  description: string
  h1: string
}

export const siteSeo = {
  home: {
    path: '/',
    title: 'Luxury and Premium Home Projects in Hyderabad | MAK Projects',
    description:
      'MAK Projects offers luxury and premium home projects in Hyderabad. Apartments, villas and villa plots on Srisailam Highway. Book your site visit today. Contact Us!',
    h1: 'Luxury and Premium Home Projects in Hyderabad',
  },
  projects: {
    path: '/projects',
    title: 'Villa Plots, Apartments & Villa in Hyderabad | MAK Projects',
    description:
      "Explore MAK Projects' 3 projects in Hyderabad: premium villas, ready to move 3 & 4 BHK apartments and villa plots on Srisailam Highway. Book a site visit today.",
    h1: 'Our Projects: Villas, Apartments & Villa Plots in Hyderabad',
  },
  about: {
    path: '/about',
    title: 'About MAK Projects | Luxury & Premium Developer in Hyderabad',
    description:
      'MAK Projects builds luxury and premium homes and communities across Hyderabad. Explore who we are, our vision and the people behind every project we deliver.',
    h1: 'About MAK Projects – Luxury & Premium Real Estate Developer in Hyderabad',
  },
  management: {
    path: '/management',
    title: 'Leaders Behind MAK Projects, Hyderabad | Our Team',
    description:
      'Meet the leadership of MAK Projects, led by A. Murali Krishna Reddy and Mir Nasir Ali Khan, building trusted homes and communities across Hyderabad. Learn more.',
    h1: 'Meet Our Team Behind MAK Projects',
  },
  awards: {
    path: '/awards',
    title: 'Awards & Recognition | MAK Projects Real Estate in Hyderabad',
    description:
      'Explore the awards and recognition earned by MAK Projects for building luxury and premium homes, infrastructure and communities across Hyderabad. Find out more.',
    h1: 'Awards & Recognition – MAK Projects',
  },
  testimonials: {
    path: '/testimonials',
    title: 'Homebuyer Testimonials & Reviews | MAK Projects in Hyderabad',
    description:
      'Homebuyers share experiences with MAK Projects. Hear from families who chose our luxury and premium apartments, villas and plots in Hyderabad. Come visit today.',
    h1: 'Customer Testimonials – What Our Homebuyers Say',
  },
  contact: {
    path: '/contact',
    title: 'Contact MAK Projects, Hyderabad | Book Your Site Visit Today',
    description:
      'MAK Projects is here to help with your enquiries on luxury and premium apartments, villas and villa plots in Hyderabad. Enquire now and book a site visit today.',
    h1: 'Contact Us – Book a Site Visit with MAK Projects',
  },
} as const satisfies Record<string, SiteSeoEntry>

export const fernSeo = {
  path: '/fern/',
  title: '4BHK Villas For Sale in Tukkuguda, Hyderabad | MAK Fern',
  description:
    'Explore 4BHK villas for sale in Tukkuguda at MAK Fern. Our RERA-approved 4BHK villas for sale in Tukkuguda are just 5 mins from ORR. Book your site visit today.',
  h1: '4BHK Villas For Sale in Tukkuguda, Hyderabad – MAK Fern',
} as const

/** Image alt phrases (SEO doc — Fern / Tukkuguda). */
export const fernImageAlts = {
  hero: 'villas in tukkuguda | Mak Fern',
  aerial: 'luxury villas in tukkuguda | Mak Fern',
  masterPlan: 'villa projects in tukkuguda | Mak Fern',
  entrance: 'gated community villas in tukkuguda | Mak Fern',
  eastVilla: 'tukkuguda villas for sale | Mak Fern',
  westVilla: 'villas for sale in tukkuguda | Mak Fern',
  aboutAccent: 'villas at tukkuguda | Mak Fern',
} as const
