import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrandLogoImage } from './BrandLogos'
import { btrBrands, type BtrBrand } from '../data/btrBrands'

/**
 * Section name: OurBrandsSection
 * Home - half-width, advanced brand carousel above footer
 */
const brands = btrBrands
const VISIBLE = 3

function BrandTile({ brand }: { brand: BtrBrand }) {
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </span>

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="flex items-center justify-center overflow-hidden rounded-2xl bg-white px-3 py-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
      >
        <BrandLogoImage
          src={brand.logo}
          alt={brand.logoAlt}
          className={`object-contain ${brand.logoClass}`}
        />
      </motion.div>
    </>
  )

  const className =
    'group relative flex min-h-[130px] flex-col items-center justify-center px-3 py-7 transition duration-500 hover:bg-gradient-to-b hover:from-[#f8f6f2] hover:to-white'

  if ('external' in brand && brand.external) {
    return (
      <a
        href={brand.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link to={brand.href} className={className}>
      {inner}
    </Link>
  )
}

export default function OurBrandsSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dir, setDir] = useState(1)
  const pageCount = Math.ceil(brands.length / VISIBLE)

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % pageCount)
    }, 4200)
    return () => window.clearInterval(t)
  }, [paused, pageCount])

  const start = index * VISIBLE
  const visible = Array.from(
    { length: VISIBLE },
    (_, i) => brands[(start + i) % brands.length],
  )

  function go(next: number) {
    setDir(next > index || (index === pageCount - 1 && next === 0) ? 1 : -1)
    setIndex(next)
  }

  return (
    <section
      id="our-brands-section"
      data-section="OurBrandsSection"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf9f7] to-white py-14 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-8 h-40 w-[50%] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[min(100%,560px)] px-4 sm:max-w-[50%] sm:px-0 md:max-w-[52%]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.38em] text-sage uppercase">
            Our Brands
          </p>
          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-3 max-w-xs text-sm text-[#5a6670]">
            Signature BTR communities crafted by MAK Projects
          </p>
        </motion.div>

        <div className="flex items-center gap-2.5 md:gap-3.5">
          <motion.button
            type="button"
            aria-label="Previous"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => go((index - 1 + pageCount) % pageCount)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/8 bg-white text-ink shadow-[0_8px_24px_rgba(7,17,14,0.08)] transition hover:border-gold/50 hover:text-sage md:h-11 md:w-11"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          <div className="relative min-w-0 flex-1">
            <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-br from-gold/40 via-white to-sage/30 opacity-80" />
            <div className="relative overflow-hidden rounded-[29px] bg-white/95 shadow-[0_24px_60px_rgba(7,17,14,0.12)] backdrop-blur-sm">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 48, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: dir * -48, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-3"
                >
                  {visible.map((brand, i) => (
                    <div
                      key={`${index}-${brand.id}`}
                      className={
                        i < visible.length - 1
                          ? 'sm:border-r sm:border-black/[0.06]'
                          : ''
                      }
                    >
                      <BrandTile brand={brand} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            type="button"
            aria-label="Next"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => go((index + 1) % pageCount)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/8 bg-white text-ink shadow-[0_8px_24px_rgba(7,17,14,0.08)] transition hover:border-gold/50 hover:text-sage md:h-11 md:w-11"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
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
