import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  Flag,
  ImageIcon,
  Route,
  Sparkles,
  Trees,
  Waves,
  X,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn, ScrollLine, StaggerReveal, staggerItem } from '../Motion'
import { CardShell, SoftScene } from './ProjectChrome'
import {
  btrAmenitiesGallery,
  type BtrAmenityGalleryCategory,
  type BtrAmenityGalleryItem,
} from '../../data/content'

const EASE = [0.22, 1, 0.36, 1] as const

const categoryIcons: Record<
  Exclude<BtrAmenityGalleryCategory, 'all'>,
  LucideIcon
> = {
  golf: Flag,
  sports: Activity,
  club: Sparkles,
  roads: Route,
  parks: Trees,
  lifestyle: Waves,
}

function GalleryTile({
  item,
  large = false,
  onOpen,
}: {
  item: BtrAmenityGalleryItem
  large?: boolean
  onOpen: (item: BtrAmenityGalleryItem) => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const Icon = categoryIcons[item.category]

  const showPlaceholder = failed || !item.image

  return (
    <motion.button
      type="button"
      variants={staggerItem}
      onClick={() => !showPlaceholder && onOpen(item)}
      className={`group relative w-full overflow-hidden text-left ${
        large ? 'aspect-[16/10] sm:aspect-[2/1]' : 'aspect-[4/3]'
      } ${showPlaceholder ? 'cursor-default' : 'cursor-zoom-in'}`}
      whileHover={showPlaceholder ? undefined : { scale: 1.02, y: -4 }}
      whileTap={showPlaceholder ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <CardShell className="h-full">
        <div className="relative h-full w-full overflow-hidden">
          {showPlaceholder ? (
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#eef4f0] via-cream to-[#e8ddd4] px-6 text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                <Icon className="h-6 w-6 text-sage" strokeWidth={1.6} />
              </span>
              <p className="text-[11px] font-bold tracking-[0.18em] text-ink uppercase">
                {item.title}
              </p>
              <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-stone">
                {item.caption}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sage/25 bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-sage uppercase">
                <ImageIcon className="h-3 w-3" />
                Image slot
              </span>
            </div>
          ) : (
            <>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {!loaded ? (
                <div className="absolute inset-0 animate-pulse bg-mist" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="inline-flex rounded-full bg-gold/90 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase">
                  {btrAmenitiesGallery.categories.find((c) => c.id === item.category)
                    ?.label ?? item.category}
                </span>
                <p className="mt-2 text-sm font-bold tracking-tight text-white sm:text-base">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] text-white/75">{item.caption}</p>
              </div>
            </>
          )}
        </div>
      </CardShell>
    </motion.button>
  )
}

/** BTR Township amenities & lifestyle image gallery */
export default function TownshipAmenitiesGallery({
  id = 'township-gallery',
}: {
  id?: string
}) {
  const [filter, setFilter] = useState<BtrAmenityGalleryCategory>('all')
  const [lightbox, setLightbox] = useState<BtrAmenityGalleryItem | null>(null)

  const list = useMemo(() => {
    if (filter === 'all') return btrAmenitiesGallery.items
    return btrAmenitiesGallery.items.filter((item) => item.category === filter)
  }, [filter])

  const featured = list.filter((item) => 'featured' in item && item.featured)
  const rest = list.filter((item) => !('featured' in item && item.featured))

  return (
    <>
      <section
        id={id}
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-8 text-center md:mb-10">
              <FadeIn delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  {btrAmenitiesGallery.eyebrow}
                </p>
              </FadeIn>
              <FadeIn delay={0.12} distance={32}>
                <h2 className="mt-3 text-[clamp(1.55rem,3.2vw,2.45rem)] font-bold tracking-[0.06em] text-ink uppercase">
                  {btrAmenitiesGallery.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4a5560]">
                  {btrAmenitiesGallery.subtitle}
                </p>
              </FadeIn>
              <ScrollLine className="mt-5" />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
              {btrAmenitiesGallery.categories.map((cat) => {
                const on = filter === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilter(cat.id)}
                    className={`rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.14em] uppercase transition ${
                      on
                        ? 'bg-ink text-cream shadow-md'
                        : 'border border-ink/10 bg-white/80 text-stone hover:border-sage/30 hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              {featured.length > 0 ? (
                <StaggerReveal className="grid gap-4 md:grid-cols-2" stagger={0.1}>
                  {featured.map((item) => (
                    <GalleryTile
                      key={item.id}
                      item={item}
                      large
                      onOpen={setLightbox}
                    />
                  ))}
                </StaggerReveal>
              ) : null}

              {rest.length > 0 ? (
                <StaggerReveal
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  stagger={0.08}
                >
                  {rest.map((item) => (
                    <GalleryTile key={item.id} item={item} onOpen={setLightbox} />
                  ))}
                </StaggerReveal>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {lightbox?.image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[82vh] w-full object-contain bg-ink"
              />
              <div className="border-t border-white/10 bg-[#0c1612] px-6 py-4 text-center">
                <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
                  {lightbox.title}
                </p>
                <p className="mt-1 text-sm text-white/70">{lightbox.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
