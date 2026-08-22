import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { FadeIn, StaggerReveal, staggerItem } from '../components/Motion'
import {
  CardShell,
  PageContainer,
  SectionAccent,
  SectionBackdrop,
} from '../components/project/ProjectChrome'
import {
  contact,
  contactLocations,
  contactProjectOptions,
} from '../data/content'

const HERO = '/media/gardenia/hero.jpg'

const quickActions = [
  {
    label: 'Call us',
    value: contact.phones[0],
    href: `tel:${contact.phones[0].replace(/\s/g, '')}`,
    icon: Phone,
    tone: 'from-[#1f6b55] to-[#0c241c]',
  },
  {
    label: 'WhatsApp',
    value: 'Chat with sales',
    href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hello MAK Projects, I would like to enquire about your projects.')}`,
    icon: MessageCircle,
    tone: 'from-[#2d5a4a] to-[#0f2a22]',
    external: true,
  },
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
    tone: 'from-[#163d31] to-[#07110e]',
  },
] as const

const visitLinks = [
  { label: 'BTR Serenity', to: '/btr-serenity' },
  { label: 'BTR Township', to: '/btr-township' },
  { label: 'Villa Plots', to: '/btr-villa-plots' },
  { label: 'All Projects', to: '/projects' },
] as const

type LocationId = keyof typeof contactLocations

const inputClass =
  'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-stone/70 focus:border-sage/50 focus:ring-2 focus:ring-sage/15'

