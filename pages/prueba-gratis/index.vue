<script setup lang="ts">
useSeoMeta({
  title: 'Prueba gratis miTienda - 14 días gratis',
  ogTitle: 'Prueba gratis miTienda - 14 días gratis',
  description: 'Empieza tu prueba gratis de 14 días. Sin tarjeta de crédito.',
  ogDescription: 'Empieza tu prueba gratis de 14 días. Sin tarjeta de crédito.',
})

const faqs = [
  {
    id: 1,
    question: '¿Realmente es gratis por 14 días?',
    answer: 'Sí, completamente gratis. No necesitas ingresar tarjeta de crédito ni hacer ningún pago. Tendrás acceso completo a todas las funciones de MiTienda durante 14 días.',
    open: true
  },
  {
    id: 2,
    question: '¿Qué pasa después de los 14 días?',
    answer: 'Puedes elegir uno de nuestros planes desde S/49 por mes, o cancelar sin ningún cargo. Tu tienda se mantendrá guardada por 30 días adicionales por si decides reactivarla.',
    open: false
  },
  {
    id: 3,
    question: '¿Puedo usar mi propio dominio?',
    answer: 'Sí, puedes conectar tu propio dominio desde el primer día. También te proporcionamos un subdominio gratuito (tutienda.mitienda.pe) que puedes usar inmediatamente.',
    open: false
  },
  {
    id: 4,
    question: '¿Qué métodos de pago acepta mi tienda?',
    answer: 'Tarjetas de crédito/débito, Yape, Plin, transferencias bancarias y más de 10 pasarelas de pago diferentes. Tus clientes pueden pagar como prefieran.',
    open: false
  }
]
</script>

<template>
  <div class="prueba-gratis">
    <section class="prueba-gratis-hero">
      <div class="container">
        <div class="row align-items-center min-vh-100 py-5">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="text-white">
                Crea tu tienda online gratis y empieza a vender hoy
              </h1>
              <p class="hero-subtitle text-white">
                Prueba MiTienda por 14 días completamente gratis. Sin tarjeta de crédito, sin compromiso.
                Crea tu tienda online y empieza a vender en menos de 5 minutos.
              </p>
              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="benefit-icon">✅</span>
                  <span>14 días gratis, sin tarjeta de crédito</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✅</span>
                  <span>Tienda online personalizable</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✅</span>
                  <span>Pagos seguros integrados</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">✅</span>
                  <span>Soporte técnico incluido</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>

    <section class="features-overview py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-6">
            <div class="feature-stat">
              <div class="stat-number">2,000+</div>
              <div class="stat-label">Tiendas activas</div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="feature-stat">
              <div class="stat-number">14 días</div>
              <div class="stat-label">Prueba gratis</div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="feature-stat">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Soporte técnico</div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="feature-stat">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime garantizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h3 class="text-center mb-5">Preguntas frecuentes</h3>
            <div class="accordion" id="faqAccordion">
              <div v-for="faq in faqs" :key="faq.id" class="accordion-item">
                <h2 class="accordion-header" :id="`faq${faq.id}`">
                  <button class="accordion-button" :class="{ collapsed: !faq.open }" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${faq.id}`">
                    {{ faq.question }}
                  </button>
                </h2>
                <div :id="`collapse${faq.id}`" class="accordion-collapse collapse" :class="{ show: faq.open }" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">{{ faq.answer }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prueba-gratis-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, #005953 100%);
  color: white;
  padding: 2rem 0;
}
.benefits-list { margin-top: 2rem; }
.benefit-item { display: flex; align-items: center; margin-bottom: 0.75rem; font-size: 1.1rem; color: white; }
.benefit-icon { margin-right: 0.75rem; font-size: 1.2rem; }
.features-overview { background: #f8f9fa; }
.feature-stat { padding: 1.5rem 1rem; }
.stat-number { font-size: 2.5rem; font-weight: bold; color: var(--primary-color); line-height: 1; }
.stat-label { font-size: 0.9rem; color: #6c757d; margin-top: 0.5rem; }
.faq-section .accordion-button { font-weight: 600; }
.faq-section .accordion-button:not(.collapsed) { background-color: var(--primary-color); color: white; }
.faq-section .accordion-button:not(.collapsed)::after { filter: brightness(0) invert(1); }
@media (max-width: 768px) {
  .prueba-gratis-hero { text-align: center; padding: 1rem 0; }
  .benefit-item { justify-content: center; }
  .stat-number { font-size: 2rem; }
}
</style>
