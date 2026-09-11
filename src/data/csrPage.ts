import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  HeartHandshake,
  Leaf,
  Stethoscope,
  Users,
} from 'lucide-react'

export type CsrInitiative = {
  id: string
  title: string
  body: string
  icon: LucideIcon
  image: string
  highlights: string[]
}

export const csrPage = {
  hero: {
    eyebrow: 'Giving Back',
    title: 'Corporate Social Responsibility',
    subtitle:
      'Building communities goes beyond bricks and mortar - MAK Projects invests in education, health, environment, and local welfare across Hyderabad.',
    image: '/media/township-amenities/parks-playground.jpg',
  },
  intro: {
    eyebrow: 'Our Commitment',
    title: 'Responsible development for lasting impact',
    body:
      'For over two decades, MAK Projects has believed that real estate success is measured not only by what we build, but by how we uplift the communities around us. From township residents to neighbouring villages, our CSR efforts focus on sustainable, meaningful change.',
  },
  stats: [
    { value: '20+', label: 'Years of community engagement' },
    { value: '650+', label: 'Families in our townships' },
    { value: '4', label: 'Core focus areas' },
    { value: '100%', label: 'Commitment to ethical development' },
  ],
  initiatives: [
    {
      id: 'education',
      title: 'Education & Skill Development',
      body: 'Supporting local schools, scholarships, and vocational training programmes that empower the next generation in South Hyderabad.',
      icon: BookOpen,
      image: '/media/township-amenities/tree-lined-morning-walk.jpg',
      highlights: [
        'School infrastructure support',
        'Merit-based scholarships',
        'Skill development workshops',
      ],
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Wellness',
      body: 'Organising health camps, awareness drives, and wellness initiatives for township residents and surrounding communities.',
      icon: Stethoscope,
      image: '/media/clubhouse/btr-club-exterior-pool.jpg',
      highlights: [
        'Free health check-up camps',
        'Women & child wellness drives',
        'Emergency preparedness awareness',
      ],
    },
    {
      id: 'environment',
      title: 'Environment & Greenery',
      body: 'Tree plantation drives, rainwater harvesting advocacy, and green landscaping that keeps our townships breathable and sustainable.',
      icon: Leaf,
      image: '/media/township-amenities/landscaped-internal-roads.jpg',
      highlights: [
        'Tree plantation programmes',
        'Green township landscaping',
        'Waste management awareness',
      ],
    },
    {
      id: 'community',
      title: 'Community Welfare',
      body: 'Festive celebrations, sports events, and neighbourhood support that strengthen the social fabric of every MAK community.',
      icon: Users,
      image: '/media/township-amenities/cricket-ground.jpg',
      highlights: [
        'Community sports & cultural events',
        'Festival celebrations for residents',
        'Local employment opportunities',
      ],
    },
  ] satisfies CsrInitiative[],
  values: {
    eyebrow: 'How We Work',
    title: 'Principles that guide our CSR',
    items: [
      {
        icon: HeartHandshake,
        title: 'People first',
        body: 'Every initiative is designed around real community needs - not optics.',
      },
      {
        icon: Leaf,
        title: 'Sustainable impact',
        body: 'Long-term programmes over one-time gestures, aligned with our vision of responsible growth.',
      },
      {
        icon: Users,
        title: 'Inclusive participation',
        body: 'Residents, employees, and local partners collaborate to drive meaningful change.',
      },
    ],
  },
  cta: {
    eyebrow: 'Partner With Us',
    title: 'Want to collaborate on a CSR initiative?',
    body: 'Reach out to explore partnerships in education, health, or community development across Hyderabad.',
  },
} as const
