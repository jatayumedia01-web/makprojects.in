import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bath,
  BedDouble,
  Compass,
  Maximize2,
  Ruler,
  X,
} from 'lucide-react'
import { FadeIn } from './Motion'
import {
  SectionAccent,
  SectionBackdrop,
  SectionHead,
} from './project/ProjectChrome'
import {
  getSerenityPlansByBhk,
  type PlanFacing,
  type SerenityPlan,
} from '../data/serenityPlans'

type BhkTab = 3 | 4

function formatSqFt(value: number) {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })
}

function FloorPlanModal({
  plan,
  facing,
  onClose,
}: {
  plan: SerenityPlan
  facing: PlanFacing
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-3 backdrop-blur-md sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${plan.bhk} BHK ${plan.size} sq.ft ${facing.label} facing floor plan`}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-white transition hover:bg-ink"
          aria-label="Close floor plan"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-ink/8 px-5 py-4 pr-14 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sage uppercase">
            {plan.bhk} BHK · {plan.size} SFT · {facing.label} Facing
          </p>
          <p className="mt-1 text-sm text-stone">
            Carpet {formatSqFt(facing.carpet)} sq.ft · UDS {plan.uds} sq.yds
            {facing.flats ? ` · Flat ${facing.flats}` : ''}
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#f6f3ec] p-4 sm:p-6">
          <img
            src={facing.image}
            alt={`${plan.bhk} BHK ${plan.size} sq.ft ${facing.label} facing floor plan`}
            className="max-h-[72vh] w-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Official BTR Serenity floor plans — size, facing & area breakdown */
export default function SerenityFloorPlans() {
  const [tab, setTab] = useState<BhkTab>(3)
  const [activePlanId, setActivePlanId] = useState('1334')
  const [activeFacingId, setActiveFacingId] = useState('east')
  const [zoomOpen, setZoomOpen] = useState(false)

  const plans = useMemo(() => getSerenityPlansByBhk(tab), [tab])

  const activePlan = plans.find((p) => p.id === activePlanId) ?? plans[0]
  const activeFacing =
    activePlan?.facings.find((f) => f.id === activeFacingId) ??
    activePlan?.facings[0]

  useEffect(() => {
    const first = getSerenityPlansByBhk(tab)[0]
    if (!first) return
    setActivePlanId(first.id)
    setActiveFacingId(first.facings[0]?.id ?? 'east')
  }, [tab])

  useEffect(() => {
    if (!activePlan) return
    const hasFacing = activePlan.facings.some((f) => f.id === activeFacingId)
    if (!hasFacing) setActiveFacingId(activePlan.facings[0]?.id ?? 'east')
  }, [activePlan, activeFacingId])

  const closeZoom = useCallback(() => setZoomOpen(false), [])

  if (!activePlan || !activeFacing) return null

  return (
    <>
      <section
        id="serenity-plans"
        className="relative scroll-mt-36 overflow-hidden py-14 md:py-20"
      >
        <SectionBackdrop theme="pearl" fadeBottom="white" />
        <SectionAccent variant="gold" />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Configurations" title="Floor Plans" />
            <p className="-mt-6 mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-stone md:mb-10">
              Official unit plans with carpet area, UDS and facing options — 1334
              to 3068 sft.
            </p>

            <div className="mb-6 flex justify-center md:mb-8">
              <div
                className="inline-flex rounded-full border border-ink/8 bg-white p-1 shadow-sm"
                role="tablist"
                aria-label="BHK configuration"
              >
                {([3, 4] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-7 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition ${
                      tab === t
                        ? 'bg-ink text-cream shadow-sm'
                        : 'text-stone hover:text-ink'
                    }`}
                  >
                    {t} BHK
                  </button>
                ))}
              </div>
            </div>

            <div
              className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none md:mb-10 md:flex-wrap md:justify-center"
              role="tablist"
              aria-label="Unit size"
            >
              {plans.map((plan) => {
                const on = plan.id === activePlanId
                return (
                  <button
                    key={plan.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setActivePlanId(plan.id)
                      setActiveFacingId(plan.facings[0]?.id ?? 'east')
                    }}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition ${
                      on
                        ? 'border-sage/40 bg-sage text-white shadow-sm'
                        : 'border-ink/10 bg-white text-stone hover:border-sage/25 hover:text-ink'
                    }`}
                  >
                    {plan.size} SFT
                  </button>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="overflow-hidden rounded-[28px] border border-ink/8 bg-white shadow-[0_16px_48px_rgba(15,35,28,0.08)]">
              <div className="grid lg:grid-cols-12">
                {/* Plan viewer */}
                <div className="relative lg:col-span-8">
                  {activePlan.facings.length > 1 ? (
                    <div className="flex flex-wrap gap-2 border-b border-ink/8 bg-cream/40 px-4 py-3 sm:px-5">
                      <span className="mr-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                        <Compass className="h-3.5 w-3.5 text-sage" />
                        Facing
                      </span>
                      {activePlan.facings.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setActiveFacingId(f.id)}
                          className={`rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase transition ${
                            f.id === activeFacingId
                              ? 'bg-ink text-cream'
                              : 'bg-white text-stone ring-1 ring-ink/10 hover:text-ink'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setZoomOpen(true)}
                    className="group/plan relative block w-full bg-[#f6f3ec] text-left"
                    aria-label={`Zoom ${activePlan.bhk} BHK ${activePlan.size} sq.ft plan`}
                  >
                    <div className="flex min-h-[280px] items-center justify-center p-4 sm:min-h-[380px] sm:p-8 lg:min-h-[440px]">
                      <img
                        key={activeFacing.image}
                        src={activeFacing.image}
                        alt=""
                        loading="lazy"
                        className="max-h-[420px] w-full object-contain transition duration-500 group-hover/plan:scale-[1.01]"
                      />
                    </div>
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/75 text-white opacity-0 backdrop-blur-sm transition group-hover/plan:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-sage uppercase shadow-sm">
                      {activePlan.bhk} BHK · {activeFacing.label}
                    </span>
                  </button>
                </div>

                {/* Specs panel */}
                <div className="flex flex-col border-t border-ink/8 bg-white lg:col-span-4 lg:border-l lg:border-t-0">
                  <div className="border-b border-ink/8 px-5 py-5 sm:px-6">
                    <p className="text-[11px] font-semibold tracking-[0.24em] text-sage uppercase">
                      Unit summary
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-ink">
                      {activePlan.size}
                      <span className="ml-1.5 text-base font-semibold text-stone">
                        SFT
                      </span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs text-stone">
                        <BedDouble className="h-3.5 w-3.5 text-sage" />
                        {activePlan.beds} Bed
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs text-stone">
                        <Bath className="h-3.5 w-3.5 text-sage" />
                        {activePlan.baths} Bath
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs text-stone">
                        <Compass className="h-3.5 w-3.5 text-sage" />
                        {activeFacing.label}
                      </span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-0 px-5 py-4 sm:px-6">
                    {[
                      {
                        label: 'Carpet area',
                        value: `${formatSqFt(activeFacing.carpet)} sq.ft`,
                      },
                      {
                        label: 'Balcony & utility',
                        value: activePlan.balconyUtility
                          ? `${formatSqFt(activePlan.balconyUtility)} sq.ft`
                          : '—',
                      },
                      {
                        label: 'Common area share',
                        value: activePlan.commonShare
                          ? `${formatSqFt(activePlan.commonShare)} sq.ft`
                          : '—',
                      },
                      {
                        label: 'Total super built-up',
                        value: `${formatSqFt(activePlan.size)} sq.ft`,
                      },
                      {
                        label: 'UDS',
                        value: `${activePlan.uds} sq.yds`,
                      },
                      ...(activeFacing.flats
                        ? [{ label: 'Flat nos.', value: activeFacing.flats }]
                        : []),
                    ].map((row) => (
                      <li
                        key={row.label}
                        className="flex items-start justify-between gap-4 border-t border-ink/8 py-3.5 first:border-t-0 first:pt-0"
                      >
                        <span className="text-[11px] font-semibold tracking-[0.12em] text-stone uppercase">
                          {row.label}
                        </span>
                        <span className="text-right text-sm font-semibold text-ink">
                          {row.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-ink/8 px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-sage"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      View full plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Thumbnail strip */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {plans.map((plan, i) => {
              const thumb = plan.facings[0]
              const on = plan.id === activePlanId
              return (
                <FadeIn key={plan.id} delay={0.08 + i * 0.03}>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePlanId(plan.id)
                      setActiveFacingId(plan.facings[0]?.id ?? 'east')
                    }}
                    className={`group w-full overflow-hidden rounded-[20px] border text-left transition ${
                      on
                        ? 'border-sage/50 bg-white shadow-[0_8px_28px_rgba(31,107,85,0.12)] ring-2 ring-sage/20'
                        : 'border-ink/8 bg-white hover:border-sage/25 hover:shadow-md'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-[#f6f3ec] p-2">
                      <img
                        src={thumb.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-bold text-ink">
                        {plan.size} SFT
                      </p>
                      <p className="mt-0.5 text-[10px] tracking-[0.12em] text-stone uppercase">
                        {plan.bhk} BHK · UDS {plan.uds} sq.yds
                        {plan.facings.length > 1
                          ? ` · ${plan.facings.length} facings`
                          : ''}
                      </p>
                    </div>
                  </button>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {zoomOpen && activeFacing ? (
          <FloorPlanModal
            plan={activePlan}
            facing={activeFacing}
            onClose={closeZoom}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
