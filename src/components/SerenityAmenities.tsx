import { type LucideIcon } from 'lucide-react'
import { FadeIn } from './Motion'
import { SectionAccent, SectionBackdrop, SectionHead } from './project/ProjectChrome'
import { serenityAmenityGroups } from '../data/serenityPage'

function AmenityIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sage/15 to-sage/5 text-sage ring-1 ring-sage/10">
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
    </span>
  )
}

function AmenityGrid({
  title,
  items,
  delay = 0,
}: {
  title: string
  items: readonly { name: string; icon: LucideIcon }[]
  delay?: number
}) {
  return (
    <FadeIn delay={delay}>
      <div className="h-full rounded-[24px] border border-ink/[0.07] bg-white p-6 shadow-[0_8px_32px_rgba(15,35,28,0.06)] sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-gold" aria-hidden />
          <h3 className="text-[13px] font-bold tracking-[0.18em] text-sage uppercase">
            {title}
          </h3>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.name}
              className="group flex items-center gap-3.5 rounded-2xl border border-ink/[0.06] bg-[#fafbf9] px-4 py-3.5 transition duration-200 hover:border-sage/25 hover:bg-white hover:shadow-[0_4px_16px_rgba(15,35,28,0.06)]"
            >
              <AmenityIcon icon={item.icon} />
              <span className="text-[13px] font-semibold leading-snug text-ink">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  )
}

export default function SerenityAmenities() {
  const [amenities, facilities] = serenityAmenityGroups

  return (
    <section
      id="serenity-amenities"
      className="relative scroll-mt-36 overflow-hidden py-14 md:py-20"
    >
      <SectionBackdrop theme="sage" fadeBottom="white" />
      <SectionAccent variant="sage" />
      <div className="relative site-container px-5">
        <FadeIn>
          <SectionHead eyebrow="Lifestyle" title="Amenities & Facilities" />
          <p className="-mt-6 mx-auto mb-10 max-w-2xl text-center text-[15px] leading-relaxed text-[#4a5560] md:mb-12">
            Dedicated to BTR Serenity residents — per the official brochure.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {amenities ? (
            <AmenityGrid title={amenities.title} items={amenities.items} />
          ) : null}
          {facilities ? (
            <AmenityGrid
              title={facilities.title}
              items={facilities.items}
              delay={0.06}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
