import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bath,
  BedDouble,
  Compass,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react'
import { FadeIn } from './Motion'
import { SectionAccent, SectionBackdrop } from './project/ProjectChrome'
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
            {plan.bhk} BHK · {plan.size} SFT · {facing.label} facing
          </p>
          <p className="mt-1 text-sm text-stone">
            Carpet {formatSqFt(facing.carpet)} sq.ft · UDS {plan.uds} sq.yds
            {facing.flats ? ` · Flat ${facing.flats}` : ''}
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#f4f1ea] p-4 sm:p-6">
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-4 border-t border-cream/10 py-3 first:border-t-0 first:pt-0">
      <span className="text-[11px] font-medium text-gold/75">{label}</span>
      <span className="text-right text-[13px] font-semibold text-cream">
        {value}
      </span>
    </li>
  )
}

/** Official BTR Serenity floor plans - interactive viewer */
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
  const selectPlan = useCallback((plan: SerenityPlan) => {
    setActivePlanId(plan.id)
    setActiveFacingId(plan.facings[0]?.id ?? 'east')
  }, [])

  if (!activePlan || !activeFacing) return null

  const specRows = [
    {
      label: 'Carpet area',
      value: `${formatSqFt(activeFacing.carpet)} sq.ft`,
    },
    {
      label: 'Balcony & utility',
      value: activePlan.balconyUtility
        ? `${formatSqFt(activePlan.balconyUtility)} sq.ft`
        : '-',
    },
    {
      label: 'Common area share',
      value: activePlan.commonShare
        ? `${formatSqFt(activePlan.commonShare)} sq.ft`
        : '-',
    },
    {
      label: 'Total super built-up',
      value: `${formatSqFt(activePlan.size)} sq.ft`,
    },
    { label: 'UDS', value: `${activePlan.uds} sq.yds` },
    ...(activeFacing.flats
      ? [{ label: 'Flat nos.', value: activeFacing.flats }]
      : []),
  ]

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
            <header className="mb-8 md:mb-10">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                Configurations
              </p>
              <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-ink">
                Floor plans
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-stone">
                Official unit plans with carpet area, UDS and facing options -
                1334 to 3068 sft.
              </p>
            </header>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.04}>
            <div className="mb-6 rounded-[20px] border border-ink/[0.07] bg-white p-4 shadow-[0_4px_24px_rgba(15,35,28,0.05)] sm:p-5 md:mb-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                    Configuration
                  </p>
                  <div
                    className="inline-flex rounded-full border border-ink/8 bg-[#faf9f7] p-1"
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
                        className={`rounded-full px-6 py-2 text-[12px] font-semibold transition ${
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

                <div className="min-w-0 flex-1 sm:max-w-xl">
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                    Unit size
                  </p>
                  <div
                    className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none"
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
                          onClick={() => selectPlan(plan)}
                          className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition ${
                            on
                              ? 'border-sage bg-sage text-white shadow-sm'
                              : 'border-ink/10 bg-white text-stone hover:border-sage/30 hover:text-ink'
                          }`}
                        >
                          {plan.size} SFT
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Main viewer */}
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white shadow-[0_16px_48px_rgba(15,35,28,0.08)]">
              <div className="grid lg:grid-cols-12 lg:items-stretch">
                <div className="relative lg:col-span-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] bg-[#faf9f7] px-4 py-3 sm:px-6">
                    {activePlan.facings.length > 1 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-stone uppercase">
                          <Compass className="h-3.5 w-3.5 text-sage" />
                          Facing
                        </span>
                        {activePlan.facings.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setActiveFacingId(f.id)}
                            className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition ${
                              f.id === activeFacingId
                                ? 'bg-ink text-cream'
                                : 'bg-white text-stone ring-1 ring-ink/10 hover:text-ink'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] font-semibold text-stone">
                        {activeFacing.label} facing
                      </span>
                    )}
                    <span className="rounded-full bg-sage/10 px-3 py-1 text-[10px] font-bold tracking-[0.1em] text-sage uppercase">
                      {activePlan.bhk} BHK · {activeFacing.label}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZoomOpen(true)}
                    className="group/plan relative block w-full bg-[#f4f1ea] text-left"
                    aria-label={`View full ${activePlan.bhk} BHK ${activePlan.size} sq.ft plan`}
                  >
                    <div className="flex min-h-[300px] items-center justify-center p-5 sm:min-h-[400px] sm:p-8 lg:min-h-[460px]">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeFacing.image}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          src={activeFacing.image}
                          alt={`${activePlan.bhk} BHK ${activePlan.size} sq.ft ${activeFacing.label} facing`}
                          loading="lazy"
                          className="max-h-[440px] w-full object-contain"
                        />
                      </AnimatePresence>
                    </div>
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-white opacity-0 backdrop-blur-sm transition group-hover/plan:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                {/* Dark summary panel - matches project details styling */}
                <div className="flex flex-col bg-[#0c1612] lg:col-span-4">
                  <div className="border-b border-cream/10 px-6 py-6 sm:px-7">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-gold uppercase">
                      Unit summary
                    </p>
                    <p className="mt-2 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tight text-cream">
                      {activePlan.size}
                      <span className="ml-2 text-lg font-semibold text-gold/80">
                        SFT
                      </span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { icon: BedDouble, label: `${activePlan.beds} Bed` },
                        { icon: Bath, label: `${activePlan.baths} Bath` },
                        {
                          icon: Compass,
                          label: activeFacing.label,
                        },
                      ].map(({ icon: Icon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-cream/90"
                        >
                          <Icon className="h-3.5 w-3.5 text-gold" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="flex-1 px-6 py-2 sm:px-7">
                    {specRows.map((row) => (
                      <SpecRow key={row.label} {...row} />
                    ))}
                  </ul>

                  <div className="border-t border-cream/10 px-6 py-5 sm:px-7">
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[11px] font-bold tracking-[0.12em] text-ink uppercase transition hover:bg-gold-soft"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View full plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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
