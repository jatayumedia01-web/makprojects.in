import EnquireButton from './mak-crm/EnquireButton'
import {
  ArrowUpRight,
  Download,
  Heart,
  Leaf,
  MapPin,
  Shield,
  Sparkles,
} from 'lucide-react'
import { FadeIn } from './Motion'
import {
  serenityBrochure,
  serenityDetails,
  serenityExperience,
  serenityHero,
  serenityMedia,
  serenityOverview,
} from '../data/serenityPage'

const experienceIcons = [Sparkles, Heart, Shield, Leaf] as const

const detailRows = serenityDetails.filter((d) => d.label !== 'RERA ID')
const reraDetail = serenityDetails.find((d) => d.label === 'RERA ID')

export default function SerenityOverview() {
  return (
    <div className="relative site-container px-5">
      {/* Brand lockup — BTR — Serenity primary, tagline secondary */}
      <FadeIn>
        <header className="serenity-overview-head mb-8 md:mb-10">
          <p className="text-center text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
            {serenityOverview.eyebrow}
          </p>

          <h2 className="serenity-brand-lockup mt-4 text-center">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-stone uppercase sm:text-xs">
              MAK Projects · MAK — BTR
            </span>
            <span className="serenity-brand-row mt-3 inline-flex items-baseline justify-center gap-x-2">
              <span className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-ink">
                {serenityHero.titleLead}
              </span>
              <span className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-sage">
                {serenityHero.titleAccent}
              </span>
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-center text-[15px] font-medium leading-relaxed text-stone sm:text-base">
            {serenityOverview.title}
          </p>

          <div
            className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden
          />
        </header>
      </FadeIn>

      {/* Single unified panel — image + details + about (no floating boxes) */}
      <FadeIn delay={0.05}>
        <article className="serenity-overview-panel overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white shadow-[0_16px_48px_rgba(7,17,14,0.08)]">
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            {/* Elevation — edge-to-edge, fills column height */}
            <div className="relative min-h-[240px] bg-[#ebe6de] sm:min-h-[300px] lg:min-h-[420px]">
              <img
                src={serenityMedia.hero}
                alt="BTR Serenity elevation"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>

            {/* Project details — compact, matched height */}
            <div className="flex flex-col bg-[#0c1612] px-6 py-7 text-cream sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                Project details
              </p>
              <dl className="mt-5 grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
                {detailRows.map((d) => (
                  <div key={d.label}>
                    <dt className="text-[11px] font-medium text-gold/80">
                      {d.label}
                    </dt>
                    <dd className="mt-1 text-[15px] font-semibold leading-snug text-cream">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {reraDetail ? (
                <div className="mt-5 border-t border-cream/10 pt-5">
                  <p className="text-[11px] font-medium text-gold/80">
                    {reraDetail.label}
                  </p>
                  <p className="mt-1 font-mono text-[14px] font-medium text-cream/90">
                    {reraDetail.value}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* About + CTAs — continuation of same card */}
          <div className="grid border-t border-ink/[0.06] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-sage uppercase">
                {serenityOverview.aboutTitle}
              </p>
              <p className="mt-3 max-w-3xl text-[16px] font-normal leading-[1.75] text-ink/80">
                {serenityOverview.body}
              </p>
              <p className="mt-4 flex items-start gap-2 text-[14px] text-stone">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                  strokeWidth={2}
                />
                {serenityHero.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-ink/[0.06] px-6 py-6 sm:px-8 lg:flex-col lg:border-t-0 lg:border-l lg:py-8 lg:pr-8">
              <EnquireButton className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[12px] font-semibold tracking-wide text-cream transition hover:bg-sage">
                Enquire now
                <ArrowUpRight className="h-4 w-4" />
              </EnquireButton>
              <a
                href={serenityBrochure.pdf}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-[12px] font-semibold tracking-wide text-ink transition hover:border-sage/40 hover:text-sage"
              >
                <Download className="h-4 w-4" />
                Brochure
              </a>
            </div>
          </div>

          {/* Experience — single connected strip, not 4 separate boxes */}
          <ul className="grid divide-y divide-ink/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {serenityExperience.map((line, i) => {
              const Icon = experienceIcons[i] ?? Sparkles
              return (
                <li
                  key={line}
                  className="flex items-center gap-3.5 px-5 py-5 sm:px-6 sm:py-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-ink">
                    {line}
                  </span>
                </li>
              )
            })}
          </ul>
        </article>
      </FadeIn>
    </div>
  )
}
