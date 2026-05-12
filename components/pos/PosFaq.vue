<script setup lang="ts">
const { isPeru, brandName, country } = useCountry()

const items = computed(() => {
  const common = [
    {
      q: '¿Necesito comprar un equipo nuevo?',
      a: `No es obligatorio. Si ya tienes computadora, laptop o tablet, ${brandName.value} POS Web funciona desde el navegador. Si quieres un equipo "todo en uno" que reemplaza POS de tarjeta + impresora + scanner, recomendamos un dispositivo POS Android compatible (Sunmi, Imin, Pos-D y similares) corriendo ${brandName.value} POS Android.`,
    },
    {
      q: '¿Puedo cobrar con tarjeta?',
      a: `Sí. En ${brandName.value} POS Web, capturando el código de autorización desde el POS de tu pasarela. En ${brandName.value} POS Android sobre dispositivos con pinpad integrado, el cobro directo desde la misma pantalla está en desarrollo.`,
    },
    {
      q: '¿Qué pasa con el inventario si vendo por mi tienda online?',
      a: `El inventario es uno solo. Una venta en POS descuenta stock visible en la tienda online y viceversa. Mismo catálogo, mismo cliente, mismo inventario.`,
    },
    {
      q: '¿Puedo manejar varias sucursales?',
      a: 'Sí. Cada sucursal tiene su propia serie de comprobantes, su propio stock y sus propios cajeros. Desde el dashboard ves todo unificado.',
    },
    {
      q: '¿Tengo soporte local?',
      a: `Sí. Equipo en ${country.value.geoPlacename}. Soporte por chat, correo y WhatsApp en horario comercial local.`,
    },
    {
      q: '¿Cómo es el onboarding?',
      a: 'Te acompañamos en la activación de la cuenta, configuración de PSE (cuando aplica), alta de productos, configuración de impresora y entrenamiento del personal de caja. Onboarding típico de una semana.',
    },
  ]

  if (isPeru.value) {
    return [
      common[0],
      {
        q: '¿Cómo emito boleta o factura electrónica?',
        a: 'MiTienda POS emite directo a SUNAT a través de Bizlinks o Nubefact — eliges el PSE al activar tu cuenta. La emisión es inmediata desde la pantalla de cobro y el comprobante se envía automáticamente al correo del cliente.',
      },
      {
        q: '¿Funciona con Yape y Plin?',
        a: 'Sí. MiTienda POS integra QR Kasnet, que es interoperable con Yape, Plin y las principales billeteras peruanas. El cajero genera un solo QR y el cliente paga con la app que ya tiene.',
      },
      ...common.slice(1),
    ]
  }
  return common
})
</script>

<template>
  <section class="pos-faq">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <span class="eyebrow">PREGUNTAS FRECUENTES</span>
          <h2 class="section-title">Lo que nos preguntan antes de empezar.</h2>
          <CommonFaqAccordion :items="items" :seo="true" class="mt-4" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-faq {
  background: #fff;
  padding: 80px 0;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}
</style>
