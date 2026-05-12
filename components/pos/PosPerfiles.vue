<script setup lang="ts">
const { brandName } = useCountry()

const perfiles = computed(() => [
  {
    emoji: '🏬',
    title: 'Comercio retail con tienda física y online',
    description: 'Una sola plataforma para los dos canales. Catálogo, inventario y clientes sincronizados.',
  },
  {
    emoji: '🏢',
    title: 'Cadenas con varias sucursales',
    description: 'Inventario, series y reportes por sucursal. Un dashboard para verlo todo.',
  },
  {
    emoji: '🔌',
    title: 'Comercios que ya operan con NetSuite',
    description: 'Sincronización lista — sucursales, cuentas de caja, stock, totales.',
  },
  {
    emoji: '🚀',
    title: 'Negocios que recién abren caja',
    description: 'Turno, roles y operación de caja desde el día uno. Onboarding asistido.',
  },
])
</script>

<template>
  <section class="pos-perfiles">
    <div class="container">
      <span class="eyebrow">PARA QUIÉN ES</span>
      <h2 class="section-title">{{ brandName }} POS es para…</h2>

      <div class="row g-4 mt-3">
        <div v-for="(p, i) in perfiles" :key="i" class="col-md-6">
          <div class="perfil-card">
            <div class="perfil-emoji" aria-hidden="true">{{ p.emoji }}</div>
            <div>
              <h3 class="perfil-title">{{ p.title }}</h3>
              <p class="perfil-desc">{{ p.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-perfiles {
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

.perfil-card {
  background: var(--background-soft);
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
  display: flex;
  gap: 1rem;
  height: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.perfil-card:hover {
  border-color: rgba(0, 178, 166, 0.35);
  box-shadow: var(--shadow-md);
}

.perfil-emoji {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 178, 166, 0.12);
  border-radius: var(--rounded-md);
  flex-shrink: 0;
}

.perfil-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.perfil-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}
</style>
