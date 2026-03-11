import { COUNTRY_CONFIGS, DOMAIN_COUNTRY_MAP, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode, CountryConfig } from '~/config/countries'

export function useCountry() {
  const config = useRuntimeConfig()

  const countryCode = computed<CountryCode>(() => {
    let hostname = ''

    if (import.meta.server) {
      try {
        const headers = useRequestHeaders(['host'])
        hostname = headers.host?.split(':')[0] || ''
      } catch {
        // During prerendering there is no request context
        hostname = ''
      }
    } else {
      hostname = window.location.hostname
    }

    return DOMAIN_COUNTRY_MAP[hostname]
      || (config.public.defaultCountry as CountryCode)
      || DEFAULT_COUNTRY
  })

  const country = computed<CountryConfig>(() => {
    return COUNTRY_CONFIGS[countryCode.value]
  })

  const brandName = computed(() => country.value.brandName)
  const isPeru = computed(() => countryCode.value === 'PE')
  const currency = computed(() => country.value.currency)
  const plans = computed(() => country.value.plans)

  function formatPrice(amount: number): string {
    const { symbol } = country.value.currency
    const formatted = amount.toLocaleString(country.value.locale)
    return `${symbol}${formatted}`
  }

  function getAnnualPrice(monthlyPrice: number): number {
    return Math.round(monthlyPrice * 12 * 0.8)
  }

  return {
    countryCode,
    country,
    brandName,
    isPeru,
    currency,
    plans,
    formatPrice,
    getAnnualPrice
  }
}
