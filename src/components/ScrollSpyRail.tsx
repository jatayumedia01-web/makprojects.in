import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { REVEAL_EASE } from './Motion'

export function ScrollSpyRail({
  items,
  activeId,
}: {
  items: readonly { id: string; label: string }[]
  activeId: string
}) {
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:right-6 min-[1400px]:flex"
    >
      <div className="flex flex-col items-end gap-4 rounded-full border border-ink/8 bg-white/75 px-3 py-4 shadow-lg backdrop-blur-md">
        {items.map((item, i) => {
          const on = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-3"
              aria-current={on ? 'true' : undefined}
            >
              <span
                className={`max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 group-hover:max-w-[140px] group-focus-visible:max-w-[140px] ${
                  on ? 'text-gold' : 'text-stone group-hover:text-ink'
                }`}
              >
                {String(i + 1).padStart(2, '0')} · {item.label}
              </span>
              <motion.span
                layout
                animate={{
                  scale: on ? 1.35 : 1,
                  opacity: on ? 1 : 0.35,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className={`block h-2 w-2 shrink-0 rounded-full ${
                  on
                    ? 'bg-gold shadow-[0_0_14px_rgba(212,175,55,0.75)]'
                    : 'bg-stone/45 group-hover:bg-sage/70'
                }`}
              />
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export function RevealHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag]

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: REVEAL_EASE }}
    >
      {children}
    </MotionTag>
  )
}
