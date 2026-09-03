import { MAK_CRM_FORM_IFRAME } from './makCrmConfig'

/** Inline CRM form for Contact page — isolated iframe avoids widget conflicts */
export default function MakFormIframe({ className = '' }: { className?: string }) {
  return (
    <iframe
      title="MAK Projects enquiry form"
      src={MAK_CRM_FORM_IFRAME}
      className={`w-full border-0 bg-transparent ${className}`}
      loading="lazy"
      style={{ minHeight: 520 }}
    />
  )
}
