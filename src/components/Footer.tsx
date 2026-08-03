import { Link } from 'react-router-dom'
import { contact } from '../data/content'
import { MakLogo } from './BrandLogos'

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Management', to: '/management' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Amenities', to: '/amenities' },
]

const projectLinks = [
  { label: 'MAK — BTR Township', to: '/btr-township' },
  { label: 'BTR — Serenity', to: '/btr-serenity' },
  { label: 'BTR — Gardenia', to: '/btr-villa-plots' },
  { label: 'BTR — Villas', to: '/btr-villas' },
  { label: 'Canadian Wood Villa', to: '/canadian-wood-villa' },
  { label: 'Fern by MAK · Tukkuguda', to: '/fern/', external: true },
  { label: 'All Projects', to: '/projects' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div>
          <Link to="/" className="inline-block rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <MakLogo className="h-14 w-auto" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-cream/55">
            Symbol of Excellence and Innovation in Hyderabad Real Estate
            Development. You dream. We deliver.
          </p>
          <Link
            to="/about"
            className="mt-5 inline-block text-xs font-semibold tracking-[0.2em] text-gold uppercase transition hover:text-gold-soft"
          >
            Our Story →
          </Link>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
            Projects
          </h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            {projectLinks.map((l) => (
              <li key={l.to}>
                {l.external ? (
                  <a
                    href={l.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-cream"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to} className="transition hover:text-cream">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
            Address
          </h4>
          <p className="text-sm leading-relaxed text-cream/70">
            {contact.corporate}
          </p>
          <p className="mt-4 text-sm text-cream/70">
            {contact.phones.join(' · ')}
          </p>
          <p className="mt-1 text-sm text-cream/70">{contact.email}</p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-cream/40 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} MAK Projects Private Limited. All
            rights reserved.
          </span>
          <span>You dream. We deliver.</span>
        </div>
      </div>
    </footer>
  )
}
