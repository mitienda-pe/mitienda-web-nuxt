import type { CountryConfig } from '~/config/countries'

// Los rastreadores se inyectan a mano en el DOM (no con useHead) porque se
// cargan desde los callbacks del consentimiento, fuera del contexto de Nuxt.
// Cada loader es idempotente: onConsent y onChange pueden llamarlo varias veces.

function injectScript(attrs: { src?: string; innerHTML?: string; async?: boolean }) {
  const script = document.createElement('script')
  if (attrs.src) script.src = attrs.src
  if (attrs.innerHTML) script.innerHTML = attrs.innerHTML
  if (attrs.async) script.async = true
  document.head.appendChild(script)
}

export function loadGoogleAnalytics(country: CountryConfig) {
  if (!country.gaId || window.gtag) return

  injectScript({
    src: `https://www.googletagmanager.com/gtag/js?id=${country.gaId}`,
    async: true,
  })
  injectScript({
    innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${country.gaId}', { 'anonymize_ip': true });
    `,
  })
}

export function loadMetaPixel(country: CountryConfig) {
  if (!country.fbPixelId || window.fbq) return

  injectScript({
    innerHTML: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${country.fbPixelId}');
      fbq('track', 'PageView');
    `,
  })
}
