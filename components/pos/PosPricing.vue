<script setup lang="ts">
const { brandName } = useCountry()
const { buildWhatsappUrl } = useContact()

const comboCtaUrl = computed(() =>
  buildWhatsappUrl(`Hola, quiero contratar el combo Plan Micro + ${brandName.value} POS por S/ 79.90 al mes`)
)
const soloCtaUrl = computed(() =>
  buildWhatsappUrl(`Hola, quiero contratar ${brandName.value} POS solo, sin tienda online`)
)
</script>

<template>
  <section id="precios" class="pos-pricing">
    <div class="container">
      <span class="eyebrow">PRECIOS</span>
      <h2 class="section-title">Una caja al precio de una mensualidad.</h2>
      <p class="section-sub">
        Elige cómo arrancar: solo el POS para tu local, o combínalo con tu tienda online
        y ahorra al sumar los dos canales en un mismo plan.
      </p>

      <div class="row g-4 align-items-stretch pricing-row">
        <!-- COMBO (featured / recommended) -->
        <div class="col-lg-7 order-lg-1 order-2">
          <div class="plan-card plan-card--featured h-100">
            <div class="featured-badge">RECOMENDADO · MEJOR VALOR</div>

            <div class="plan-head">
              <h3 class="plan-name">Plan Micro + POS</h3>
              <p class="plan-subtitle">
                Tu tienda online <strong>y</strong> tu caja física en una sola mensualidad.
              </p>
            </div>

            <div class="price-stack">
              <div class="price-main">
                <span class="price-currency">S/</span>
                <span class="price-amount">79.90</span>
                <span class="price-period">/mes</span>
              </div>
              <div class="price-breakdown">
                S/ 49.90 Plan Micro <span class="price-op">+</span> S/ 30.00 POS
              </div>
              <div class="price-savings">
                Ahorras <strong>S/ 19.90 al mes</strong> vs contratarlos por separado
              </div>
            </div>

            <ul class="features-list">
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span><strong>Tienda online {{ brandName }}</strong> con dominio, pasarelas de pago y stock sincronizado</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span><strong>{{ brandName }} POS</strong> primera caja incluida (Android + Web)</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span>Catálogo, clientes e inventario <strong>unificados</strong> entre local y online</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span>Facturación electrónica SUNAT desde el mismo equipo</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span><strong>S/ 30/mes</strong> por cada caja adicional</span>
              </li>
            </ul>

            <a :href="comboCtaUrl" target="_blank" rel="noopener" class="plan-cta plan-cta--primary">
              Contratar el combo
            </a>
            <p class="plan-microcopy">14 días de prueba gratis · Sin tarjeta de crédito</p>
          </div>
        </div>

        <!-- SOLO -->
        <div class="col-lg-5 order-lg-2 order-1">
          <div class="plan-card h-100">
            <div class="plan-head">
              <h3 class="plan-name">{{ brandName }} POS solo</h3>
              <p class="plan-subtitle">
                Solo la caja para tu local, sin tienda online.
              </p>
            </div>

            <div class="price-stack">
              <div class="price-main">
                <span class="price-currency">S/</span>
                <span class="price-amount">49.90</span>
                <span class="price-period">/mes</span>
              </div>
              <div class="price-breakdown">Primera caja</div>
              <div class="price-extra">
                + S/ 30.00 /mes por cada caja adicional
              </div>
            </div>

            <ul class="features-list">
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span><strong>POS Android y Web</strong> con turno de caja, roles y cierre</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span>Facturación electrónica SUNAT desde el mismo equipo</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span>Inventario multisucursal y catálogo propio</span>
              </li>
              <li>
                <span class="check" aria-hidden="true">✓</span>
                <span>Clientes, promociones y reportes de turno</span>
              </li>
            </ul>

            <a :href="soloCtaUrl" target="_blank" rel="noopener" class="plan-cta plan-cta--ghost">
              Contratar POS solo
            </a>
            <p class="plan-microcopy">Sumar la tienda online después cuesta solo S/ 30 más al mes</p>
          </div>
        </div>
      </div>

      <!-- Comisiones de cobro -->
      <div class="commissions">
        <div class="commissions-head">
          <span class="commissions-eyebrow">COMISIONES DE COBRO</span>
          <h3 class="commissions-title">Solo pagas comisión cuando cobras digital.</h3>
        </div>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="commission-card commission-card--paid">
              <div class="commission-emoji" aria-hidden="true">💳</div>
              <div class="commission-rate">3.5% + S/ 1.00</div>
              <div class="commission-rate-aux">+ IGV por transacción</div>
              <h4 class="commission-title">Tarjeta crédito y QR interoperable</h4>
              <p class="commission-desc">
                Cobros con tarjeta de crédito o QR interoperable (Yape, Plin y otras billeteras)
                procesados desde el POS móvil Android con Kasnet.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="commission-card commission-card--free">
              <div class="commission-emoji" aria-hidden="true">💵</div>
              <div class="commission-rate commission-rate--free">0%</div>
              <div class="commission-rate-aux">sin comisión</div>
              <h4 class="commission-title">Efectivo y otros pagos presenciales</h4>
              <p class="commission-desc">
                El efectivo cobrado en caja y otros métodos presenciales que registres
                manualmente no pagan comisión. Lo cobrado es lo que recibes.
              </p>
            </div>
          </div>
        </div>
        <p class="commissions-footnote">
          Las comisiones de tarjeta y QR son cobradas por Kasnet como procesador.
          Los pagos en efectivo se registran en el cierre de caja del POS.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-pricing {
  background: var(--background-soft);
  padding: 96px 0;
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
  margin-bottom: 0.75rem;
}

