import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { serenityCardImage } from '../data/serenityPage'
import { FadeIn } from '../components/Motion'

/**
 * Section name: OngoingProjectsSection
 * Home page order: 3 (after WelcomeSection)
 * Three cards: Fern Villas · BTR Township · Apartments
 */
const cards = [
  {
    key: 'fern-villas',
    n: '01',
    category: 'Bespoke Triplex Villas',
    title: 'Fern by MAK Projects',
    status: 'New Launch · Tukkuguda',
    href: '/fern/',
    external: true,
    image: '/media/home/fern-villas.jpg',
    body: 'Fern by MAK Projects at Tukkuguda — RERA-approved 4BHK + Home Theatre villas on 15 acres with Club Fernessa (30,000 sft), just 5 minutes from ORR.',
  },
  {
    key: 'township',
    n: '02',
    category: 'Golf Residential Community',
    title: 'MAK – BTR',
    status: 'Serenity · Gardenia · Villas',
    href: '/btr-township',
    external: false,
    image: '/media/home/btr-villa-plots.jpg',
    body: 'MAK — BTR is the golf residential community on Srisailam Highway — home to Serenity apartments, Gardenia villa plots, and BTR Villas, with full township amenities.',
  },
  {
    key: 'apartments',
    n: '03',
    category: 'Luxury Apartments',
    title: 'BTR – Serenity',
    status: 'Part of MAK — BTR',
    href: '/btr-serenity',
    external: false,
    image: serenityCardImage,
    body: 'BTR – SERENITY like a tranquil oasis nestled within the bustling urban landscape. With 150 residential apartments spread across 3 acres of prime land, it offers a spacious and serene environment for its residents.',
  },
]

export default function OngoingProjectsSection() {
  return (
    <section
      id="ongoing-projects-section"
      data-section="OngoingProjectsSection"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative site-container px-5 pb-12 pt-10 md:pb-16 md:pt-12">
        <FadeIn>
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
              Explore
            </p>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-[0.06em] text-ink uppercase">
              Ongoing Projects
            </h2>
            <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cards.map((card, i) => {
            const cardClassName = 'group relative block h-full'
            const cardInner = (
                <>
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/50 via-white to-sage/25 opacity-60 transition duration-500 group-hover:opacity-100" />

                <article className="relative flex h-full flex-col overflow-hidden rounded-[25px] bg-white/95 shadow-[0_20px_55px_rgba(7,17,14,0.08)] backdrop-blur-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_32px_70px_rgba(7,17,14,0.16)]">
                  <div className="pointer-events-none absolute inset-0 z-20 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[130%]" />

                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-ink uppercase shadow-sm backdrop-blur">
                      {card.category}
                    </span>
                    <span className="absolute right-4 top-4 text-2xl font-bold text-white/25">
                      {card.n}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                    <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-stone uppercase">
                      ( {card.status} )
                    </p>

                    <div className="my-3 h-px w-14 bg-gradient-to-r from-gold to-transparent" />

                    <p className="flex-1 text-justify text-[15px] leading-[1.7] text-[#4a5560] sm:text-[14px]">
                      {card.body}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-mist px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-sage uppercase transition duration-300 group-hover:bg-ink group-hover:text-cream">
                      More info
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
                </>
            )

            return (
            <FadeIn key={card.key} delay={i * 0.1}>
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  {cardInner}
                </a>
              ) : (
                <Link to={card.href} className={cardClassName}>
                  {cardInner}
                </Link>
              )}
            </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.28}>
          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs font-semibold tracking-[0.16em] text-cream uppercase shadow-lg shadow-ink/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sage"
            >
              View all projects <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
