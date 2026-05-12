<script setup lang="ts">
// Solo se renderiza cuando country.hasBillingElectronica === true (PE)
const emisionItems = [
  'Boletas y facturas electrónicas',
  'Notas de crédito',
  'Anulación de comprobantes',
  'Series por sucursal',
  'Resguardo del XML',
  'Envío automático al correo del cliente',
]

const validacionItems = [
  'Búsqueda automática por DNI',
  'Búsqueda automática por RUC',
  'Autocompletado de nombre, razón social y dirección fiscal',
  'Sin escribir nada más en el mostrador',
]
</script>

<template>
  <section class="pos-facturacion">
    <div class="container">
      <span class="eyebrow">FACTURACIÓN ELECTRÓNICA SUNAT</span>
      <h2 class="section-title">Tu PSE, tu elección: Bizlinks o Nubefact.</h2>
      <p class="section-lead">
        MiTienda POS emite boletas y facturas electrónicas con doble integración a SUNAT.
        El comercio elige el PSE que ya usa o el que mejor le acomode — <strong>Bizlinks</strong> y
        <strong>Nubefact</strong> están conectados de forma nativa, listos desde el primer día.
      </p>

      <div class="row g-4 mt-2">
        <div class="col-md-6">
          <div class="billing-card">
            <div class="billing-icon">🧾</div>
            <h3 class="billing-title">Emisión electrónica</h3>
            <ul class="billing-list">
              <li v-for="item in emisionItems" :key="item">
                <span class="check">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="billing-card">
            <div class="billing-icon">🪪</div>
            <h3 class="billing-title">Validación del cliente</h3>
            <ul class="billing-list">
              <li v-for="item in validacionItems" :key="item">
                <span class="check">✓</span>{{ item }}
              </li>
            </ul>
            <p class="billing-microcopy">
              Consultas integradas vía servicio agregador, sin formularios adicionales.
            </p>
          </div>
        </div>
      </div>

      <p class="closing-line">
        La facturación electrónica no es un detalle administrativo — es lo que evita multas,
        cierra el ciclo contable y lo que el cliente B2B exige. Tener dos PSE certificados ya
        integrados, y poder elegir, te quita el lock-in técnico y te da continuidad operativa.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pos-facturacion {
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
  margin-bottom: 1rem;
}

.section-lead {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.65;
  max-width: 800px;
  margin-bottom: 1rem;
}

.billing-card {
  background: #fff;
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
  border: 1px solid var(--border-light);
  height: 100%;
  box-shadow: var(--shadow-sm);
}

.billing-icon {
  font-size: 1.75rem;
  margin-bottom: 0.6rem;
}

.billing-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.billing-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.billing-list li {
  color: var(--text-dark);
  font-size: 0.95rem;
  line-height: 1.5;
  display: flex;
  gap: 0.6rem;
}

.check {
  color: var(--primary-color);
  font-weight: 700;
  flex-shrink: 0;
}

.billing-microcopy {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-style: italic;
  margin: 0;
}

.closing-line {
  margin-top: 2rem;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.65;
  max-width: 800px;
}
</style>
