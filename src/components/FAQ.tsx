import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { FaqItem } from '../data/content'

/**
 * Modern FAQ — search + single-panel accordion (+ optional table)
 */
export default function FAQ({
  items,
  showAside = false,
  asideTitle = 'Still have questions?',
  asideBody = 'Our team can help with unit details, approvals, and scheduling a site visit.',
}: {
  items: FaqItem[]
  showAside?: boolean
  asideTitle?: string
  asideBody?: string
}) {
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

  const list = (
    <div className="space-y-4">
      {items.length > 6 && (
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(null)
            }}
            placeholder="Search questions…"
            className="w-full rounded-full border border-ink/10 bg-white py-3.5 pr-4 pl-11 text-[14px] text-ink outline-none transition placeholder:text-stone/50 focus:border-gold/50 focus:ring-2 focus:ring-gold/15"
            aria-label="Search FAQs"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-[0_16px_44px_rgba(7,17,14,0.05)]">
        {filtered.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-stone">
            No matching questions. Try another search.
          </p>
        ) : (
          filtered.map(({ item, index }, i) => {
            const isOpen = open === index
            return (
              <div
                key={item.q}
                className={i > 0 ? 'border-t border-ink/6' : ''}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start gap-4 px-5 py-5 text-left transition hover:bg-[#faf8f4] sm:gap-5 sm:px-6"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide transition ${
                      isOpen
                        ? 'bg-ink text-gold'
                        : 'bg-[#f3efe8] text-sage'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1 pt-0.5">
                    <span
                      className={`block text-[14.5px] font-semibold leading-snug sm:text-[15.5px] ${
                        isOpen ? 'text-ink' : 'text-ink/80'
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? 'bg-ink text-cream' : 'bg-[#f3efe8] text-stone'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="ml-0 border-l-2 border-gold/50 bg-[#faf8f4] py-4 pr-4 pl-4 sm:ml-12 sm:pl-5">
                          <p className="whitespace-pre-line text-[13.5px] leading-[1.85] text-[#4a555c] text-justify [text-align-last:left] sm:text-[14.5px]">
                            {item.a}
                          </p>

                          {item.table ? (
                            <div className="mt-4 overflow-hidden rounded-xl border border-ink/8 bg-white">
                              <table className="w-full text-left text-[13px] sm:text-[14px]">
                                <thead>
                                  <tr className="border-b border-ink/8 bg-ink text-cream">
                                    <th className="px-4 py-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
                                      {item.table.headers[0]}
                                    </th>
                                    <th className="px-4 py-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
                                      {item.table.headers[1]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.table.rows.map(([sft, uds], rowIdx) => (
                                    <tr
                                      key={`${sft}-${uds}`}
                                      className={
                                        rowIdx % 2 === 0
                                          ? 'bg-white'
                                          : 'bg-[#f8f6f1]'
                                      }
                                    >
                                      <td className="px-4 py-2.5 font-semibold text-ink">
                                        {sft}
                                      </td>
                                      <td className="px-4 py-2.5 text-stone">
                                        {uds}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>
    </div>
  )

  if (!showAside) return list

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <div className="relative overflow-hidden rounded-[26px] bg-ink px-6 py-8 text-cream sm:px-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.18),_transparent_55%)]" />
          <div className="relative">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-gold uppercase">
              Help centre
            </p>
            <h3 className="mt-4 text-[1.55rem] font-semibold leading-tight tracking-tight text-cream sm:text-[1.75rem]">
              {asideTitle.includes('\n') ? (
                asideTitle.split('\n').map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))
              ) : (
                asideTitle
              )}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/55">
              {asideBody}
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-[11px] tracking-[0.14em] text-cream/45 uppercase">
                  Topics
                </span>
                <span className="text-[13px] font-semibold text-gold">
                  {items.length}
                </span>
              </div>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft"
              >
                Talk to us <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-8">{list}</div>
    </div>
  )
}
