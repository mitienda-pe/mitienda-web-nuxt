<script setup lang="ts">
const { brandName, country } = useCountry()
const { buildWhatsappUrl, buildMailto } = useContact()

const demoUrl = computed(() => buildWhatsappUrl(`Hola, quiero una demo de ${brandName.value} POS`))
const emailUrl = computed(() => buildMailto(`Demo de ${brandName.value} POS`, `Hola, me interesa ver una demo de ${brandName.value} POS. Mi negocio es...`))
</script>

<template>
  <section class="pos-cta">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-9 text-center">
          <h2 class="cta-title">¿Listo para una caja que entiende tu negocio?</h2>
          <p class="cta-sub">
            Agenda una demo de 30 minutos. Te mostramos {{ brandName }} POS funcionando con tu tipo
            de operación, tu hardware y tus métodos de pago — sin compromiso.
          </p>

          <div class="cta-buttons">
            <a :href="demoUrl" target="_blank" rel="noopener" class="btn btn-white btn-lg">
              Solicitar demo por WhatsApp
            </a>
            <a :href="emailUrl" class="btn-secondary-link">
              Escríbenos por correo
            </a>
          </div>

          <p class="cta-microcopy">
            Respuesta en menos de 24 horas hábiles · Atención en {{ country.geoPlacename }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pos-cta {
  background: linear-gradient(135deg, var(--dark-teal) 0%, var(--primary-color) 100%);
  color: #fff;
  padding: 80px 0;
}

.cta-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
}

.cta-sub {
  color: #d9f1ef;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-bottom: 1.25rem;
}

.btn-secondary-link {
  color: #fff;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: opacity var(--transition-fast);
}

.btn-secondary-link:hover {
  opacity: 0.85;
  color: #fff;
}

.cta-microcopy {
  color: #b8e5e2;
  font-size: 0.85rem;
  margin: 0;
}
</style>
