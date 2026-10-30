import { Link } from 'react-router-dom'
import { PageSeo } from '../seo/PageSeo'

export default function NotFound() {
  return (
    <>
      <PageSeo
        title="Page not found | MAK Projects"
        description="The page you requested could not be found on makprojects.com."
        path="/404"
        noIndex
      />
      <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-sage">
          404
        </p>
        <h1 className="mt-3 font-serif text-3xl text-charcoal">Page not found</h1>
        <p className="mt-4 text-muted">
          This URL is not on our site. Try the home page or contact us for help.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </main>
    </>
  )
}
