import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { FadeIn, ScrollLine } from '../Motion'
import { PageContainer } from '../project/ProjectChrome'
import { ImageLightbox, type LightboxImage } from './PageUi'
import type { AwardGalleryItem } from '../../data/awardsPage'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import './awards-gallery.css'

export default function AwardsGallery({
  eyebrow,
  title,
  body,
  items,
}: {
  eyebrow: string
  title: string
  body: string
  items: readonly AwardGalleryItem[]
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lightboxImages: LightboxImage[] = items.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    caption: item.caption,
  }))

  const current = items[active]

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const stepLightbox = useCallback(
    (delta: number) => {
      setLightboxIndex((idx) => {
        if (idx === null) return idx
        return (idx + delta + items.length) % items.length
      })
    },
    [items.length],
  )

  return (
    <section className="relative bg-black py-16 md:py-24">
      <PageContainer className="relative">
        <FadeIn>
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-white">
              {title}
            </h2>
            <ScrollLine className="mx-auto mt-5" />
            <p className="mt-5 text-[15px] leading-[1.75] text-white/50">{body}</p>
          </div>
        </FadeIn>

        <ImageLightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />

        <div className="relative mx-auto w-full max-w-[min(100%,1480px)]">
          <Swiper
            modules={[EffectCoverflow, Navigation, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slideToClickedSlide
            loop={items.length > 2}
            slidesPerView="auto"
            spaceBetween={-40}
            speed={900}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 38,
              stretch: -8,
              depth: 280,
              modifier: 1.05,
              slideShadows: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActive(swiper.realIndex)
            }}
            onClick={(swiper) => {
              if (swiper.clickedIndex === swiper.activeIndex) {
                setLightboxIndex(swiper.realIndex)
              }
            }}
            className="awards-coverflow"
          >
            {items.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div className="awards-slide-panel" aria-label={item.title}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-4 max-w-lg text-center"
          >
            <p className="text-[15px] font-semibold text-white">{current.title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">{current.caption}</p>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous award"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition hover:border-gold/50 hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === active ? 'w-8 bg-gold' : 'w-1.5 bg-white/25 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next award"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition hover:border-gold/50 hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] font-medium tracking-[0.2em] text-white/30 uppercase">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </p>
        </div>
      </PageContainer>
    </section>
  )
}
