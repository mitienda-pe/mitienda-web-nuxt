<script setup lang="ts">
const { brandName, country, isPeru } = useCountry()

const paragraph = computed(() =>
  isPeru.value
    ? `Diseñado y construido en Perú, conectado nativamente a la plataforma de comercio electrónico que ya usan cientos de comercios peruanos. Disponible como aplicación web y como app Android nativa — un solo ecosistema para tu caja, tu inventario y tu tienda online.`
    : `Diseñado y construido en Latinoamérica, conectado nativamente a la plataforma ${brandName.value} que ya usan cientos de comercios en la región. Disponible como aplicación web y como app Android nativa — un solo ecosistema para tu caja, tu inventario y tu tienda online.`
)

const pillars = computed(() => [
  {
    emoji: '🧩',
    title: 'Multicanal real',
    description: 'Web + Android nativo sobre el mismo backend. Tu equipo en caja física y tu equipo de e-commerce trabajan sobre el mismo inventario, los mismos clientes y las mismas ventas.',
  },
  {
    emoji: '🔗',
    title: `Conectado a ${brandName.value}`,
    description: 'Mismo catálogo, mismo inventario, mismo cliente — vendas en mostrador o por internet.',
  },
  {
    emoji: isPeru.value ? '🇵🇪' : '🌎',
    title: isPeru.value ? 'Hecho y soportado en Perú' : `Hecho para ${country.value.name}`,
    description: isPeru.value
      ? 'Equipo local en Lima. Cumplimiento SUNAT, doble PSE certificado (Bizlinks y Nubefact) y validación DNI/RUC. Idioma es-PE de extremo a extremo.'
      : 'Equipo local en la región. Configurado para tu moneda, impuestos y métodos de pago locales.',
  },
])
</script>

<template>
  <section class="pos-solucion">
    <div class="container">
      <div class="row g-5 align-items-start">
        <div class="col-lg-5">
          <span class="eyebrow">LA PROPUESTA</span>
          <h2 class="section-title">
            {{ brandName }} POS es la caja del ecosistema {{ brandName }}.
          </h2>
          <p class="section-lead">{{ paragraph }}</p>
        </div>

        <div class="col-lg-7">
          <div class="pillars">
            <div v-for="(p, i) in pillars" :key="i" class="pillar">
              <div class="pillar-icon">{{ p.emoji }}</div>
              <div>
                <h3 class="pillar-title">{{ p.title }}</h3>
                <p class="pillar-desc">{{ p.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-solucion {
  padding: 80px 0;
  background: #fff;
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
  font-size: clamp(1.7rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.section-lead {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.65;
}

.pillars {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pillar {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.pillar-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 178, 166, 0.1);
  border-radius: var(--rounded-md);
}

.pillar-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.35rem;
}

.pillar-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}
</style>
