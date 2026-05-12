<script setup lang="ts">
const { country, brandName, isPeru } = useCountry()

useSeoMeta({
  title: () => `Punto de Venta (POS) — ${brandName.value} ${country.value.name}`,
  ogTitle: () => `${brandName.value} POS — la caja para tu tienda`,
  description: () =>
    isPeru.value
      ? `Vende también en local con ${brandName.value} POS: caja, inventario y boletas/facturas electrónicas en un solo lugar. Compatible con dispositivos Android y navegador web.`
      : `Vende también en local con ${brandName.value} POS: caja, inventario y ventas en un solo lugar. Compatible con dispositivos Android y navegador web.`,
  ogDescription: () =>
    isPeru.value
      ? `${brandName.value} POS: la caja que entiende Perú. Yape, Plin, tarjeta y efectivo, con facturación electrónica SUNAT desde el mismo equipo.`
      : `${brandName.value} POS: la caja conectada a tu tienda online. Web + Android con inventario sincronizado.`,
  ogImage: '/img/pos-banner.webp',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `${brandName.value} POS`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android',
        offers: {
          '@type': 'Offer',
          priceCurrency: country.value.currency.code,
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="pos-landing">
    <PosHero />
    <PosProblema />
    <PosSolucion />
    <PosPagos />
    <PosFacturacion v-if="country.hasBillingElectronica" />
    <PosHardware />
    <PosPlataformas />
    <PosFeatures />
    <PosPerfiles />
    <PosFaq />
    <PosCta />
  </div>
</template>
