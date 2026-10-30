import { createServer } from 'node:http'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from 'serve-handler'
import { legacyRedirects } from './legacyRedirects.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')
const port = Number(process.env.PORT) || 8080
const host = '0.0.0.0'

const SPA_ROUTES = new Set([
  '/',
  '/projects',
  '/btr-serenity',
  '/btr-villa-plots',
  '/btr-villas',
  '/fern-villas',
  '/canadian-wood-villa',
  '/btr-township',
  '/btr-greens',
  '/btr-golf-plots',
  '/amenities',
  '/about',
  '/awards',
  '/testimonials',
  '/management',
  '/contact',
  '/csr',
])

const spaRewrites = [...SPA_ROUTES]
  .filter((p) => p !== '/')
  .map((p) => ({ source: p, destination: '/index.html' }))

createServer((req, res) => {
  handler(req, res, {
    public: dist,
    cleanUrls: false,
    directoryListing: false,
    redirects: legacyRedirects.map((r) => ({ ...r, type: 301 })),
    rewrites: [
      { source: '/fern', destination: '/fern/index.html' },
      { source: '/fern/', destination: '/fern/index.html' },
      { source: '/fern/index', destination: '/fern/index.html' },
      ...spaRewrites,
    ],
  })
}).listen(port, host, () => {
  console.log(`MAK site listening on http://${host}:${port}`)
})