.section-sub {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 760px;
  margin-bottom: 2.5rem;
}

.pricing-row {
  margin-bottom: 4rem;
}

.plan-card {
  position: relative;
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-xl);
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.plan-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.plan-card--featured {
  background: linear-gradient(135deg, #ffffff 0%, #f0fbfa 100%);
  border: 2px solid var(--primary-color);
  box-shadow: 0 20px 50px rgba(0, 178, 166, 0.18);
  padding-top: 2.75rem;
}

.featured-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 6px 14px rgba(0, 178, 166, 0.3);
}

.plan-head {
  margin-bottom: 1.5rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}

.plan-card--featured .plan-name {
  color: var(--dark-teal);
}

.plan-subtitle {
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.5;
  margin: 0;
}

.plan-subtitle strong {
  color: var(--text-dark);
  font-weight: 700;
}

.price-stack {
  margin-bottom: 1.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.plan-card--featured .price-main {
  color: var(--primary-color);
}

.price-currency {
  font-size: 1.3rem;
  font-weight: 700;
}

.price-amount {
  font-size: clamp(2.8rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1;
}

.price-period {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

.plan-card--featured .price-period {
  color: var(--text-muted);
}

.price-breakdown {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}

.price-op {
  display: inline-block;
  margin: 0 0.25rem;
  color: var(--primary-color);
  font-weight: 700;
}

.price-extra {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.price-savings {
  display: inline-block;
  background: rgba(0, 178, 166, 0.1);
  color: var(--dark-teal);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: var(--rounded-sm);
  margin-top: 0.5rem;
}

.price-savings strong {
  color: var(--primary-color);
  font-weight: 800;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: var(--text-dark);
  font-size: 0.95rem;
  line-height: 1.5;
}

.features-list strong {
  font-weight: 700;
}

.check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 178, 166, 0.12);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  margin-top: 2px;
}

.plan-card--featured .check {
  background: var(--primary-color);
  color: #fff;
}

.plan-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-radius: var(--rounded-lg);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
  border: 2px solid transparent;
  width: 100%;
}

.plan-cta--primary {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.plan-cta--primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 178, 166, 0.3);
}

.plan-cta--ghost {
  background: #fff;
  color: var(--dark-teal);
  border-color: var(--border-light);
}

.plan-cta--ghost:hover {
  background: var(--background-soft);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.plan-microcopy {
  color: var(--text-muted);
  font-size: 0.82rem;
  margin: 0.85rem 0 0 0;
  text-align: center;
}

/* Commissions block */
.commissions {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-xl);
  padding: 2.5rem;
}

.commissions-head {
  margin-bottom: 1.75rem;
}

.commissions-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-amber);
  margin-bottom: 0.6rem;
}

.commissions-title {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.01em;
  margin: 0;
}

.commission-card {
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
  height: 100%;
  border: 1px solid var(--border-light);
  background: var(--background-soft);
}

.commission-card--paid {
  border-color: rgba(245, 158, 11, 0.35);
  background: linear-gradient(135deg, #fff 0%, #fff8ec 100%);
}

.commission-card--free {
  border-color: rgba(0, 178, 166, 0.3);
  background: linear-gradient(135deg, #fff 0%, #ecfaf8 100%);
}

.commission-emoji {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.commission-rate {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.015em;
  line-height: 1.1;
}

.commission-card--paid .commission-rate {
  color: var(--accent-amber);
}

.commission-rate--free {
  color: var(--primary-color) !important;
}

.commission-rate-aux {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin-bottom: 0.85rem;
}

.commission-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.commission-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
  margin: 0;
}

.commissions-footnote {
  color: var(--text-muted);
  font-size: 0.82rem;
  margin: 1.5rem 0 0 0;
  font-style: italic;
}

@media (max-width: 991px) {
  .pos-pricing {
    padding: 72px 0;
  }

  .pricing-row {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .plan-card {
    padding: 2rem 1.5rem;
  }

  .plan-card--featured {
    padding-top: 2.5rem;
  }

  .commissions {
    padding: 1.75rem;
  }
}
</style>
