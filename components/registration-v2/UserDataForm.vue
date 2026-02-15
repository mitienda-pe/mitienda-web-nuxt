<script setup lang="ts">
const store = useRegistrationV2Store()

const terminoscheck = ref(false)
const errors = ref<Record<string, string>>({})
const errorMessage = ref('')

// Países disponibles con sus códigos de teléfono
const defaultCountry = { code: '+51', country: 'PE', name: 'Perú', flag: '🇵🇪' }
const countries = [
  defaultCountry,
  { code: '+593', country: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+57', country: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: '', country: 'OTHER', name: 'Otro', flag: '🌎' }
]

const selectedCountry = computed(() => {
  return countries.find(c => c.code === store.userData.countryCode) ?? defaultCountry
})

const showCustomCode = computed(() => store.userData.countryCode === '' || !countries.find(c => c.code === store.userData.countryCode))

const customCountryCode = ref('')

function handleCountryChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const country = countries.find(c => c.country === target.value)
  if (country) {
    store.userData.countryCode = country.code
    // También actualizar el país de la tienda
    if (country.country !== 'OTHER') {
      store.storeData.pais = country.country
    }
  }
}

function handleCustomCodeInput(value: string) {
  // Asegurar que empiece con +
  let cleaned = value.replace(/[^\d+]/g, '')
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned.replace(/\+/g, '')
  }
  customCountryCode.value = cleaned
  store.userData.countryCode = cleaned
}

function validateForm(): boolean {
  errors.value = {}

  if (!store.userData.nombre || store.userData.nombre.length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!store.userData.telefono || !/^\d{9,}$/.test(store.userData.telefono)) {
    errors.value.telefono = 'Ingresa un teléfono válido (mínimo 9 dígitos)'
  }

  if (!store.userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.userData.email)) {
    errors.value.email = 'Ingresa un correo electrónico válido'
  }

  if (!terminoscheck.value) {
    errors.value.terminoscheck = 'Debes aceptar los términos y condiciones'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  errorMessage.value = ''

  // Iniciar sesión OTP
  const result = await store.startSession()

  if (result.success) {
    store.nextStep()
  } else {
    errorMessage.value = result.error || 'Error al procesar los datos'
  }
}

function handlePhoneInput(value: string) {
  store.userData.telefono = value.replace(/\D/g, '')
}
</script>

<template>
  <div class="user-data-form">
    <div class="text-center mb-4">
      <h3 class="mb-2">Ingresa tus datos</h3>
      <p class="text-muted">
        Te enviaremos códigos de verificación a tu WhatsApp y Email
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
        v-model="store.userData.nombre"
        label="Nombre"
        placeholder="Escribe tu nombre"
        :maxlength="255"
        required
        autocomplete="name"
        :error="errors.nombre"
      />

      <div class="mb-3">
        <label class="form-label">Teléfono (WhatsApp) <span class="text-danger">*</span></label>
        <div class="input-group">
          <select
            class="form-select country-select"
            :value="selectedCountry.country"
            @change="handleCountryChange"
          >
            <option v-for="c in countries" :key="c.country" :value="c.country">
              {{ c.flag }} {{ c.name }} {{ c.code }}
            </option>
          </select>
          <input
            v-if="showCustomCode"
            type="text"
            class="form-control custom-code"
            placeholder="+1"
            :value="customCountryCode"
            @input="handleCustomCodeInput(($event.target as HTMLInputElement).value)"
            maxlength="5"
          />
          <input
            type="tel"
            class="form-control phone-input"
            placeholder="999888777"
            :value="store.userData.telefono"
            @input="handlePhoneInput(($event.target as HTMLInputElement).value)"
            autocomplete="tel"
            required
          />
        </div>
        <div v-if="errors.telefono" class="invalid-feedback d-block">{{ errors.telefono }}</div>
        <small class="form-text text-muted">Recibirás un código de verificación por WhatsApp</small>
      </div>

      <CommonFormInput
        v-model="store.userData.email"
        label="Correo Electrónico"
        type="email"
        placeholder="correo@ejemplo.com"
        :maxlength="255"
        required
        autocomplete="email"
        :error="errors.email"
        hint="Recibirás un código de verificación por email"
      />

      <CommonFormCheckbox
        v-model="terminoscheck"
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
          :disabled="store.isLoading"
        >
          <span
            v-if="store.isLoading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          <strong>Continuar</strong>
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
</template>

<style scoped>
.user-data-form {
  max-width: 400px;
  margin: 0 auto;
}

.country-select {
  max-width: 160px;
  flex-shrink: 0;
}

.custom-code {
  max-width: 70px;
  flex-shrink: 0;
}

.phone-input {
  flex: 1;
}
</style>
