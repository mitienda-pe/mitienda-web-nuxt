<script setup lang="ts">
const { buildWhatsappUrl } = useContact()
const demoUrl = computed(() => buildWhatsappUrl('Hola, quiero saber más sobre MiTienda POS + Kasnet'))

const kasnetLogoUrl = '/img/logo-kasnet-negativo-fondo-morado.svg'

const stats = [
  { number: '+15,000', label: 'puntos de atención en todo el Perú' },
  { number: 'Multibanco', label: 'Banco de la Nación, Cajas Municipales y más' },
  { number: '1 QR', label: 'interoperable con Yape, Plin y billeteras peruanas' },
]
</script>

<template>
  <section class="pos-kasnet">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">ALIANZA ESTRATÉGICA</span>

          <div class="logo-wrapper">
            <img
              :src="kasnetLogoUrl"
              alt="Kasnet"
              class="kasnet-logo"
              loading="lazy"
            />
          </div>

          <h2 class="kasnet-title">
            MiTienda POS + Kasnet:
            la red financiera más grande del Perú, dentro de tu caja.
          </h2>

          <p class="kasnet-lead">
            Kasnet es la red de agentes corresponsales multibanco más grande del país —
            con más de <strong>15,000 puntos de atención</strong> en bodegas, farmacias y
            comercios de todo el Perú. Operaciones financieras seguras, multibanco e inclusivas
            cerca de cada cliente.
          </p>

          <p class="kasnet-lead">
            Estamos integrando el <strong>QR Kasnet</strong> directamente al flujo de cobro
            de MiTienda POS: un solo QR interoperable con Yape, Plin y las principales
            billeteras peruanas, sin pegar IDs ni abrir apps externas.
          </p>

          <div class="kasnet-ctas">
            <a :href="demoUrl" target="_blank" rel="noopener" class="btn-kasnet-primary">
              Quiero saber más
            </a>
            <a
              href="https://kasnet.com.pe"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-kasnet-link"
            >
              Conoce Kasnet
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p class="kasnet-microcopy">
            QR Kasnet en MiTienda POS · <strong>Próximamente disponible</strong>
          </p>
        </div>

        <div class="col-lg-6">
          <div class="stats-grid">
            <div v-for="(stat, i) in stats" :key="i" class="stat-card">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>

            <div class="features-card">
              <h3 class="features-title">¿Qué hace Kasnet?</h3>
              <ul class="features-list">
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Depósitos, retiros y transferencias multibanco
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Pago de servicios (luz, agua, teléfono) y tasas
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Inclusión financiera en zonas urbanas y rurales
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Comercios afiliados ganan comisiones por transacción
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-kasnet {
  background: #4b4bbb;
  color: #fff;
  padding: 96px 0;
  position: relative;
  overflow: hidden;
}

.pos-kasnet::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 280px;
  height: 280px;
  background: rgba(249, 203, 0, 0.08);
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
}

.pos-kasnet::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(30px);
  pointer-events: none;
}

.pos-kasnet > .container {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f9cb00;
  margin-bottom: 1.5rem;
}

.logo-wrapper {
  margin-bottom: 1.5rem;
}

.kasnet-logo {
  height: 56px;
  width: auto;
  max-width: 240px;
}

.kasnet-title {
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.kasnet-lead {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.02rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.kasnet-lead strong {
  color: #f9cb00;
  font-weight: 700;
}

.kasnet-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin: 2rem 0 1rem;
}

.btn-kasnet-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f9cb00;
  color: #2b1a78;
  font-weight: 700;
  padding: 0.95rem 1.75rem;
  border-radius: var(--rounded-lg);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
  border: 2px solid #f9cb00;
}

.btn-kasnet-primary:hover {
  background: #ffd633;
  color: #2b1a78;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(249, 203, 0, 0.3);
}

.btn-kasnet-link {
  color: #f9cb00;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.btn-kasnet-link:hover {
  color: #ffd633;
  transform: translateX(3px);
}

.kasnet-microcopy {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0;
}

.kasnet-microcopy strong {
  color: #f9cb00;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--rounded-lg);
  padding: 1.5rem;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.stat-card:hover {
  border-color: rgba(249, 203, 0, 0.5);
  transform: translateY(-2px);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f9cb00;
  line-height: 1.1;
  margin-bottom: 0.4rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  line-height: 1.4;
}

.features-card {
  grid-column: 1 / -1;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
}

.features-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f9cb00;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
  line-height: 1.5;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #f9cb00;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .pos-kasnet {
    padding: 64px 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
