import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to #hash targets after SPA navigation (e.g. /management#chairman).
 * Native scroll-padding-top on html handles sticky header offset.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.replace('#', '')
    let attempts = 0

    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }

    if (scrollToTarget()) return

    const timer = window.setInterval(() => {
      attempts += 1
      if (scrollToTarget() || attempts >= 12) {
        window.clearInterval(timer)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [pathname, hash])

  return null
}
