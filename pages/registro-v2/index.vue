<script setup lang="ts">
import VerifyWhatsApp from '~/components/registration-v2/VerifyWhatsApp.vue'
import VerifyEmail from '~/components/registration-v2/VerifyEmail.vue'
import CreatePassword from '~/components/registration-v2/CreatePassword.vue'
import StoreDataForm from '~/components/registration-v2/StoreDataForm.vue'
import UserDataForm from '~/components/registration-v2/UserDataForm.vue'

definePageMeta({
  layout: false
})

const { country, brandName } = useCountry()

useSeoMeta({
  title: () => `Registro - Prueba gratis ${brandName.value}`,
  description: () => `Crea tu tienda virtual con ${brandName.value}. Verificación por email.`,
})

const store = useRegistrationV2Store()

// Steps: 1=UserData, 2=Email OTP, 3=Password, 4=StoreData
// (WhatsApp OTP step temporarily removed)
const currentComponent = computed(() => {
  switch (store.currentStep) {
    case 1: return UserDataForm
    case 2: return VerifyEmail
    case 3: return CreatePassword
    case 4: return StoreDataForm
    default: return UserDataForm
  }
})

onMounted(() => {
  if (!store.sessionId) {
    store.reset()
  }
})
</script>

<template>
  <div class="registro-v2">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="text-center mb-4">
            <NuxtLink to="/" class="logo-link">
              <img :src="country.logo" :alt="brandName" class="logo-img" />
            </NuxtLink>
            <p class="lead text-muted">Crea tu tienda virtual en minutos</p>
          </div>

          <CommonProgressSteps :current-step="store.currentStep" :steps="store.stepLabels" />

          <div class="card registration-card">
            <div class="card-body p-4 p-md-5">
              <Transition name="fade" mode="out-in">
                <component :is="currentComponent" :key="store.currentStep" />
              </Transition>
            </div>
          </div>

          <div class="text-center mt-4">
            <p class="text-muted small">
              ¿Tienes problemas? Contáctanos a
              <a href="mailto:soporte@mitienda.pe" class="text-primary">soporte@mitienda.pe</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registro-v2 { min-height: 100vh; background-color: var(--background-soft, #f8f9fa); }
.logo-link { text-decoration: none; display: inline-block; }
.logo-img { height: 40px; width: auto; }
.registration-card { box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08); border: none; border-radius: var(--rounded-md, 12px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from { opacity: 0; transform: translateX(20px); }
.fade-leave-to { opacity: 0; transform: translateX(-20px); }
</style>
