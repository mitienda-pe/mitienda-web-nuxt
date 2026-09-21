import { run, acceptedCategory } from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import { COUNTRY_CONFIGS, DOMAIN_COUNTRY_MAP, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode } from '~/config/countries'

// CookieConsent (orestbida/cookieconsent v3) bundled via npm en lugar del CDN.
// Importar la librería y el CSS aquí garantiza el orden de carga determinista:
// antes se inyectaban dos <script defer> con useHead, pero `defer` no aplica a
// scripts insertados dinámicamente, así que el config corría antes que la
// librería ("CookieConsent is not defined") y el modal no se inicializaba.
//
// GA y el píxel de Meta solo se cargan si el visitante acepta su categoría:
// onConsent corre al aceptar y en cada visita con consentimiento guardado,
// onChange cuando cambia sus preferencias. Al revocar, autoClear borra las
// cookies y recarga la página para descargar los scripts ya inyectados.
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const countryCode = DOMAIN_COUNTRY_MAP[window.location.hostname]
    || (config.public.defaultCountry as CountryCode)
    || DEFAULT_COUNTRY
  const country = COUNTRY_CONFIGS[countryCode]

  const loadAcceptedTrackers = () => {
    if (acceptedCategory('analytics')) loadGoogleAnalytics(country)
    if (acceptedCategory('marketing')) loadMetaPixel(country)
  }

  run({
    onConsent: loadAcceptedTrackers,
    onChange: loadAcceptedTrackers,

    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom left',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        readOnly: true,
        enabled: true,
      },
      analytics: {
        autoClear: {
          cookies: [{ name: /^_ga/ }, { name: '_gid' }],
          reloadPage: true,
        },
      },
      marketing: {
        autoClear: {
          cookies: [{ name: /^_fb/ }],
          reloadPage: true,
        },
      },
    },

    language: {
      default: 'es',
      autoDetect: 'browser',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can accept all, reject all, or manage your preferences.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Cookie usage',
                description:
                  'We use cookies to ensure the basic functionalities of the website and to enhance your online experience...',
              },
              {
                title: 'Strictly necessary cookies',
                description:
                  'These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Performance and Analytics cookies',
                description:
                  'These cookies allow the website to remember the choices you have made in the past.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Name',
                    domain: 'Service',
                    description: 'Description',
                    expiration: 'Expiration',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'Google Analytics',
                      description: 'Distinguishes visitors anonymously',
                      expiration: '2 years',
                    },
                    {
                      name: '_ga_*',
                      domain: 'Google Analytics',
                      description: 'Keeps the browsing session state',
                      expiration: '2 years',
                    },
                  ],
                },
              },
              {
                title: 'Marketing cookies',
                description:
                  'These cookies are used to show you relevant ads and track conversions.',
                linkedCategory: 'marketing',
              },
              {
                title: 'More information',
                description:
                  'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/politica-de-cookies">see our Cookie Policy</a>.',
              },
            ],
          },
        },
        es: {
          consentModal: {
            title: 'Usamos cookies',
            description:
              'Utilizamos cookies para garantizar las funcionalidades básicas del sitio y mejorar tu experiencia en línea. Puedes aceptar todas, rechazarlas o gestionar tus preferencias.',
            acceptAllBtn: 'Aceptar todas',
            acceptNecessaryBtn: 'Rechazar todas',
            showPreferencesBtn: 'Gestionar preferencias',
          },
          preferencesModal: {
            title: 'Preferencias de cookies',
            acceptAllBtn: 'Aceptar todas',
            acceptNecessaryBtn: 'Rechazar todas',
            savePreferencesBtn: 'Guardar preferencias',
            closeIconLabel: 'Cerrar',
            sections: [
              {
                title: 'Uso de cookies',
                description:
                  'Usamos cookies para garantizar las funcionalidades básicas del sitio web y para mejorar tu experiencia en línea...',
              },
              {
                title: 'Cookies estrictamente necesarias',
                description:
                  'Estas cookies son esenciales para el correcto funcionamiento de nuestro sitio web. Sin estas cookies, el sitio no funcionaría correctamente.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Cookies de rendimiento y analíticas',
                description:
                  'Estas cookies permiten que el sitio web recuerde las elecciones que has realizado en el pasado.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Nombre',
                    domain: 'Servicio',
                    description: 'Descripción',
                    expiration: 'Caducidad',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'Google Analytics',
                      description: 'Distingue a los visitantes de forma anónima',
                      expiration: '2 años',
                    },
                    {
                      name: '_ga_*',
                      domain: 'Google Analytics',
                      description: 'Mantiene el estado de la sesión de navegación',
                      expiration: '2 años',
                    },
                  ],
                },
              },
              {
                title: 'Cookies de marketing',
                description:
                  'Estas cookies se utilizan para mostrarte anuncios relevantes y realizar seguimiento de conversiones.',
                linkedCategory: 'marketing',
              },
              {
                title: 'Más información',
                description:
                  'Para cualquier consulta relacionada con nuestra política de cookies y tus opciones, por favor <a class="cc-link" href="/politica-de-cookies">consulta nuestra Política de Cookies</a>.',
              },
            ],
          },
        },
      },
    },
  })
})