export default function Contact() {
  const reduce = useReducedMotion()
  const [location, setLocation] = useState<LocationId>('corporate')
  const [submitted, setSubmitted] = useState(false)
  const activeLocation = contactLocations[location]

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const project = String(fd.get('project') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    const projectLabel =
      contactProjectOptions.find((p) => p.value === project)?.label ?? project

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Project interest: ${projectLabel}`,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Website enquiry — ${projectLabel}`)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[52vh] overflow-hidden bg-ink sm:min-h-[58vh]">
        <motion.img
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 12, ease: 'easeOut' }}
          src={HERO}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />

        <PageContainer className="relative z-10 flex min-h-[52vh] flex-col justify-end pb-10 pt-28 sm:min-h-[58vh] sm:pb-14 sm:pt-32">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.32em] text-gold-soft uppercase">
              Get in touch
            </p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Contact Us
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Corporate office in Banjara Hills · Project site on Srisailam
              Highway. Reach our team for site visits, brochures, and project
              discussions.
            </p>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          </FadeIn>
        </PageContainer>
      </section>

      {/* Quick actions */}
      <section className="relative border-b border-ink/8 bg-white py-6 sm:py-8">
        <PageContainer>
          <StaggerReveal className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <motion.a
                  key={action.label}
                  variants={staggerItem}
                  href={action.href}
                  target={'external' in action && action.external ? '_blank' : undefined}
                  rel={
                    'external' in action && action.external
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-ink/8 bg-cream/40 p-4 transition duration-300 hover:border-sage/25 hover:bg-white hover:shadow-[0_12px_40px_rgba(7,17,14,0.08)] sm:p-5"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${action.tone} text-white shadow-md transition duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-[0.22em] text-sage uppercase">
                      {action.label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-ink">
                      {action.value}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink/20 transition group-hover:text-sage" />
                </motion.a>
              )
            })}
          </StaggerReveal>
        </PageContainer>
      </section>

      {/* Enquiry form + info */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <SectionBackdrop theme="cream" fadeBottom="white" />
        <SectionAccent />
        <PageContainer className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
            <FadeIn>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  Send an enquiry
                </p>
                <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-ink">
                  We&apos;d love to hear from you
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone">
                  Share your details and our team will connect with you about
                  availability, pricing, and site visits.
                </p>

                <CardShell className="mt-8" fit>
                  <div className="bg-white p-5 sm:p-7 md:p-8">
                    {submitted ? (
                      <div className="py-8 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
                          <Send className="h-6 w-6" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-ink">
                          Thank you
                        </h3>
                        <p className="mt-2 text-sm text-stone">
                          Your email client should open with your enquiry. If it
                          didn&apos;t, call us at{' '}
                          <a
                            href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                            className="font-semibold text-sage"
                          >
                            {contact.phones[0]}
                          </a>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="mt-6 text-xs font-semibold tracking-[0.14em] text-sage uppercase underline-offset-4 hover:underline"
                        >
                          Send another enquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block sm:col-span-1">
                            <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                              Full name *
                            </span>
                            <input
                              name="name"
                              type="text"
                              required
                              autoComplete="name"
                              placeholder="Your name"
                              className={inputClass}
                            />
                          </label>
                          <label className="block sm:col-span-1">
                            <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                              Phone *
                            </span>
                            <input
                              name="phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              placeholder="+91 98765 43210"
                              className={inputClass}
                            />
                          </label>
                        </div>

                        <label className="block">
                          <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                            Email
                          </span>
                          <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@email.com"
                            className={inputClass}
                          />
                        </label>

                        <label className="block">
                          <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                            Project interest *
                          </span>
                          <select
                            name="project"
                            required
                            defaultValue="general"
                            className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat pr-10`}
                          >
                            {contactProjectOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                            Message *
                          </span>
                          <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Tell us about your requirements, preferred unit type, or site visit timing…"
                            className={`${inputClass} resize-y min-h-[120px]`}
                          />
                        </label>

                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition hover:bg-forest sm:w-auto"
                        >
                          Submit enquiry
                          <Send className="h-3.5 w-3.5" />
                        </button>

                        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-stone">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                          Your information is used only to respond to your
                          enquiry. RERA-approved projects · MAK Projects Pvt.
                          Ltd.
                        </p>
                      </form>
                    )}
                  </div>
                </CardShell>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <InfoCard
                  icon={Building2}
                  title="Corporate office"
                  body={`MAK Projects Private Limited\n${contact.corporate}`}
                />
                <InfoCard
                  icon={MapPin}
                  title="Project site"
                  body={contact.project}
                />
                <InfoCard
                  icon={Clock}
                  title="Working hours"
                  body={contact.hours}
                />
                <InfoCard
                  icon={Mail}
                  title="Email & web"
                  body={`${contact.email}\n${contact.web}`}
                />

                <div className="rounded-2xl border border-sage/20 bg-gradient-to-br from-[#eef6f2] to-white p-5 sm:p-6">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-sage uppercase">
                    Response time
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">
                    {contact.responseNote}
                  </p>
                  <a
                    href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sage transition hover:text-forest"
                  >
                    <Phone className="h-4 w-4" />
                    {contact.phones[0]}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
      </section>

      {/* Locations + maps */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <SectionBackdrop theme="white" fadeBottom="mist" />
        <SectionAccent variant="fade" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="mb-8 text-center md:mb-10">
              <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                Visit us
              </p>
              <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-ink">
                Our locations
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-stone">
                Corporate meetings at Banjara Hills · Site visits at BTR Township
                on Srisailam Highway.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mb-6 flex justify-center">
              <div
                className="inline-flex rounded-full border border-ink/8 bg-cream/60 p-1"
                role="tablist"
                aria-label="Office locations"
              >
                {(Object.keys(contactLocations) as LocationId[]).map((id) => {
                  const loc = contactLocations[id]
                  const on = location === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setLocation(id)}
                      className="relative rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase sm:px-6"
                    >
                      {on && (
                        <motion.span
                          layoutId="contactLocationTab"
                          className="absolute inset-0 rounded-full bg-ink shadow-md"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      <span
                        className={`relative ${on ? 'text-cream' : 'text-stone'}`}
                      >
                        {loc.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CardShell fit>
              <div className="overflow-hidden bg-white">
                <div className="grid lg:grid-cols-2">
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">
                      {activeLocation.subtitle}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
                      {activeLocation.label}
                    </h3>
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone">
                      {activeLocation.address}
                    </p>
                    <a
                      href={activeLocation.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-ink/12 px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase transition hover:border-sage hover:bg-sage/5 hover:text-sage"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Get directions
                    </a>
                  </div>

                  <div className="relative min-h-[260px] bg-mist sm:min-h-[320px] lg:min-h-[360px]">
                    <iframe
                      key={activeLocation.id}
                      title={`${activeLocation.label} map`}
                      className="absolute inset-0 h-full w-full grayscale-[25%] contrast-[1.02]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={activeLocation.mapEmbed}
                    />
                  </div>
                </div>
              </div>
            </CardShell>
          </FadeIn>
        </PageContainer>
      </section>

      {/* Explore projects */}
      <section className="relative overflow-hidden py-14 md:py-16">
        <SectionBackdrop theme="mist" />
        <PageContainer className="relative">
          <FadeIn>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  Before you visit
                </p>
                <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
                  Explore our projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-sage uppercase hover:text-ink"
              >
                View portfolio <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {visitLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between rounded-2xl border border-ink/8 bg-white/80 px-5 py-4 transition duration-300 hover:border-sage/30 hover:bg-white hover:shadow-md"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span className="text-sm font-semibold text-ink group-hover:text-sage">
                    {link.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-sage" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* CTA strip */}
      <section className="bg-ink py-12 md:py-16">
        <PageContainer className="max-w-2xl text-center">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
              Ready to visit?
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Schedule a site visit today
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Call or WhatsApp our team to plan your township tour on Srisailam
              Highway.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase"
              >
                <Phone className="h-3.5 w-3.5" />
                {contact.phones[0]}
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </>
  )
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Building2
  title: string
  body: string
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-ink/8 bg-white/90 p-5 backdrop-blur-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-[11px] font-semibold tracking-[0.18em] text-sage uppercase">
          {title}
        </h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/80">
          {body}
        </p>
      </div>
    </div>
  )
}
