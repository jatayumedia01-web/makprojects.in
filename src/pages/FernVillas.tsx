import { useEffect } from 'react'

/** Exact Fern site is hosted at /fern/ (same as fernvillas.in) */
export default function FernVillas() {
  useEffect(() => {
    window.location.replace('/fern/')
  }, [])

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream px-6 py-20 text-center">
      <p className="text-sm text-stone">
        Opening{' '}
        <a href="/fern/" className="font-semibold text-sage underline underline-offset-2">
          Fern by MAK Projects
        </a>
        …
      </p>
    </div>
  )
}
