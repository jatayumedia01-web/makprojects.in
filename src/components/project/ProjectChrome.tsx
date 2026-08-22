import type { ReactNode } from 'react'

/** Consistent page width + horizontal padding across all sections */
export function PageContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`site-container px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

/** Distinct section background themes — avoids one flat colour across the page */
export type SectionTheme =
  | 'cream'
  | 'white'
  | 'warm'
  | 'sage'
  | 'mist'
  | 'pearl'
  | 'sand'

const themeLayers: Record<
  SectionTheme,
  { base: string; top?: string; orbs: string[] }
> = {
  cream: {
    base: 'bg-cream',
    top: 'bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9]/80 to-transparent',
    orbs: [
      'absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl',
      'absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl',
    ],
  },
  white: {
    base: 'bg-white',
    top: 'bg-gradient-to-b from-cream/90 via-white/50 to-transparent',
    orbs: [
      'absolute -right-20 top-16 h-72 w-72 rounded-full bg-sage/[0.07] blur-3xl',
      'absolute -left-16 bottom-8 h-64 w-64 rounded-full bg-gold/[0.06] blur-3xl',
    ],
  },
  warm: {
    base: 'bg-gradient-to-b from-[#faf5ef] via-[#f5ece3] to-[#faf5ef]',
    top: 'bg-gradient-to-b from-cream/60 to-transparent',
    orbs: [
      'absolute -right-32 top-10 h-[22rem] w-[22rem] rounded-full bg-[#e8c9b0]/30 blur-3xl',
      'absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl',
    ],
  },
  sage: {
    base: 'bg-gradient-to-b from-[#e8f3ed] via-[#f0f7f3] to-[#e5efe8]',
    top: 'bg-gradient-to-b from-white/40 to-transparent',
    orbs: [
      'absolute -left-24 top-20 h-96 w-96 rounded-full bg-sage/15 blur-3xl',
      'absolute -right-16 bottom-12 h-72 w-72 rounded-full bg-[#b8d4c4]/25 blur-3xl',
    ],
  },
  mist: {
    base: 'bg-gradient-to-b from-[#eef2f8] via-[#f4f7fb] to-[#e9eef4]',
    top: 'bg-gradient-to-b from-[#e8f3ed]/70 to-transparent',
    orbs: [
      'absolute -right-28 top-8 h-[20rem] w-[20rem] rounded-full bg-[#9eb5c9]/18 blur-3xl',
      'absolute -left-24 bottom-16 h-80 w-80 rounded-full bg-sage/10 blur-3xl',
    ],
  },
  pearl: {
    base: 'bg-gradient-to-b from-[#faf8f5] via-[#f6f2ec] to-[#faf8f5]',
    top: 'bg-gradient-to-b from-[#f3ebe3]/50 to-transparent',
    orbs: [
      'absolute left-1/2 top-0 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-[#e8ddd4]/35 blur-3xl',
      'absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl',
    ],
  },
  sand: {
    base: 'bg-gradient-to-b from-[#f8f4ed] via-[#f0e9df] to-[#f8f4ed]',
    top: 'bg-gradient-to-b from-[#0c1612]/[0.03] to-transparent',
    orbs: [
      'absolute -left-16 top-24 h-80 w-80 rounded-full bg-gold/12 blur-3xl',
      'absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-[#d4c4b0]/20 blur-3xl',
    ],
  },
}

export function SectionBackdrop({
  theme = 'cream',
  fadeBottom,
}: {
  theme?: SectionTheme
  /** Soft blend into the next section */
  fadeBottom?: 'cream' | 'white' | 'sage' | 'mist' | 'pearl' | 'ink'
}) {
  const layers = themeLayers[theme]
  const bottomFade = {
    cream: 'from-cream/80',
    white: 'from-white/80',
    sage: 'from-[#e5efe8]/90',
    mist: 'from-[#e9eef4]/90',
    pearl: 'from-[#f6f2ec]/90',
    ink: 'from-[#0c1612]/[0.04]',
  }

  return (
    <>
      <div className={`absolute inset-0 ${layers.base}`} aria-hidden />
      {layers.top ? (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-[42%] ${layers.top}`}
          aria-hidden
        />
      ) : null}
      {layers.orbs.map((orb) => (
        <div
          key={orb}
          className={`pointer-events-none ${orb}`}
          aria-hidden
        />
      ))}
      {fadeBottom ? (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${bottomFade[fadeBottom]} to-transparent`}
          aria-hidden
        />
      ) : null}
    </>
  )
}

/** Thin accent line between sections */
export function SectionAccent({ variant = 'gold' }: { variant?: 'gold' | 'sage' | 'fade' }) {
  const line =
    variant === 'sage'
      ? 'via-sage/35'
      : variant === 'fade'
        ? 'via-ink/8'
        : 'via-gold/45'
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${line} to-transparent`}
      aria-hidden
    />
  )
}

/** Shared MAK advanced card shell — gold frame · lift · shine */
export function CardShell({
  children,
  className = '',
  dark = false,
  lift = true,
  fit = false,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
  /** Hover lift — off for dense grids */
  lift?: boolean
  /** Content height — no stretch in grids */
  fit?: boolean
}) {
  const height = fit ? 'h-auto' : 'h-full'
  return (
    <div className={`group relative ${height} ${className}`}>
      <div
        className={`mak-card-shell absolute -inset-[1px] rounded-[26px] opacity-70 transition duration-500 group-hover:opacity-100 ${
          dark
            ? 'bg-gradient-to-br from-gold/50 via-[#1a2e28] to-sage/40'
            : 'bg-gradient-to-br from-gold/50 via-white to-sage/30'
        }`}
      />
      <div
        className={`mak-card-shell-inner relative ${height} overflow-hidden rounded-[25px] shadow-[0_20px_55px_rgba(7,17,14,0.08)] transition duration-500 ${
          lift
            ? 'group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_70px_rgba(7,17,14,0.14)]'
            : 'group-hover:shadow-[0_24px_60px_rgba(7,17,14,0.11)]'
        } ${dark ? 'bg-[#0c1612] text-cream' : 'bg-white'}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:opacity-100 group-hover:translate-x-[120%]" />
        {children}
      </div>
    </div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string
  title: string
  light?: boolean
}) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <p
        className={`mb-2 text-[11px] font-semibold tracking-[0.32em] uppercase ${
          light ? 'text-gold' : 'text-sage'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-[0.06em] uppercase ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}

export function SoftScene() {
  return <SectionBackdrop theme="cream" />
}
