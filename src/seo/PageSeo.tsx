import { useLayoutEffect } from 'react'
import { SEO_CANONICAL_ORIGIN } from './siteSeo'

export type PageSeoProps = {
  title: string
  description: string
  /** Pathname including leading slash, e.g. `/about` */
  path?: string
  noIndex?: boolean
}

function upsertMeta(
  key: string,
  content: string,
  attr: 'name' | 'property' = 'name',
) {
  const el =
    document.querySelector<HTMLMetaElement>(
      `meta[${attr}="${CSS.escape(key)}"]`,
    ) ??
    (() => {
      const created = document.createElement('meta')
      created.setAttribute(attr, key)
      document.head.appendChild(created)
      return created
    })()
  el.content = content
}

function upsertLink(rel: string, href: string) {
  const el =
    document.querySelector<HTMLLinkElement>(`link[rel="${CSS.escape(rel)}"]`) ??
    (() => {
      const created = document.createElement('link')
      created.rel = rel
      document.head.appendChild(created)
      return created
    })()
  el.href = href
}

function canonicalUrl(path: string) {
  if (!path || path === '/') return `${SEO_CANONICAL_ORIGIN}/`
  return `${SEO_CANONICAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

export function PageSeo({
  title,
  description,
  path = '/',
  noIndex = false,
}: PageSeoProps) {
  useLayoutEffect(() => {
    const url = canonicalUrl(path)
    document.title = title

    upsertMeta('description', description)
    upsertMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    upsertMeta('og:title', title, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertMeta('og:url', url, 'property')
    upsertMeta('og:site_name', 'MAK Projects', 'property')

    upsertMeta('twitter:card', 'summary_large_image')
    upsertMeta('twitter:title', title)
    upsertMeta('twitter:description', description)

    upsertLink('canonical', url)
  }, [title, description, path, noIndex])

  return null
}
