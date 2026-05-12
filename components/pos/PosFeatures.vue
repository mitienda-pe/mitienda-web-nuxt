<script setup lang="ts">
const { brandName, country, isPeru } = useCountry()

const features = computed(() => {
  const base = [
    {
      emoji: '🕒',
      title: 'Turno de caja obligatorio',
      description: 'Apertura, movimientos, cierre y arqueo. Trazabilidad por cajero.',
    },
    {
      emoji: '👥',
      title: 'Roles y permisos',
      description: 'Cajero, supervisor, administrador. PIN de supervisor para anular ventas o eliminar pagos.',
    },
    {
      emoji: '🔁',
      title: 'Notas de crédito',
      description: 'Devoluciones y anulaciones con la nota de crédito asociada al comprobante original.',
    },
    {
      emoji: '🏷️',
      title: 'Promociones',
      description: 'Crear, activar y aplicar promociones desde caja sin trucos manuales.',
    },
    {
      emoji: '📦',
      title: 'Inventario multi-sucursal',
      description: `Stock por sucursal sincronizado con tu tienda online ${brandName.value}.`,
    },
    {
      emoji: '🛒',
      title: 'Catálogo unificado',
      description: 'Mismos productos en POS y tienda online — sin importar archivos ni cuadrar Excel.',
    },
    {
      emoji: '👤',
      title: 'Clientes',
      description: isPeru.value
        ? 'Base única de clientes, historial de compras, búsqueda por DNI o RUC.'
        : 'Base única de clientes, historial de compras, búsqueda por documento.',
    },
    {
      emoji: '📊',
      title: 'Reportes de turno',
      description: 'Ventas, métodos de pago y rendimiento por turno. Exportable. Dashboard ampliado: próximamente.',
      badge: 'Dashboard · Próximamente',
    },
    {
      emoji: '🖨️',
      title: 'Impresión térmica',
      description: 'Layout configurable, ancho de papel 58/80 mm, compatible con QZ Tray en Web.',
    },
    {
      emoji: '🏢',
      title: 'Integración NetSuite',
      description: 'Sucursales, usuarios, cuentas de caja, stock y totales. Para clientes con ERP.',
      badge: 'Plan Large',
    },
    {
      emoji: '🔐',
      title: 'Seguridad',
      description: 'Tokens con scope por sucursal, auditoría de operaciones y validaciones por rol.',
    },
    {
      emoji: '🌐',
      title: 'Multi-país',
      description: `Configurado para ${country.value.name}: moneda, impuestos y formato local listos.`,
    },
  ]
  return base
})
</script>

<template>
  <section class="pos-features">
    <div class="container">
      <span class="eyebrow">TODO LO QUE INCLUYE</span>
      <h2 class="section-title">Una caja completa, no solo un cobrador.</h2>
      <p class="section-sub">Lo que un negocio real necesita el día a día.</p>

      <CommonFeatureGrid :items="features" :columns="3" class="mt-4" />
    </div>
  </section>
</template>

<style scoped>
.pos-features {
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
  margin-bottom: 0.75rem;
}

.section-sub {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin: 0;
}
</style>
