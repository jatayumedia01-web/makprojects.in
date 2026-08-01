import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, FileDown, ChevronDown, Volume2, VolumeX } from 'lucide-react'

const LOCAL_VIDEO = '/media/home/hero.mp4'
const POSTER = '/media/home/hero-poster.png'

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
        <source src={LOCAL_VIDEO} type="video/mp4" />
      </video>

      <div className="hero-cinematic pointer-events-none absolute inset-0" />
      <div className="gold-shimmer pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Hyderabad · Ready to Move
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white"
            >
              Experience
              <br />
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                Luxury Living
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
              className="mt-5 max-w-xl text-base font-light tracking-[0.12em] text-white/80 uppercase sm:text-lg"
            >
              Explore Our Exclusive Listings
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="tel:+919912797979"
                className="glass-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition duration-300"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Request
              </a>
              <a
                href="mailto:info@makprojects.com?subject=Brochure%20Request"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg shadow-black/25 transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <FileDown className="h-3.5 w-3.5" />
                Download Brochure
              </a>
              <Link
                to="/projects"
                className="ml-1 text-xs font-medium tracking-[0.14em] text-white/75 uppercase underline-offset-4 transition hover:text-gold-soft hover:underline"
              >
                View projects →
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="ml-auto max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-[10px] tracking-[0.25em] text-gold-soft uppercase">
                Featured
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                BTR Serenity
              </p>
              <p className="mt-1 text-sm text-white/65">
                3 & 4 BHK · Ready to Move-In · RERA Approved
              </p>
              <Link
                to="/btr-serenity"
                className="mt-4 inline-flex text-xs font-semibold tracking-wider text-gold uppercase"
              >
                Discover →
              </Link>
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
          <span>Srisailam Highway</span>
          <span className="hidden h-1 w-1 rounded-full bg-gold/70 sm:inline-block" />
          <span>Golf Community</span>
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
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </a>
    </section>
  )
}
