import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { FadeIn } from '../components/Motion'
import { ScrollSection } from '../components/ScrollSection'
import SerenityFAQ from '../components/SerenityFAQ'
import EnquireButton from '../components/mak-crm/EnquireButton'
import ProjectBrandSlider from '../components/ProjectBrandSlider'
import SerenityGallery from '../components/SerenityGallery'
import SerenityAmenities from '../components/SerenityAmenities'
import SerenityFloorPlans from '../components/SerenityFloorPlans'
import SerenityOverview from '../components/SerenityOverview'
import SerenitySpecifications from '../components/SerenitySpecifications'
import SerenityVideoFeatures from '../components/SerenityVideoFeatures'
import {
  CardShell,
  SectionAccent,
  SectionBackdrop,
  SectionHead,
} from '../components/project/ProjectChrome'
import { serenityBrochure, serenityChapters, serenityConnectivity, serenityHero, serenityMap, serenityMedia, type SerenityChapterId } from '../data/serenityPage'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Serenity() {
  const [active, setActive] = useState<SerenityChapterId>('serenity-overview')
  const reduce = useReducedMotion()
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  const [heroMuted, setHeroMuted] = useState(true)

  useEffect(() => {
    if (reduce) return
    const el = heroVideoRef.current
    if (!el) return
    el.muted = heroMuted
    el.playsInline = true
    const play = () => {
      el.play().catch(() => {})
    }
    play()
    el.addEventListener('loadeddata', play)
    return () => el.removeEventListener('loadeddata', play)
  }, [heroMuted, reduce])

  function toggleHeroMute() {
    const el = heroVideoRef.current
    if (!el) return
    el.muted = !el.muted
    setHeroMuted(el.muted)
    el.play().catch(() => {})
  }

  useEffect(() => {
    const nodes = serenityChapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActive(visible.target.id as SerenityChapterId)
        }
      },
      { rootMargin: '-32% 0px -48% 0px', threshold: [0.1, 0.28, 0.5] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero — video + focused CTAs */}
      <section className="relative h-[82vh] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-ink md:h-[88vh]">
        <img
          src={serenityMedia.featuredVideo.poster}
          alt=""
          aria-hidden
          className={`serenity-hero-media absolute inset-0 h-full w-full transition-opacity duration-700 ${
            heroVideoReady && !reduce ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {!reduce ? (
          <video
            ref={heroVideoRef}
            className={`serenity-hero-media absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted={heroMuted}
            loop
            playsInline
            preload="auto"
            poster={serenityMedia.featuredVideo.poster}
            onCanPlay={() => setHeroVideoReady(true)}
          >
            <source src={serenityMedia.featuredVideo.src} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            initial={false}
            animate={{ scale: 1 }}
            src={serenityMedia.hero}
            alt="BTR Serenity"
            fetchPriority="high"
            className="serenity-hero-media absolute inset-0 h-full w-full"
          />
        )}

        <div className="serenity-hero-overlay pointer-events-none absolute inset-0" />

        <div className="relative z-10 site-container-hero flex h-full flex-col justify-end px-6 pb-20 pt-28 sm:px-10 lg:px-14 lg:pb-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-xl lg:max-w-2xl"
          >
            <Link
              to="/btr-township"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-sm transition hover:border-gold/40 hover:bg-black/40"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {serenityHero.badge}
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </Link>

            <p className="serenity-hero-copy text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
              {serenityHero.status} · Srisailam Highway
            </p>

            <h1 className="serenity-hero-copy mt-3 text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white uppercase">
              {serenityHero.titleLead}{' '}
              <span className="serenity-hero-title-accent">
                {serenityHero.titleAccent}
              </span>
            </h1>

            <div className="mt-4 h-px w-36 bg-gradient-to-r from-gold to-transparent" />
            <p className="serenity-hero-copy mt-4 max-w-lg text-base leading-relaxed text-white/90">
              {serenityHero.body}
            </p>
            <p className="serenity-hero-copy mt-3 text-[11px] tracking-[0.12em] text-white/65 uppercase">
              RERA {serenityHero.rera}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <EnquireButton className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.14em] text-ink uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-soft">
                  Schedule a visit <ArrowUpRight className="h-3.5 w-3.5" />
                </EnquireButton>
                <a
                  href="#serenity-plans"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-7 py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm transition hover:bg-white hover:text-ink"
                >
                  Explore plans
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
                <a
                  href={serenityBrochure.pdf}
                  download
                  className="inline-flex items-center gap-1.5 text-white/75 transition hover:text-gold-soft"
                >
                  <Download className="h-3.5 w-3.5" />
                  {serenityBrochure.label}
                </a>
                <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
                <Link
                  to="/btr-township"
                  className="text-white/75 transition hover:text-gold-soft"
                >
                  BTR Township →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <a
          href="#serenity-overview"
          className="scroll-cue absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 md:block"
          aria-label="Scroll to overview"
        >
          <ArrowDown className="h-4 w-4" />
        </a>

        {!reduce ? (
          <button
            type="button"
            onClick={toggleHeroMute}
            aria-label={heroMuted ? 'Unmute hero video' : 'Mute hero video'}
            className="absolute right-6 top-28 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-gold hover:text-ink sm:right-10 lg:top-32"
          >
            {heroMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </section>

      {/* Sticky chapter nav */}
      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-30 border-b border-ink/6 bg-cream/90 backdrop-blur-xl"
      >
        <div className="site-container flex snap-x snap-mandatory gap-1 overflow-x-auto px-5 py-2.5 scrollbar-none sm:snap-none sm:justify-center sm:px-8">
          {serenityChapters.map((item) => {
            const on = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative shrink-0 snap-center px-3 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition sm:px-4 ${
                  on ? 'text-ink' : 'text-stone hover:text-ink'
                }`}
              >
                {item.label}
                {on ? (
                  <motion.span
                    layoutId="serenityNavLine"
                    className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-gold sm:inset-x-3"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                ) : null}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Overview — elevation, details, about, pillars */}
      <ScrollSection
        id="serenity-overview"
        index={0}
        bridge={false}
        className="relative scroll-mt-36 overflow-hidden py-12 md:py-20"
      >
        <SectionBackdrop theme="white" fadeBottom="pearl" />
        <SectionAccent variant="fade" />
        <SerenityOverview />
      </ScrollSection>
      <SerenityVideoFeatures />
      <SerenityGallery />
      <SerenityFloorPlans />

      <SerenityAmenities />
      <SerenitySpecifications />

      {/* Map */}
      <ScrollSection
        id="serenity-map"
        index={5}
        className="relative scroll-mt-36 overflow-hidden bg-ink py-14 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Location" title="Connectivity" light />
            <p className="-mt-6 mb-10 text-center text-sm text-cream/55 md:-mt-8 md:mb-12">
              {serenityMap.line}
            </p>
          </FadeIn>

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            <FadeIn className="h-full lg:col-span-8">
              <div className="relative h-full min-h-[340px]">
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/45 via-[#1a2e28] to-sage/35 opacity-80" />
                <div className="absolute inset-0 overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <iframe
                    title="BTR Serenity location map"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={serenityMap.embed}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/55 to-transparent" />
                  <a
                    href={serenityMap.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-cream uppercase backdrop-blur-md transition hover:bg-gold hover:text-ink"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Open in Maps
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.06} className="lg:col-span-4">
              <div className="group relative h-full min-h-[280px]">
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/40 via-[#1a2e28] to-sage/30 opacity-75" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612]/95 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <h3 className="text-[11px] font-bold tracking-[0.18em] text-cream uppercase">
                      Quick reach
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {serenityConnectivity.map((line) => (
                      <li
                        key={line}
                        className="flex items-center gap-3 text-[14px] text-cream/75"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </ScrollSection>

      <SerenityFAQ />

      {/* CTA */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="site-container max-w-3xl px-5">
          <FadeIn>
            <CardShell dark>
              <div className="relative px-8 py-12 text-center md:px-12 md:py-14">
                <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sage/25 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 top-1/3 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  Ready to move in
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-tight text-cream">
                  Experience BTR Serenity
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-cream/55">
                  Schedule a site visit or speak with our team about available 3
                  &amp; 4 BHK homes.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <EnquireButton className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:-translate-y-0.5 hover:bg-gold-soft">
                    Contact us <ArrowUpRight className="h-3.5 w-3.5" />
                  </EnquireButton>
                  <a
                    href={serenityBrochure.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:border-gold/40 hover:text-gold-soft"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {serenityBrochure.label}
                  </a>
                  <a
                    href="#serenity-plans"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:border-gold/40 hover:text-gold-soft"
                  >
                    View floor plans
                  </a>
                </div>
              </div>
            </CardShell>
          </FadeIn>
        </div>
      </section>

      <ProjectBrandSlider />
    </>
  )
}
