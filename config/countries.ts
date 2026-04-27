export type CountryCode = 'PE' | 'EC' | 'CO'

export type PlanLevel = 'Micro' | 'Small' | 'Medium' | 'Large'

export const PLAN_ORDER: PlanLevel[] = ['Micro', 'Small', 'Medium', 'Large']

export interface PlanQuotas {
  maxProducts: number // 0 = ilimitado
  maxPages: number    // 0 = ilimitado
  maxUsers: number    // 0 = ilimitado
}

export interface PricingPlan {
  name: PlanLevel
  monthly: number
  commission: string
  threshold: string
  features: string[]
  featured: boolean
  quotas: PlanQuotas
}

/** Value rendered in a comparison matrix cell. */
export type MatrixCell = boolean | string | number

export type PlanValueRecord = Record<PlanLevel, MatrixCell>

export interface ComparisonFeature {
  key: string
  label: string
  hint?: string
  values: PlanValueRecord
}

export interface ComparisonCategory {
  key: string
  label: string
  features: ComparisonFeature[]
}

// --- Helpers para declarar valores por plan de forma concisa ---
const all = (v: MatrixCell): PlanValueRecord => ({ Micro: v, Small: v, Medium: v, Large: v })
const tier = (m: MatrixCell, s: MatrixCell, md: MatrixCell, l: MatrixCell): PlanValueRecord =>
  ({ Micro: m, Small: s, Medium: md, Large: l })
const fromSmall = (v: MatrixCell = true, fallback: MatrixCell = false): PlanValueRecord =>
  tier(fallback, v, v, v)
const fromMedium = (v: MatrixCell = true, fallback: MatrixCell = false): PlanValueRecord =>
  tier(fallback, fallback, v, v)
