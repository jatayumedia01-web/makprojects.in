import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import { REVEAL_EASE } from './Motion'

export type BrochureTileItem = {
  id: string
  title: string
  caption: string
  image: string
  fit?: 'contain' | 'cover'
}

/** Brochure PNG tile — object-contain on cream; photo renders use cover */
export default function SerenityBrochureTile({
  item,
  className = '',
  onOpen,
}: {
  item: BrochureTileItem
  className?: string
  onOpen: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const fit = item.fit ?? 'contain'
  const isPhoto = fit === 'cover'

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group relative block h-full w-full overflow-hidden rounded-[22px] border border-ink/8 text-left shadow-[0_8px_32px_rgba(15,35,28,0.08)] transition-shadow hover:shadow-[0_16px_48px_rgba(15,35,28,0.12)] ${
        isPhoto ? 'bg-ink/5' : 'bg-[#f6f3ec]'
      } ${className}`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.35, ease: REVEAL_EASE }}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full transition duration-700 ${
          isPhoto
            ? 'object-cover object-center'
            : 'object-contain p-3 sm:p-4'
        } ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[#ebe6dc]" />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-90 transition group-hover:opacity-100" />

      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 sm:right-4 sm:top-4">
        <Maximize2 className="h-3.5 w-3.5" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-sm font-bold tracking-tight text-white sm:text-base">
          {item.title}
        </p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/80">
          {item.caption}
        </p>
      </div>
    </motion.button>
  )
}
