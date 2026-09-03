import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import EnquireButton from '../mak-crm/EnquireButton'
import { FadeIn } from '../Motion'
import FAQ from '../FAQ'
import {
  CardShell,
  SectionHead,
  SoftScene,
} from './ProjectChrome'
import {
  metricIcons,
  nearby,
  type ProjectPageData,
} from '../../data/projectPages'

const MAP_EMBED =
  'https://maps.google.com/maps?q=Thummalur%20Maheswaram%20Srisailam%20Highway%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed'
const MAP_LINK =
  'https://maps.google.com/?q=Thummalur+Maheswaram+Srisailam+Highway+Hyderabad'

/**
 * Advanced project page — Serenity-parity card UI system.
 * Driven by ProjectPageData for all non-Serenity project routes.
 */
export default function AdvancedProjectPage({
  data,
}: {
  data: ProjectPageData
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[72vh] min-h-[480px] overflow-hidden bg-ink md:h-[78vh]">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src={data.heroImage}
          alt={`${data.titleLead} ${data.titleAccent}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

        <div className="relative z-10 site-container-hero flex h-full flex-col justify-end px-6 pb-14 pt-28 sm:px-10 lg:px-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {data.badge}
            </p>
            <h1 className="text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white uppercase">
              {data.titleLead}{' '}
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                {data.titleAccent}
              </span>
            </h1>
            <div className="mt-5 h-px w-36 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              {data.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EnquireButton className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-soft">
                Schedule a visit <ArrowUpRight className="h-3.5 w-3.5" />
              </EnquireButton>
              {data.secondaryCta ? (
                data.secondaryCta.href.startsWith('/') ? (
                  data.secondaryCta.href === '/contact' ? (
                    <EnquireButton className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition hover:bg-white hover:text-ink">
                      {data.secondaryCta.label}
                    </EnquireButton>
                  ) : (
                    <Link
                      to={data.secondaryCta.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition hover:bg-white hover:text-ink"
                    >
                      {data.secondaryCta.label}
                    </Link>
                  )
                ) : (
                  <a
                    href={data.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition hover:bg-white hover:text-ink"
                  >
                    {data.secondaryCta.label}
                  </a>
                )
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative overflow-hidden">
        <SoftScene />
        <div className="relative site-container px-5 py-10 md:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {data.metrics.map((m, i) => {
              const Icon = metricIcons[m.icon]
              return (
                <FadeIn key={m.label} delay={i * 0.06}>
                  <CardShell>
                    <div className="flex items-center gap-4 px-5 py-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-2xl font-bold tracking-tight text-ink">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold tracking-[0.16em] text-stone uppercase">
                          {m.label}
                        </p>
                      </div>
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative overflow-hidden pb-12 md:pb-16">
        <SoftScene />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead
              eyebrow={data.overviewEyebrow}
              title={data.overviewTitle}
            />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-7">
            <FadeIn className="lg:col-span-7">
              <CardShell>
                <div className="relative px-6 py-7 sm:px-8 sm:py-8">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                    About the project
                  </p>
                  <p className="mt-4 text-justify text-[15px] leading-[1.8] text-[#4a5560]">
                    {data.overviewBody}
                  </p>
                  <p className="mt-5 flex items-start gap-2 text-sm text-stone">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                    {data.locationLine}
                  </p>
                  <EnquireButton className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-sage">
                    Enquire now <ArrowUpRight className="h-3.5 w-3.5" />
                  </EnquireButton>
                </div>
              </CardShell>
            </FadeIn>

            <FadeIn delay={0.08} className="lg:col-span-5">
              <CardShell dark>
                <div className="relative px-6 py-7 md:px-7">
                  <p className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
                    Project details
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {data.details.map((d) => (
                      <div
                        key={d.label}
                        className="border-t border-cream/12 pt-3"
                      >
                        <p className="text-[11px] tracking-[0.14em] text-gold/70 uppercase">
                          {d.label}
                        </p>
                        <p className="mt-1 text-[15px] font-semibold tracking-tight text-cream">
                          {d.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardShell>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Offerings (parent projects e.g. Township → Serenity / Gardenia / Villas / Canadian) */}
      {data.offerings ? (
        <section id="offerings" className="relative overflow-hidden pb-12 md:pb-16">
          <SoftScene />
          <div className="relative site-container px-5">
            <FadeIn>
              <SectionHead
                eyebrow={data.offerings.eyebrow}
                title={data.offerings.title}
              />
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="mx-auto mb-8 max-w-2xl text-center text-[15px] leading-relaxed text-[#4a5560]">
                {data.offerings.body}
              </p>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              {data.offerings.items.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.08}>
                  <Link to={item.href} className="group block h-full">
                    <CardShell>
                      <div className="overflow-hidden">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                          <span className="absolute bottom-4 left-4 rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-ink uppercase">
                            {item.status}
                          </span>
                        </div>
                        <div className="px-6 py-6">
                          <h3 className="text-xl font-bold tracking-tight text-ink">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#4a5560]">
                            {item.subtitle}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-sage uppercase transition group-hover:text-ink">
                            View details <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </CardShell>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="bg-white py-12 md:py-16">
        <div className="site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Gallery" title={data.galleryTitle} />
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.gallery.map((g, i) => (
              <FadeIn key={g.src} delay={i * 0.05}>
                <CardShell>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[11px] font-bold tracking-[0.22em] text-white uppercase">
                      {g.label}
                    </span>
                  </div>
                </CardShell>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Size / config cards */}
      {data.sizeSection ? (
        <section
          id="plot-sizes"
          className="relative scroll-mt-28 overflow-hidden py-12 md:py-16"
        >
          <SoftScene />
          <div className="relative site-container px-5">
            <FadeIn>
              <SectionHead
                eyebrow={data.sizeSection.eyebrow}
                title={data.sizeSection.title}
              />
            </FadeIn>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.sizeSection.items.map((item, i) => (
                <FadeIn key={`${item.size}-${item.unit}`} delay={i * 0.04}>
                  <CardShell>
                    <div className="relative flex h-full flex-col px-5 py-6">
                      {item.tag ? (
                        <span className="mb-4 inline-flex w-fit rounded-full bg-mist px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-sage uppercase">
                          {item.tag}
                        </span>
                      ) : null}
                      <p className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        {item.size}
                        <span className="ml-1.5 text-sm font-semibold text-stone">
                          {item.unit}
                        </span>
                      </p>
                      <div className="my-3 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                      <p className="mt-auto text-sm text-stone">{item.note}</p>
                      <span className="mt-4 inline-block h-1 w-8 rounded-full bg-ink/10 transition duration-500 group-hover:w-12 group-hover:bg-gold" />
                    </div>
                  </CardShell>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Amenities */}
      <section className="bg-white py-12 md:py-16">
        <div className="site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Lifestyle" title="Amenities" />
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
            {data.amenities.map((a, i) => {
              const Icon = metricIcons[a.icon]
              return (
                <FadeIn key={a.name} delay={i * 0.03}>
                  <CardShell>
                    <div className="relative flex flex-col px-4 py-5 sm:px-5 sm:py-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md transition duration-500 group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 text-[11px] font-bold tracking-tight text-ink sm:text-sm">
                        {a.name}
                      </p>
                      <span className="mt-3 inline-block h-1 w-8 rounded-full bg-ink/10 transition duration-500 group-hover:w-12 group-hover:bg-gold" />
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="relative overflow-hidden bg-ink py-14 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Location" title="Connectivity" light />
            <p className="-mt-6 mb-10 text-center text-sm text-cream/55 md:-mt-8 md:mb-12">
              {data.locationLine}
            </p>
          </FadeIn>

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            <FadeIn className="h-full lg:col-span-7">
              <div className="relative h-full min-h-[340px]">
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/45 via-[#1a2e28] to-sage/35 opacity-80" />
                <div className="absolute inset-0 overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <iframe
                    title={`${data.titleAccent} location map`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={MAP_EMBED}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/55 to-transparent" />
                  <a
                    href={MAP_LINK}
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

            <div className="flex h-full flex-col gap-5 lg:col-span-5">
              <FadeIn delay={0.06} className="min-h-0 flex-1">
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/40 via-[#1a2e28] to-sage/30 opacity-75 transition group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612]/95 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <GraduationCap className="h-5 w-5" />
                      </span>
                      <h3 className="text-[11px] font-bold tracking-[0.18em] text-cream uppercase">
                        Schools nearby
                      </h3>
                    </div>
                    <ul className="flex flex-1 flex-col justify-center">
                      {nearby.schools.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-3 border-t border-white/8 py-3 text-[14px] text-cream/75 first:border-0 first:pt-0 last:pb-0"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="min-h-0 flex-1">
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/40 via-[#1a2e28] to-sage/30 opacity-75 transition group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612]/95 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <h3 className="text-[11px] font-bold tracking-[0.18em] text-cream uppercase">
                        Key locations
                      </h3>
                    </div>
                    <ul className="flex flex-1 flex-col justify-center">
                      {nearby.locations.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-3 border-t border-white/8 py-3 text-[14px] text-cream/75 first:border-0 first:pt-0 last:pb-0"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <SoftScene />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Support" title="FAQs" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <FAQ
              items={data.faqs}
              showAside
              asideTitle={data.faqAsideTitle}
              asideBody={data.faqAsideBody}
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="site-container max-w-3xl px-5">
          <FadeIn>
            <CardShell dark>
              <div className="relative px-8 py-12 text-center md:px-12 md:py-14">
                <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sage/25 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 top-1/3 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  {data.ctaEyebrow}
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-tight text-cream">
                  {data.ctaTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-cream/55">
                  {data.ctaBody}
                </p>
                <EnquireButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:-translate-y-0.5 hover:bg-gold-soft">
                  Contact us <ArrowUpRight className="h-3.5 w-3.5" />
                </EnquireButton>
              </div>
            </CardShell>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
