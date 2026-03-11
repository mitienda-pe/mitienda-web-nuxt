export interface UserData {
  nombre: string
  email: string
  telefono: string
  countryCode: string
}

export interface StoreData {
  nombre_tienda: string
  subdominio: string
  categoria: string
  pais: string
  descripcion: string
}

export interface SessionStatus {
  session_id: string
  whatsapp_verified: boolean
  email_verified: boolean
  all_verified: boolean
}

export type RegistrationStep = 1 | 2 | 3 | 4 | 5 | 6

export const useRegistrationV2Store = defineStore('registrationV2', () => {
  // Country context
  const { country, countryCode: currentCountry } = useCountry()

  // State
  const sessionId = ref<string | null>(null)
  const currentStep = ref<RegistrationStep>(1)
  const userData = ref<UserData>({
    nombre: '',
    email: '',
    telefono: '',
    countryCode: country.value.phoneCode
  })
  const password = ref('')
  const storeData = ref<StoreData>({
    nombre_tienda: '',
    subdominio: '',
    categoria: '',
    pais: currentCountry.value,
    descripcion: ''
  })
  const whatsappVerified = ref(false)
  const emailVerified = ref(false)
  const codigo = ref<string | null>(null)
  const tiendaUrl = ref<string | null>(null)
  const panelUrl = ref<string | null>(null)
  const magicToken = ref<string | null>(null)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const allVerified = computed(() => whatsappVerified.value && emailVerified.value)

  const maskedPhone = computed(() => {
    const phone = userData.value.telefono
    if (phone.length <= 4) return phone
    return '*'.repeat(phone.length - 4) + phone.slice(-4)
  })

  const maskedEmail = computed(() => {
    const email = userData.value.email
    const parts = email.split('@')
    if (parts.length !== 2) return email
    const name = parts[0] || ''
    const domain = parts[1] || ''
    const maskedName = name.slice(0, 2) + '*'.repeat(Math.max(0, name.length - 2))
    return maskedName + '@' + domain
  })

  const stepLabels = computed(() => [
    { number: 1, label: 'Tus datos' },
    { number: 2, label: 'WhatsApp' },
    { number: 3, label: 'Email' },
    { number: 4, label: 'Contraseña' },
    { number: 5, label: 'Tu tienda' },
    { number: 6, label: '¡Listo!' }
  ])

  // Actions
  async function startSession(): Promise<{ success: boolean; error?: string }> {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/otp/start-session', {
        method: 'POST',
        body: {
          nombre: userData.value.nombre,
          email: userData.value.email,
          telefono: userData.value.telefono
        }
      })

      if (result.success && result.session_id) {
        sessionId.value = result.session_id as string
        return { success: true }
      } else {
        error.value = (result.error as string) || 'Error al iniciar sesión'
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function sendWhatsAppCode(): Promise<{ success: boolean; error?: string }> {
    if (!sessionId.value) {
      return { success: false, error: 'Sesión no iniciada' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/otp/send-whatsapp', {
        method: 'POST',
        body: {
          session_id: sessionId.value,
          telefono: userData.value.telefono,
          country_code: userData.value.countryCode
        }
      })

      if (result.success) {
        return { success: true }
      } else {
        error.value = (result.error as string) || 'Error al enviar código'
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function sendEmailCode(): Promise<{ success: boolean; error?: string }> {
    if (!sessionId.value) {
      return { success: false, error: 'Sesión no iniciada' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/otp/send-email', {
        method: 'POST',
        body: {
          session_id: sessionId.value,
          email: userData.value.email,
          nombre: userData.value.nombre
        }
      })

      if (result.success) {
        return { success: true }
      } else {
        error.value = (result.error as string) || 'Error al enviar código'
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function verifyCode(type: 'whatsapp' | 'email', code: string): Promise<{ success: boolean; error?: string }> {
    if (!sessionId.value) {
      return { success: false, error: 'Sesión no iniciada' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/otp/verify', {
        method: 'POST',
        body: {
          session_id: sessionId.value,
          type,
          code
        }
      })

      if (result.success) {
        if (type === 'whatsapp') {
          whatsappVerified.value = true
        } else {
          emailVerified.value = true
        }
        return { success: true }
      } else {
        error.value = (result.error as string) || 'Código incorrecto'
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function createAccount(): Promise<{ success: boolean; codigo?: string; error?: string }> {
    if (!allVerified.value) {
      return { success: false, error: 'Verificaciones pendientes' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/registro-paso1', {
        method: 'POST',
        body: {
          name: userData.value.nombre,
          email: userData.value.email,
          phone: userData.value.telefono,
          client_password: password.value,
          origin_store: 1,
          verified: true
        }
      })

      if (result.error === 0 || result.response === 'success') {
        codigo.value = result.cod as string
        return { success: true, codigo: result.cod as string }
      } else {
        error.value = ((result.message || result.msn || 'Error en el registro') as string)
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function saveStoreConfig(): Promise<{ success: boolean; error?: string }> {
    if (!codigo.value) {
      return { success: false, error: 'Código de registro no encontrado' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/guardar-paso2', {
        method: 'POST',
        body: {
          codigo: codigo.value,
          nombre_tienda: storeData.value.nombre_tienda,
          subdominio: storeData.value.subdominio,
          categoria: storeData.value.categoria,
          pais: storeData.value.pais,
          descripcion: storeData.value.descripcion
        }
      })

      if (result.error === 0 || !result.error) {
        const tienda = result.tienda as { url?: string } | undefined
        tiendaUrl.value = tienda?.url || `https://${storeData.value.subdominio}.${country.value.domain}`

        // Generate magic token for auto-login into the new backoffice
        if (codigo.value) {
          await generateMagicToken(codigo.value)
        }

        currentStep.value = 6
        return { success: true }
      } else {
        error.value = (result.message as string) || 'Error al guardar configuración'
        return { success: false, error: error.value ?? undefined }
      }
    } catch {
      error.value = 'Error de conexión'
      return { success: false, error: error.value ?? undefined }
    } finally {
      isLoading.value = false
    }
  }

  async function generateMagicToken(registroCodigo: string): Promise<void> {
    try {
      const result = await $fetch<{ error: number; data?: { token: string } }>(
        '/api/generate-magic-token',
        {
          method: 'POST',
          body: { codigo: registroCodigo }
        }
      )
      if (result.error === 0 && result.data?.token) {
        magicToken.value = result.data.token
        panelUrl.value = `${country.value.adminUrl}/auth/magic?token=${result.data.token}`
      }
    } catch {
      // Non-fatal: fallback panelUrl so the user is never left without a link
      panelUrl.value = `${country.value.adminUrl}/login`
    }
  }

  async function validateSubdomain(subdomain: string): Promise<{ disponible: boolean; mensaje?: string }> {
    try {
      const result = await $fetch<Record<string, unknown>>('/api/validar-subdominio', {
        method: 'POST',
        body: { subdominio: subdomain }
      })
      return {
        disponible: result.disponible === true || result.disponible === 1,
        mensaje: (result.mensaje || result.message) as string | undefined
      }
    } catch {
      return { disponible: false, mensaje: 'Error al validar subdominio' }
    }
  }

  function setStep(step: RegistrationStep) {
    currentStep.value = step
  }

  function nextStep() {
    if (currentStep.value < 6) {
      currentStep.value = (currentStep.value + 1) as RegistrationStep
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as RegistrationStep
    }
  }

  function clearError() {
    error.value = null
  }

  function reset() {
    sessionId.value = null
    currentStep.value = 1
    userData.value = { nombre: '', email: '', telefono: '', countryCode: country.value.phoneCode }
    password.value = ''
    storeData.value = { nombre_tienda: '', subdominio: '', categoria: '', pais: currentCountry.value, descripcion: '' }
    whatsappVerified.value = false
    emailVerified.value = false
    codigo.value = null
    tiendaUrl.value = null
    panelUrl.value = null
    magicToken.value = null
    isLoading.value = false
    error.value = null
  }

  return {
    sessionId,
    currentStep,
    userData,
    password,
    storeData,
    whatsappVerified,
    emailVerified,
    codigo,
    tiendaUrl,
    panelUrl,
    magicToken,
    isLoading,
    error,
    allVerified,
    maskedPhone,
    maskedEmail,
    stepLabels,
    startSession,
    sendWhatsAppCode,
    sendEmailCode,
    verifyCode,
    createAccount,
    saveStoreConfig,
    generateMagicToken,
    validateSubdomain,
    setStep,
    nextStep,
    previousStep,
    clearError,
    reset
  }
})
