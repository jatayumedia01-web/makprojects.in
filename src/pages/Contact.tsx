import type { ReactNode } from 'react'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import { FadeIn, PageHero } from '../components/Motion'
import { contact } from '../data/content'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Corporate office in Banjara Hills · Project site on Srisailam Highway."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-8">
              <Info
                icon={<MapPin className="h-5 w-5 text-gold" />}
                title="Corporate Office"
                body={`MAK Projects Private Limited\n${contact.corporate}`}
              />
              <Info
                icon={<MapPin className="h-5 w-5 text-gold" />}
                title="Project Address"
                body={contact.project}
              />
              <Info
                icon={<Phone className="h-5 w-5 text-gold" />}
                title="Phone"
                body={contact.phones.join('\n')}
              />
              <Info
                icon={<Mail className="h-5 w-5 text-gold" />}
                title="Email"
                body={`${contact.email}\n${contact.web}`}
              />
              <Info
                icon={<Clock className="h-5 w-5 text-gold" />}
                title="Working Hours"
                body={contact.hours}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="aspect-video h-full min-h-[320px] overflow-hidden border border-ink/10 bg-mist lg:min-h-0">
              <iframe
                title="MAK Projects location"
                className="h-full w-full grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Park%20Citi%20Plaza%20Banjara%20Hills%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function Info({
  icon,
  title,
  body,
}: {
  icon: ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="text-xs tracking-[0.25em] text-sage uppercase">{title}</h3>
        <p className="mt-2 whitespace-pre-line text-ink/80">{body}</p>
      </div>
    </div>
  )
}
