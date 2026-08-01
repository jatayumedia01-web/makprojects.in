import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { FadeIn } from './Motion'

/**
 * Serenity — single cinematic apartment video
 */

const VIDEO = {
  src: '/media/serenity/videos/living.mp4',
  poster:
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
  title: 'Ready-to-move luxury living',
  blurb: '3 & 4 BHK apartments crafted for calm, everyday comfort at BTR Serenity.',
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function SerenityVideoFeatures() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [hoverUI, setHoverUI] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hideTimer = useRef<number | null>(null)
  const rafRef = useRef(0)

  const progressMv = useMotionValue(0)
  const progressSmooth = useSpring(progressMv, {
    stiffness: 100,
    damping: 26,
    mass: 0.35,
  })

  const scheduleHideUI = useCallback(() => {
    setHoverUI(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setHoverUI(false)
    }, 2600)
  }, [])

  const togglePlay = useCallback(async () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      try {
        await v.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      v.pause()
      setPlaying(false)
      setHoverUI(true)
    }
  }, [])

  const toggleFullscreen = useCallback(async () => {
    const stage = stageRef.current
    if (!stage) return
    if (!document.fullscreenElement) {
      await stage.requestFullscreen?.()
      setFullscreen(true)
    } else {
      await document.exitFullscreen?.()
      setFullscreen(false)
    }
  }, [])

  const seek = useCallback(
    (clientX: number, target: HTMLElement) => {
      const v = videoRef.current
      if (!v || !duration) return
      const rect = target.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      v.currentTime = ratio * duration
      progressMv.set(ratio)
      setCurrent(v.currentTime)
    },
    [duration, progressMv],
  )

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.src = VIDEO.src
    v.poster = VIDEO.poster
    v.muted = true
    v.loop = true
    v.load()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const v = videoRef.current
    if (!section || !v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false))
        } else {
          v.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.35 },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
  }, [muted])

  useEffect(() => {
    const tick = () => {
      const v = videoRef.current
      if (v && !v.paused && v.duration) {
        setCurrent(v.currentTime)
        setDuration(v.duration)
        progressMv.set(v.currentTime / v.duration)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [progressMv])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [])

  const showUI = hoverUI || !playing

  return (
    <section
      ref={sectionRef}
      id="video-features"
      data-section="SerenityVideoFeatures"
      className="relative overflow-hidden py-14 md:py-20"
    >
      <div className="absolute inset-0 bg-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(31,107,85,0.18),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-10 md:mb-12">
            <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
              Ready to move-in
            </p>
            <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.75rem)] font-bold tracking-[0.04em] text-cream uppercase">
              BTR Serenity
            </h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/50">
              Tour ready-to-move 3 &amp; 4 BHK homes — living spaces and everyday
              luxury at Serenity.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            ref={stageRef}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            onMouseMove={scheduleHideUI}
            onMouseEnter={() => setHoverUI(true)}
            onMouseLeave={() => playing && setHoverUI(false)}
          >
            <div className="relative aspect-[16/10] w-full md:aspect-[21/10] lg:aspect-[2.2/1]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                muted={muted}
                loop
                poster={VIDEO.poster}
                onClick={() => void togglePlay()}
                onLoadedMetadata={(e) =>
                  setDuration(e.currentTarget.duration || 0)
                }
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />

              <motion.div
                initial={false}
                animate={{ opacity: showUI ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className={`absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 ${
                  showUI ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <div className="mb-4 max-w-lg">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-gold uppercase">
                    Apartment tour
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {VIDEO.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/60">
                    {VIDEO.blurb}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Seek"
                  className="group relative mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/20"
                  onClick={(e) => seek(e.clientX, e.currentTarget)}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left rounded-full bg-gold"
                    style={{ scaleX: progressSmooth }}
                  />
                </button>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void togglePlay()}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
                      aria-label={playing ? 'Pause' : 'Play'}
                    >
                      {playing ? (
                        <Pause className="h-4 w-4" fill="currentColor" />
                      ) : (
                        <Play
                          className="h-4 w-4 translate-x-0.5"
                          fill="currentColor"
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                      {muted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <p className="ml-1 hidden text-[11px] tracking-wide text-white/50 sm:block">
                      {formatTime(current)} / {formatTime(duration)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => void toggleFullscreen()}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
                    aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {fullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
