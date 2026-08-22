import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Loader2,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { FadeIn } from './Motion'
import { serenityMedia } from '../data/serenityPage'

type VideoClip = {
  id: string
  src: string
  poster: string
  label: string
  title: string
  blurb: string
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Serenity — cinematic featured video (+ optional extra clips) */
export default function SerenityVideoFeatures() {
  const clips = useMemo<VideoClip[]>(() => {
    const main: VideoClip = {
      id: 'featured',
      src: serenityMedia.featuredVideo.src,
      poster: serenityMedia.featuredVideo.poster,
      label: 'Tour',
      title: serenityMedia.featuredVideo.title,
      blurb: serenityMedia.featuredVideo.blurb,
    }
    return [main, ...serenityMedia.extraVideos]
  }, [])

  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [hoverUI, setHoverUI] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hideTimer = useRef<number | null>(null)
  const rafRef = useRef(0)

  const clip = clips[active] ?? clips[0]
  const showTabs = clips.length > 1
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
    if (!v || loadError) return
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
  }, [loadError])

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

  const switchClip = useCallback(
    (index: number) => {
      setActive(index)
      setCurrent(0)
      setDuration(0)
      setReady(false)
      setLoadError(false)
      progressMv.set(0)
      setPlaying(false)
      setHoverUI(true)
    },
    [progressMv],
  )

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    setReady(false)
    setLoadError(false)
    v.src = clip.src
    v.poster = clip.poster
    v.muted = muted
    v.loop = true
    v.load()
  }, [clip.src, clip.poster, muted])

  useEffect(() => {
    const section = sectionRef.current
    const v = videoRef.current
    if (!section || !v) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (loadError) return
        if (entry.isIntersecting && ready) {
          v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          v.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.35 },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [active, ready, loadError])

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
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = 0
      }
    }
    if (playing) {
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, progressMv])

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

  const showUI = hoverUI || !playing || loadError

  return (
    <section
      ref={sectionRef}
      id="serenity-video"
      data-section="SerenityVideoFeatures"
      className="relative scroll-mt-36 overflow-hidden py-14 md:py-20"
    >
      <div className="absolute inset-0 bg-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(31,107,85,0.18),_transparent_50%)]" />

      <div className="relative site-container px-5">
        <FadeIn>
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
              Virtual tour
            </p>
            <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.75rem)] font-bold tracking-[0.04em] text-cream uppercase">
              Experience Serenity
            </h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/50">
              {serenityMedia.featuredVideo.blurb}
            </p>
          </div>
        </FadeIn>

        {showTabs ? (
          <FadeIn delay={0.06}>
            <div
              className="mb-5 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Video tour clips"
            >
              {clips.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => switchClip(i)}
                  className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition ${
                    active === i
                      ? 'bg-gold text-ink shadow-md'
                      : 'border border-white/20 bg-white/10 text-cream/80 hover:bg-white/15'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </FadeIn>
        ) : null}

        <FadeIn>
          <div
            ref={stageRef}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            onMouseMove={scheduleHideUI}
            onMouseEnter={() => setHoverUI(true)}
            onMouseLeave={() => playing && setHoverUI(false)}
          >
            <div className="relative aspect-video w-full bg-ink sm:aspect-[16/9] lg:aspect-[21/9]">
              <img
                src={clip.poster}
                alt=""
                aria-hidden
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  ready && !loadError ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {!loadError ? (
                <video
                  ref={videoRef}
                  key={clip.id}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    ready ? 'opacity-100' : 'opacity-0'
                  }`}
                  playsInline
                  muted={muted}
                  loop
                  preload="metadata"
                  poster={clip.poster}
                  onClick={() => void togglePlay()}
                  onLoadedData={() => {
                    setReady(true)
                    setLoadError(false)
                  }}
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration || 0)
                  }
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onError={() => {
                    setLoadError(true)
                    setReady(false)
                    setPlaying(false)
                  }}
                />
              ) : null}

              {!ready && !loadError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
                  <Loader2 className="h-10 w-10 animate-spin text-gold/80" />
                </div>
              ) : null}

              {loadError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/80 px-6 text-center">
                  <p className="text-sm font-medium text-cream/90">
                    Project walkthrough video coming soon
                  </p>
                  <p className="max-w-sm text-[11px] leading-relaxed text-cream/45">
                    BTR Serenity virtual tour will be available here shortly.
                  </p>
                </div>
              ) : null}

              {!loadError && !playing && ready ? (
                <button
                  type="button"
                  onClick={() => void togglePlay()}
                  className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-gold hover:text-ink sm:h-20 sm:w-20"
                  aria-label="Play video"
                >
                  <Play className="h-7 w-7 translate-x-0.5 sm:h-8 sm:w-8" fill="currentColor" />
                </button>
              ) : null}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />

              {!loadError ? (
                <motion.div
                  initial={false}
                  animate={{ opacity: showUI ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                  className={`absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 ${
                    showUI ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  <div className="mb-4 max-w-lg">
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                      {clip.label}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {clip.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Seek video"
                    className="relative mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/20"
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
                      aria-label={
                        fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
                      }
                    >
                      {fullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
