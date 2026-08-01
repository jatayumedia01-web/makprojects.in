import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  image: string
}) {
  return (
    <section className="relative min-h-[58vh] overflow-hidden grain">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32">
        {eyebrow && (
          <p className="mb-3 text-xs font-medium tracking-[0.28em] text-gold-soft uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-cream md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base font-light text-cream/75 md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="gold-line mt-8 max-w-xs" />
      </div>
    </section>
  )
}
