import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react'
import { PageContainer } from '../project/ProjectChrome'

const EASE = [0.22, 1, 0.36, 1] as const

export type LightboxImage = {
  src: string
  alt: string
  title: string
  caption?: string
}

export function ImageLightbox({
  images,
  index,
  onClose,
  onStep,
}: {
  images: readonly LightboxImage[]
  index: number | null
  onClose: () => void
  onStep?: (delta: number) => void
}) {
  const image = index !== null ? images[index] : null
  const hasNav = images.length > 1 && onStep

  useEffect(() => {
    if (index === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNav) onStep?.(1)
      if (e.key === 'ArrowLeft' && hasNav) onStep?.(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onClose, onStep, hasNav])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {image ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-[#050807]/96 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,107,85,0.12),transparent_65%)]"
            aria-hidden
          />

          <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
            <div className="min-w-0 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-md">
              <p className="truncate text-[13px] font-medium text-white">{image.title}</p>
              {image.caption ? (
                <p className="truncate text-[11px] text-white/55">{image.caption}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {hasNav ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStep?.(-1)
                }}
                className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10 sm:flex md:left-5"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStep?.(1)
                }}
                className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10 sm:flex md:right-5"
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <div
            className="flex h-full w-full items-center justify-center px-3 pb-6 pt-[4.5rem] sm:px-8 sm:pb-10 sm:pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={image.src}
              src={image.src}
              alt={image.alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-h-[calc(100vh-7rem)] max-w-[min(96vw,1400px)] select-none rounded-lg object-contain shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </div>

          {hasNav ? (
            <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-white/55 backdrop-blur-md">
              {String(index! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

function useImageLightbox(images: readonly LightboxImage[]) {
  const [index, setIndex] = useState<number | null>(null)

  const open = useCallback((nextIndex: number) => setIndex(nextIndex), [])
  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null) return current
        return (current + delta + images.length) % images.length
      })
    },
    [images.length],
  )

  return { index, open, close, step }
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string
  title: string
  subtitle: string
  image: string
}) {
  return (
    <section className="relative min-h-[54vh] overflow-hidden bg-ink sm:min-h-[60vh] lg:min-h-[64vh]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />

      <PageContainer className="relative z-10 flex min-h-[54vh] flex-col justify-end pb-12 pt-28 sm:min-h-[60vh] sm:pb-16 sm:pt-32 lg:min-h-[64vh]">
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(1.9rem,4.8vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-white">
            {title}
          </h1>
          <div className="mt-5 h-px w-20 bg-gold" />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {subtitle}
          </p>
        </div>
      </PageContainer>
    </section>
  )
}

export function StatStrip({
  stats,
}: {
  stats: readonly { value: string; label: string }[]
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_40px_rgba(7,17,14,0.07)]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-6 sm:px-7 sm:py-7 ${
              i % 2 === 0 ? 'border-r border-ink/8' : ''
            } ${i < 2 ? 'border-b border-ink/8 md:border-b-0' : ''} ${
              i < stats.length - 1 ? 'md:border-r md:border-ink/8' : ''
            } last:border-r-0 md:last:border-r-0`}
          >
            <p className="text-[clamp(1.65rem,3vw,2.15rem)] font-semibold tracking-tight text-sage">
              {s.value}
            </p>
            <p className="mt-1.5 text-[12px] font-medium leading-snug text-stone sm:text-[13px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeaturedQuote({
  quote,
  name,
  role,
  project,
}: {
  quote: string
  name: string
  role: string
  project: string
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink shadow-[0_24px_60px_rgba(7,17,14,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_55%)]" />
      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[4px_1fr] lg:gap-10 lg:p-12">
        <div className="hidden rounded-full bg-gold lg:block" aria-hidden />
        <div className="lg:pl-2">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">
            Featured story
          </p>
          <blockquote className="mt-5">
            <p className="text-[clamp(1.15rem,2.4vw,1.55rem)] font-medium leading-[1.65] text-cream/92">
              “{quote}”
            </p>
            <footer className="mt-8 flex flex-wrap items-center gap-4 border-t border-cream/10 pt-6">
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="mt-0.5 text-[13px] text-cream/55">{role}</p>
              </div>
              <span className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">
                {project}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="h-1 bg-gold lg:hidden" aria-hidden />
    </div>
  )
}

export function TestimonialCard({
  quote,
  name,
  project,
  featured,
}: {
  quote: string
  name: string
  project: string
  featured?: boolean
}) {
  const initials = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_8px_28px_rgba(7,17,14,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(7,17,14,0.09)] sm:p-7 ${
        featured ? 'border-gold/40 ring-1 ring-gold/20' : 'border-ink/8'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sm font-semibold text-sage">
          {initials}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-ink">{name}</p>
        </div>
      </div>

      <p className="mt-5 flex-1 text-[14px] leading-[1.75] text-[#4a5560]">
        “{quote}”
      </p>

      <span className="mt-5 inline-flex self-start rounded-full bg-mist px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-sage uppercase">
        {project}
      </span>
    </article>
  )
}

export function FeaturedAward({
  year,
  title,
  presenter,
  recipient,
  role,
  body,
  images,
  honourLabel = 'Flagship honour',
  sourceLabel,
}: {
  year: string
  title: string
  presenter: string
  recipient: string
  role: string
  body: string
  images?: readonly {
    src: string
    alt: string
    caption: string
    fit?: 'cover' | 'contain'
  }[]
  honourLabel?: string
  sourceLabel?: string
}) {
  const gallery = images ?? []
  const [primary, secondary] = gallery
  const lightboxImages: LightboxImage[] = gallery.map((image) => ({
    src: image.src,
    alt: image.alt,
    title,
    caption: image.caption,
  }))
  const { index, open, close, step } = useImageLightbox(lightboxImages)
  const imageFit = (fit?: 'cover' | 'contain') =>
    fit === 'contain' ? 'object-contain' : 'object-cover'

  const renderImage = (
    image: { src: string; alt: string; caption: string; fit?: 'cover' | 'contain' },
    imageIndex: number,
    containPadding = false,
  ) => (
    <button
      type="button"
      onClick={() => open(imageIndex)}
      className="group relative block h-full w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      aria-label={`View full image: ${image.caption}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={`absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.03] ${imageFit(image.fit)}${
          containPadding ? ' p-3 sm:p-4' : ''
        }`}
      />
      <div className="absolute inset-0 bg-ink/0 transition duration-300 group-hover:bg-ink/15" />
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-ink/45 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent px-4 pb-4 pt-10">
        <span className="inline-flex rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-ink uppercase shadow-sm">
          {image.caption}
        </span>
      </div>
    </button>
  )

  return (
    <article className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-[0_20px_55px_rgba(7,17,14,0.08)]">
      <ImageLightbox
        images={lightboxImages}
        index={index}
        onClose={close}
        onStep={lightboxImages.length > 1 ? step : undefined}
      />
      <div className="grid lg:grid-cols-12 lg:items-stretch">
        {primary ? (
          <div className="relative flex min-h-[320px] flex-col bg-[#0a0a0a] lg:col-span-5 lg:min-h-[560px]">
            {secondary ? (
              <div className="grid flex-1 grid-rows-2">
                <div className="relative min-h-[180px] overflow-hidden">
                  {renderImage(primary, 0, primary.fit === 'contain')}
                </div>
                <div className="relative min-h-[180px] overflow-hidden border-t border-white/10">
                  {renderImage(secondary, 1, secondary.fit === 'contain')}
                </div>
              </div>
            ) : (
              <div className="relative flex-1 overflow-hidden">
                {renderImage(primary, 0, primary.fit === 'contain')}
              </div>
            )}
          </div>
        ) : null}

        <div
          className={`flex min-h-full flex-col justify-center p-8 sm:p-10 lg:p-12 ${
            primary ? 'lg:col-span-7' : 'lg:col-span-12'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">
              {honourLabel} · {year}
            </span>
            {sourceLabel ? (
              <span className="rounded-full border border-sage/20 bg-sage/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-sage uppercase">
                {sourceLabel}
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 text-[clamp(1.45rem,2.8vw,2.15rem)] font-semibold leading-tight tracking-tight text-ink">
            {title}
          </h3>

          <p className="mt-5 text-[15px] leading-[1.8] text-[#4a5560]">{body}</p>

          <div className="mt-8 grid gap-4 border-t border-ink/8 pt-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-mist/80 px-4 py-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                Presented by
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
                {presenter}
              </p>
            </div>
            <div className="rounded-2xl bg-mist/80 px-4 py-4">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                Recipient
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">{recipient}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-stone">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PageCta({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(31,107,85,0.2),transparent_60%)]" />
      <PageContainer className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.45rem,3vw,2.15rem)] font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {children}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
