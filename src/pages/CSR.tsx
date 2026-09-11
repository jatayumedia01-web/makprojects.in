import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, ScrollLine, StaggerReveal } from '../components/Motion'
import EnquireButton from '../components/mak-crm/EnquireButton'
import { PageCta, PageHero, StatStrip } from '../components/pages/PageUi'
import { PageContainer, SectionAccent, SectionBackdrop } from '../components/project/ProjectChrome'
import { csrPage } from '../data/csrPage'

export default function CSR() {
  const { hero, intro, stats, initiatives, values, cta } = csrPage

  return (
    <>
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

      {/* Initiatives */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="white" fadeBottom="mist" />
        <SectionAccent variant="fade" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-12 text-center md:mb-14">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Focus Areas
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                Where we make a difference
              </h2>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </FadeIn>

          <div className="space-y-8 md:space-y-10">
            {initiatives.map((item, i) => {
              const Icon = item.icon
              const reversed = i % 2 === 1
              return (
                <FadeIn key={item.id} delay={i * 0.06}>
                  <article className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-[0_12px_40px_rgba(7,17,14,0.06)]">
                    <div
                      className={`grid md:grid-cols-2 ${reversed ? 'md:[direction:rtl]' : ''}`}
                    >
                      <div className={`relative min-h-[220px] md:min-h-[300px] ${reversed ? 'md:[direction:ltr]' : ''}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink/10" />
                        <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-sage shadow-sm">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                      </div>

                      <div className={`flex flex-col justify-center p-7 sm:p-9 md:p-10 ${reversed ? 'md:[direction:ltr]' : ''}`}>
                        <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                          0{i + 1} · Initiative
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-[1.35rem]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[1.75] text-[#4a5560]">
                          {item.body}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {item.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2.5 text-[13px] text-stone"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              )
            })}
          </div>
        </PageContainer>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <SectionBackdrop theme="pearl" fadeBottom="cream" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                {values.eyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
                {values.title}
              </h2>
              <ScrollLine className="mx-auto mt-5" />
            </div>
          </FadeIn>

          <StaggerReveal className="grid gap-5 md:grid-cols-3 lg:gap-6" stagger={0.08}>
            {values.items.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_8px_28px_rgba(7,17,14,0.05)]"
                >
                  <div className="flex items-center gap-3 bg-ink px-5 py-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="px-5 py-6 text-[14px] leading-[1.75] text-[#4a5560] sm:px-6">
                    {item.body}
                  </p>
                </article>
              )
            })}
          </StaggerReveal>
        </PageContainer>
      </section>

      <PageCta eyebrow={cta.eyebrow} title={cta.title} body={cta.body}>
        <EnquireButton className="rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition hover:bg-gold-soft">
          Enquire Now
        </EnquireButton>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:border-gold hover:text-gold"
        >
          Contact Us <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </PageCta>
    </>
  )
}
