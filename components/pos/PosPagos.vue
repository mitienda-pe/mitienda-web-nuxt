<script setup lang="ts">
const { countryCode, country } = useCountry()

interface Method {
  emoji: string
  title: string
  description: string
  badge?: string
}

const heroPayment = computed(() => {
  if (countryCode.value === 'PE') {
    return {
      eyebrow: 'PRÓXIMAMENTE',
      title: 'QR Kasnet — un solo QR para todas las billeteras.',
      text: 'Interoperable con Yape, Plin y las principales billeteras peruanas. El cajero genera el QR desde la pantalla de cobro, el cliente paga con la app que ya tiene en el celular y la confirmación llega al POS para emitir el comprobante. Sin ventanas externas, sin pegar IDs a mano, sin doble cobro.',
      microcopy: 'Próximamente integrado nativamente en el flujo de cobro.',
    }
  }
  if (countryCode.value === 'CO') {
    return {
      eyebrow: 'BILLETERAS LOCALES',
      title: 'Pagos digitales locales en el flujo de caja.',
      text: 'Próximamente compatibilidad con Nequi y Daviplata desde la pantalla de cobro. Hoy ya aceptamos PSE, Wompi y tarjeta directamente desde el POS.',
      microcopy: 'En desarrollo para tu mercado.',
    }
  }
  return {
    eyebrow: 'PAGOS LOCALES',
    title: 'Tarjeta, transferencia y efectivo desde la misma caja.',
    text: 'Aceptamos los métodos que tu cliente usa hoy: tarjeta de crédito y débito, transferencia y efectivo, todos integrados en el flujo normal de venta.',
    microcopy: 'Sin apps externas, sin doble cobro.',
  }
})

const methods = computed<Method[]>(() => {
  if (countryCode.value === 'PE') {
    return [
      {
        emoji: '💳',
        title: 'Tarjeta crédito y débito',
        description: 'En POS Android, cobro vía dispositivos compatibles con pinpad integrado. En POS Web, captura del código de autorización.',
        badge: 'Pinpad nativo · Próximamente',
      },
      {
        emoji: '💵',
        title: 'Efectivo con turno',
        description: 'Apertura de turno, movimientos de caja, cierre y arqueo. Saber siempre quién operó la caja y con cuánto la dejó.',
      },
      {
        emoji: '🔀',
        title: 'Pagos combinados',
        description: 'Múltiples métodos en una sola venta. El cajero ve el saldo pendiente en tiempo real y emite un comprobante con el detalle.',
      },
    ]
  }
  if (countryCode.value === 'EC') {
    return [
      {
        emoji: '💳',
        title: 'Tarjeta crédito y débito',
        description: 'Captura del código de autorización desde la pantalla de cobro. Compatibilidad con pinpad integrado en evaluación.',
        badge: 'Pinpad · En evaluación',
      },
      {
        emoji: '💵',
        title: 'Efectivo con turno',
        description: 'Apertura de turno, movimientos de caja, cierre y arqueo. Trazabilidad por cajero.',
      },
      {
        emoji: '🏦',
        title: 'Transferencia y combinados',
        description: 'Transferencia bancaria registrada en caja y múltiples métodos en una sola venta cuando el cliente lo necesita.',
      },
    ]
  }
  return [
    {
      emoji: '💳',
      title: 'Tarjeta crédito y débito',
      description: 'Captura del código de autorización desde la pantalla de cobro. Integración con PSE y Wompi como pasarela.',
    },
    {
      emoji: '💵',
      title: 'Efectivo con turno',
      description: 'Apertura de turno, movimientos de caja, cierre y arqueo. Trazabilidad por cajero.',
    },
    {
      emoji: '🔀',
      title: 'Pagos combinados',
      description: 'Múltiples métodos en una sola venta. El cajero ve el saldo pendiente y emite un comprobante con el detalle.',
    },
  ]
})

const heading = computed(() =>
  countryCode.value === 'PE'
    ? 'Aceptamos lo que el cliente peruano usa hoy.'
    : `Aceptamos lo que tu cliente en ${country.value.name} usa hoy.`
)

const subhead = computed(() =>
  countryCode.value === 'PE'
    ? 'En Perú, Yape y Plin ya no son métodos "alternativos" — son los principales. MiTienda POS los acepta a todos desde el flujo normal de venta, no como un parche.'
    : 'Métodos locales integrados en el flujo normal de la caja. No como un parche.'
)
</script>

<template>
  <section class="pos-pagos">
    <div class="container">
      <span class="eyebrow">PAGOS</span>
      <h2 class="section-title">{{ heading }}</h2>
      <p class="section-sub">{{ subhead }}</p>

      <div class="hero-payment">
        <div class="hero-payment-icon" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" />
            <rect x="14" y="14" width="3" height="3" stroke="currentColor" stroke-width="1.5" />
            <rect x="18" y="14" width="3" height="3" stroke="currentColor" stroke-width="1.5" />
            <rect x="14" y="18" width="3" height="3" stroke="currentColor" stroke-width="1.5" />
            <rect x="18" y="18" width="3" height="3" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>
        <div class="hero-payment-body">
          <span class="hero-eyebrow">{{ heroPayment.eyebrow }}</span>
          <h3 class="hero-payment-title">{{ heroPayment.title }}</h3>
          <p class="hero-payment-text">{{ heroPayment.text }}</p>
          <p class="hero-payment-microcopy">{{ heroPayment.microcopy }}</p>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div v-for="(m, i) in methods" :key="i" class="col-md-6 col-lg-4">
          <div class="method-card">
            <div class="method-emoji" aria-hidden="true">{{ m.emoji }}</div>
            <div class="method-title-row">
              <h4 class="method-title">{{ m.title }}</h4>
              <span v-if="m.badge" class="method-badge">{{ m.badge }}</span>
            </div>
            <p class="method-desc">{{ m.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-pagos {
  background: var(--dark-teal);
  color: #fff;
  padding: 80px 0;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-amber);
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.section-sub {
  color: #b8e5e2;
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 760px;
  margin-bottom: 2.5rem;
}

.hero-payment {
  display: flex;
  gap: 1.75rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--rounded-xl);
  padding: 2rem;
  align-items: flex-start;
}

.hero-payment-icon {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 158, 11, 0.15);
  color: var(--accent-amber);
  border-radius: var(--rounded-lg);
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-amber);
  margin-bottom: 0.6rem;
}

.hero-payment-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.25;
}

.hero-payment-text {
  color: #b8e5e2;
  line-height: 1.6;
  margin-bottom: 0.85rem;
}

.hero-payment-microcopy {
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0;
}

.method-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--rounded-lg);
  padding: 1.5rem;
  height: 100%;
}

.method-emoji {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

.method-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.method-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.method-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-amber);
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.method-desc {
  color: #b8e5e2;
  font-size: 0.92rem;
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-payment {
    flex-direction: column;
    padding: 1.5rem;
  }
}
</style>
