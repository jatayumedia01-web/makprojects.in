import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const

const DEFAULT_VIEWPORT = { once: true, margin: '-80px' as const }

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

function revealOffset(
  direction: RevealDirection,
  distance: number,
): { x?: number; y?: number } {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 28,
  scale,
  blur = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  distance?: number
  scale?: number
  blur?: boolean
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const offset = revealOffset(direction, distance)

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        ...(scale !== undefined ? { scale } : {}),
        ...(blur ? { filter: 'blur(10px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={DEFAULT_VIEWPORT}
      transition={{ duration: 0.75, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Section-level scroll reveal with optional scale & blur */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  scale = 0.96,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  distance?: number
  scale?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const offset = revealOffset(direction, distance)

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        scale,
        filter: 'blur(6px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Stagger children on scroll */
export function StaggerReveal({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
}

/** Gold line that draws in on scroll */
export function ScrollLine({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        className={`mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent ${className}`}
      />
    )
  }

  return (
    <motion.div
      className={`mx-auto h-px origin-center bg-gradient-to-r from-transparent via-gold to-transparent ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={DEFAULT_VIEWPORT}
      transition={{ duration: 0.8, ease: REVEAL_EASE }}
      style={{ width: '6rem' }}
    />
  )
}

/** Subtle parallax wrapper for images / video blocks */
export function ParallaxBlock({
  children,
  className = '',
  strength = 36,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-strength, strength],
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

/** Fixed top scroll progress bar */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold via-gold-soft to-sage shadow-[0_0_12px_rgba(212,175,55,0.45)]"
      style={{ scaleX }}
      aria-hidden
    />
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
        className="absolute inset-0 h-full w-full scale-105 object-cover"
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
