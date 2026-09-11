import { Building2, Landmark, ShieldCheck, type LucideIcon } from 'lucide-react'
import { FadeIn } from '../Motion'
import {
  SectionAccent,
  SectionBackdrop,
  SectionHead,
} from './ProjectChrome'
import { lifestylePillars } from '../../data/content'

const pillarIcons: Record<(typeof lifestylePillars.pillars)[number]['id'], LucideIcon> = {
  club: Building2,
  sports: Landmark,
  security: ShieldCheck,
}

/** Club · sports · security - three lifestyle pillars */
export default function LifestylePillars({
  id = 'lifestyle-pillars',
  className = '',
}: {
  id?: string
  className?: string
}) {
  const { eyebrow, title, pillars } = lifestylePillars

  return (
    <section
      id={id}
      className={`relative scroll-mt-36 overflow-hidden py-14 md:py-20 ${className}`}
    >
      <SectionBackdrop theme="cream" fadeBottom="white" />
      <SectionAccent variant="gold" />

      <div className="relative site-container px-5">
        <FadeIn>
          <SectionHead eyebrow={eyebrow} title={title} />
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.id]
            return (
              <FadeIn
                key={pillar.id}
                delay={i * 0.07}
                className="w-full self-start"
              >
                <article className="group flex w-full flex-col overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_10px_36px_rgba(7,17,14,0.07)] transition duration-500 hover:shadow-[0_18px_48px_rgba(7,17,14,0.11)]">
                  <div className="relative aspect-[5/3] shrink-0 overflow-hidden bg-ink/[0.04]">
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="relative px-5 pb-4 pt-5 sm:px-6 sm:pb-5">
                    <span
                      className="absolute -top-5 left-5 flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-ink shadow-[0_6px_16px_rgba(7,17,14,0.15)] ring-[3px] ring-white sm:left-6"
                      aria-hidden
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.65} />
                    </span>

                    <h3 className="text-base font-bold tracking-tight text-ink sm:text-[12px]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-[1.55] text-stone sm:text-sm">
                      {pillar.body}
                    </p>
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
