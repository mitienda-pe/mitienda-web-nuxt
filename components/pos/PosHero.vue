<script setup lang="ts">
const { country, brandName, isPeru } = useCountry()
const { buildWhatsappUrl } = useContact()

const eyebrow = computed(() =>
  isPeru.value
    ? 'PUNTO DE VENTA · WEB + ANDROID NATIVO'
    : 'PUNTO DE VENTA · WEB + ANDROID NATIVO'
)

const headline = computed(() =>
  isPeru.value
    ? 'La caja hecha para vender en Perú.'
    : `La caja hecha para vender en ${country.value.name}.`
)

const subheadPE = 'Yape, Plin, tarjeta y efectivo desde un solo equipo. Facturación electrónica SUNAT, inventario sincronizado con tu tienda online y operación de caja completa.'
const subheadGeneric = computed(() =>
  `Tarjeta, transferencia y efectivo desde un solo equipo. Inventario sincronizado con tu tienda ${brandName.value} y operación de caja completa.`
)

const subhead = computed(() => (isPeru.value ? subheadPE : subheadGeneric.value))

const demoUrl = computed(() => buildWhatsappUrl(`Hola, quiero una demo de ${brandName.value} POS`))
</script>

<template>
  <section class="pos-hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">{{ eyebrow }}</span>
          <h1 class="hero-title">{{ headline }}</h1>
          <p class="hero-sub">{{ subhead }}</p>

          <div class="hero-ctas">
            <a :href="demoUrl" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
              Solicitar demo
            </a>
            <a href="#features" class="btn btn-link-arrow">
              Ver el producto
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p class="hero-microcopy">
            Sin compromiso · Onboarding asistido · Soporte local
          </p>
        </div>

        <div class="col-lg-6">
          <div class="hero-image-wrapper">
            <img
              src="/img/pos-banner.webp"
              alt="MiTienda POS"
              class="hero-image"
              fetchpriority="high"
              loading="eager"
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
.pos-hero {
  padding: 80px 0 56px;
  background: linear-gradient(180deg, #fff 0%, var(--background-soft) 100%);
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

.hero-title {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.1;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-bottom: 1rem;
}

.btn-link-arrow {
  color: var(--text-dark);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.btn-link-arrow:hover {
  color: var(--primary-color);
  transform: translateX(2px);
}

.hero-microcopy {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin: 0;
}

.hero-image-wrapper {
  border-radius: var(--rounded-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, rgba(0, 178, 166, 0.08), rgba(0, 82, 78, 0.04));
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 991px) {
  .pos-hero {
    padding: 56px 0 40px;
  }
}
</style>
