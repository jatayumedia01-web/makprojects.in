/** BTR & MAK project brands — official logos from BTR Logos folder */
export const btrBrands = [
  {
    id: 'township',
    label: 'TOWNSHIP',
    style: 'caps' as const,
    href: '/btr-township',
    logo: '/media/shared/logo/btr-life-is-beautiful.png',
    logoAlt: 'BTR — Life is Beautiful · MAK — BTR',
    logoClass: 'h-[4.35rem] w-auto sm:h-[4.75rem]',
  },
  {
    id: 'serenity',
    label: 'SERENITY',
    style: 'caps' as const,
    href: '/btr-serenity',
    logo: '/media/shared/logo/btr-serenity.png',
    logoAlt: 'BTR Serenity',
    logoClass: 'h-[4.35rem] w-auto sm:h-[4.75rem]',
  },
  {
    id: 'gardenia',
    label: 'GARDENIA',
    style: 'caps' as const,
    href: '/btr-villa-plots',
    logo: '/media/shared/logo/btr-gardenia.png',
    logoAlt: 'BTR Gardenia',
    logoClass: 'h-[4.35rem] w-auto sm:h-[4.75rem]',
  },
  {
    id: 'fern',
    label: 'FERN',
    style: 'caps' as const,
    href: '/fern/',
    external: true,
    logo: '/media/shared/logo/fern-logo.png',
    logoAlt: 'Fern by MAK Projects — A Haven of Serene Luxury',
    logoClass: 'h-[3.5rem] w-auto max-w-[11rem] sm:h-[3.75rem] sm:max-w-[12rem]',
  },
  {
    id: 'btr',
    label: 'Life is Beautiful',
    style: 'soft' as const,
    href: '/projects',
    logo: '/media/shared/logo/btr-life-is-beautiful.png',
    logoAlt: 'BTR — Life is Beautiful',
    logoClass: 'h-[4.35rem] w-auto sm:h-[4.75rem]',
  },
] as const

export type BtrBrand = (typeof btrBrands)[number]
