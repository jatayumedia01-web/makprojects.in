import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * BrandTickerMarquee — full-bleed luxury brand ribbon
 * Bridges Welcome → Ongoing Projects
 */

const brands = [
  { label: 'BTR Serenity', href: '/btr-serenity' },
  { label: 'BTR Gardenia', href: '/btr-villa-plots' },
  { label: 'BTR Villas', href: '/btr-villas' },
  { label: 'BTR Greens', href: '/btr-greens' },
  { label: 'BTR Golf', href: '/btr-golf-plots' },
  { label: 'Fern Villas', href: '/fern-villas' },
]

export default function BrandTickerMarquee() {
  const loop = [...brands, ...brands, ...brands, ...brands]

  return (
    <section
      id="brand-ticker-marquee"
      data-section="BrandTickerMarquee"
      className="relative overflow-hidden bg-[#0c1612]"
      aria-label="Our project brands"
    >
      {/* Soft depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative py-5 md:py-6">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <p className="text-[10px] font-semibold tracking-[0.42em] text-gold/90 uppercase">
            Our Brands
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0c1612] to-transparent sm:w-28 md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0c1612] to-transparent sm:w-28 md:w-40" />

          <div className="overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-0 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
            >
              {loop.map((brand, i) => (
                <Link
                  key={`${brand.label}-${i}`}
                  to={brand.href}
                  className="group inline-flex items-center gap-8 px-5 sm:gap-10 sm:px-7"
                >
                  <span className="text-[13px] font-semibold tracking-[0.28em] text-white/75 uppercase transition duration-300 group-hover:text-gold sm:text-[14px]">
                    {brand.label}
                  </span>
                  <span
                    aria-hidden
                    className="h-1 w-1 shrink-0 rounded-full bg-gold/70 shadow-[0_0_10px_rgba(201,162,39,0.65)]"
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
