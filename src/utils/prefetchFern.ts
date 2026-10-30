const FERN_PREFETCH = [
  { href: '/fern/index.html', as: 'document' },
  { href: '/fern/assets/css/style.css', as: 'style' },
  {
    href: '/fern/assets/images/plans/east_facing/east_villa2-m.webp',
    as: 'image',
  },
] as const

let prefetched = false

/** Warm Fern microsite assets so /fern/ opens instantly from MAK home */
export function prefetchFernSite() {
  if (prefetched || typeof document === 'undefined') return
  prefetched = true

  for (const { href, as } of FERN_PREFETCH) {
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) continue
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }

  fetch('/fern/index.html', { priority: 'low' } as RequestInit).catch(() => {})
}

/** Static Fern HTML (avoid SPA shell at /fern/ on Node hosts). */
export const FERN_SITE_URL = '/fern/index.html'
