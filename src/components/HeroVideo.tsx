import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FileDown, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { FERN_SITE_URL, prefetchFernSite } from '../utils/prefetchFern'
import EnquireButton from './mak-crm/EnquireButton'

const FERN_VIDEO = '/fern/assets/videos/fern-walkthrough.mp4'
const POSTER = '/fern/assets/images/aerial_view.jpg'
const FERN_BROCHURE = '/fern/assets/brochure/fern_brochure.pdf'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [muted, setMuted] = useState(true)

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

  useEffect(() => {
    const t = window.setTimeout(prefetchFernSite, 800)
    return () => window.clearTimeout(t)
  }, [])

  function toggleMute() {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
    el.play().catch(() => {})
  }

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
      <img
        src={POSTER}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <video
        ref={videoRef}
        className={`video-ken absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        onCanPlay={() => setReady(true)}
      >
        <source src={FERN_VIDEO} type="video/mp4" />
      </video>

      <div className="hero-cinematic pointer-events-none absolute inset-0" />
      <div className="gold-shimmer pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light" />

      <div className="relative z-10 site-container-hero flex h-full flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="max-w-3xl lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[16px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              Fern by MAK Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
            >
              Bespoke{' '}
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                Triplex Villas
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-6 h-px w-40 origin-left bg-gradient-to-r from-gold to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-5 max-w-2xl text-[13px] font-medium leading-relaxed tracking-[0.18em] text-white/85 uppercase sm:text-sm sm:tracking-[0.2em]"
            >
              Timeless design. Inspired by nature. Made for you.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.72 }}
              className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-light tracking-[0.12em] text-white/70 sm:text-[15px]"
            >
              <span className="hidden h-4 w-px bg-white/25 sm:inline-block" aria-hidden />
              <span className="font-medium text-gold-soft">@Tukkuguda</span>
              <span className="text-white/40">·</span>
              <span>4 BHK + Home Theater Villas</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <EnquireButton className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition duration-300 hover:bg-white hover:text-ink">
                Enquire now
              </EnquireButton>
              <a
                href={FERN_BROCHURE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg shadow-black/25 transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <FileDown className="h-3.5 w-3.5" />
                Download Brochure
              </a>
              <a
                href={FERN_SITE_URL}
                onMouseEnter={prefetchFernSite}
                onFocus={prefetchFernSite}
                className="ml-1 text-xs font-medium tracking-[0.14em] text-white/75 uppercase underline-offset-4 transition hover:text-gold-soft hover:underline"
              >
                Explore Fern →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="ml-auto max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-[11px] tracking-[0.25em] text-gold-soft uppercase">
                Featured
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Fern by MAK Projects
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/65">
                4 BHK + Home Theater Villas · Tukkuguda · 5 mins from ORR
              </p>
              <a
                href={FERN_SITE_URL}
                onMouseEnter={prefetchFernSite}
                onFocus={prefetchFernSite}
                className="mt-4 inline-flex text-xs font-semibold tracking-wider text-gold uppercase"
              >
                Discover →
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-[11px] tracking-[0.18em] text-white/55 uppercase"
        >
          <span>RERA Approved</span>
          <span className="hidden h-1 w-1 rounded-full bg-gold/70 sm:inline-block" />
          <span>Tukkuguda · Hyderabad</span>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-8 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-ink sm:right-10"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <a
        href="#welcome-section"
        className="scroll-cue absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/50 sm:flex"
        aria-label="Scroll down"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </a>
    </section>
  )
}
