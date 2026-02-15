<script setup lang="ts">
const router = useRouter()
const registrationStore = useRegistrationStore()

// Form data
const form = ref({
  nombre: '',
  telefono: '',
  correo: '',
  password: '',
  terminoscheck: false
})

// Form errors
const errors = ref<Record<string, string>>({})

// Loading state
const isLoading = ref(false)
const errorMessage = ref('')

// Validation
function validateForm(): boolean {
  errors.value = {}

  if (!form.value.nombre || form.value.nombre.length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!form.value.telefono || !/^\d{9,}$/.test(form.value.telefono)) {
    errors.value.telefono = 'Ingresa un teléfono válido (mínimo 9 dígitos)'
  }

  if (!form.value.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.correo)) {
    errors.value.correo = 'Ingresa un correo electrónico válido'
  }

  if (!form.value.password || form.value.password.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  if (!form.value.terminoscheck) {
    errors.value.terminoscheck = 'Debes aceptar los términos y condiciones'
  }

  return Object.keys(errors.value).length === 0
}

// Submit handler
async function handleSubmit() {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await registrationStore.submitPaso1({
      nombre: form.value.nombre,
      telefono: form.value.telefono,
      correo: form.value.correo,
      password: form.value.password,
      terminoscheck: form.value.terminoscheck
    })

    if (result.success && result.codigo) {
      // Redirigir al paso 2
      navigateTo(`/prueba-gratis/paso2/${result.codigo}`)
    } else {
      errorMessage.value = result.error || 'Error en el registro. Por favor intenta de nuevo.'
    }
  } catch (e) {
    errorMessage.value = 'Error de conexión. Por favor intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// Only allow numbers in phone field
function handlePhoneInput(value: string) {
  form.value.telefono = value.replace(/\D/g, '')
}
</script>

<template>
  <div class="card registration-card">
    <div class="card-body">
      <form @submit.prevent="handleSubmit" novalidate>
        <CommonAlertMessage
          v-if="errorMessage"
          type="error"
          :message="errorMessage"
          @dismiss="errorMessage = ''"
        />

        <CommonFormInput
          v-model="form.nombre"
          label="Nombre"
          placeholder="Escribe tu nombre"
          :maxlength="255"
          required
          autocomplete="name"
          :error="errors.nombre"
        />

        <CommonFormInput
          :model-value="form.telefono"
          @update:model-value="handlePhoneInput"
          label="Teléfono"
          type="tel"
          placeholder="999888777"
          required
          autocomplete="tel"
          :error="errors.telefono"
        />

        <CommonFormInput
          v-model="form.correo"
          label="Correo Electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          :maxlength="255"
          required
          autocomplete="email"
          :error="errors.correo"
        />

        <CommonFormInput
          v-model="form.password"
          label="Crear una contraseña"
          type="password"
          placeholder="••••••••"
          :maxlength="150"
          required
          autocomplete="new-password"
          :error="errors.password"
        />

        <CommonFormCheckbox
          v-model="form.terminoscheck"
          required
          :error="errors.terminoscheck"
        >
          Acepto los
          <NuxtLink to="/terminos-y-condiciones" target="_blank" class="text-primary">
            términos y condiciones
          </NuxtLink>
        </CommonFormCheckbox>

        <small class="small text-muted d-block mb-4">
          Al ingresar tu correo electrónico, aceptas recibir correos electrónicos del equipo de marketing de miTienda.
        </small>

        <div class="d-grid mb-3">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            <strong>Empezar</strong>
          </button>
        </div>
      </form>

      <p class="lead mb-0 text-center">
        ¿Ya estás registrado?<br />
        <a href="https://panel.mitienda.host/administrador/panel" class="text-primary">
          Ingresa tu cuenta.
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.registration-card {
  box-shadow: 0px 1px 47px 0px rgba(0, 0, 0, 0.64);
}

.registration-card .card-body {
  padding: 2rem;
}

@media (max-width: 768px) {
  .registration-card .card-body {
    padding: 1.5rem;
  }
}
</style>
