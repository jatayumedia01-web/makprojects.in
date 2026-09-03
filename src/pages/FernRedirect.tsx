import { useLayoutEffect } from 'react'
import { FERN_SITE_URL } from '../utils/prefetchFern'

/** Instant full-page handoff to the static Fern microsite */
export default function FernRedirect() {
  useLayoutEffect(() => {
    window.location.replace(FERN_SITE_URL)
  }, [])

  return null
}
