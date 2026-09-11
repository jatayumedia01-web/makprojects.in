import type { LucideIcon } from 'lucide-react'
import { Award, Home, ShieldCheck } from 'lucide-react'
import { FadeIn } from '../components/Motion'

type WhyChooseItem = {
  n: string
  title: string
  body: string
  icon: LucideIcon
  accent: string
  featured?: boolean
}

const items: WhyChooseItem[] = [
  {
    n: '01',
    title: 'Years of Dedication',
    body: 'Two decades of trusted delivery in Hyderabad real estate - a legacy built on consistency, accountability, and communities families are proud to call home.',
    icon: Award,
    accent: 'from-[#1f6b55] to-[#0c241c]',
  },
  {
    n: '02',
    title: 'You Dream · We Deliver',
    body: 'Your vision deserves more than a promise. From the first conversation to key handover, we translate your aspirations into thoughtfully crafted homes - with precision, care, and complete transparency.',
    icon: Home,
    accent: 'from-[#c9a227] to-[#8a6d12]',
    featured: true,
  },
  {
    n: '03',
    title: 'Quality Assurance',
    body: 'Rigorous quality checks at every stage - from materials and workmanship to final handover - ensuring every project meets the standards your investment deserves.',
    icon: ShieldCheck,
    accent: 'from-[#163d31] to-[#07110e]',
  },
]

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us-section"
      data-section="WhyChooseUsSection"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative site-container px-5 py-14 md:py-16">
        <FadeIn>
          <div className="mx-auto mb-11 max-w-2xl text-center md:mb-14">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
              Our promise
            </p>
            <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-tight text-ink">
              Why Choose Us
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <article className="group relative h-full">
                  <div
                    className={`absolute -inset-px rounded-[26px] bg-gradient-to-br opacity-70 transition duration-500 group-hover:opacity-100 ${
                      item.featured
                        ? 'from-gold/60 via-white to-gold/20'
                        : 'from-gold/45 via-white to-sage/25'
                    }`}
                  />

                  <div
                    className={`relative flex h-full min-h-[320px] flex-col rounded-[25px] px-6 pb-7 pt-6 sm:px-7 sm:pb-8 sm:pt-7 ${
                      item.featured
                        ? 'bg-gradient-to-b from-[#fffdf8] to-white shadow-[0_22px_55px_rgba(196,149,42,0.1)]'
                        : 'bg-white shadow-[0_18px_50px_rgba(7,17,14,0.07)]'
                    } transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_65px_rgba(7,17,14,0.12)]`}
                  >
                    {item.featured ? (
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md transition duration-500 group-hover:scale-[1.04]`}
                      >
                        <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                      </span>
                      <span className="text-[2rem] font-semibold leading-none tabular-nums text-ink/[0.06] transition duration-500 group-hover:text-gold/20">
                        {item.n}
                      </span>
                    </div>

                    <div className="mt-6 flex-1">
                      <h3
                        className={`text-[1.0625rem] font-semibold leading-snug tracking-tight sm:text-[1.125rem] ${
                          item.featured ? 'text-[#7a5f18]' : 'text-ink'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <div className="mt-3 h-px w-10 bg-gradient-to-r from-gold/80 to-transparent" />

                      <p className="mt-4 text-justify text-[15px] leading-[1.75] text-[#4a5560] [hyphens:auto] [text-align-last:left]">
                        {item.body}
                      </p>
                    </div>

                    <div className="mt-6 pt-2">
                      <span className="inline-block h-[3px] w-8 rounded-full bg-ink/[0.08] transition duration-500 group-hover:w-12 group-hover:bg-gold/70" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
