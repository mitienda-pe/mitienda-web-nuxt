<script setup lang="ts">
const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', '10minutemail.com', 'trashmail.com', 'fakeinbox.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'dispostable.com',
  'mailnesia.com', 'maildrop.cc', 'temp-mail.org', 'mohmal.com'
]

const store = useRegistrationV2Store()
const { country } = useCountry()

const loginUrl = computed(() => `${country.value.adminUrl}/login`)

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
  let cleaned = value.replace(/[^\d+]/g, '')
  // Ensure exactly one + at the start
  cleaned = '+' + cleaned.replace(/\+/g, '')
  // Limit to 4 digits after +
  if (cleaned.length > 5) cleaned = cleaned.slice(0, 5)
  customCountryCode.value = cleaned
  store.userData.countryCode = cleaned
}

function validateForm(): boolean {
  errors.value = {}

  if (!store.userData.nombre || store.userData.nombre.length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!store.userData.telefono || !/^\d+$/.test(store.userData.telefono)) {
    errors.value.telefono = 'Ingresa un teléfono válido'
  } else {
    const phoneLength = store.userData.telefono.length
    const countryCode = store.userData.countryCode
    if (countryCode === '+51' && phoneLength !== 9) {
      errors.value.telefono = 'El teléfono en Perú debe tener 9 dígitos'
    } else if (countryCode === '+593' && (phoneLength < 9 || phoneLength > 10)) {
      errors.value.telefono = 'El teléfono en Ecuador debe tener 9-10 dígitos'
    } else if (countryCode === '+57' && phoneLength !== 10) {
      errors.value.telefono = 'El teléfono en Colombia debe tener 10 dígitos'
    } else if (phoneLength < 7) {
      errors.value.telefono = 'Ingresa un teléfono válido (mínimo 7 dígitos)'
    }
  }

  if (!store.userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.userData.email)) {
    errors.value.email = 'Ingresa un correo electrónico válido'
  } else {
    const emailDomain = store.userData.email.split('@')[1]?.toLowerCase()
    if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
      errors.value.email = 'No se permiten correos temporales'
    }
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
        Te enviaremos un código de verificación a tu correo electrónico
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
        <label class="form-label">Teléfono <span class="text-danger">*</span></label>
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
        <small class="form-text text-muted">Lo usaremos para contactarte si necesitas ayuda con tu tienda</small>
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
        hint="Te enviaremos un código de verificación de 6 dígitos"
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
      <a :href="loginUrl" class="text-primary">
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
