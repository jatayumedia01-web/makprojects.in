import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '../components/Motion'

/**
 * Section name: WelcomeSection
 * Home page order: 2 (directly below HeroSection)
 * Content = same matter as reference screenshot; UI/UX = advanced.
 */
export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      data-section="WelcomeSection"
      className="relative overflow-hidden pb-6 md:pb-8"
    >
      {/* Soft dual-tone backdrop (elevated take on pink/white) */}
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative site-container px-5 pb-0 pt-8 md:pt-10">
        <FadeIn>
          <h2 className="text-center text-[clamp(1.35rem,3vw,2.25rem)] font-bold tracking-[0.06em] text-ink uppercase">
            Welcome to MAK Projects
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="relative mx-auto mt-4 md:mt-5">
            {/* Outer glow frame */}
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-gold/40 via-white to-sage/25 opacity-90" />
            <div className="absolute -inset-3 -z-10 rounded-[32px] bg-ink/[0.03] blur-xl" />

            <article className="relative overflow-hidden rounded-[27px] bg-white/95 px-6 py-5 shadow-[0_30px_80px_rgba(7,17,14,0.10)] backdrop-blur-md sm:px-10 sm:py-6 md:px-12 md:py-7">
              {/* Top shine line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-sage/10 blur-2xl" />

              <p className="relative text-center text-[clamp(1rem,2vw,1.4rem)] font-bold tracking-[0.16em] text-[#c4952a] uppercase">
                You Dream<span className="mx-2 inline-block text-gold">·</span>We
                Deliver
              </p>

              <div className="relative mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* Same matter — justified, compact */}
              <div className="relative mx-auto mt-4 max-w-5xl space-y-3 text-justify text-[14px] leading-[1.65] text-[#4a5560] sm:text-[15px] sm:leading-[1.7]">
                <p>
                  MAK Projects has established itself as a prominent player in
                  the construction and property development sector in Hyderabad.
                  Their commitment to delivering top-quality projects with
                  innovative concepts, coupled with their focus on continuous
                  improvement and quality assurance, reflects a dedication to
                  excellence.
                </p>
                <p>
                  Promoted by Mr. A. Murali Krishna Reddy and Mr. Mir Nasir Ali
                  Khan, the company seems to have a strong leadership team
                  driving its vision forward. Their emphasis on raising
                  performance standards and maintaining professionalism suggests
                  a culture of accountability and reliability.
                </p>
                <p>
                  The range of properties offered, including villas, open plots,
                  and apartments on Srisailam Highway, indicates a diverse
                  portfolio catering to various segments of the market. This
                  versatility likely contributes to their success and appeal to
                  a wide range of customers.
                </p>
                <p>
                  Overall, MAK Projects seems to embody a commitment to
                  innovation, excellence, and customer satisfaction, positioning
                  itself as a leader in the Hyderabad real estate market.
                </p>
              </div>

              <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-cream uppercase shadow-lg shadow-ink/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sage"
                >
                  Our story <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                >
                  View projects
                </Link>
              </div>
            </article>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
