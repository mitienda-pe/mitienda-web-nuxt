<script setup lang="ts">
import type { MatrixCell } from '~/config/countries'

const {
  country,
  brandName,
  formatPrice,
  getAnnualPrice,
  comparisonMatrix,
  planOrder,
  formatQuota
} = useCountry()

useSeoMeta({
  title: () => `Comparativa de planes — ${brandName.value}`,
  ogTitle: () => `Comparativa de planes — ${brandName.value}`,
  description: () =>
    `Compara en detalle todos los planes de ${brandName.value} en ${country.value.name}: límites, integraciones, soporte, comisiones y más.`,
  ogDescription: () =>
    `Compara en detalle todos los planes de ${brandName.value} en ${country.value.name}: límites, integraciones, soporte, comisiones y más.`
})

const isAnnual = ref(true)

function getPrice(monthly: number): string {
  return isAnnual.value ? formatPrice(getAnnualPrice(monthly)) : formatPrice(monthly)
}
function getPeriod(): string {
  return isAnnual.value ? 'por año' : 'por mes'
}

function isCheck(v: MatrixCell): boolean {
  return typeof v === 'boolean'
}
function cellText(v: MatrixCell): string {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return v.toLocaleString(country.value.locale)
  return ''
}
</script>

<template>
  <div class="plans-page">
    <!-- Hero -->
    <section class="plans-hero">
      <div class="container">
        <h1 class="section-title">Compara nuestros planes</h1>
        <p class="section-subtitle">
          Todos los planes incluyen 14 días de prueba gratis, sin tarjeta de crédito.
          Compara en detalle qué incluye cada uno y elige el que mejor se adapte a tu negocio.
        </p>

        <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
          <span class="text-muted">Mensual</span>
          <div class="form-check form-switch m-0">
            <input
              id="planesBillingToggle"
              v-model="isAnnual"
              class="form-check-input"
              type="checkbox"
            />
            <label class="form-check-label" for="planesBillingToggle">
              Anual <span class="badge ms-1">Ahorra 20%</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Matrix -->
    <section class="plans-matrix">
      <div class="container-fluid px-3 px-md-5">
        <div class="matrix-wrapper">
          <table class="matrix-table">
            <thead>
              <tr>
                <th class="feature-col">Característica</th>
                <th
                  v-for="plan in country.plans"
                  :key="plan.name"
                  class="plan-col"
                  :class="{ featured: plan.featured }"
                >
                  <div class="plan-name">{{ plan.name }}</div>
                  <div class="plan-price">{{ getPrice(plan.monthly) }}</div>
                  <div class="plan-period">{{ getPeriod() }}</div>
                  <div class="plan-commission">
                    {{ plan.commission }} de comisión<br />
                    <span class="text-muted">en ventas &gt; {{ plan.threshold }}/mes</span>
                  </div>
                  <NuxtLink to="/registro-v2" class="btn btn-sm w-100 mt-2" :class="plan.featured ? 'btn-primary' : 'btn-outline'">
                    Empezar
                  </NuxtLink>
                </th>
              </tr>
            </thead>

            <tbody>
              <!-- Cuotas -->
              <tr class="category-header">
                <td :colspan="country.plans.length + 1">Cuotas y límites</td>
              </tr>
              <tr>
                <td class="feature-col">Productos</td>
                <td v-for="plan in country.plans" :key="'p-' + plan.name" class="plan-col">
                  {{ formatQuota(plan.quotas.maxProducts) }}
                </td>
              </tr>
              <tr>
                <td class="feature-col">Páginas personalizadas</td>
                <td v-for="plan in country.plans" :key="'pg-' + plan.name" class="plan-col">
                  {{ formatQuota(plan.quotas.maxPages) }}
                </td>
              </tr>
              <tr>
                <td class="feature-col">Usuarios administradores</td>
                <td v-for="plan in country.plans" :key="'u-' + plan.name" class="plan-col">
                  {{ formatQuota(plan.quotas.maxUsers) }}
                </td>
              </tr>

              <!-- Categories -->
              <template v-for="cat in comparisonMatrix" :key="cat.key">
                <tr class="category-header">
                  <td :colspan="country.plans.length + 1">{{ cat.label }}</td>
                </tr>
                <tr v-for="feat in cat.features" :key="cat.key + '-' + feat.key">
                  <td class="feature-col">
                    {{ feat.label }}
                    <small v-if="feat.hint" class="d-block text-muted">{{ feat.hint }}</small>
                  </td>
                  <td
                    v-for="plan in country.plans"
                    :key="cat.key + '-' + feat.key + '-' + plan.name"
                    class="plan-col"
                    :class="{ featured: plan.featured }"
                  >
                    <template v-if="isCheck(feat.values[plan.name])">
                      <span v-if="feat.values[plan.name]" class="cell-check" aria-label="Incluido">✓</span>
                      <span v-else class="cell-cross" aria-label="No incluido">—</span>
                    </template>
                    <template v-else>
                      <span class="cell-text">{{ cellText(feat.values[plan.name]) }}</span>
                    </template>
                  </td>
                </tr>
              </template>

              <!-- CTA row -->
              <tr class="cta-row">
                <td class="feature-col"></td>
                <td v-for="plan in country.plans" :key="'cta-' + plan.name" class="plan-col">
                  <NuxtLink to="/registro-v2" class="btn btn-sm w-100" :class="plan.featured ? 'btn-primary' : 'btn-outline'">
                    Elegir {{ plan.name }}
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-center text-muted small mt-4">
          ¿Tienes dudas? Escríbenos y te ayudamos a elegir el plan adecuado para tu negocio.
        </p>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="cta-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-xl-6 text-center">
            <h2>¿Listo para empezar a vender?</h2>
            <p>
              Únete a miles de emprendedores en {{ country.name }} que ya están vendiendo con
              {{ brandName }}.<br />
              Prueba gratis por 14 días, sin tarjeta de crédito.
            </p>
            <div class="mt-4">
              <NuxtLink to="/registro-v2" class="btn btn-white btn-lg">
                Crear mi tienda gratis
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.plans-hero {
  padding: 80px 0 32px;
}

