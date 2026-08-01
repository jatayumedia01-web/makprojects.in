import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  Dumbbell,
  Fence,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Trees,
  Wifi,
  Zap,
} from 'lucide-react'
import { FadeIn } from '../components/Motion'
import FAQ from '../components/FAQ'
import SerenityVideoFeatures from '../components/SerenityVideoFeatures'
import {
  floorPlans,
  nearby,
  serenityFaqs,
} from '../data/content'

/**
 * BTR Serenity — advanced card UI system
 * Decision: match MAK site card language (gold shell · lift · shine)
 * proven on Home Ongoing / Why Choose Us / Projects grid.
 */

const HERO =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=80'

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
    label: 'Living',
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
    label: 'Interiors',
  },
  {
    src: 'https://images.unsplash.com/photo-1560185127-6a569e77ea9b?auto=format&fit=crop&w=1400&q=80',
    label: 'Bedroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
    label: 'Lounge',
  },
]

const metrics = [
  { value: '150', label: 'Apartments', icon: Building2 },
  { value: '3 Ac', label: 'Prime land', icon: Trees },
  { value: '3 & 4', label: 'BHK homes', icon: BedDouble },
  { value: 'RERA', label: 'OC obtained', icon: ShieldCheck },
]

const details = [
  { label: 'Project Size', value: '3 Acres' },
  { label: 'Project Type', value: 'Residential' },
  { label: 'Total Towers', value: '1' },
  { label: 'Total Units', value: '150' },
  { label: 'Status', value: 'Ready To Move-In' },
  { label: 'Property Type', value: 'Flat' },
  { label: 'OC Obtained', value: 'Yes' },
  { label: 'RERA ID', value: 'P02400002599' },
]

const amenityCards = [
  { name: 'Club House', icon: Sparkles },
  { name: 'EV Charging (Adani)', icon: Zap },
  { name: 'Gym', icon: Dumbbell },
  { name: 'Elevators', icon: Building2 },
  { name: 'Play Area', icon: Trees },
  { name: 'Jogging Track', icon: Trees },
  { name: 'Internet Provision', icon: Wifi },
  { name: 'Intercom Provision', icon: Phone },
  { name: 'Sewerage Treatment Plant', icon: Sparkles },
  { name: 'Solar Fencing', icon: Fence },
  { name: 'Yoga Room', icon: Sparkles },
  { name: 'Water Softening Plant', icon: Sparkles },
  { name: '24/7 Security', icon: ShieldCheck },
  { name: '24/7 Power Backup', icon: Zap },
]

