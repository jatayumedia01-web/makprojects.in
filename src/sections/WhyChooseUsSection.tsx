import { Award, Star, ShieldCheck } from 'lucide-react'
import { FadeIn } from '../components/Motion'

/**
 * Section name: WhyChooseUsSection
 * Home page order: 4 (after OngoingProjectsSection)
 * Same matter — advanced attractive UI/UX.
 */
const items = [
  {
    n: '01',
    title: 'Years of Dedication',
    body: 'Our long-standing presence in the industry is a testament to our enduring commitment to delivering projects that stand the test of time.',
    icon: Award,
    accent: 'from-[#1f6b55] to-[#0c241c]',
  },
  {
    n: '02',
    title: 'Workmanship Quality',
    body: "At MAK Projects, quality isn't just a goal, it's a tradition that is upheld in every aspect of our craftsmanship.",
    icon: Star,
    accent: 'from-[#c9a227] to-[#8a6d12]',
  },
  {
    n: '03',
    title: 'Quality Assurance',
    body: 'Our rigorous quality control processes are the cornerstone of our promise to deliver projects that exceed your expectations.',
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
      {/* Same backdrop as WelcomeSection */}
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative site-container px-5 py-12 md:py-16">
        <FadeIn>
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
              Our promise
            </p>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-[0.06em] text-ink uppercase">
              Why Choose Us
            </h2>
            <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <article className="group relative h-full">
                  {/* Gradient border shell */}
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/50 via-white to-sage/30 opacity-70 transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] bg-white/95 px-6 pb-8 pt-7 shadow-[0_20px_55px_rgba(7,17,14,0.08)] backdrop-blur-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_32px_70px_rgba(7,17,14,0.14)] sm:px-7">
                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-[120%]" />

                    <div className="relative flex items-start justify-between">
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg transition duration-500 group-hover:scale-105`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <span className="text-3xl font-bold tracking-tight text-ink/[0.07] transition group-hover:text-gold/25">
                        {item.n}
                      </span>
                    </div>

                    <h3 className="relative mt-6 text-left text-[11px] font-bold tracking-[0.14em] text-ink uppercase sm:text-sm">
                      {item.title}
                    </h3>

                    <div className="relative my-3 h-px w-14 bg-gradient-to-r from-gold to-transparent" />

                    <p className="relative text-justify text-[15px] leading-[1.75] text-[#4a5560] sm:text-[14px]">
                      {item.body}
                    </p>

                    <div className="relative mt-auto pt-5">
                      <span className="inline-block h-1 w-8 rounded-full bg-ink/10 transition duration-500 group-hover:w-14 group-hover:bg-gold" />
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
