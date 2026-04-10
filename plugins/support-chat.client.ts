/**
 * Client-only plugin: Loads the MiTienda/TiendaBox support chat widget
 * on the landing page (mode: support) with country-aware configuration.
 */
import { DOMAIN_COUNTRY_MAP, COUNTRY_CONFIGS, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode } from '~/config/countries'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseUrl = (config.public.chatWidgetUrl as string || '').replace(/\/+$/, '')
  if (!baseUrl) return

  // Resolve country from hostname
  const hostname = window.location.hostname
  const countryCode = DOMAIN_COUNTRY_MAP[hostname]
    || (config.public.defaultCountry as CountryCode)
    || DEFAULT_COUNTRY
  const country = COUNTRY_CONFIGS[countryCode]

  // Avoid loading twice
  if (document.querySelector('script[data-mitienda-chat]')) return

  // Load CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `${baseUrl}/mitienda-chat.css`
  document.head.appendChild(link)

  // Load JS with country-aware widget config
  const script = document.createElement('script')
  script.async = true
  script.src = `${baseUrl}/mitienda-chat.iife.js`
  script.dataset.mode = 'support'
  script.dataset.botName = `Soporte ${country.brandName}`
  script.dataset.country = countryCode
  script.dataset.mitiendaChat = 'true'
  document.body.appendChild(script)
})
