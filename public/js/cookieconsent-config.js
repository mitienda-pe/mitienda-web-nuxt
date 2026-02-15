// CookieConsent configuration for miTienda
// Based on orestbida/cookieconsent v3.1.0

CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false
    }
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: "_gid" }
        ]
      }
    },
    marketing: {
      autoClear: {
        cookies: [
          { name: /^_fb/ }
        ]
      }
    }
  },

  language: {
    default: "es",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "We use cookies",
          description: "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can accept all, reject all, or manage your preferences.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences"
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie usage",
              description: "We use cookies to ensure the basic functionalities of the website and to enhance your online experience..."
            },
            {
              title: "Strictly necessary cookies",
              description: "These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly.",
              linkedCategory: "necessary"
            },
            {
              title: "Performance and Analytics cookies",
              description: "These cookies allow the website to remember the choices you have made in the past.",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration"
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description: "Cookie set by Google Analytics",
                    expiration: "Expires after 12 days"
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description: "Cookie set by Google Analytics",
                    expiration: "Session"
                  }
                ]
              }
            },
            {
              title: "Marketing cookies",
              description: "These cookies are used to show you relevant ads and track conversions.",
              linkedCategory: "marketing"
            },
            {
              title: "More information",
              description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/politica-de-cookies">see our Cookie Policy</a>.'
            }
          ]
        }
      },
      es: {
        consentModal: {
          title: "Usamos cookies",
          description: "Utilizamos cookies para garantizar las funcionalidades básicas del sitio y mejorar tu experiencia en línea. Puedes aceptar todas, rechazarlas o gestionar tus preferencias.",
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          showPreferencesBtn: "Gestionar preferencias"
        },
        preferencesModal: {
          title: "Preferencias de cookies",
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          savePreferencesBtn: "Guardar preferencias",
          closeIconLabel: "Cerrar",
          sections: [
            {
              title: "Uso de cookies",
              description: "Usamos cookies para garantizar las funcionalidades básicas del sitio web y para mejorar tu experiencia en línea..."
            },
            {
              title: "Cookies estrictamente necesarias",
              description: "Estas cookies son esenciales para el correcto funcionamiento de nuestro sitio web. Sin estas cookies, el sitio no funcionaría correctamente.",
              linkedCategory: "necessary"
            },
            {
              title: "Cookies de rendimiento y analíticas",
              description: "Estas cookies permiten que el sitio web recuerde las elecciones que has realizado en el pasado.",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Nombre",
                  domain: "Servicio",
                  description: "Descripción",
                  expiration: "Caducidad"
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description: "Cookie establecida por Google Analytics",
                    expiration: "Expira después de 12 días"
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description: "Cookie establecida por Google Analytics",
                    expiration: "Sesión"
                  }
                ]
              }
            },
            {
              title: "Cookies de marketing",
              description: "Estas cookies se utilizan para mostrarte anuncios relevantes y realizar seguimiento de conversiones.",
              linkedCategory: "marketing"
            },
            {
              title: "Más información",
              description: 'Para cualquier consulta relacionada con nuestra política de cookies y tus opciones, por favor <a class="cc-link" href="/politica-de-cookies">consulta nuestra Política de Cookies</a>.'
            }
          ]
        }
      }
    }
  }
});
