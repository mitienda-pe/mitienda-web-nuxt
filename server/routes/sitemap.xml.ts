import { DOMAIN_COUNTRY_MAP, COUNTRY_CONFIGS, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode } from '~/config/countries'
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  const hostname = host.split(':')[0]

  const config = useRuntimeConfig()
  const countryCode = DOMAIN_COUNTRY_MAP[hostname]
    || (config.public.defaultCountry as CountryCode)
    || DEFAULT_COUNTRY
  const country = COUNTRY_CONFIGS[countryCode]
  const siteUrl = `https://${country.landingDomain}`

  // Static pages
  const pages: Array<{ loc: string; priority: string; changefreq: string }> = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/registro-v2', priority: '0.9', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    { loc: '/terminos-y-condiciones', priority: '0.3', changefreq: 'yearly' },
    { loc: '/politicas-de-privacidad', priority: '0.3', changefreq: 'yearly' },
    { loc: '/politica-de-cookies', priority: '0.3', changefreq: 'yearly' },
  ]

  // Peru-only pages
  if (country.hasLibroReclamaciones) {
    pages.push({ loc: '/libro-de-reclamaciones', priority: '0.3', changefreq: 'yearly' })
  }

  // Blog posts filtered by country
  try {
    const posts = await queryCollection(event, 'blog').all()
    for (const post of posts) {
      if (post.countries?.includes(countryCode)) {
        pages.push({
          loc: post.path || `/blog/${post.stem}`,
          priority: '0.6',
          changefreq: 'monthly',
        })
      }
    }
  } catch {
    // Content module may not be ready during build
  }

  // All country domains for hreflang alternates
  const allDomains = Object.values(COUNTRY_CONFIGS).map(c => ({
    locale: c.locale,
    domain: c.landingDomain,
  }))

  const today = new Date().toISOString().split('T')[0]

  const urls = pages.map(page => {
    const alternates = allDomains.map(d =>
      `      <xhtml:link rel="alternate" hreflang="${d.locale}" href="https://${d.domain}${page.loc}" />`
    ).join('\n')

    return `  <url>
    <loc>${siteUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`
  }).join('\n')

  setResponseHeader(event, 'content-type', 'application/xml')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
})
