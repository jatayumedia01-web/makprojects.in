import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { FadeIn, ScrollLine, StaggerReveal } from '../components/Motion'
import EnquireButton from '../components/mak-crm/EnquireButton'
import AwardsGallery from '../components/pages/AwardsGallery'
import {
  FeaturedAward,
  ImageLightbox,
  PageCta,
  PageHero,
  StatStrip,
} from '../components/pages/PageUi'
import { PageContainer, SectionAccent, SectionBackdrop } from '../components/project/ProjectChrome'
import { awardsPage, type AwardItem } from '../data/awardsPage'
import { PageSeo } from '../seo/PageSeo'
import { siteSeo } from '../seo/siteSeo'

const COLLAPSE_CHAR_LIMIT = 140

function AwardMilestoneCard({ item }: { item: AwardItem }) {
  const [expanded, setExpanded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const Icon = item.icon
  const collapsible = item.body.length > COLLAPSE_CHAR_LIMIT

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold/35 bg-white shadow-[0_10px_32px_rgba(7,17,14,0.07)] ring-1 ring-gold/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(7,17,14,0.1)]">
      {item.image ? (
        <>
          <ImageLightbox
            images={[
              {
                src: item.image,
                alt: item.title,
                title: item.title,
                caption: item.year,
              },
            ]}
            index={lightboxOpen ? 0 : null}
            onClose={() => setLightboxOpen(false)}
          />
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-[#0a0a0a] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            aria-label={`View full image: ${item.title}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
                item.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'
              }`}
            />
            <div className="absolute inset-0 bg-ink/0 transition duration-300 group-hover:bg-ink/15" />
            <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase shadow-sm">
              {item.year}
            </span>
          </button>
        </>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </span>
          {!item.image ? (
            <span className="text-[11px] font-semibold tracking-[0.14em] text-stone uppercase">
              {item.year}
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>

        <div className="mt-3 flex-1">
          <p
            className={`text-[14px] leading-[1.75] text-[#4a5560] ${
              collapsible && !expanded ? 'line-clamp-4' : ''
            }`}
          >
            {item.body}
          </p>

          {collapsible ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-sage uppercase transition hover:text-ink"
            >
              {expanded ? 'Read less' : 'Read more'}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  expanded ? 'rotate-180' : ''
                }`}
                strokeWidth={2}
              />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function Awards() {
  const { hero, intro, stats, featuredAwards, gallery, pillars, awards, cta } = awardsPage

  return (
    <>
      <PageSeo {...siteSeo.awards} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      {/* Intro + stats */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="cream" fadeBottom="white" />
        <SectionAccent variant="gold" />
        <PageContainer className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <FadeIn className="lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                {intro.eyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                {intro.title}
              </h2>
              <ScrollLine className="mt-5" />
              <p className="mt-5 text-[15px] leading-[1.75] text-[#4a5560]">
                {intro.body}
              </p>
            </FadeIn>

            <FadeIn className="lg:col-span-7" delay={0.08}>
              <StatStrip stats={stats} />
            </FadeIn>
          </div>
        </PageContainer>
      </section>

      {/* Featured awards */}
      <section className="relative overflow-hidden pb-16 md:pb-20">
        <SectionBackdrop theme="white" fadeBottom="mist" />
        <PageContainer className="relative">
          <div className="space-y-10 md:space-y-14">
            {featuredAwards.map((item, index) => (
              <FadeIn key={item.year + item.title} delay={index * 0.06}>
                <FeaturedAward
                  year={item.year}
                  title={item.title}
                  presenter={item.presenter}
                  recipient={item.recipient}
                  role={item.role}
                  body={item.body}
                  images={item.images}
                  honourLabel={item.honourLabel}
                  sourceLabel={item.sourceLabel}
                />
              </FadeIn>
            ))}
          </div>
        </PageContainer>
      </section>

      <AwardsGallery
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        body={gallery.body}
        items={gallery.items}
      />

      {/* Pillars */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="mist" fadeBottom="pearl" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Why It Matters
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                Recognition built on delivery
              </h2>
              <ScrollLine className="mx-auto mt-5" />
            </div>
          </FadeIn>

          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.07}>
            {pillars.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_8px_28px_rgba(7,17,14,0.05)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/10 text-sage">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-[#4a5560]">{item.body}</p>
                </article>
              )
            })}
          </StaggerReveal>
        </PageContainer>
      </section>

      {/* Awards grid */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="pearl" fadeBottom="cream" />
        <SectionAccent variant="fade" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-12 text-center md:mb-14">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Milestones
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                Awards & achievements
              </h2>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </FadeIn>

          <StaggerReveal
            className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8"
            stagger={0.08}
          >
            {awards.map((item) => (
              <AwardMilestoneCard key={item.id} item={item} />
            ))}
          </StaggerReveal>
        </PageContainer>
      </section>

      <PageCta eyebrow={cta.eyebrow} title={cta.title} body={cta.body}>
        <EnquireButton className="rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition hover:bg-gold-soft">
          Enquire Now
        </EnquireButton>
        <Link
          to="/btr-township"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:border-gold hover:text-gold"
        >
          Explore MAK - BTR <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </PageCta>
    </>
  )
}
