import { Phone, FileDown } from 'lucide-react'

export default function FloatingCTAs({ className = '' }: { className?: string }) {
  return (
    <div className={`fixed bottom-6 right-6 z-40 flex flex-col gap-3 ${className}`}>
      <a
        href="tel:+919912797979"
        className="group flex items-center gap-2 bg-gold px-4 py-3 text-sm font-semibold text-ink shadow-xl transition hover:bg-gold-soft"
      >
        <Phone className="h-4 w-4" />
        <span className="hidden sm:inline">Call Request</span>
      </a>
      <a
        href="mailto:info@makprojects.com?subject=Brochure%20Request"
        className="group flex items-center gap-2 bg-forest px-4 py-3 text-sm font-semibold text-cream shadow-xl transition hover:bg-moss"
      >
        <FileDown className="h-4 w-4 text-gold" />
        <span className="hidden sm:inline">Download Brochure</span>
      </a>
    </div>
  )
}
