import type { ReactNode } from 'react'

/** Shared MAK advanced card shell — gold frame · lift · shine */
export function CardShell({
  children,
  className = '',
  dark = false,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <div className={`group relative h-full ${className}`}>
      <div
        className={`absolute -inset-[1px] rounded-[26px] opacity-70 transition duration-500 group-hover:opacity-100 ${
          dark
            ? 'bg-gradient-to-br from-gold/50 via-[#1a2e28] to-sage/40'
            : 'bg-gradient-to-br from-gold/50 via-white to-sage/30'
        }`}
      />
      <div
        className={`relative h-full overflow-hidden rounded-[25px] shadow-[0_20px_55px_rgba(7,17,14,0.08)] transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_70px_rgba(7,17,14,0.14)] ${
          dark ? 'bg-[#0c1612] text-cream' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
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
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
    </>
  )
}
