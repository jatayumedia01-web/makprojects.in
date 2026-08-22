import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from './Motion'
import {
  CardShell,
  SectionAccent,
  SectionBackdrop,
  SectionHead,
} from './project/ProjectChrome'
import { serenitySpecifications } from '../data/serenityPage'

function SpecGroup({
  title,
  items,
  defaultOpen,
}: {
  title: string
  items: readonly { label: string; value: string }[]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <CardShell lift fit className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
        aria-expanded={open}
      >
        <p className="text-[11px] font-bold tracking-[0.22em] text-sage uppercase">
          {title}
        </p>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-mist/60 transition ${
            open ? 'rotate-180 bg-sage/10' : ''
          }`}
        >
          <ChevronDown className="h-4 w-4 text-sage" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-0 border-t border-ink/8 px-6 pb-6 sm:px-7 sm:pb-7">
              {items.map((item, i) => (
                <li
                  key={item.label}
                  className={`border-t border-ink/8 pt-4 ${i === 0 ? 'border-t-0 pt-4' : ''}`}
                >
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-stone uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#4a5560]">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CardShell>
  )
}

/** BTR Serenity — scannable accordion specs */
export default function SerenitySpecifications() {
  return (
    <section
      id="serenity-specs"
      className="relative scroll-mt-36 overflow-hidden py-14 md:py-20"
    >
      <SectionBackdrop theme="pearl" fadeBottom="white" />
      <SectionAccent variant="gold" />
      <div className="relative site-container px-5">
        <FadeIn>
          <SectionHead eyebrow="Quality" title="Specifications" />
          <p className="-mt-6 mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-[#4a5560] md:mb-12">
            Tap each category to explore structure, finishes and services — as
            per the official brochure.
          </p>
        </FadeIn>

        <div className="mx-auto max-w-3xl space-y-3">
          {serenitySpecifications.map((group, i) => (
            <FadeIn key={group.title} delay={i * 0.05}>
              <SpecGroup
                title={group.title}
                items={group.items}
                defaultOpen={i === 0}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