.plans-matrix {
  padding: 24px 0 80px;
}

.matrix-wrapper {
  overflow-x: auto;
  border-radius: var(--rounded-lg);
  border: 1px solid #e5e7eb;
  background: #fff;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 760px;
}

.matrix-table thead th {
  position: sticky;
  top: 0;
  z-index: 5;
  background: #fff;
  text-align: center;
  padding: 20px 16px;
  border-bottom: 2px solid #e5e7eb;
  vertical-align: top;
}

.matrix-table thead th.feature-col {
  text-align: left;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.matrix-table thead th.plan-col.featured {
  background: linear-gradient(180deg, rgba(0, 178, 166, 0.08) 0%, rgba(0, 178, 166, 0) 100%);
  border-top: 3px solid var(--primary-color);
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.plan-price {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-top: 6px;
}

.plan-period {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.plan-commission {
  font-size: 0.78rem;
  color: #4b5563;
  line-height: 1.3;
  margin-bottom: 8px;
}

.matrix-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  text-align: center;
  vertical-align: middle;
}

.matrix-table tbody td.feature-col {
  text-align: left;
  background: #fff;
  font-weight: 500;
  color: #1f2937;
  border-right: 1px solid #e5e7eb;
}

.matrix-table tbody td.feature-col small {
  font-weight: 400;
  font-size: 0.78rem;
  margin-top: 2px;
}

.matrix-table tbody tr:hover td {
  background: #fafafa;
}

.matrix-table tbody td.plan-col.featured {
  background: rgba(0, 178, 166, 0.03);
}

.category-header td {
  background: #f3f4f6 !important;
  text-align: left !important;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #374151;
  padding: 14px 16px !important;
  border-top: 1px solid #e5e7eb;
}

.cell-check {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.15rem;
}

.cell-cross {
  color: #d1d5db;
  font-weight: 600;
}

.cell-text {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.cta-row td {
  padding: 20px 16px !important;
  background: #f9fafb !important;
  border-bottom: none !important;
}

.badge {
  background: var(--primary-color);
  color: #fff;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .plan-name { font-size: 1rem; }
  .plan-price { font-size: 1.2rem; }
  .matrix-table { font-size: 0.85rem; }
  .matrix-table tbody td,
  .matrix-table thead th { padding: 10px 10px; }
}
</style>
