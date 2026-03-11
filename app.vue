<script setup lang="ts">
import { COUNTRY_CONFIGS } from '~/config/countries'

const { country, brandName } = useCountry()
const route = useRoute()

// Dynamic SEO meta based on country
useHead({
  title: () => `${brandName.value} - Crea tu tienda virtual`,
  meta: () => [
    { name: 'description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
    // Dublin Core
    { name: 'DC.title', content: `${brandName.value} - Crea tu tienda virtual` },
    { name: 'DC.description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
    // GEO
    { name: 'geo.region', content: country.value.geoRegion },
    { name: 'geo.placename', content: country.value.geoPlacename },
    { name: 'geo.position', content: country.value.geoPosition },
    { name: 'ICBM', content: country.value.geoPosition.replace(';', ', ') },
    // Open Graph
    { property: 'og:title', content: `${brandName.value} - Crea tu tienda virtual` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://${country.value.landingDomain}${route.path}` },
    { property: 'og:image', content: '/img/og-image-2.jpg' },
    { property: 'og:description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
    { property: 'og:site_name', content: brandName.value },
    { property: 'og:locale', content: country.value.locale.replace('-', '_') },
    { property: 'fb:admins', content: '184494695317819' },
    { property: 'fb:app_id', content: '1667537430236543' },
    // Twitter
    { name: 'twitter:title', content: `${brandName.value} - Crea tu tienda virtual` },
    { name: 'twitter:description', content: 'Crea tu propia tienda virtual y empieza a vender por internet ya. 14 días gratis.' },
    { property: 'twitter:image', content: '/img/og-image-2.jpg' },
  ],
  link: () => {
    const links: Array<{ rel: string; href: string; hreflang?: string }> = [
      // Canonical URL with full path
      { rel: 'canonical', href: `https://${country.value.landingDomain}${route.path}` },
    ]

    // Hreflang alternates for all countries
    for (const c of Object.values(COUNTRY_CONFIGS)) {
      links.push({
        rel: 'alternate',
        hreflang: c.locale,
        href: `https://${c.landingDomain}${route.path}`,
      })
    }

    // x-default hreflang (Peru as default)
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://mitienda.pe${route.path}`,
    })

    return links
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
