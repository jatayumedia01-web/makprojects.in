import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import {
  MAK_CRM_CHATBOT_SCRIPT,
  MAK_CRM_FORM_SCRIPT,
  MAK_FORM_MODAL_MOUNT,
} from './makCrmConfig'
import { loadExternalScript } from './loadExternalScript'

type EnquiryContextValue = {
  openEnquiry: () => void
  closeEnquiry: () => void
  isOpen: boolean
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

function MakEnquiryLayer({
  open,
  onClose,
  formReady,
}: {
  open: boolean
  onClose: () => void
  formReady: boolean
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <>
      <div
        className={
          open
            ? 'fixed inset-0 z-[101] flex items-end justify-center p-0 sm:items-center sm:p-4'
            : 'pointer-events-none fixed left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0'
        }
        aria-hidden={!open}
      >
        <div className="relative w-full max-w-[440px] px-2 pb-4 pt-2 sm:px-0 sm:pb-0">
          {open ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/95 text-ink shadow-md transition hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          {open && !formReady ? (
            <div className="rounded-[24px] bg-white px-8 py-14 text-center shadow-2xl">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-sage/20 border-t-sage" />
              <p className="mt-4 text-sm font-medium text-stone">
                Loading enquiry form…
              </p>
            </div>
          ) : null}
          <div id={MAK_FORM_MODAL_MOUNT.slice(1)} className="min-h-[120px]" />
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mak-enquiry-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [formReady, setFormReady] = useState(false)

  useEffect(() => {
    loadExternalScript({
      id: 'mak-crm-chatbot',
      src: MAK_CRM_CHATBOT_SCRIPT,
      defer: true,
    }).catch(() => {})

    const timer = window.setTimeout(() => {
      loadExternalScript({
        id: 'mak-crm-form-widget',
        src: MAK_CRM_FORM_SCRIPT,
        defer: true,
        attrs: { 'data-mount': MAK_FORM_MODAL_MOUNT },
      })
        .then(() => setFormReady(true))
        .catch(() => {})
    }, 150)

    return () => window.clearTimeout(timer)
  }, [])

  const openEnquiry = useCallback(() => setOpen(true), [])
  const closeEnquiry = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry, isOpen: open }),
    [open, openEnquiry, closeEnquiry],
  )

  useEffect(() => {
    ;(window as Window & { openMakEnquiry?: () => void }).openMakEnquiry =
      openEnquiry
    return () => {
      delete (window as Window & { openMakEnquiry?: () => void }).openMakEnquiry
    }
  }, [openEnquiry])

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <MakEnquiryLayer
        open={open}
        onClose={closeEnquiry}
        formReady={formReady}
      />
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) {
    throw new Error('useEnquiry must be used within EnquiryProvider')
  }
  return ctx
}
