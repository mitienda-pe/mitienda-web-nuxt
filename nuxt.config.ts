// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  ssr: true,

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/variables.css',
    '~/assets/css/base.css',
    '~/assets/css/components.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'miTienda - Crea tu tienda virtual',
      meta: [
        { name: 'keywords', content: 'tienda virtual, comercio electrónico, tienda online' },
        { name: 'description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
        { name: 'robots', content: 'all' },
        // Dublin Core
        { name: 'DC.title', content: 'miTienda - Crea tu tienda virtual' },
        { name: 'DC.description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
        { name: 'DC.subject', content: 'Comercio electrónico' },
        { name: 'DC.language', content: 'es' },
        { name: 'DC.creator', content: 'Tiendas Virtuales Latinoamérica' },
        { name: 'DC.publisher', content: 'Tiendas Virtuales Latinoamérica' },
        // GEO
        { name: 'geo.region', content: 'PE-LIM' },
        { name: 'geo.placename', content: 'Lima' },
        { name: 'geo.position', content: '-12.10706;-77.03107' },
        { name: 'ICBM', content: '-12.10706, -77.03107' },
        // Open Graph
        { property: 'og:title', content: 'miTienda - Crea tu tienda virtual' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://nuevo.mitienda.pe' },
        { property: 'og:image', content: '/img/og-image-2.jpg' },
        { property: 'og:description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
        { property: 'og:site_name', content: 'miTienda' },
        { property: 'og:locale', content: 'es_PE' },
        { property: 'fb:admins', content: '184494695317819' },
        { property: 'fb:app_id', content: '1667537430236543' },
        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'miTienda - Crea tu tienda virtual' },
        { name: 'twitter:description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
        { property: 'twitter:image', content: '/img/og-image-2.jpg' },
        { name: 'twitter:widgets:link-color', content: '#cc0000' },
        { name: 'twitter:widgets:theme', content: 'dark' },
      ],
      link: [
        { rel: 'schema.DC', href: '//purl.org/dc/terms/' },
        { rel: 'canonical', href: 'https://nuevo.mitienda.pe' },
        // Touch Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/img/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/img/apple-touch-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon-180x180.png' },
        // Favicons
        { rel: 'icon', href: '/img/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/img/favicon-16x16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/img/favicon-32x32.png', sizes: '32x32' },
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },

  runtimeConfig: {
    // Server-only (not exposed to client)
    apiToken: '',
    mtserviciosUrl: '',
    mtserviciosApiKey: '',
    // Public (exposed to client)
    public: {
      siteUrl: 'https://nuevo.mitienda.pe',
    },
  },

  routeRules: {
    // Static pages - prerender at build time
    '/': { prerender: true },
    '/terminos-y-condiciones': { prerender: true },
    '/politicas-de-privacidad': { prerender: true },
    '/politica-de-cookies': { prerender: true },
  },

  typescript: {
    strict: true,
  },

  nitro: {
    preset: 'netlify',
  },
})
