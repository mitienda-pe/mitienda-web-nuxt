<script setup lang="ts">
const store = useRegistrationV2Store()

const password = ref('')
const confirmPassword = ref('')
const errors = ref<Record<string, string>>({})
const errorMessage = ref('')

const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return { score: 0, label: '', color: '' }

  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 8) score++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++

  if (score <= 1) return { score, label: 'Débil', color: '#dc3545' }
  if (score <= 2) return { score, label: 'Regular', color: '#ffc107' }
  if (score <= 3) return { score, label: 'Buena', color: '#17a2b8' }
  return { score, label: 'Fuerte', color: '#28a745' }
})

function validateForm(): boolean {
  errors.value = {}

  if (!password.value || password.value.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Confirma tu contraseña'
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  errorMessage.value = ''
  store.password = password.value

  const result = await store.createAccount()

  if (result.success) {
    store.nextStep()
  } else {
    errorMessage.value = result.error || 'Error al crear la cuenta'
  }
}
</script>

<template>
  <div class="create-password">
    <div class="verified-banner text-center mb-4 p-4 bg-success bg-opacity-10 rounded">
      <div class="mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h4 class="text-success mb-1">Datos verificados</h4>
      <p class="text-muted mb-0 small">Tu WhatsApp y Email han sido confirmados</p>
    </div>

    <div class="text-center mb-4">
      <h3 class="mb-2">Crea tu contraseña</h3>
      <p class="text-muted">
        Elige una contraseña segura para tu cuenta
      </p>
    </div>

    <CommonAlertMessage
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      @dismiss="errorMessage = ''"
    />

    <form @submit.prevent="handleSubmit" novalidate>
      <CommonFormInput
        v-model="password"
        label="Contraseña"
        type="password"
        placeholder="Mínimo 6 caracteres"
        :maxlength="150"
        required
        autocomplete="new-password"
        :error="errors.password"
      />

      <div v-if="password && !errors.password" class="password-strength mb-3">
        <div class="strength-bar">
          <div
            class="strength-fill"
            :style="{
              width: `${(passwordStrength.score / 5) * 100}%`,
              backgroundColor: passwordStrength.color
            }"
          ></div>
        </div>
        <small :style="{ color: passwordStrength.color }">
          Seguridad: {{ passwordStrength.label }}
        </small>
      </div>

      <CommonFormInput
        v-model="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        placeholder="Repite tu contraseña"
        :maxlength="150"
        required
        autocomplete="new-password"
        :error="errors.confirmPassword"
      />

      <div class="d-grid mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="store.isLoading"
        >
          <span
            v-if="store.isLoading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          Continuar
        </button>
      </div>
    </form>

    <div class="text-center mt-4">
      <button
        type="button"
        class="btn btn-link text-muted"
        @click="store.previousStep()"
      >
        Volver al paso anterior
      </button>
    </div>
  </div>
</template>

<style scoped>
.create-password {
  max-width: 400px;
  margin: 0 auto;
}

.verified-banner {
  border: 1px solid rgba(40, 167, 69, 0.2);
}

.password-strength {
  margin-top: -0.5rem;
}

.strength-bar {
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}
</style>
