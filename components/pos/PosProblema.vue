<script setup lang="ts">
const { isPeru, brandName } = useCountry()

const items = computed(() => {
  if (isPeru.value) {
    return [
      {
        title: 'Reglas locales',
        description: 'SUNAT, boleta vs factura, soles, redondeo. Los POS internacionales no las entienden bien.',
      },
      {
        title: 'Pagos fragmentados',
        description: 'Yape, Plin, tarjeta, efectivo. El cliente paga con lo que tenga — a veces los tres en la misma compra.',
      },
      {
        title: 'Online y físico desconectados',
        description: 'Inventario duplicado, catálogo en dos lados, conciliaciones manuales al cierre del día.',
      },
      {
        title: 'Hardware fragmentado',
        description: 'POS de tarjeta, impresora suelta, QR pegado al mostrador. Tres equipos donde podría haber uno.',
      },
    ]
  }
  return [
    {
      title: 'Reglas locales',
      description: 'Reglas de facturación, monedas y redondeos cambian por país. Los POS internacionales suelen no entenderlas bien.',
    },
    {
      title: 'Pagos fragmentados',
      description: 'Tarjeta, transferencia, efectivo. El cliente paga con lo que tenga — a veces varios métodos en la misma compra.',
    },
    {
      title: 'Online y físico desconectados',
      description: 'Inventario duplicado, catálogo en dos lados, conciliaciones manuales al cierre del día.',
    },
    {
      title: 'Hardware fragmentado',
      description: 'POS de tarjeta, impresora suelta, QR en el mostrador. Demasiados equipos para una sola caja.',
    },
  ]
})

const closingLine = computed(() =>
  isPeru.value
    ? `La mayoría de POS en el mercado fueron diseñados afuera y traducidos al español. ${brandName.value} POS no.`
    : `La mayoría de POS en el mercado fueron diseñados afuera. ${brandName.value} POS fue hecho en Latinoamérica.`
)
</script>

<template>
  <section class="pos-problema">
    <div class="container">
      <span class="eyebrow">EL CONTEXTO</span>
      <h2 class="section-title">Vender en local no es como vender en cualquier otro lugar.</h2>
      <p class="section-lead">
        La caja necesita emitir comprobantes. El cliente paga con varios métodos en la misma compra.
        El inventario físico no puede vivir desconectado del de la tienda online. Y la mayoría termina
        con un POS para tarjeta, una impresora aparte y una hoja de Excel para conciliar al cierre.
      </p>

      <div class="row g-4 mt-2">
        <div v-for="(item, i) in items" :key="i" class="col-md-6">
          <div class="problem-card">
            <div class="problem-icon" aria-hidden="true">⚠</div>
            <div>
              <h3 class="problem-title">{{ item.title }}</h3>
              <p class="problem-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="closing-line">
        <em>{{ closingLine }}</em>
      </p>
    </div>
  </section>
</template>

<style scoped>
.pos-problema {
  background: var(--background-soft);
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
  margin-bottom: 1.25rem;
  max-width: 800px;
}

.section-lead {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 760px;
  margin-bottom: 2rem;
}

.problem-card {
  display: flex;
  gap: 1rem;
  background: #fff;
  border-radius: var(--rounded-lg);
  padding: 1.5rem;
  border-left: 4px solid var(--accent-amber);
  height: 100%;
  box-shadow: var(--shadow-sm);
}

.problem-icon {
  font-size: 1.25rem;
  color: var(--accent-amber);
  font-weight: 700;
  line-height: 1.4;
  flex-shrink: 0;
}

.problem-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
}

.problem-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}

.closing-line {
  margin-top: 2.5rem;
  color: var(--text-dark);
  font-size: 1.05rem;
}
</style>
