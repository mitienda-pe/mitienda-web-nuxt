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
      meta: [
        { name: 'keywords', content: 'tienda virtual, comercio electrónico, tienda online' },
        { name: 'robots', content: 'all' },
        // Dublin Core (generic)
        { name: 'DC.subject', content: 'Comercio electrónico' },
        { name: 'DC.language', content: 'es' },
        { name: 'DC.creator', content: 'Tiendas Virtuales Latinoamérica' },
        { name: 'DC.publisher', content: 'Tiendas Virtuales Latinoamérica' },
        // Twitter card type
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:widgets:link-color', content: '#cc0000' },
        { name: 'twitter:widgets:theme', content: 'dark' },
      ],
      script: [],
      link: [
        { rel: 'schema.DC', href: '//purl.org/dc/terms/' },
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
      siteUrl: 'https://mitienda.pe',
      defaultCountry: 'PE',
      chatWidgetUrl: '',
    },
  },

  routeRules: {
    // Static pages - prerender at build time
    // Note: '/' is NOT prerendered because it needs SSR for country detection
    '/terminos-y-condiciones': { prerender: true },
    '/politicas-de-privacidad': { prerender: true },
    '/politica-de-cookies': { prerender: true },
  },

  typescript: {
    strict: true,
  },

  nitro: {
    preset: 'node-server',
  },

  vite: {
    optimizeDeps: {
      include: ['bootstrap'],
    },
  },
})
