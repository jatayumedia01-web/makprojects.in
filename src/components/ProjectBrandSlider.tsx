import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useAnimationControls } from 'framer-motion'
import { BtrLogo } from './BrandLogos'

/**
 * Section name: ProjectBrandSlider
 * Side-by-side horizontal sliding — one brand at a time, 3 visible
 */
const brands = [
  {
    id: 'btr',
    label: 'Life is Beautiful',
    style: 'soft' as const,
    href: '/projects',
  },
  {
    id: 'township',
    label: 'TOWNSHIP',
    style: 'caps' as const,
    href: '/btr-township',
  },
  {
    id: 'serenity',
    label: 'SERENITY',
    style: 'caps' as const,
    href: '/btr-serenity',
  },
]

const VISIBLE = 3

function labelClass(style: (typeof brands)[number]['style']) {
  if (style === 'soft') {
    return 'mt-3 text-[11px] font-medium tracking-[0.28em] text-[#8a9199] uppercase'
  }
  return 'mt-3 text-[11px] font-bold tracking-[0.36em] text-[#1a7a8a] uppercase'
}

export default function ProjectBrandSlider() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const controls = useAnimationControls()
  const animatingRef = useRef(false)

  const track = [...brands, ...brands, ...brands]
  const base = brands.length

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const measure = () => {
      const w = el.offsetWidth / VISIBLE
      setCardW(w)
      controls.set({ x: -(base + index) * w })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paused || cardW === 0) return
    const t = window.setInterval(() => {
      void slide(1)
    }, 3800)
    return () => window.clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index, cardW])

  async function slide(step: number) {
    if (animatingRef.current || cardW === 0) return
    animatingRef.current = true
    setAnimating(true)

    const next = index + step
    await controls.start({
      x: -(base + next) * cardW,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    })

    const wrapped = ((next % brands.length) + brands.length) % brands.length
    controls.set({ x: -(base + wrapped) * cardW })
    setIndex(wrapped)

    animatingRef.current = false
    setAnimating(false)
  }

  async function goTo(target: number) {
    if (animating || target === index) return
    await slide(target - index)
  }

  return (
    <section
      id="project-brand-slider"
      data-section="ProjectBrandSlider"
      className="relative overflow-hidden py-14 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#e8c9b0]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/12 blur-3xl" />

      <div className="relative site-container max-w-5xl px-4 sm:px-7">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-9 text-center md:mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.38em] text-sage uppercase">
            Our Brands
          </p>
          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-3 max-w-md text-sm text-[#5a6670]">
            Signature BTR communities crafted by MAK Projects
          </p>
        </motion.div>

        <div className="flex items-center gap-3 md:gap-5">
          <motion.button
            type="button"
            aria-label="Previous brands"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => void slide(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/8 bg-white text-ink shadow-[0_10px_28px_rgba(7,17,14,0.08)] transition hover:border-gold/50 hover:text-sage md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <div className="relative min-w-0 flex-1">
            <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-br from-gold/45 via-white to-sage/30 opacity-90" />
            <div className="absolute -inset-3 -z-10 rounded-[34px] bg-ink/[0.04] blur-xl" />

            <div className="relative overflow-hidden rounded-[29px] bg-white/95 shadow-[0_28px_70px_rgba(7,17,14,0.12)] backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div ref={viewportRef} className="relative w-full overflow-hidden">
                <motion.div className="flex" animate={controls}>
                  {track.map((brand, i) => (
                    <Link
                      key={`${brand.id}-${i}`}
                      to={brand.href}
                      className="group relative flex min-h-[168px] shrink-0 flex-col items-center justify-center border-r border-black/[0.06] px-3 py-9 transition duration-500 hover:bg-gradient-to-b hover:from-[#f8f6f2] hover:to-white"
                      style={{
                        width: cardW || `${100 / VISIBLE}%`,
                      }}
                    >
                      <span className="pointer-events-none absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold/55 to-transparent transition duration-500 group-hover:scale-x-100" />

                      <motion.div
                        whileHover={{ y: -4, scale: 1.03 }}
                        transition={{
                          type: 'spring',
                          stiffness: 340,
                          damping: 18,
                        }}
                        className="overflow-hidden rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
                      >
                        <BtrLogo className="h-[4.35rem] w-auto sm:h-[4.75rem]" />
                      </motion.div>

                      <span className={labelClass(brand.style)}>
                        {brand.label}
                      </span>
                      <span className="mt-2.5 h-0.5 w-0 rounded-full bg-gold transition-all duration-500 group-hover:w-10" />
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            aria-label="Next brands"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => void slide(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/8 bg-white text-ink shadow-[0_10px_28px_rgba(7,17,14,0.08)] transition hover:border-gold/50 hover:text-sage md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {brands.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Brand ${i + 1}`}
              onClick={() => void goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === index
                  ? 'h-1.5 w-9 bg-gradient-to-r from-sage to-[#1a7a8a]'
                  : 'h-1.5 w-1.5 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
