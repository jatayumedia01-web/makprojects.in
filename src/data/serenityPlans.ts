/** BTR Serenity — official floor plans with facing variants */

export type PlanFacing = {
  id: string
  label: string
  image: string
  carpet: number
  flats?: string
}

export type SerenityPlan = {
  id: string
  bhk: 3 | 4
  size: number
  beds: number
  baths: number
  uds: number
  balconyUtility?: number
  commonShare?: number
  facings: PlanFacing[]
}

export const serenityPlanCatalog: SerenityPlan[] = [
  {
    id: '1334',
    bhk: 3,
    size: 1334,
    beds: 3,
    baths: 3,
    uds: 77,
    balconyUtility: 91.01,
    commonShare: 233.49,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/3bhk-1334-east.png',
        carpet: 928.55,
        flats: '24, 26 & 28',
      },
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/3bhk-1334-west.png',
        carpet: 928.55,
      },
    ],
  },
  {
    id: '1448',
    bhk: 3,
    size: 1448,
    beds: 3,
    baths: 3,
    uds: 84,
    balconyUtility: 97.67,
    commonShare: 251.95,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/3bhk-1448-east.png',
        carpet: 1007.85,
        flats: '22 & 29',
      },
      {
        id: 'north',
        label: 'North',
        image: '/media/serenity/plans/3bhk-1448-north.png',
        carpet: 1007.85,
      },
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/3bhk-1448-west.png',
        carpet: 1007.85,
      },
    ],
  },
  {
    id: '1558',
    bhk: 3,
    size: 1558,
    beds: 3,
    baths: 3,
    uds: 90,
    balconyUtility: 100.21,
    commonShare: 271.2,
    facings: [
      {
        id: 'north',
        label: 'North',
        image: '/media/serenity/plans/3bhk-1558-north.png',
        carpet: 1091.5,
        flats: '11, 12, 14, 16, 18 & 20',
      },
    ],
  },
  {
    id: '1788',
    bhk: 3,
    size: 1788,
    beds: 3,
    baths: 3,
    uds: 103,
    balconyUtility: 127.37,
    commonShare: 311.1,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/3bhk-1788-east.png',
        carpet: 1250.47,
        flats: '15 & 19',
      },
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/3bhk-1788-west.png',
        carpet: 1250.47,
      },
    ],
  },
  {
    id: '2434',
    bhk: 4,
    size: 2434,
    beds: 4,
    baths: 4,
    uds: 140,
    balconyUtility: 126.56,
    commonShare: 423.54,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/4bhk-2434-east.png',
        carpet: 1754.82,
        flats: '5',
      },
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/4bhk-2434-west.png',
        carpet: 1725.05,
        flats: '25',
      },
    ],
  },
  {
    id: '2482',
    bhk: 4,
    size: 2482,
    beds: 4,
    baths: 4,
    uds: 143,
    balconyUtility: 126.56,
    commonShare: 431.96,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/4bhk-2482-east.png',
        carpet: 1793.53,
        flats: '3',
      },
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/4bhk-2482-west.png',
        carpet: 1793.53,
      },
    ],
  },
  {
    id: '2767',
    bhk: 4,
    size: 2767,
    beds: 4,
    baths: 4,
    uds: 160,
    balconyUtility: 130.91,
    commonShare: 481.47,
    facings: [
      {
        id: 'west',
        label: 'West',
        image: '/media/serenity/plans/4bhk-2767-west.png',
        carpet: 2029,
        flats: '1',
      },
    ],
  },
  {
    id: '3068',
    bhk: 4,
    size: 3068,
    beds: 4,
    baths: 4,
    uds: 177,
    balconyUtility: 145.55,
    commonShare: 533.84,
    facings: [
      {
        id: 'east',
        label: 'East',
        image: '/media/serenity/plans/4bhk-3068-east.png',
        carpet: 2252.63,
        flats: '30',
      },
    ],
  },
]

export function getSerenityPlansByBhk(bhk: 3 | 4) {
  return serenityPlanCatalog.filter((p) => p.bhk === bhk)
}
