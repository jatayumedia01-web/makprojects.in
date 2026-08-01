import { MapPin, ShieldCheck } from 'lucide-react'
import { FadeIn } from '../components/Motion'

/**
 * Section name: LocationSection
 * Home page order: 5 (after WhyChooseUsSection)
 */
const tags = ['RERA Approved', 'HMDA Cleared', 'Golf Community']

export default function LocationSection() {
  return (
    <section
      id="location-section"
      data-section="LocationSection"
      className="relative overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2000&q=80"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      {/* Deep teal overlay — matches reference */}
      <div className="absolute inset-0 bg-[#0c241c]/88" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[420px] md:py-20">
        <FadeIn>
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-white/5 backdrop-blur-md">
            <MapPin className="h-5 w-5 text-gold" />
          </span>

          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight text-white">
            Prime Knowledge City address
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75 md:text-base md:leading-7">
            BTR on Srisailam National Highway — 5 minutes from Outer Ring Road,
            under 15 minutes from Rajiv Gandhi International Airport.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-white/5 px-4 py-2 text-[10px] font-semibold tracking-[0.16em] text-gold-soft uppercase backdrop-blur-md transition hover:border-gold hover:bg-gold/10"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
