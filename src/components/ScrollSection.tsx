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
      rotateX: 8,
      filter: 'blur(10px)',
      transformPerspective: 1200,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
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
export function SectionBridge({
  dark = false,
  index,
  total = 7,
}: {
  dark?: boolean
  index?: number
  total?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className="h-10" aria-hidden />
  }

  return (
    <div
      className={`relative flex h-16 flex-col items-center justify-center gap-2 md:h-20 ${
        dark ? 'bg-ink' : 'bg-cream'
      }`}
      aria-hidden
    >
      {index !== undefined ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: REVEAL_EASE }}
          className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${
            dark ? 'text-gold/70' : 'text-sage/80'
          }`}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </motion.span>
      ) : null}
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
        className="absolute bottom-[calc(50%-1rem)] h-2 w-2 rounded-sm bg-gold shadow-[0_0_18px_rgba(212,175,55,0.55)] md:bottom-[calc(50%-1.25rem)]"
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
  sectionTotal = 7,
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
  sectionTotal?: number
} & Record<string, unknown>) {
  const reduce = useReducedMotion()
  const motionVariant =
    variant ?? AUTO_VARIANTS[index % AUTO_VARIANTS.length]
  const Tag = as === 'section' ? motion.section : motion.div

  if (reduce) {
    return (
      <>
        {bridge && index > 0 ? (
          <SectionBridge dark={bridgeDark} index={index} total={sectionTotal} />
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
          <SectionBridge dark={bridgeDark} index={index} total={sectionTotal} />
        ) : null}
      <Tag
        id={id}
        className={className}
        {...rest}
        style={{ transformPerspective: 1200 }}
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
