<script setup lang="ts">
const { brandName, isPeru } = useCountry()
</script>

<template>
  <section id="features" class="pos-plataformas">
    <div class="container">
      <span class="eyebrow">DONDE VENDAS, {{ brandName.toUpperCase() }} POS ESTÁ</span>
      <h2 class="section-title">Mismo backend, mismos datos. Web o Android — tú eliges.</h2>

      <div class="row g-4 mt-3">
        <div class="col-lg-6">
          <div class="platform-card">
            <div class="platform-header">
              <div class="platform-emoji" aria-hidden="true">💻</div>
              <h3 class="platform-title">{{ brandName }} POS Web</h3>
            </div>
            <p class="platform-desc">
              Funciona en cualquier navegador moderno — Windows, Mac, Linux, ChromeOS. Sin instalar
              nada. Ideal para tiendas con caja en computadora, laptop o tablet.
            </p>
            <p class="platform-subtitle">Compatible con:</p>
            <ul class="platform-list">
              <li><span class="check">✓</span>Impresoras térmicas estándar (vía QZ Tray)</li>
              <li><span class="check">✓</span>Lectores de código de barras USB</li>
              <li><span class="check">✓</span>Cajones monederos electrónicos</li>
              <li><span class="check">✓</span>Cámara como lector alternativo</li>
            </ul>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="platform-card">
            <div class="platform-header">
              <div class="platform-emoji" aria-hidden="true">📱</div>
              <h3 class="platform-title">
                {{ brandName }} POS Android
                <span class="platform-badge">Beta</span>
              </h3>
            </div>
            <p class="platform-desc">
              App nativa (Kotlin + Jetpack Compose) para dispositivos POS Android (Sunmi, Imin, Pos-D
              y similares). Aprovecha impresora térmica, scanner físico y pantalla del equipo en una
              sola pieza. Ideal para mostrador, piso de tienda u operación móvil dentro del local.
            </p>
            <p class="platform-subtitle">Capacidades nativas:</p>
            <ul class="platform-list">
              <li><span class="check">✓</span>Impresión térmica directa en el equipo</li>
              <li><span class="check">✓</span>Lector de barras físico (o cámara con ML Kit)</li>
              <li>
                <span class="check">✓</span>
                QR y tarjeta procesados por Kasnet
                <span class="inline-badge">Próximamente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="closing-line">
        Como ambas usan el mismo backend, las ventas, el inventario y los clientes son los mismos.
        No hay sincronizaciones manuales, no hay archivos que importar, no hay datos que cuadrar al
        final del día.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pos-plataformas {
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
  max-width: 800px;
}

.platform-card {
  background: var(--background-soft);
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-lg);
  padding: 2rem;
  height: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.platform-card:hover {
  border-color: rgba(0, 178, 166, 0.4);
  box-shadow: var(--shadow-md);
}

.platform-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.platform-emoji {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 178, 166, 0.12);
  border-radius: var(--rounded-md);
}

.platform-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.platform-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--primary-color);
  background: rgba(0, 178, 166, 0.12);
  border: 1px solid rgba(0, 178, 166, 0.3);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.platform-desc {
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.platform-subtitle {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
}

.platform-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.platform-list li {
  color: var(--text-dark);
  font-size: 0.95rem;
  line-height: 1.5;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
}

.check {
  color: var(--primary-color);
  font-weight: 700;
}

.inline-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #7c4a03;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.4);
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
}

.closing-line {
  margin-top: 2rem;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.65;
  max-width: 800px;
}
</style>