/** MAK advanced card shell — gold gradient frame + lift */
function CardShell({
  children,
  className = '',
  dark = false,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <div className={`group relative h-full ${className}`}>
      <div
        className={`absolute -inset-[1px] rounded-[26px] opacity-70 transition duration-500 group-hover:opacity-100 ${
          dark
            ? 'bg-gradient-to-br from-gold/50 via-[#1a2e28] to-sage/40'
            : 'bg-gradient-to-br from-gold/50 via-white to-sage/30'
        }`}
      />
      <div
        className={`relative h-full overflow-hidden rounded-[25px] shadow-[0_20px_55px_rgba(7,17,14,0.08)] transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_70px_rgba(7,17,14,0.14)] ${
          dark ? 'bg-[#0c1612] text-cream' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
        {children}
      </div>
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string
  title: string
  light?: boolean
}) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <p
        className={`mb-2 text-[11px] font-semibold tracking-[0.32em] uppercase ${
          light ? 'text-gold' : 'text-sage'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-[0.06em] uppercase ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}

function SoftScene() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f3e8e2] via-[#f6efe9] to-transparent" />
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#e8c9b0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
    </>
  )
}

export default function Serenity() {
  const [tab, setTab] = useState<'3' | '4'>('3')
  const plans = tab === '3' ? floorPlans.bhk3 : floorPlans.bhk4

  return (
    <>
      {/* Hero */}
      <section className="relative h-[72vh] min-h-[480px] overflow-hidden bg-ink md:h-[78vh]">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src={HERO}
          alt="BTR Serenity"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-28 sm:px-10 lg:px-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              BTR Township · Ready to Move-In
            </p>
            <h1 className="text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white uppercase">
              BTR —{' '}
              <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent">
                Serenity
              </span>
            </h1>
            <div className="mt-5 h-px w-36 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              150 luxury apartments across 3 acres — peaceful 3 &amp; 4 BHK
              living on Srisailam Highway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                Schedule a visit <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#floor-plans"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition hover:bg-white hover:text-ink"
              >
                Explore plans
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metric cards */}
      <section className="relative overflow-hidden">
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <FadeIn key={m.label} delay={i * 0.06}>
                  <CardShell>
                    <div className="flex items-center gap-4 px-5 py-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-2xl font-bold tracking-tight text-ink">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold tracking-[0.16em] text-stone uppercase">
                          {m.label}
                        </p>
                      </div>
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Overview cards */}
      <section className="relative overflow-hidden pb-12 md:pb-16">
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHead eyebrow="Overview" title="Quiet Splendor, Redefined" />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-7">
            <FadeIn className="lg:col-span-7">
              <CardShell>
                <div className="relative px-6 py-7 sm:px-8 sm:py-8">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                    About the project
                  </p>
                  <p className="mt-4 text-justify text-[15px] leading-[1.8] text-[#4a5560]">
                    BTR Serenity is a tranquil oasis within the urban landscape —
                    150 residential apartments on 3 acres of prime land.
                    Luxurious 3 &amp; 4 BHK flats with landscaped spaces offer a
                    peaceful retreat without compromising modern conveniences.
                  </p>
                  <p className="mt-5 flex items-start gap-2 text-sm text-stone">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                    26th Milestone · Srisailam Highway · Thummalur, Hyderabad
                  </p>
                  <Link
                    to="/contact"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-sage"
                  >
                    Enquire now <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardShell>
            </FadeIn>

            <FadeIn delay={0.08} className="lg:col-span-5">
              <CardShell dark>
                <div className="relative px-6 py-7 md:px-7">
                  <p className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
                    Project details
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {details.map((d) => (
                      <div key={d.label} className="border-t border-cream/12 pt-3">
                        <p className="text-[10px] tracking-[0.14em] text-gold/70 uppercase">
                          {d.label}
                        </p>
                        <p className="mt-1 text-[15px] font-semibold tracking-tight text-cream">
                          {d.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardShell>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery cards */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHead eyebrow="Gallery" title="Inside Serenity" />
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <FadeIn key={g.src} delay={i * 0.05}>
                <CardShell>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[11px] font-bold tracking-[0.22em] text-white uppercase">
                      {g.label}
                    </span>
                  </div>
                </CardShell>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video Features — lifestyle films */}
      <SerenityVideoFeatures />

      {/* Floor plan cards */}
      <section id="floor-plans" className="relative overflow-hidden py-12 md:py-16">
        <SoftScene />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHead eyebrow="Configurations" title="Floor Plans" />
            <div className="mb-8 flex justify-center md:mb-10">
              <div className="inline-flex rounded-full border border-ink/8 bg-white p-1 shadow-sm">
                {(['3', '4'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`rounded-full px-6 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition ${
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
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {plans.map((f, i) => (
                <FadeIn key={f.size} delay={i * 0.04}>
                  <CardShell>
                    <div className="relative flex h-full flex-col">
                      <div className="relative aspect-[5/4] overflow-hidden bg-[#f6f3ec]">
                        <img
                          src={f.image}
                          alt={`${tab} BHK ${f.size} sft floor plan`}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-sage uppercase shadow-sm">
                          {tab} BHK
                        </span>
                        <span className="absolute right-3 top-3 text-xl font-bold text-ink/15">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="relative flex flex-1 flex-col px-5 py-5">
                        <p className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {f.size}
                          <span className="ml-1.5 text-sm font-semibold text-stone">
                            SFT
                          </span>
                        </p>
                        <div className="my-3 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                        <div className="mt-auto flex flex-wrap gap-2 text-sm text-stone">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                            <BedDouble className="h-3.5 w-3.5 text-sage" />
                            {f.beds} Bed
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                            <Bath className="h-3.5 w-3.5 text-sage" />
                            {f.baths} Bath
                          </span>
                        </div>
                        <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] text-[#5a6670] uppercase">
                          UDS {f.uds}
                        </p>
                      </div>
                    </div>
                  </CardShell>
                </FadeIn>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Amenity cards */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHead eyebrow="Lifestyle" title="Amenities" />
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
            {amenityCards.map((a, i) => {
              const Icon = a.icon
              return (
                <FadeIn key={a.name} delay={i * 0.03}>
                  <CardShell>
                    <div className="relative flex flex-col px-4 py-5 sm:px-5 sm:py-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-[#0c241c] text-white shadow-md transition duration-500 group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 text-[13px] font-bold tracking-tight text-ink sm:text-sm">
                        {a.name}
                      </p>
                      <span className="mt-3 inline-block h-1 w-8 rounded-full bg-ink/10 transition duration-500 group-hover:w-12 group-hover:bg-gold" />
                    </div>
                  </CardShell>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location / Connectivity */}
      <section className="relative overflow-hidden bg-ink py-14 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHead eyebrow="Location" title="Connectivity" light />
            <p className="-mt-6 mb-10 text-center text-sm text-cream/55 md:-mt-8 md:mb-12">
              26th Milestone on Srisailam Highway, Thummalur — BTR Township
            </p>
          </FadeIn>

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            <FadeIn className="h-full lg:col-span-7">
              <div className="relative h-full min-h-[340px]">
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/45 via-[#1a2e28] to-sage/35 opacity-80" />
                <div className="absolute inset-0 overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <iframe
                    title="BTR Serenity location map"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Thummalur%20Maheswaram%20Srisailam%20Highway%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/55 to-transparent" />
                  <a
                    href="https://maps.google.com/?q=Thummalur+Maheswaram+Srisailam+Highway+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase backdrop-blur-md transition hover:bg-gold hover:text-ink"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Open in Maps
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="flex h-full flex-col gap-5 lg:col-span-5">
              <FadeIn delay={0.06} className="min-h-0 flex-1">
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/40 via-[#1a2e28] to-sage/30 opacity-75 transition group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612]/95 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <GraduationCap className="h-5 w-5" />
                      </span>
                      <h3 className="text-[12px] font-bold tracking-[0.18em] text-cream uppercase">
                        Schools nearby
                      </h3>
                    </div>
                    <ul className="flex flex-1 flex-col justify-center">
                      {nearby.schools.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-3 border-t border-white/8 py-3 text-[14px] text-cream/75 first:border-0 first:pt-0 last:pb-0"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="min-h-0 flex-1">
                <div className="group relative h-full">
                  <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-gold/40 via-[#1a2e28] to-sage/30 opacity-75 transition group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#0c1612]/95 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <h3 className="text-[12px] font-bold tracking-[0.18em] text-cream uppercase">
                        Key locations
                      </h3>
                    </div>
                    <ul className="flex flex-1 flex-col justify-center">
                      {nearby.locations.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-3 border-t border-white/8 py-3 text-[14px] text-cream/75 first:border-0 first:pt-0 last:pb-0"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-sage uppercase">
                  Support
                </p>
                <h2 className="mt-2 text-[clamp(1.55rem,3.1vw,2.4rem)] font-semibold tracking-tight text-ink">
                  Frequently asked questions
                </h2>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-stone md:text-right">
                Specs, UDS, amenities, maintenance and more — from BTR Serenity.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <FAQ
              items={serenityFaqs}
              showAside
              asideTitle={'Still have\nquestions?'}
              asideBody="Browse all Serenity answers, or speak with our team for a guided walkthrough and site visit."
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA card */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <CardShell dark>
              <div className="relative px-8 py-12 text-center md:px-12 md:py-14">
                <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sage/25 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 top-1/3 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                  Ready to move in
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-tight text-cream">
                  Experience BTR Serenity
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-cream/55">
                  Schedule a site visit or speak with our team about available 3
                  &amp; 4 BHK homes.
                </p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition hover:-translate-y-0.5 hover:bg-gold-soft"
                >
                  Contact us <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardShell>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
