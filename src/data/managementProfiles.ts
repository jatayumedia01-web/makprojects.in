import {
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  Scale,
  type LucideIcon,
} from 'lucide-react'

export type ManagementProfileConfig = {
  sectionId: string
  eyebrow: string
  focusLine: string
  creds: { icon: LucideIcon; value: string }[]
  spotlight: {
    icon: LucideIcon
    label: string
    title: string
    body: string
  }
}

export const managementProfiles: ManagementProfileConfig[] = [
  {
    sectionId: 'chairman',
    eyebrow: 'Chairman',
    focusLine: 'Infrastructure · Hospitality · Enterprise leadership',
    creds: [
      { icon: Briefcase, value: 'Green Park Group of Hotels' },
      { icon: Award, value: 'Emerging India Award — 2007' },
      { icon: GraduationCap, value: 'PG · Business Management' },
    ],
    spotlight: {
      icon: Award,
      label: 'National recognition',
      title: 'Emerging India Award — 2007',
      body: 'Conferred by the Hon’ble Prime Minister of India, Dr. Manmohan Singh — recognising national impact in enterprise leadership.',
    },
  },
  {
    sectionId: 'managing-director',
    eyebrow: 'Managing Director',
    focusLine: 'Construction · Real estate · Strategic delivery',
    creds: [
      { icon: Briefcase, value: 'Frontline Constructions Ltd.' },
      { icon: Building2, value: 'Residential & commercial delivery' },
      { icon: GraduationCap, value: 'PG · Business Management' },
    ],
    spotlight: {
      icon: Building2,
      label: 'Delivery legacy',
      title: 'Frontline Constructions Ltd.',
      body: 'Promoter & Managing Director — leading prestigious residential and commercial developments across Hyderabad.',
    },
  },
  {
    sectionId: 'bharath-kumar',
    eyebrow: 'Director · Hotels',
    focusLine: 'Hospitality · HR · Project & commercial management',
    creds: [
      { icon: Briefcase, value: 'Director, MAK Projects' },
      { icon: Building2, value: 'Vice Chairman, MAK Hotels & Resorts' },
      { icon: GraduationCap, value: 'PG · Business Administration' },
    ],
    spotlight: {
      icon: Building2,
      label: 'Hospitality tenure',
      title: 'Green Park Group · 2001–2006',
      body: 'Leadership across Hyderabad and Chennai — human resources, project execution and commercial management.',
    },
  },
  {
    sectionId: 'saba-nayagam',
    eyebrow: 'Director · Finance',
    focusLine: 'Finance · Accounts · Legal oversight',
    creds: [
      { icon: Scale, value: 'FCA · ICAI Fellow' },
      { icon: Briefcase, value: 'VP Finance, Diana Hotels Ltd.' },
      { icon: GraduationCap, value: 'Commerce · Excise & Customs' },
    ],
    spotlight: {
      icon: Scale,
      label: 'Finance leadership',
      title: 'Diana Hotels Ltd. · 1996–2007',
      body: 'Vice President – Finance — accounts, financing, budgeting, project financing and implementation.',
    },
  },
  {
    sectionId: 'atchi-reddy',
    eyebrow: 'Director · Operations',
    focusLine: 'Hospitality · Management · Law',
    creds: [
      { icon: Briefcase, value: 'CEO, Ramky Estates & Farms' },
      { icon: Building2, value: 'GM · Green Park Visakhapatnam' },
      { icon: GraduationCap, value: 'PG Management · Law' },
    ],
    spotlight: {
      icon: Building2,
      label: 'Leadership path',
      title: 'Green Park · Ramky Estates',
      body: 'From departmental leadership to DGM and GM at Green Park, then CEO of Ramky Estates & Farms.',
    },
  },
]

export const managementNav = [
  { href: '#board', id: 'board' },
  { href: '#chairman', id: 'chairman' },
  { href: '#managing-director', id: 'managing-director' },
  { href: '#bharath-kumar', id: 'bharath-kumar' },
  { href: '#saba-nayagam', id: 'saba-nayagam' },
  { href: '#atchi-reddy', id: 'atchi-reddy' },
] as const
