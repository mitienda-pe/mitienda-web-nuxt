import { DOMAIN_COUNTRY_MAP, COUNTRY_CONFIGS, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode } from '~/config/countries'

export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  const hostname = host.split(':')[0]

  const config = useRuntimeConfig()
  const countryCode = DOMAIN_COUNTRY_MAP[hostname]
    || (config.public.defaultCountry as CountryCode)
    || DEFAULT_COUNTRY
  const country = COUNTRY_CONFIGS[countryCode]
  const siteUrl = `https://${country.landingDomain}`

  setResponseHeader(event, 'content-type', 'text/plain')

  return `# robots.txt for ${country.brandName} (${country.landingDomain})

User-agent: *
Allow: /
Disallow: /api/
Disallow: /prueba-gratis/paso2/
Disallow: /prueba-gratis/completar/
Disallow: /registro-v2/completar/

Sitemap: ${siteUrl}/sitemap.xml
`
})
