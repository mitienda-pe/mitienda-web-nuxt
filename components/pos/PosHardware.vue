<script setup lang="ts">
const { isPeru } = useCountry()

const capabilities = computed(() => {
  const base = [
    'Pantalla táctil para QR y selección rápida de productos',
    'Impresora térmica para boleta o factura (compatible con 58/80 mm)',
    'Scanner de código de barras (físico en dispositivos POS Android, cámara como alternativa)',
    'Pinpad para tarjeta crédito y débito (próximamente vía Intent en Android)',
    'Conectividad WiFi y datos móviles',
    'Cajón monedero compatible vía puerto serial / impresora',
  ]
  if (!isPeru.value) {
    return base.filter(c => !c.includes('boleta o factura'))
      .concat(['Impresora térmica para recibos y comprobantes (58/80 mm)'])
  }
  return base
})

const description = computed(() =>
  isPeru.value
    ? 'MiTienda POS Android corre sobre dispositivos POS Android compatibles (Sunmi, Imin, Pos-D y similares), aprovechando impresora, scanner y pantalla integrados. En modelos con pinpad integrado, soportaremos cobro con tarjeta directo desde la misma pantalla. El comercio reemplaza dos o tres equipos por uno solo — y todo el cobro pasa por la misma caja.'
    : 'TiendaBox POS Android corre sobre dispositivos POS Android compatibles (Sunmi, Imin, Pos-D y similares), aprovechando impresora, scanner y pantalla integrados. El comercio reemplaza dos o tres equipos por uno solo.'
)
</script>

<template>
  <section class="pos-hardware">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <span class="eyebrow">HARDWARE</span>
          <h2 class="section-title">Un solo equipo. Toda tu caja.</h2>
          <p class="section-lead">{{ description }}</p>

          <ul class="capability-list">
            <li v-for="(c, i) in capabilities" :key="i">
              <span class="check" aria-hidden="true">✓</span>
              <span>{{ c }}</span>
            </li>
          </ul>
        </div>

        <div class="col-lg-6">
          <div class="hardware-image">
            <img
              src="/img/pos-banner.webp"
              alt="Dispositivo POS Android compatible con MiTienda POS"
              loading="lazy"
              width="640"
              height="480"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-hardware {
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

.section-lead {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 1.75rem;
}

.capability-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.capability-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: var(--text-dark);
  font-size: 0.98rem;
  line-height: 1.5;
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: rgba(0, 178, 166, 0.15);
  color: var(--primary-color);
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.hardware-image {
  border-radius: var(--rounded-xl);
  overflow: hidden;
  background: linear-gradient(135deg, var(--dark-teal), var(--primary-color));
  padding: 1rem;
  box-shadow: var(--shadow-lg);
}

.hardware-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--rounded-lg);
}
</style>
