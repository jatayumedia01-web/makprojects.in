import { FERN_SITE_URL } from './prefetchFern'

/** Fern HTML is ~120KB; SPA shell is ~1.3KB. */
const FERN_MIN_BYTES = 50_000

const FERN_MIRROR_URL = 'https://makprojects.in/fern/index.html'

async function fernDocumentUrl(): Promise<string> {
  try {
    const res = await fetch(FERN_SITE_URL, { method: 'GET', cache: 'no-store' })
    if (!res.ok) return FERN_MIRROR_URL
    const len = Number(res.headers.get('content-length') ?? 0)
    if (len >= FERN_MIN_BYTES) return FERN_SITE_URL
    const text = await res.text()
    if (text.length >= FERN_MIN_BYTES && text.includes('Fern by MAK')) {
      return FERN_SITE_URL
    }
  } catch {
    /* use mirror */
  }
  return FERN_MIRROR_URL
}

/** Full navigation to the static Fern microsite (works even if /fern/ serves SPA shell). */
export function navigateToFernSite() {
  void fernDocumentUrl().then((url) => {
    window.location.assign(url)
  })
}
