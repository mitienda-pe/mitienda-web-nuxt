import type { CountryCode } from '~/config/countries'

const WHATSAPP_BY_COUNTRY: Record<CountryCode, string> = {
  PE: '51992640275',
  EC: '51992640275',
  CO: '51992640275',
}

const SUPPORT_EMAIL = 'soporte@mitienda.pe'

export function useContact() {
  const { countryCode } = useCountry()

  function buildWhatsappUrl(message: string): string {
    const phone = WHATSAPP_BY_COUNTRY[countryCode.value] ?? WHATSAPP_BY_COUNTRY.PE
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  function buildMailto(subject: string, body = ''): string {
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (body) params.set('body', body)
    const qs = params.toString()
    return qs ? `mailto:${SUPPORT_EMAIL}?${qs}` : `mailto:${SUPPORT_EMAIL}`
  }

  return {
    buildWhatsappUrl,
    buildMailto,
    supportEmail: SUPPORT_EMAIL,
  }
}
