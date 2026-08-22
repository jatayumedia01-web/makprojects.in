import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { REVEAL_EASE, staggerItem } from '../Motion'

const EASE = [0.22, 1, 0.36, 1] as const

export type ClubGalleryItem = {
  id: string
  title: string
  caption: string
  image: string
}

export function ClubPhotoTile({
  item,
  index,
  className = '',
  theme = 'dark',
  onOpen,
}: {
  item: ClubGalleryItem
  index: number
  className?: string
  theme?: 'dark' | 'light'
  onOpen: (item: ClubGalleryItem, index: number) => void
}) {
  const [loaded, setLoaded] = useState(false)
  const border =
    theme === 'dark' ? 'border-white/10' : 'border-ink/10'

  return (
    <motion.button
      type="button"
      variants={staggerItem}
      onClick={() => onOpen(item, index)}
      className={`group relative block h-full w-full overflow-hidden rounded-2xl border ${border} bg-ink text-left shadow-lg transition-shadow hover:shadow-xl ${className}`}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.35, ease: REVEAL_EASE }}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-mist" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5" />
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

export function ClubGalleryLightbox({
  items,
  lightbox,
  onClose,
  onStep,
}: {
  items: readonly ClubGalleryItem[]
  lightbox: { item: ClubGalleryItem; index: number } | null
  onClose: () => void
  onStep: (delta: number) => void
}) {
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, onClose, onStep])

  return (
    <AnimatePresence>
      {lightbox ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/94 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStep(-1)
            }}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:flex"
            aria-label="Previous"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStep(1)
            }}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:flex"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <motion.div
            key={lightbox.item.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.item.image}
              alt={lightbox.item.title}
              className="max-h-[82vh] w-full bg-ink object-contain"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0c1612] px-6 py-4">
              <div className="text-left">
                <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
                  {lightbox.item.title}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {lightbox.item.caption}
                </p>
              </div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                {String(lightbox.index + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function useClubLightbox(items: readonly ClubGalleryItem[]) {
  const [lightbox, setLightbox] = useState<{
    item: ClubGalleryItem
    index: number
  } | null>(null)

  const open = useCallback((item: ClubGalleryItem, index: number) => {
    setLightbox({ item, index })
  }, [])

  const close = useCallback(() => setLightbox(null), [])

  const step = useCallback((delta: number) => {
    setLightbox((current) => {
      if (!current) return current
      const next = (current.index + delta + items.length) % items.length
      return { item: items[next], index: next }
    })
  }, [items])

  return { lightbox, open, close, step }
}