const onlyLarge = (v: MatrixCell = true, fallback: MatrixCell = false): PlanValueRecord =>
  tier(fallback, fallback, fallback, v)

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
  /** Extra integraciones específicas del país, mostradas al final de la matriz comparativa. */
  extraFeatures: ComparisonCategory[]
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
        featured: false,
        quotas: { maxProducts: 50, maxPages: 5, maxUsers: 1 }
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
        featured: true,
        quotas: { maxProducts: 100, maxPages: 10, maxUsers: 1 }
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
        featured: false,
        quotas: { maxProducts: 500, maxPages: 25, maxUsers: 3 }
      },
      {
        name: 'Large',
        monthly: 299,
        commission: '0.5%',
        threshold: 'S/ 9,999.99',
        features: [
          'Productos ilimitados',
          'API completa',
          'Soporte VIP',
          'Webhooks',
          'Todo incluido'
        ],
        featured: false,
        quotas: { maxProducts: 0, maxPages: 0, maxUsers: 0 }
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
    gaId: 'G-J91H38CJ41',
    fbPixelId: '346926019871520',
    extraFeatures: [
      {
        key: 'integraciones-pe',
        label: 'Integraciones (Perú)',
        features: [
          { key: 'gw-mercadopago', label: 'Mercadopago', values: all(true) },
          { key: 'gw-culqi', label: 'Culqi', values: fromSmall() },
          { key: 'gw-niubiz', label: 'Niubiz', values: fromSmall() },
          { key: 'gw-izipay', label: 'Izipay', values: fromSmall() },
          { key: 'gw-openpay', label: 'Openpay', values: fromMedium() },
          { key: 'gw-yape-plin', label: 'Yape / Plin', values: fromSmall() },
          { key: 'gw-paypal', label: 'PayPal', values: fromMedium() },
          { key: 'invoice-nubefact', label: 'Facturación electrónica (Nubefact)', values: fromMedium() },
          { key: 'libro-reclamaciones', label: 'Libro de reclamaciones digital', values: all(true) },
          { key: 'courier-urbano', label: 'Urbano', values: fromSmall() },
          { key: 'courier-chazki', label: 'Chazki', values: fromMedium() },
          { key: 'courier-urbaner', label: 'Urbaner', values: fromMedium() },
          { key: 'courier-shalom', label: 'Shalom', values: fromMedium() },
          { key: 'erp-netsuite', label: 'NetSuite', values: onlyLarge() },
          { key: 'erp-mtbridge', label: 'ERPs locales (Random / Contanet / TheHub)', values: onlyLarge() },
          { key: 'wms-mintsoft', label: 'WMS (Mintsoft / Urbano WMS)', values: onlyLarge() },
        ]
      }
    ]
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
        featured: false,
        quotas: { maxProducts: 50, maxPages: 5, maxUsers: 1 }
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
        featured: true,
        quotas: { maxProducts: 100, maxPages: 10, maxUsers: 1 }
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
        featured: false,
        quotas: { maxProducts: 500, maxPages: 25, maxUsers: 3 }
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
        featured: false,
        quotas: { maxProducts: 0, maxPages: 0, maxUsers: 0 }
      }
    ],
    paymentGateways: ['Payphone', 'D-Local', 'Datafast', 'Kushki', 'Mercadopago'],
    hasLibroReclamaciones: false,
    hasBillingElectronica: false,
    socialMedia: {
      facebook: 'https://www.facebook.com/mitiendapuntope',
      instagram: 'https://instagram.com/mitiendapuntope'
    },
    legalEntity: 'Tiendas Virtuales Latinoamérica SAC',
    gaId: 'G-D1E0WNTMBZ',
    fbPixelId: '',
    extraFeatures: [
      {
        key: 'integraciones-ec',
        label: 'Integraciones (Ecuador)',
        features: [
          { key: 'gw-mercadopago', label: 'Mercadopago', values: all(true) },
          { key: 'gw-payphone', label: 'PayPhone', values: fromSmall() },
          { key: 'gw-datafast', label: 'Datafast', values: fromMedium() },
          { key: 'gw-kushki', label: 'Kushki', values: fromMedium() },
          { key: 'gw-dlocal', label: 'D-Local', values: onlyLarge() },
          { key: 'gw-paypal', label: 'PayPal', values: fromMedium() },
          { key: 'courier-servientrega', label: 'Servientrega', values: fromSmall() },
          { key: 'courier-tramaco', label: 'Tramaco', values: fromMedium() },
          { key: 'courier-laar', label: 'Laar Courier', values: fromMedium() },
        ]
      }
    ]
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
        featured: false,
        quotas: { maxProducts: 50, maxPages: 5, maxUsers: 1 }
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
        featured: true,
        quotas: { maxProducts: 100, maxPages: 10, maxUsers: 1 }
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
        featured: false,
        quotas: { maxProducts: 500, maxPages: 25, maxUsers: 3 }
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
        featured: false,
        quotas: { maxProducts: 0, maxPages: 0, maxUsers: 0 }
      }
    ],
    paymentGateways: ['PayU', 'Mercadopago', 'D-Local', 'Wompi'],
    hasLibroReclamaciones: false,
    hasBillingElectronica: false,
    socialMedia: {
      facebook: 'https://www.facebook.com/mitiendapuntope',
      instagram: 'https://instagram.com/mitiendapuntope'
    },
    legalEntity: 'Tiendas Virtuales Latinoamérica SAC',
    gaId: 'G-BTNWQQR373',
    fbPixelId: '',
    extraFeatures: [
      {
        key: 'integraciones-co',
        label: 'Integraciones (Colombia)',
        features: [
          { key: 'gw-mercadopago', label: 'Mercadopago', values: all(true) },
          { key: 'gw-payu', label: 'PayU', values: fromSmall() },
          { key: 'gw-wompi', label: 'Wompi', values: fromMedium() },
          { key: 'gw-dlocal', label: 'D-Local', values: onlyLarge() },
          { key: 'gw-paypal', label: 'PayPal', values: fromMedium() },
          { key: 'courier-servientrega', label: 'Servientrega', values: fromSmall() },
          { key: 'courier-coordinadora', label: 'Coordinadora', values: fromSmall() },
          { key: 'courier-interrapidisimo', label: 'Interrapidísimo', values: fromMedium() },
          { key: 'courier-enviaco', label: 'Envia.co', values: fromMedium() },
          { key: 'marketplace-mlibre', label: 'Mercado Libre', values: onlyLarge() },
          { key: 'marketplace-linio', label: 'Linio', values: onlyLarge() },
        ]
      }
    ]
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

