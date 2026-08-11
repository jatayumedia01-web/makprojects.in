import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { REVEAL_EASE } from './Motion'

export type ScrollSectionVariant = 'rise' | 'slide-left' | 'slide-right' | 'zoom'

const AUTO_VARIANTS: ScrollSectionVariant[] = [
  'rise',
  'slide-right',
  'slide-left',
  'zoom',
]

const sectionVariants: Record<ScrollSectionVariant, Variants> = {
  rise: {
    hidden: {
      opacity: 0,
      y: 72,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: REVEAL_EASE },
    },
  },
  'slide-left': {
    hidden: {
      opacity: 0,
      x: -64,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: REVEAL_EASE },
    },
  },
  'slide-right': {
    hidden: {
      opacity: 0,
      x: 64,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: REVEAL_EASE },
    },
  },
  zoom: {
    hidden: {
      opacity: 0,
      scale: 0.94,
      y: 40,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.05, ease: REVEAL_EASE },
    },
  },
}

/** Animated bridge between page sections */
export function SectionBridge({ dark = false }: { dark?: boolean }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className="h-10" aria-hidden />
  }

  return (
    <div
      className={`relative flex h-16 items-center justify-center md:h-20 ${
        dark ? 'bg-ink' : 'bg-cream'
      }`}
      aria-hidden
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1.1, ease: REVEAL_EASE }}
        className={`h-px w-[min(92%,56rem)] ${
          dark
            ? 'bg-gradient-to-r from-transparent via-gold/45 to-transparent'
            : 'bg-gradient-to-r from-transparent via-gold/55 to-transparent'
        }`}
      />
      <motion.span
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.7, delay: 0.25, ease: REVEAL_EASE }}
        className="absolute h-2 w-2 rounded-sm bg-gold shadow-[0_0_18px_rgba(212,175,55,0.55)]"
      />
    </div>
  )
}

/**
 * Wraps a full page section with scroll-triggered entrance.
 * Alternate `index` for varied section-to-section motion.
 */
export function ScrollSection({
  children,
  id,
  className = '',
  index = 0,
  variant,
  bridge = true,
  bridgeDark,
  as = 'section',
  ...rest
}: {
  children: ReactNode
  id?: string
  className?: string
  index?: number
  variant?: ScrollSectionVariant
  bridge?: boolean
  bridgeDark?: boolean
  as?: 'section' | 'div'
} & Record<string, unknown>) {
  const reduce = useReducedMotion()
  const motionVariant =
    variant ?? AUTO_VARIANTS[index % AUTO_VARIANTS.length]
  const Tag = as === 'section' ? motion.section : motion.div

  if (reduce) {
    return (
      <>
        {bridge && index > 0 ? (
          <SectionBridge dark={bridgeDark} />
        ) : null}
        {as === 'section' ? (
          <section id={id} className={className} {...rest}>
            {children}
          </section>
        ) : (
          <div id={id} className={className} {...rest}>
            {children}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {bridge && index > 0 ? (
        <SectionBridge dark={bridgeDark} />
      ) : null}
      <Tag
        id={id}
        className={className}
        {...rest}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14, margin: '-8%' }}
        variants={sectionVariants[motionVariant]}
      >
        {children}
      </Tag>
    </>
  )
}
