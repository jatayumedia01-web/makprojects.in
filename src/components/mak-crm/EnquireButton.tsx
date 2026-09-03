import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useEnquiry } from './EnquiryContext'

type EnquireButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

/** Opens the MAK CRM enquiry modal */
export default function EnquireButton({
  children,
  type = 'button',
  onClick,
  ...props
}: EnquireButtonProps) {
  const { openEnquiry } = useEnquiry()

  return (
    <button
      type={type}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) openEnquiry()
      }}
    >
      {children}
    </button>
  )
}
