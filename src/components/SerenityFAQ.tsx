import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Search } from 'lucide-react'
import { FadeIn } from './Motion'
import { SectionBackdrop } from './project/ProjectChrome'
import { serenityFaqs } from '../data/content'
import type { FaqItem } from '../data/content'

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.map((item, index) => ({ item, index }))
    return items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        const inTable = item.table
          ? item.table.rows.some(
              ([a, b]) => a.includes(q) || b.includes(q),
            ) ||
            item.table.headers.some((h) => h.toLowerCase().includes(q))
          : false
        return (
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q) ||
          inTable
        )
      })
  }, [items, query])

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone"
          strokeWidth={2}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(null)
          }}
          placeholder="Search questions…"
          className="w-full rounded-2xl border border-ink/[0.08] bg-white py-3.5 pr-4 pl-11 text-[14px] text-ink shadow-[0_2px_12px_rgba(15,35,28,0.04)] outline-none transition placeholder:text-stone/50 focus:border-sage/35 focus:ring-2 focus:ring-sage/10"
          aria-label="Search FAQs"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[20px] border border-ink/[0.07] bg-[#faf9f7] px-6 py-12 text-center">
          <p className="text-sm text-stone">No matching questions. Try another search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(({ item, index }) => {
            const isOpen = open === index
            return (
              <article
                key={item.q}
                className={`overflow-hidden rounded-[20px] border transition duration-200 ${
                  isOpen
                    ? 'border-sage/25 bg-white shadow-[0_8px_28px_rgba(31,107,85,0.1)]'
                    : 'border-ink/[0.07] bg-white shadow-[0_2px_12px_rgba(15,35,28,0.04)] hover:border-sage/15'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6"
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${
                      isOpen
                        ? 'bg-ink text-gold'
                        : 'bg-sage/10 text-sage'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1 pt-0.5 text-[15px] font-semibold leading-snug text-ink">
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? 'bg-sage text-white' : 'bg-[#f3efe8] text-stone'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-ink/[0.06] px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="ml-0 border-l-2 border-gold bg-[#faf8f5] py-4 pr-4 pl-4 sm:ml-[3.25rem] sm:pl-5">
                          <p className="whitespace-pre-line text-[15px] leading-[1.85] text-[#4a5560]">
                            {item.a}
                          </p>

                          {item.table ? (
                            <div className="mt-4 overflow-hidden rounded-xl border border-ink/8 bg-white">
                              <table className="w-full text-left text-sm">
                                <thead>
                                  <tr className="border-b border-ink/8 bg-ink text-cream">
                                    <th className="px-4 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase">
                                      {item.table.headers[0]}
                                    </th>
                                    <th className="px-4 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase">
                                      {item.table.headers[1]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.table.rows.map(([sft, uds], rowIdx) => (
                                    <tr
                                      key={`${sft}-${uds}`}
                                      className={
                                        rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#f8f6f1]'
                                      }
                                    >
                                      <td className="px-4 py-2.5 font-semibold text-ink">
                                        {sft}
                                      </td>
                                      <td className="px-4 py-2.5 text-stone">{uds}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function SerenityFAQ() {
  return (
    <section
      id="serenity-faq"
      className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
    >
      <SectionBackdrop theme="white" fadeBottom="pearl" />
      <div className="relative site-container px-5">
        <FadeIn>
          <header className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Support
              </p>
              <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-ink">
                Frequently asked questions
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-stone md:text-right">
              Specs, UDS, amenities, maintenance and more - from BTR Serenity.
            </p>
          </header>
        </FadeIn>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <FadeIn delay={0.04} className="lg:col-span-4">
            <aside className="lg:sticky lg:top-32">
              <div className="relative overflow-hidden rounded-[24px] bg-[#0c1612] px-6 py-8 text-cream sm:px-7 sm:py-9">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.16),_transparent_55%)]" />
                <div className="relative">
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-gold uppercase">
                    Help centre
                  </p>
                  <h3 className="mt-3 text-[1.65rem] font-bold leading-tight tracking-tight text-cream">
                    Still have
                    <br />
                    questions?
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-cream/60">
                    Browse all Serenity answers, or speak with our team for a
                    guided walkthrough and site visit.
                  </p>

                  <div className="mt-7 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-cream/10 bg-white/[0.04] px-4 py-3.5">
                      <span className="text-[11px] font-medium tracking-[0.12em] text-cream/50 uppercase">
                        Topics
                      </span>
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[12px] font-bold text-gold">
                        {serenityFaqs.length}
                      </span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[11px] font-bold tracking-[0.12em] text-ink uppercase transition hover:bg-gold-soft"
                    >
                      Talk to us
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-8">
            <FaqAccordion items={serenityFaqs} />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
