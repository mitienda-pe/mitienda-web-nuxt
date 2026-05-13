<script setup lang="ts">
const { buildWhatsappUrl } = useContact()
const demoUrl = computed(() => buildWhatsappUrl('Hola, quiero saber más sobre MiTienda POS + Kasnet'))

const kasnetLogoUrl = '/img/logo-kasnet-negativo-fondo-morado.svg'

const stats = [
  { number: '+15,000', label: 'puntos de atención en todo el Perú' },
  { number: 'Multibanco', label: 'Banco de la Nación, Cajas Municipales y más' },
  { number: '1 QR', label: 'interoperable con Yape, Plin y billeteras peruanas' },
  { number: 'Tarjeta', label: 'crédito y débito procesadas desde el mismo equipo' },
]
</script>

<template>
  <section class="pos-kasnet">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="eyebrow">ALIANZA ESTRATÉGICA</span>

          <div class="logo-wrapper">
            <img
              :src="kasnetLogoUrl"
              alt="Kasnet"
              class="kasnet-logo"
              loading="lazy"
            />
          </div>

          <h2 class="kasnet-title">
            MiTienda POS + Kasnet:
            todos los pagos del Perú, en una sola caja.
          </h2>

          <p class="kasnet-lead">
            Kasnet es la red de agentes corresponsales multibanco más grande del país —
            con más de <strong>15,000 puntos de atención</strong> en bodegas, farmacias y
            comercios de todo el Perú. Operaciones financieras seguras, multibanco e inclusivas
            cerca de cada cliente.
          </p>

          <p class="kasnet-lead">
            Con MiTienda POS Android, <strong>Kasnet procesa todos los pagos digitales</strong>:
            QR interoperable con Yape, Plin y principales billeteras peruanas, además del
            cobro con <strong>tarjeta de crédito y débito</strong> — todo desde el mismo
            dispositivo, sin saltar a apps externas ni pegar IDs.
          </p>

          <div class="kasnet-ctas">
            <a :href="demoUrl" target="_blank" rel="noopener" class="btn-kasnet-primary">
              Quiero saber más
            </a>
            <a
              href="https://kasnet.com.pe"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-kasnet-link"
            >
              Conoce Kasnet
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p class="kasnet-microcopy">
            Cobro con QR y tarjeta vía Kasnet · <strong>Próximamente disponible</strong>
          </p>
        </div>

        <div class="col-lg-6">
          <div class="stats-grid">
            <div v-for="(stat, i) in stats" :key="i" class="stat-card">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>

            <div class="features-card">
              <h3 class="features-title">Kasnet dentro del POS</h3>
              <ul class="features-list">
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Cobro con tarjeta crédito y débito desde el mismo equipo
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  QR único interoperable con Yape, Plin y billeteras
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Confirmación inmediata: el POS emite el comprobante apenas Kasnet aprueba
                </li>
                <li>
                  <span class="dot" aria-hidden="true"></span>
                  Una sola conciliación al cierre de turno
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Doble beneficio: el negocio se convierte en agente Kasnet -->
      <div class="agent-callout">
        <div class="agent-icon" aria-hidden="true">🏪</div>
        <div class="agent-body">
          <span class="agent-tag">DOBLE BENEFICIO</span>
          <h3 class="agent-title">
            Tu negocio se convierte en agente corresponsal Kasnet
          </h3>
          <p class="agent-text">
            Con MiTienda POS sobre un dispositivo Kasnet, tu <strong>bodega, farmacia
            o tienda de barrio</strong> se vuelve un punto Kasnet. Tus clientes
            pueden pagar servicios (luz, agua, teléfono), hacer transferencias y
            recibir remesas sin moverse del barrio — y tu negocio gana comisión
            por cada operación.
          </p>
          <ul class="agent-list">
            <li>
              <span class="agent-dot" aria-hidden="true"></span>
              <strong>Ingresos extra</strong> por cada transacción financiera
            </li>
            <li>
              <span class="agent-dot" aria-hidden="true"></span>
              <strong>Más tráfico al local</strong>: clientes que vuelven cada mes
            </li>
            <li>
              <span class="agent-dot" aria-hidden="true"></span>
              <strong>Servicio diferenciado</strong> que tu competencia no ofrece
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-kasnet {
  background: #4b4bbb;
  color: #fff;
  padding: 96px 0;
  position: relative;
  overflow: hidden;
}

.pos-kasnet::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 280px;
  height: 280px;
  background: rgba(249, 203, 0, 0.08);
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
}

.pos-kasnet::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(30px);
  pointer-events: none;
}

.pos-kasnet > .container {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f9cb00;
  margin-bottom: 1.5rem;
}

.logo-wrapper {
  margin-bottom: 1.5rem;
}

.kasnet-logo {
  height: 56px;
  width: auto;
  max-width: 240px;
}

.kasnet-title {
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.kasnet-lead {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.02rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.kasnet-lead strong {
  color: #f9cb00;
  font-weight: 700;
}

.kasnet-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin: 2rem 0 1rem;
}

.btn-kasnet-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f9cb00;
  color: #2b1a78;
  font-weight: 700;
  padding: 0.95rem 1.75rem;
  border-radius: var(--rounded-lg);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
  border: 2px solid #f9cb00;
}

.btn-kasnet-primary:hover {
  background: #ffd633;
  color: #2b1a78;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(249, 203, 0, 0.3);
}

.btn-kasnet-link {
  color: #f9cb00;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.btn-kasnet-link:hover {
  color: #ffd633;
  transform: translateX(3px);
}

.kasnet-microcopy {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0;
}

.kasnet-microcopy strong {
  color: #f9cb00;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--rounded-lg);
  padding: 1.5rem;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.stat-card:hover {
  border-color: rgba(249, 203, 0, 0.5);
  transform: translateY(-2px);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f9cb00;
  line-height: 1.1;
  margin-bottom: 0.4rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  line-height: 1.4;
}

.features-card {
  grid-column: 1 / -1;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--rounded-lg);
  padding: 1.75rem;
}

.features-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f9cb00;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
  line-height: 1.5;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #f9cb00;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
}

.agent-callout {
  margin-top: 3.5rem;
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(249, 203, 0, 0.18) 0%, rgba(249, 203, 0, 0.06) 100%);
  border: 1px solid rgba(249, 203, 0, 0.45);
  border-left: 6px solid #f9cb00;
  border-radius: var(--rounded-xl);
  padding: 2.25rem 2.5rem;
}

.agent-icon {
  font-size: 3rem;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 203, 0, 0.15);
  border-radius: var(--rounded-lg);
}

.agent-body {
  flex: 1;
}

.agent-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #f9cb00;
  margin-bottom: 0.75rem;
}

.agent-title {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1.25;
  margin-bottom: 0.85rem;
}

.agent-text {
  color: rgba(255, 255, 255, 0.92);
  font-size: 1rem;
  line-height: 1.65;
  margin-bottom: 1.25rem;
}

.agent-text strong {
  color: #f9cb00;
  font-weight: 700;
}

.agent-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 1.5rem;
}

.agent-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
  line-height: 1.45;
}

.agent-list strong {
  color: #fff;
  font-weight: 700;
}

.agent-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #f9cb00;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

@media (max-width: 991px) {
  .agent-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .pos-kasnet {
    padding: 64px 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .agent-callout {
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.75rem;
    margin-top: 2.5rem;
  }

  .agent-icon {
    width: 64px;
    height: 64px;
    font-size: 2.25rem;
  }
}
</style>
