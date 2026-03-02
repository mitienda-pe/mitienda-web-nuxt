<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const store = useRegistrationV2Store()

const codigo = computed(() => route.params.codigo as string || store.codigo)

const tiendaUrl = computed(() => store.tiendaUrl || `https://tutienda.mitienda.pe`)
const panelUrl = computed(() => store.panelUrl || `https://admin.mitienda.pe/login`)

// Auto-redirect countdown to the admin panel
const countdown = ref(8)
const autoRedirectEnabled = ref(true)
let countdownInterval: ReturnType<typeof setInterval> | null = null

useSeoMeta({
  title: '¡Felicidades! Tu tienda está lista',
  description: 'Tu tienda virtual ha sido creada exitosamente',
})

function startCountdown() {
  countdownInterval = setInterval(() => {
    if (countdown.value <= 1) {
      clearInterval(countdownInterval!)
      if (autoRedirectEnabled.value) {
        window.location.href = panelUrl.value
      }
    } else {
      countdown.value--
    }
  }, 1000)
}

function cancelAutoRedirect() {
  autoRedirectEnabled.value = false
  if (countdownInterval) clearInterval(countdownInterval)
}

onMounted(() => {
  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'sign_up', {
      method: 'form_v2_otp',
      event_category: 'registration',
      event_label: 'free_trial_completed_v2'
    })
  }

  // Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'CompleteRegistration', {
      registration_type: 'otp_verified'
    })
    window.fbq('track', 'StartTrial')
  }

  startCountdown()
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="registro-completo">
    <section class="registro-completo-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <!-- Header -->
            <div class="mb-4">
              <NuxtLink to="/" class="logo-link">
                <h1 class="logo-text">miTienda</h1>
              </NuxtLink>
            </div>

            <!-- Progress Steps -->
            <CommonProgressSteps
              :current-step="6"
              :steps="store.stepLabels"
            />

            <!-- Success Animation -->
            <div class="success-animation mb-4">
              <div class="checkmark-circle">
                <div class="checkmark"></div>
              </div>
            </div>

            <h1 class="display-4 mb-3">¡Felicidades!</h1>
            <h2 class="h3 text-primary mb-4">Tu tienda online ya está lista</h2>

            <!-- Verified Badge -->
            <div class="verified-badges mb-4">
              <span class="badge bg-success me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                WhatsApp verificado
              </span>
              <span class="badge bg-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Email verificado
              </span>
            </div>

            <p class="lead mb-4">
              Hemos creado tu tienda online y ya está funcionando.
              Tu prueba gratis de <strong>14 días</strong> ha comenzado.
            </p>

            <!-- Auto-redirect banner -->
            <div v-if="autoRedirectEnabled" class="auto-redirect-banner mb-4">
              <p class="mb-1">
                Serás redirigido al panel de administración en
                <strong>{{ countdown }}</strong> segundo{{ countdown !== 1 ? 's' : '' }}…
              </p>
              <button class="btn btn-sm btn-outline-secondary" @click="cancelAutoRedirect">
                Cancelar redirección automática
              </button>
            </div>

            <!-- Links -->
            <div class="row g-4 mb-5">
              <div class="col-md-6">
                <div class="link-card">
                  <div class="link-icon">🏪</div>
                  <h5>Visita tu tienda</h5>
                  <p class="text-muted mb-3">Ve cómo se ve tu nueva tienda online</p>
                  <a :href="tiendaUrl" target="_blank" class="btn btn-outline-primary">
                    Ver mi tienda →
                  </a>
                </div>
              </div>
              <div class="col-md-6">
                <div class="link-card">
                  <div class="link-icon">⚙️</div>
                  <h5>Panel de administración</h5>
                  <p class="text-muted mb-3">Agrega productos y gestiona tu tienda</p>
                  <a :href="panelUrl" class="btn btn-primary">
                    Ir al panel →
                  </a>
                </div>
              </div>
            </div>

            <!-- First Steps -->
            <div class="alert alert-success mb-4 text-start">
              <h5 class="alert-heading">Primeros pasos recomendados:</h5>
              <ol class="mb-0">
                <li>Ingresa al panel y agrega tu primer producto</li>
                <li>Personaliza los colores y logo de tu tienda</li>
                <li>Configura tus métodos de pago preferidos</li>
                <li>¡Comparte tu tienda y comienza a vender!</li>
              </ol>
            </div>

            <!-- Main CTA -->
            <div class="text-center mb-4">
              <a :href="panelUrl" class="btn btn-primary btn-lg px-5">
                Agregar mi primer producto →
              </a>
            </div>

            <!-- Magic link notice -->
            <p v-if="store.magicToken" class="text-muted small mb-4">
              El enlace te ingresará al panel sin necesidad de contraseña (válido por 10 minutos).
            </p>

            <!-- Info Cards -->
            <div class="info-cards row g-3 mb-4">
              <div class="col-md-6">
                <div class="info-card">
                  <h6>📧 Correo de confirmación</h6>
                  <p class="mb-0 small text-muted">
                    Revisa tu email, te hemos enviado los datos de acceso y primeros pasos
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-card">
                  <h6>🎓 Centro de ayuda</h6>
                  <p class="mb-0 small text-muted">
                    Tutoriales en video y documentación completa disponible 24/7
                  </p>
                </div>
              </div>
            </div>

            <!-- Testimonial -->
            <figure class="testimonial-card mt-5">
              <blockquote class="blockquote">
                <p class="mb-3">
                  "En solo 2 semanas logré vender más de S/5,000 con mi tienda MiTienda.
                  La plataforma es súper fácil de usar y el soporte es excelente."
                </p>
              </blockquote>
              <figcaption class="blockquote-footer">
                María González, <cite title="Source Title">Boutique María</cite>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.logo-link {
  text-decoration: none;
}

.logo-text {
  color: var(--primary-color, #00b2a6);
  font-size: 2rem;
  font-weight: 700;
}

.verified-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.verified-badges .badge {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
}

.success-animation {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.checkmark-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color, #00b2a6), #28a745);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: checkmarkScale 0.6s ease-in-out;
  box-shadow: 0 4px 20px rgba(0, 178, 166, 0.3);
}

.checkmark {
  width: 24px;
  height: 40px;
  border: solid white;
  border-width: 0 4px 4px 0;
  transform: rotate(45deg);
  animation: checkmarkDraw 0.4s ease-in-out 0.2s both;
}

@keyframes checkmarkScale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes checkmarkDraw {
  0% {
    height: 0;
  }
  100% {
    height: 40px;
  }
}

.link-card {
  padding: 2rem 1.5rem;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  text-align: center;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.link-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.link-card h5 {
  color: var(--primary-color, #00b2a6);
  margin-bottom: 1rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid var(--primary-color, #00b2a6);
  height: 100%;
  text-align: left;
}

.info-card h6 {
  color: var(--primary-color, #00b2a6);
  margin-bottom: 0.5rem;
}

.testimonial-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid var(--primary-color, #00b2a6);
  text-align: left;
}

.testimonial-card .blockquote-footer {
  color: #6c757d;
}

.auto-redirect-banner {
  background: #e8f9f8;
  border: 1px solid var(--primary-color, #00b2a6);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  color: #1a6b65;
}

@media (max-width: 768px) {
  .checkmark-circle {
    width: 80px;
    height: 80px;
  }

  .checkmark {
    width: 20px;
    height: 32px;
  }

  .link-card {
    padding: 1.5rem 1rem;
  }
}
</style>
