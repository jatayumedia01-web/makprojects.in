import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, ScrollLine, StaggerReveal } from '../components/Motion'
import EnquireButton from '../components/mak-crm/EnquireButton'
import {
  FeaturedQuote,
  PageCta,
  PageHero,
  StatStrip,
  TestimonialCard,
} from '../components/pages/PageUi'
import { PageContainer, SectionAccent, SectionBackdrop } from '../components/project/ProjectChrome'
import { testimonialsPage } from '../data/testimonialsPage'
import { PageSeo } from '../seo/PageSeo'
import { siteSeo } from '../seo/siteSeo'

export default function Testimonials() {
  const { hero, intro, stats, featured, testimonials, cta } = testimonialsPage

  return (
    <>
      <PageSeo {...siteSeo.testimonials} />
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

      {/* Featured quote */}
      <section className="relative overflow-hidden pb-16 md:pb-22">
        <SectionBackdrop theme="white" fadeBottom="mist" />
        <PageContainer className="relative">
          <FadeIn>
            <FeaturedQuote
              quote={featured.quote}
              name={featured.name}
              role={featured.role}
              project={featured.project}
            />
          </FadeIn>
        </PageContainer>
      </section>

      {/* Testimonials grid */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="mist" fadeBottom="pearl" />
        <SectionAccent variant="fade" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-12 text-center md:mb-14">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                What Residents Say
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                Stories from our communities
              </h2>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </FadeIn>

          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.07}>
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                name={t.name}
                project={t.project}
                featured={t.featured}
              />
            ))}
          </StaggerReveal>
        </PageContainer>
      </section>

      <PageCta eyebrow={cta.eyebrow} title={cta.title} body={cta.body}>
        <EnquireButton className="rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition hover:bg-gold-soft">
          Enquire Now
        </EnquireButton>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:border-gold hover:text-gold"
        >
          View Projects <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </PageCta>
    </>
  )
}