// ─────────────────────────────────────────────────────────────────────────────
// Matriz comparativa compartida entre todos los países.
// Renderizada en /planes (vista de comparación detallada).
// Las integraciones específicas por país viven en `extraFeatures` de cada país.
// ─────────────────────────────────────────────────────────────────────────────
export const SHARED_FEATURE_MATRIX: ComparisonCategory[] = [
  {
    key: 'catalogo',
    label: 'Catálogo y productos',
    features: [
      { key: 'productos-fisicos', label: 'Productos físicos', values: all(true) },
      { key: 'fotos-multiples', label: 'Múltiples fotos por producto', values: all(true) },
      { key: 'productos-relacionados', label: 'Productos relacionados', values: fromSmall() },
      { key: 'variantes', label: 'Variantes y atributos (talla, color, etc.)', values: fromSmall() },
      { key: 'busqueda-avanzada', label: 'Búsqueda avanzada', values: fromMedium() },
      { key: 'combos', label: 'Combos o kits', values: fromMedium() },
      { key: 'importacion-csv', label: 'Importación masiva (CSV / Excel)', values: fromMedium() },
    ]
  },
  {
    key: 'ventas',
    label: 'Ventas y pagos',
    features: [
      { key: 'carrito', label: 'Carrito y checkout optimizados', values: all(true) },
      { key: 'pago-tarjeta', label: 'Pagos con tarjeta de crédito y débito', values: all(true) },
      { key: 'pago-contraentrega', label: 'Pago contra entrega', values: all(true) },
      { key: 'transferencia', label: 'Transferencia / depósito bancario', values: all(true) },
      { key: 'cupones', label: 'Cupones de descuento', values: fromSmall() },
      { key: 'promociones-auto', label: 'Promociones y descuentos', values: fromMedium() },
      { key: 'pos', label: 'Punto de venta presencial (POS)', values: fromMedium() },
      { key: 'reservas', label: 'Reservas y pedidos en espera', values: onlyLarge() },
    ]
  },
  {
    key: 'diseno',
    label: 'Diseño y personalización',
    features: [
      { key: 'subdominio', label: 'Subdominio gratuito', values: all(true) },
      { key: 'ssl', label: 'Certificado SSL incluido', values: all(true) },
      { key: 'editor-bloques', label: 'Editor visual de bloques', values: all(true) },
      { key: 'plantilla', label: 'Plantilla personalizable', values: all(true) },
      { key: 'dominio-propio', label: 'Dominio personalizado (.com / .pe / etc.)', values: fromSmall() },
      { key: 'banners-slider', label: 'Banners y slider en home', values: all(true) },
      { key: 'paginas-custom', label: 'Páginas personalizadas (Nosotros, FAQ, etc.)', values: all(true) },
      { key: 'whitelabel', label: 'Diseño 100% personalizado', hint: 'Bajo cotización', values: all('Cotizar') },
    ]
  },
  {
    key: 'marketing',
    label: 'Marketing y SEO',
    features: [
      { key: 'seo-basico', label: 'SEO básico (meta tags, sitemap)', values: all(true) },
      { key: 'urls-amigables', label: 'URLs amigables', values: all(true) },
      { key: 'analytics', label: 'Google Analytics 4 / Tag Manager', values: fromSmall() },
      { key: 'fb-pixel', label: 'Facebook Pixel + Conversion API', values: fromSmall() },
      { key: 'clarity', label: 'Microsoft Clarity', values: fromSmall() },
      { key: 'blog', label: 'Blog integrado', values: fromSmall() },
      { key: 'email-marketing', label: 'Integración con servicios de email marketing', values: fromMedium() },
      { key: 'recovery-cart', label: 'Recuperación de carritos abandonados', values: fromMedium() },
      { key: 'redes-sociales', label: 'Botones de redes sociales / WhatsApp', values: all(true) },
      { key: 'push', label: 'Notificaciones push', values: onlyLarge() },
    ]
  },
  {
    key: 'clientes',
    label: 'Clientes',
    features: [
      { key: 'cuentas', label: 'Cuentas de cliente', values: all(true) },
      { key: 'historial', label: 'Historial de pedidos', values: all(true) },
      { key: 'wishlist', label: 'Lista de deseos', values: fromSmall() },
      { key: 'reviews', label: 'Reseñas de productos', values: fromMedium() },
    ]
  },
  {
    key: 'logistica',
    label: 'Despacho y logística',
    features: [
      { key: 'tarifas-zona', label: 'Tarifas por zona / distrito', values: all(true) },
      { key: 'recojo-tienda', label: 'Recojo en tienda', values: all(true) },
      { key: 'tracking', label: 'Tracking automático al cliente', values: fromMedium() },
    ]
  },
  {
    key: 'reportes',
    label: 'Reportes y analítica',
    features: [
      { key: 'dashboard', label: 'Dashboard de ventas', values: all(true) },
      { key: 'top-productos', label: 'Productos más vendidos', values: all(true) },
      { key: 'export', label: 'Exportar reportes (Excel / CSV)', values: fromSmall() },
      { key: 'reportes-avanzados', label: 'Reportes avanzados por canal / cliente', values: fromMedium() },
      { key: 'reportes-custom', label: 'Reportes personalizados', values: onlyLarge() },
    ]
  },
  {
    key: 'soporte',
    label: 'Soporte',
    features: [
      { key: 'ayuda', label: 'Centro de ayuda y tutoriales', values: all(true) },
      { key: 'soporte-email', label: 'Soporte por email', values: all(true) },
      { key: 'soporte-chat', label: 'Soporte por chat', values: all(true) },
      { key: 'soporte-whatsapp', label: 'Soporte por WhatsApp', values: all(true) },
    ]
  },
  {
    key: 'api',
    label: 'API y desarrollo',
    features: [
      { key: 'api-rest', label: 'API REST pública', values: onlyLarge() },
      { key: 'api-key', label: 'API keys propias', values: onlyLarge() },
      { key: 'webhooks', label: 'Webhooks (eventos en tiempo real)', values: onlyLarge() },
      { key: 'docs-api', label: 'Documentación técnica', values: onlyLarge() },
    ]
  },
]
