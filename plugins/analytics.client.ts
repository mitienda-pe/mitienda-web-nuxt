import { COUNTRY_CONFIGS, DOMAIN_COUNTRY_MAP, DEFAULT_COUNTRY } from '~/config/countries'
import type { CountryCode } from '~/config/countries'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Resolve country from hostname
  const hostname = window.location.hostname
  const countryCode = DOMAIN_COUNTRY_MAP[hostname]
    || (config.public.defaultCountry as CountryCode)
    || DEFAULT_COUNTRY
  const country = COUNTRY_CONFIGS[countryCode]

  const scripts: Array<{ src?: string; innerHTML?: string; async?: boolean }> = []
  const noscripts: Array<{ innerHTML: string }> = []

  // Google Analytics 4
  if (country.gaId) {
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${country.gaId}`,
      async: true,
    })
    scripts.push({
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${country.gaId}', { 'anonymize_ip': true });
      `,
    })
  }

  // Facebook Pixel
  if (country.fbPixelId) {
    scripts.push({
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
    noscripts.push({
      innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${country.fbPixelId}&ev=PageView&noscript=1"/>`,
    })
  }

  if (scripts.length > 0) {
    useHead({
      script: scripts,
      noscript: noscripts,
    })
  }
})
