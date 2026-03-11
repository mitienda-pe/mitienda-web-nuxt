export type CountryCode = 'PE' | 'EC' | 'CO'

export interface PricingPlan {
  name: string
  monthly: number
  commission: string
  threshold: string
  features: string[]
  featured: boolean
}

export interface CountryConfig {
  code: CountryCode
  name: string
  brandName: string
  domain: string
  landingDomain: string
  adminUrl: string
  helpUrl: string
  apiDocsUrl: string
  statusUrl: string
  logo: string
  logoDark: string
  currency: { code: string; symbol: string }
  taxName: string
  phoneCode: string
  locale: string
  geoRegion: string
  geoPlacename: string
  geoPosition: string
  plans: PricingPlan[]
  paymentGateways: string[]
  hasLibroReclamaciones: boolean
  hasBillingElectronica: boolean
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  legalEntity: string
  gaId?: string
  fbPixelId?: string
}

export const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {
  PE: {
    code: 'PE',
    name: 'Perú',
    brandName: 'MiTienda',
    domain: 'mitienda.pe',
    landingDomain: 'mitienda.pe',
    adminUrl: 'https://admin.mitienda.pe',
    helpUrl: 'https://ayuda.mitienda.pe/',
    apiDocsUrl: 'https://publicapi.mitienda.pe/docs/',
    statusUrl: 'https://mitienda.statuspage.io/',
    logo: '/img/logo-mitienda.svg',
    logoDark: '/img/logo-mitienda_fondo-pizarra.svg',
    currency: { code: 'PEN', symbol: 'S/' },
    taxName: 'IGV',
    phoneCode: '+51',
    locale: 'es-PE',
    geoRegion: 'PE-LIM',
    geoPlacename: 'Lima',
    geoPosition: '-12.10706;-77.03107',
    plans: [
      {
        name: 'Micro',
        monthly: 49,
        commission: '2.0%',
        threshold: 'S/ 999.99',
        features: [
          'Hasta 50 productos',
          'Tienda personalizable',
          'Pagos seguros',
          'Soporte básico',
          'SSL incluido'
        ],
        featured: false
      },
      {
        name: 'Small',
        monthly: 99,
        commission: '1.5%',
        threshold: 'S/ 1,999.99',
        features: [
          'Hasta 100 productos',
          'Dominio personalizado',
          'Google Analytics',
          'Cupones y descuentos',
          'Soporte prioritario'
        ],
        featured: true
      },
      {
        name: 'Medium',
        monthly: 149,
        commission: '1.0%',
        threshold: 'S/ 4,999.99',
        features: [
          'Hasta 500 productos',
          'Promociones avanzadas',
          'Múltiples usuarios',
          'Reportes detallados',
          'Integraciones premium'
        ],
        featured: false
      },
      {
        name: 'Large',
        monthly: 259,
        commission: '0.5%',
        threshold: 'S/ 9,999.99',
        features: [
          'Productos ilimitados',
          'API completa',
          'Soporte VIP',
          'Webhooks',
          'Todo incluido'
        ],
        featured: false
      }
    ],
    paymentGateways: ['Mercadopago', 'Openpay', 'Culqi', 'Niubiz', 'Izipay', 'Yape', 'Plin'],
    hasLibroReclamaciones: true,
    hasBillingElectronica: true,
    socialMedia: {
      facebook: 'https://www.facebook.com/mitiendapuntope',
      twitter: 'https://x.com/mitiendapuntope',
      instagram: 'https://instagram.com/mitiendapuntope',
      linkedin: 'https://www.linkedin.com/company/28980026/',
      youtube: 'https://youtube.com/mitienda',
      tiktok: 'https://tiktok.com/@mitiendapuntope'
    },
    legalEntity: 'Tiendas Virtuales Latinoamérica SAC',
    gaId: 'G-XXXXXXXXXX',
    fbPixelId: 'XXXXXXXXXXXXXXXXX',
  },
  EC: {
    code: 'EC',
    name: 'Ecuador',
    brandName: 'TiendaBox',
    domain: 'tiendabox.ec',
    landingDomain: 'tiendabox.ec',
    adminUrl: 'https://admin.mitienda.pe',
    helpUrl: 'https://ayuda.mitienda.pe/',
    apiDocsUrl: 'https://publicapi.mitienda.pe/docs/',
    statusUrl: 'https://mitienda.statuspage.io/',
    logo: '/img/logo-tiendabox.svg',
    logoDark: '/img/logo-tiendabox_fondo-pizarra.svg',
    currency: { code: 'USD', symbol: '$' },
    taxName: 'IVA',
    phoneCode: '+593',
    locale: 'es-EC',
    geoRegion: 'EC-P',
    geoPlacename: 'Quito',
    geoPosition: '-0.1807;-78.4678',
    plans: [
      {
        name: 'Micro',
        monthly: 15,
        commission: '2.0%',
        threshold: '$ 249.99',
        features: [
          'Hasta 50 productos',
          'Tienda personalizable',
          'Pagos seguros',
          'Soporte básico',
          'SSL incluido'
        ],
        featured: false
      },
      {
        name: 'Small',
        monthly: 29,
        commission: '1.5%',
        threshold: '$ 499.99',
        features: [
          'Hasta 100 productos',
          'Dominio personalizado',
          'Google Analytics',
          'Cupones y descuentos',
          'Soporte prioritario'
        ],
        featured: true
      },
      {
        name: 'Medium',
        monthly: 49,
        commission: '1.0%',
        threshold: '$ 1,249.99',
        features: [
          'Hasta 500 productos',
          'Promociones avanzadas',
          'Múltiples usuarios',
          'Reportes detallados',
          'Integraciones premium'
        ],
        featured: false
      },
      {
        name: 'Large',
        monthly: 79,
        commission: '0.5%',
        threshold: '$ 2,499.99',
        features: [
          'Productos ilimitados',
          'API completa',
          'Soporte VIP',
          'Webhooks',
          'Todo incluido'
        ],
        featured: false
      }
    ],
    paymentGateways: ['Mercadopago', 'Openpay'],
    hasLibroReclamaciones: false,
    hasBillingElectronica: false,
    socialMedia: {
      facebook: 'https://www.facebook.com/mitiendapuntope',
      instagram: 'https://instagram.com/mitiendapuntope'
    },
    legalEntity: 'Tiendas Virtuales Latinoamérica SAC',
    gaId: '',
    fbPixelId: '',
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    brandName: 'TiendaBox',
    domain: 'tiendabox.co',
    landingDomain: 'tiendabox.co',
    adminUrl: 'https://admin.mitienda.pe',
    helpUrl: 'https://ayuda.mitienda.pe/',
    apiDocsUrl: 'https://publicapi.mitienda.pe/docs/',
    statusUrl: 'https://mitienda.statuspage.io/',
    logo: '/img/logo-tiendabox.svg',
    logoDark: '/img/logo-tiendabox_fondo-pizarra.svg',
    currency: { code: 'USD', symbol: '$' },
    taxName: 'IVA',
    phoneCode: '+57',
    locale: 'es-CO',
    geoRegion: 'CO-DC',
    geoPlacename: 'Bogotá',
    geoPosition: '4.7110;-74.0721',
    plans: [
      {
        name: 'Micro',
        monthly: 15,
        commission: '2.0%',
        threshold: '$ 249.99',
        features: [
          'Hasta 50 productos',
          'Tienda personalizable',
          'Pagos seguros',
          'Soporte básico',
          'SSL incluido'
        ],
        featured: false
      },
      {
        name: 'Small',
        monthly: 29,
        commission: '1.5%',
        threshold: '$ 499.99',
        features: [
          'Hasta 100 productos',
          'Dominio personalizado',
          'Google Analytics',
          'Cupones y descuentos',
          'Soporte prioritario'
        ],
        featured: true
      },
      {
        name: 'Medium',
        monthly: 49,
        commission: '1.0%',
        threshold: '$ 1,249.99',
        features: [
          'Hasta 500 productos',
          'Promociones avanzadas',
          'Múltiples usuarios',
          'Reportes detallados',
          'Integraciones premium'
        ],
        featured: false
      },
      {
        name: 'Large',
        monthly: 79,
        commission: '0.5%',
        threshold: '$ 2,499.99',
        features: [
          'Productos ilimitados',
          'API completa',
          'Soporte VIP',
          'Webhooks',
          'Todo incluido'
        ],
        featured: false
      }
    ],
    paymentGateways: ['Mercadopago', 'Openpay'],
    hasLibroReclamaciones: false,
    hasBillingElectronica: false,
    socialMedia: {
      facebook: 'https://www.facebook.com/mitiendapuntope',
      instagram: 'https://instagram.com/mitiendapuntope'
    },
    legalEntity: 'Tiendas Virtuales Latinoamérica SAC',
    gaId: '',
    fbPixelId: '',
  }
}

// Map hostnames to country codes
export const DOMAIN_COUNTRY_MAP: Record<string, CountryCode> = {
  'mitienda.pe': 'PE',
  'www.mitienda.pe': 'PE',
  'nuevo.mitienda.pe': 'PE',
  'tiendabox.ec': 'EC',
  'www.tiendabox.ec': 'EC',
  'tiendabox.co': 'CO',
  'www.tiendabox.co': 'CO',
  // localhost is NOT mapped here — it falls back to NUXT_PUBLIC_DEFAULT_COUNTRY env var
}

export const DEFAULT_COUNTRY: CountryCode = 'PE'
