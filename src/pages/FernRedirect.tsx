import { useLayoutEffect } from 'react'
import { navigateToFernSite } from '../utils/fernNavigation'

/** Instant full-page handoff to the static Fern microsite */
export default function FernRedirect() {
  useLayoutEffect(() => {
    navigateToFernSite()
  }, [])

  return null
}
