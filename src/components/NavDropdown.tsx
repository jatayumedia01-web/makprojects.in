import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type Align = 'left' | 'center' | 'right'

type Props = {
  label: string
  to: string
  floating: boolean
  align?: Align
  panelWidth?: string
  children: (close: () => void) => ReactNode
}

export default function NavDropdown({
  label,
  to,
  floating,
  align = 'center',
  panelWidth = 'w-[720px]',
  children,
}: Props) {
  const [open, setOpen] = useState(false)
  const openTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }

  const openMenu = useCallback(() => {
    clearTimers()
    openTimer.current = window.setTimeout(() => setOpen(true), 60)
  }, [])

  const closeMenu = useCallback(() => {
    clearTimers()
    closeTimer.current = window.setTimeout(() => setOpen(false), 140)
  }, [])

  const closeNow = useCallback(() => {
    clearTimers()
    setOpen(false)
  }, [])

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeNow])

  const alignClass =
    align === 'left'
      ? 'left-0'
      : align === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2'

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) closeNow()
      }}
    >
      <NavLink
        to={to}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        className={({ isActive }) =>
          `${triggerClass(isActive || open, floating)} group`
        }
        onClick={closeNow}
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </motion.span>
        <span
          className={`absolute bottom-1 left-3 right-3 h-[2px] origin-left rounded-full bg-gold transition duration-300 ${
            open ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
          }`}
        />
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 380, damping: 28, mass: 0.7 },
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
              transition: { duration: 0.18, ease: 'easeIn' },
            }}
            className={`absolute top-full z-[60] ${alignClass} ${panelWidth} max-w-[min(92vw,860px)] pt-3`}
          >
            {/* Invisible hover bridge */}
            <div className="absolute inset-x-0 top-0 h-3" />
            <div className="mega-panel overflow-hidden rounded-[28px]">
              {children(closeNow)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function triggerClass(active: boolean, floating: boolean) {
  const base =
    'relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition duration-300'
  if (floating) {
    return `${base} text-white/92 hover:bg-white/15 hover:text-white ${
      active ? 'bg-white/18 text-white' : ''
    }`
  }
  return `${base} text-ink/85 hover:bg-mist/80 hover:text-sage ${
    active ? 'bg-mist text-sage font-semibold' : ''
  }`
}
