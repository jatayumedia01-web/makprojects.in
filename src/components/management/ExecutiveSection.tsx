import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { FadeIn } from '../Motion'
import {
  PageContainer,
  SectionAccent,
  SectionBackdrop,
  type SectionTheme,
} from '../project/ProjectChrome'

const EASE = [0.22, 1, 0.36, 1] as const

const prose =
  'text-sm leading-[1.85] text-[#3d4852] hyphens-auto text-justify [text-align-last:left] [text-justify:inter-word] sm:text-[15px] sm:leading-[1.9]'

export type ExecutiveCred = { icon: LucideIcon; value: string }
export type ExecutiveSpotlight = {
  icon: LucideIcon
  label: string
  title: string
  body: string
}

export type ExecutiveSectionProps = {
  sectionId: string
  index: number
  total: number
  name: string
  shortName: string
  years: string
  image: string
  eyebrow: string
  focusLine: string
  bio: readonly string[]
  creds: ExecutiveCred[]
  spotlight: ExecutiveSpotlight
  theme?: SectionTheme
}

function CredList({
  creds,
  spotlight,
}: {
  creds: ExecutiveCred[]
  spotlight: ExecutiveSpotlight
}) {
  return (
    <ul className="mt-5 grid gap-x-6 gap-y-2 sm:mt-6 sm:grid-cols-2 sm:gap-x-8 [&>li:last-child]:sm:col-span-2">
      {creds.map((c) => (
        <li
          key={c.value}
          className="flex items-start gap-2.5 text-[11px] leading-snug text-[#4a5560]"
        >
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
          {c.value}
        </li>
      ))}
      <li className="flex items-start gap-2.5 text-[11px] leading-snug text-[#4a5560]">
        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
        <span>
          <span className="font-medium text-ink">{spotlight.title}</span>
          {' — '}
          {spotlight.body}
        </span>
      </li>
    </ul>
  )
}

function HighlightCard({
  icon: Icon,
  label,
  title,
  body,
  tone = 'sage',
}: {
  icon: LucideIcon
  label: string
  title: string
  body: string
  tone?: 'sage' | 'gold'
}) {
  const iconTone =
    tone === 'gold'
      ? 'bg-gold/12 text-gold ring-gold/20'
      : 'bg-sage/10 text-sage ring-sage/15'

  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-gradient-to-br from-[#faf8f5] to-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconTone}`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-sage uppercase">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-ink">{title}</p>
          <p className="mt-2 text-left text-xs leading-relaxed text-stone hyphens-none">
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfileHeader({
  sectionId,
  name,
  shortName,
  years,
  image,
  eyebrow,
  focusLine,
  creds,
  spotlight,
  num,
  total,
}: {
  sectionId: string
  name: string
  shortName: string
  years: string
  image: string
  eyebrow: string
  focusLine: string
  creds: ExecutiveCred[]
  spotlight: ExecutiveSpotlight
  num: string
  total: number
}) {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="relative h-[280px] w-full shrink-0 overflow-hidden sm:h-[300px] md:h-auto md:min-h-[300px]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-col border-t border-ink/[0.06] bg-[#f7f5f2] px-4 py-6 sm:px-6 sm:py-7 md:border-t-0 md:border-l md:px-8 md:py-8 lg:px-10">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-sage uppercase">
            {eyebrow}
          </p>
          <p className="shrink-0 text-[11px] tracking-[0.12em] text-stone uppercase">
            {num} / {String(total).padStart(2, '0')}
          </p>
        </div>
        <h2
          id={`${sectionId}-title`}
          className="mt-2 text-lg font-semibold tracking-tight text-ink sm:text-xl lg:text-2xl"
        >
          {shortName}
        </h2>
        <p className="mt-1 text-sm text-stone">{years}</p>
        <p className="mt-3 text-left text-sm font-medium leading-relaxed text-[#5c6772] hyphens-none sm:mt-4">
          {focusLine}
        </p>
        <CredList creds={creds} spotlight={spotlight} />
      </div>
    </header>
  )
}

function BioColumns({ paragraphs }: { paragraphs: readonly string[] }) {
  const mid = Math.ceil(paragraphs.length / 2)
  const left = paragraphs.slice(0, mid)
  const right = paragraphs.slice(mid)

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0">
      <div className="flex flex-col gap-5">
        {left.map((p) => (
          <p key={p.slice(0, 48)} className={prose}>
            {p}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        {right.map((p) => (
          <p key={p.slice(0, 48)} className={prose}>
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function ExecutiveSection({
  sectionId,
  index,
  total,
  name,
  shortName,
  years,
  image,
  eyebrow,
  focusLine,
  bio,
  creds,
  spotlight,
  theme = 'cream',
}: ExecutiveSectionProps) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const lead = bio[0] ?? ''
  const hasMore = bio.length > 1
  const expanded = open && hasMore
  const secondaryCred = creds[1] ?? creds[0]

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-[9.5rem] py-8 md:scroll-mt-[10rem] md:py-12"
      aria-labelledby={`${sectionId}-title`}
    >
      <SectionBackdrop theme={theme} />
      <SectionAccent variant={index % 2 === 0 ? 'sage' : 'fade'} />

      <PageContainer className="relative">
        <FadeIn distance={24}>
          <article className="overflow-hidden rounded-xl border border-ink/[0.08] bg-white shadow-[0_8px_32px_rgba(7,17,14,0.06)] sm:rounded-2xl">
            <ProfileHeader
              sectionId={sectionId}
              name={name}
              shortName={shortName}
              years={years}
              image={image}
              eyebrow={eyebrow}
              focusLine={focusLine}
              creds={creds}
              spotlight={spotlight}
              num={String(index + 1).padStart(2, '0')}
              total={total}
            />

            <div className="border-t border-ink/[0.06] bg-[#fafafa] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
              <AnimatePresence mode="wait" initial={false}>
                {expanded ? (
                  <motion.div
                    key="expanded"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="space-y-6 sm:space-y-8"
                  >
                    <BioColumns paragraphs={bio} />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <HighlightCard
                        icon={spotlight.icon}
                        label={spotlight.label}
                        title={spotlight.title}
                        body={spotlight.body}
                        tone="gold"
                      />
                      {secondaryCred ? (
                        <HighlightCard
                          icon={secondaryCred.icon}
                          label="Career highlight"
                          title={secondaryCred.value}
                          body={`${years} of leadership across ${focusLine.toLowerCase()}.`}
                          tone="sage"
                        />
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-expanded
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-sage uppercase hover:text-ink"
                    >
                      Show less
                      <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="compact"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <p className={prose}>{lead}</p>
                    {hasMore ? (
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-expanded={false}
                        className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-sage uppercase hover:text-ink sm:mt-6"
                      >
                        Read full biography
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </article>
        </FadeIn>
      </PageContainer>
    </section>
  )
}
