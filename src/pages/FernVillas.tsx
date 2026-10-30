import { useEffect } from 'react'
import { FERN_SITE_URL } from '../utils/prefetchFern'

/** Exact Fern site is hosted at /fern/index.html (same as fernvillas.in) */
export default function FernVillas() {
  useEffect(() => {
    window.location.replace(FERN_SITE_URL)
  }, [])

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream px-6 py-20 text-center">
      <p className="text-sm text-stone">
        Opening{' '}
        <a href={FERN_SITE_URL} className="font-semibold text-sage underline underline-offset-2">
          Fern by MAK Projects
        </a>
        …
      </p>
    </div>
  )
}
