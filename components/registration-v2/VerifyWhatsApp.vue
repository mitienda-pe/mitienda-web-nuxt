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
  const result = await store.sendWhatsAppCode()
  if (result.success) {
    successMessage.value = 'Código enviado por WhatsApp'
    startResendCooldown()
  } else {
    errorMessage.value = result.error || 'Error al enviar código'
  }
}

async function verifyCode(code: string) {
  if (code.length !== 6) return

  errorMessage.value = ''
  successMessage.value = ''

  const result = await store.verifyCode('whatsapp', code)

  if (result.success) {
    successMessage.value = 'WhatsApp verificado correctamente'
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
  <div class="verify-whatsapp">
    <div class="verify-header text-center mb-4">
      <div class="verify-icon mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
      <h3 class="mb-2">Verifica tu WhatsApp</h3>
      <p class="text-muted">
        Enviamos un código de 6 dígitos al número<br>
        <strong>{{ store.maskedPhone }}</strong>
      </p>
    </div>

    <CommonAlertMessage
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      @dismiss="errorMessage = ''"
    />

    <CommonAlertMessage
      v-if="successMessage && !store.whatsappVerified"
      type="success"
      :message="successMessage"
      @dismiss="successMessage = ''"
    />

    <div v-if="store.whatsappVerified" class="verified-message text-center mb-4">
      <div class="verified-icon mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="text-success fw-bold">WhatsApp verificado</p>
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
.verify-whatsapp {
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
</style>
