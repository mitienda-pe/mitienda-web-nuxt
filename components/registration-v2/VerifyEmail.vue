<script setup lang="ts">
const store = useRegistrationV2Store()

const otpCode = ref('')
const otpInputRef = ref<InstanceType<typeof RegistrationV2OtpInput> | null>(null)
const errorMessage = ref('')
const successMessage = ref('')
const resendCooldown = ref(0)
let cooldownInterval: ReturnType<typeof setInterval> | null = null

async function sendCode() {
  errorMessage.value = ''
  const result = await store.sendEmailCode()
  if (result.success) {
    successMessage.value = 'Código enviado a tu correo'
    startResendCooldown()
  } else {
    errorMessage.value = result.error || 'Error al enviar código'
  }
}

async function verifyCode(code: string) {
  if (code.length !== 6) return

  errorMessage.value = ''
  successMessage.value = ''

  const result = await store.verifyCode('email', code)

  if (result.success) {
    successMessage.value = 'Email verificado correctamente'
    setTimeout(() => {
      store.nextStep()
    }, 1000)
  } else {
    errorMessage.value = result.error || 'Código incorrecto'
    otpCode.value = ''
    otpInputRef.value?.clear()
  }
}

function startResendCooldown() {
  resendCooldown.value = 60
  if (cooldownInterval) clearInterval(cooldownInterval)
  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval!)
      cooldownInterval = null
    }
  }, 1000)
}

async function resendCode() {
  if (resendCooldown.value > 0) return
  otpCode.value = ''
  otpInputRef.value?.clear()
  await sendCode()
}

onMounted(async () => {
  // Enviar código automáticamente al montar el componente
  await sendCode()
})
</script>

<template>
  <div class="verify-email">
    <div class="verify-header text-center mb-4">
      <div class="verify-icon mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00b2a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h3 class="mb-2">Verifica tu Email</h3>
      <p class="text-muted">
        Enviamos un código de 6 dígitos a<br>
        <strong>{{ store.maskedEmail }}</strong>
      </p>
    </div>

    <CommonAlertMessage
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      @dismiss="errorMessage = ''"
    />

    <CommonAlertMessage
      v-if="successMessage && !store.emailVerified"
      type="success"
      :message="successMessage"
      @dismiss="successMessage = ''"
    />

    <div v-if="store.emailVerified" class="verified-message text-center mb-4">
      <div class="verified-icon mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="text-success fw-bold">Email verificado</p>
    </div>

    <div v-else class="otp-section">
      <div class="mb-4">
        <label class="form-label text-center d-block mb-3">Ingresa el código</label>
        <RegistrationV2OtpInput
          ref="otpInputRef"
          v-model="otpCode"
          :disabled="store.isLoading"
          :error="errorMessage ? ' ' : ''"
          @complete="verifyCode"
        />
      </div>

      <div class="text-center mb-4">
        <button
          type="button"
          class="btn btn-link text-decoration-none"
          :disabled="resendCooldown > 0 || store.isLoading"
          @click="resendCode"
        >
          <span v-if="resendCooldown > 0">
            Reenviar código en {{ resendCooldown }}s
          </span>
          <span v-else>
            ¿No recibiste el código? <strong>Reenviar</strong>
          </span>
        </button>
      </div>

      <div class="d-grid">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          :disabled="otpCode.length !== 6 || store.isLoading"
          @click="verifyCode(otpCode)"
        >
          <span
            v-if="store.isLoading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          Verificar código
        </button>
      </div>

      <div class="email-tips mt-4 p-3 bg-light rounded">
        <p class="small text-muted mb-2">
          <strong>¿No encuentras el correo?</strong>
        </p>
        <ul class="small text-muted mb-0 ps-3">
          <li>Revisa tu carpeta de spam o correo no deseado</li>
          <li>Verifica que ingresaste el correo correcto</li>
          <li>El código puede tardar unos minutos en llegar</li>
        </ul>
      </div>
    </div>

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
.verify-email {
  max-width: 400px;
  margin: 0 auto;
}

.verify-icon {
  display: inline-block;
}

.verified-message {
  padding: 2rem;
  background-color: rgba(40, 167, 69, 0.1);
  border-radius: var(--rounded-md, 12px);
}

.verified-icon {
  display: inline-block;
}

.email-tips {
  border: 1px solid var(--border-light, #dee2e6);
}
</style>
