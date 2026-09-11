import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import {
  FadeIn,
  ParallaxBlock,
  ScrollLine,
  StaggerReveal,
} from '../Motion'
import { btrClubhouse } from '../../data/content'
import {
  ClubGalleryLightbox,
  ClubPhotoTile,
  useClubLightbox,
} from './ClubGalleryParts'

/** MAK - BTR Club - video + clean photo gallery */
export default function BtrClubShowcase({
  id = 'township-clubhouse',
}: {
  id?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [muted, setMuted] = useState(true)
  const images = btrClubhouse.images
  const { lightbox, open, close, step } = useClubLightbox(images)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = muted
    el.playsInline = true
    const play = () => {
      el.play().catch(() => {})
    }
    play()
    el.addEventListener('loadeddata', play)
    return () => el.removeEventListener('loadeddata', play)
  }, [muted])

  function toggleMute() {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
    el.play().catch(() => {})
  }

  return (
    <>
      <section
        id={id}
        className="relative scroll-mt-36 overflow-hidden bg-ink py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f0e9df]/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.14),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,_rgba(12,36,28,0.8),_transparent_50%)]" />

        <div className="relative site-container px-5">
          <FadeIn>
            <div className="mb-8 text-center md:mb-10">
              <FadeIn delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  {btrClubhouse.eyebrow}
                </p>
              </FadeIn>
              <FadeIn delay={0.12} distance={36}>
                <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.55rem)] font-bold tracking-[0.06em] text-cream uppercase">
                  {btrClubhouse.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
                  {btrClubhouse.subtitle}
                </p>
              </FadeIn>
              <ScrollLine className="mt-5" />
            </div>
          </FadeIn>

          <FadeIn delay={0.06} scale={0.98}>
            <ParallaxBlock strength={28}>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[16/10] w-full bg-ink sm:aspect-[2/1] lg:aspect-[21/9]">
                  <img
                    src={btrClubhouse.poster}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                      ready ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                      ready ? 'opacity-100' : 'opacity-0'
                    }`}
                    autoPlay
                    muted={muted}
                    loop
                    playsInline
                    controls
                    preload="auto"
                    poster={btrClubhouse.poster}
                    onCanPlay={() => setReady(true)}
                  >
                    <source src={btrClubhouse.video} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/5" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7 md:p-8">
                    <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
                      {btrClubhouse.videoCaption}
                    </p>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                      aria-label={muted ? 'Unmute video' : 'Mute video'}
                    >
                      {muted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxBlock>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 md:mt-14">
              <p className="mb-6 text-center text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
                Club Gallery
              </p>
              <StaggerReveal
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[640px] lg:grid-cols-12 lg:grid-rows-2 lg:gap-5"
                stagger={0.1}
              >
                {images.map((item, index) => (
                  <div
                    key={item.id}
                    className={`h-[260px] sm:col-span-1 ${
                      index === 0
                        ? 'sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:h-full'
                        : index === 1 || index === 2
                          ? 'lg:col-span-5 lg:h-full'
                          : 'lg:col-span-6 lg:h-full'
                    }`}
                  >
                    <ClubPhotoTile
                      item={item}
                      index={index}
                      theme="dark"
                      className="h-full"
                      onOpen={open}
                    />
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </FadeIn>
        </div>
      </section>

      <ClubGalleryLightbox
        items={images}
        lightbox={lightbox}
        onClose={close}
        onStep={step}
      />
    </>
  )
}
