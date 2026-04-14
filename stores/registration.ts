export interface Paso1Data {
  nombre: string
  telefono: string
  correo: string
  password: string
  terminoscheck: boolean
}

export interface Paso2Data {
  nombre_tienda: string
  subdominio: string
  categoria: string
  pais: string
  descripcion: string
}

export interface DatosPaso2 {
  nombre_tienda: string
  subdominio: string
  categoria: string
  pais: string
  descripcion: string
  tienda_url: string
}

export const useRegistrationStore = defineStore('registration', () => {
  // Country context
  const { country } = useCountry()

  // State
  const codigo = ref<string | null>(null)
  const magicToken = ref<string | null>(null)
  const magicTiendaId = ref<number | null>(null)
  const datosPaso2 = ref<DatosPaso2 | null>(null)
  const currentStep = ref<1 | 2 | 3>(1)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const tiendaUrl = computed(() => {
    if (datosPaso2.value?.tienda_url) {
      return datosPaso2.value.tienda_url
    }
    if (datosPaso2.value?.subdominio) {
      return `https://${datosPaso2.value.subdominio}.${country.value.domain}`
    }
    return null
  })

  const panelUrl = computed(() => {
    if (magicToken.value) {
      let url = `${country.value.adminUrl}/auth/magic?token=${magicToken.value}`
      if (magicTiendaId.value) {
        url += `&tienda_id=${magicTiendaId.value}`
      }
      return url
    }
    return `${country.value.adminUrl}/login`
  })

  // Actions
  async function submitPaso1(datos: Paso1Data): Promise<{ success: boolean; codigo?: string; error?: string }> {
    isLoading.value = true
    error.value = null

    try {
      // origin_store: 1=PE, 2=EC, 3=CO
      const originStoreMap: Record<string, number> = { PE: 1, EC: 2, CO: 3 }
      const originStore = originStoreMap[country.value.code] ?? 1

      const result = await $fetch<Record<string, unknown>>('/api/registro-paso1', {
        method: 'POST',
        body: {
          name: datos.nombre,
          email: datos.correo,
          phone: datos.telefono,
          client_password: datos.password,
          origin_store: originStore
        }
      })

      // API returns error as string '0' or '1', use loose equality
      if (result.error == 0 || result.response === 'success') {
        codigo.value = result.cod as string
        urlPanelExito.value = `https://panel.mitienda.host/exito/index/${result.cod}`
        currentStep.value = 2
        return { success: true, codigo: result.cod as string }
      } else {
        // Strip HTML tags from error message (backend may return HTML)
        const rawMsg = (result.message || result.msn || 'Error en el registro') as string
        const errorMsg = rawMsg.replace(/<[^>]*>/g, '')
        error.value = errorMsg
        return { success: false, error: errorMsg }
      }
    } catch (e: any) {
      const rawMsg = e?.data?.data?.message || e?.data?.message || (e instanceof Error ? e.message : 'Error de conexión')
      const errorMsg = typeof rawMsg === 'string' ? rawMsg.replace(/<[^>]*>/g, '') : rawMsg
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  async function validarSubdominio(subdominio: string): Promise<{ disponible: boolean; mensaje?: string }> {
    try {
      const result = await $fetch<Record<string, unknown>>('/api/validar-subdominio', {
        method: 'POST',
        body: { subdominio }
      })
      return {
        disponible: result.disponible === true || result.disponible === 1,
        mensaje: (result.mensaje || result.message) as string | undefined
      }
    } catch {
      return { disponible: false, mensaje: 'Error al validar subdominio' }
    }
  }

  async function submitPaso2(datos: Paso2Data, codigoRegistro: string): Promise<{ success: boolean; error?: string }> {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/guardar-paso2', {
        method: 'POST',
        body: {
          codigo: codigoRegistro,
          nombre_tienda: datos.nombre_tienda,
          subdominio: datos.subdominio,
          categoria: datos.categoria,
          pais: datos.pais,
          descripcion: datos.descripcion
        }
      })

      if (result.error === 0 || !result.error) {
        const tienda = result.tienda as { url?: string } | undefined
        datosPaso2.value = {
          ...datos,
          tienda_url: tienda?.url || `https://${datos.subdominio}.${country.value.domain}`
        }
        currentStep.value = 3

        // Generate magic token for auto-login (non-blocking)
        if (codigo.value) {
          generateMagicToken(codigo.value)
        }

        return { success: true }
      } else {
        const errorMsg = (result.message || 'Error al guardar configuración') as string
        error.value = errorMsg
        return { success: false, error: errorMsg }
      }
    } catch (e: any) {
      const errorMsg = e?.data?.data?.message || e?.data?.message || (e instanceof Error ? e.message : 'Error de conexión')
      error.value = errorMsg
      return { success: false, error: errorMsg }
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
          body: { codigo: registroCodigo },
          signal: AbortSignal.timeout(15000)
        }
      )
      if (result.error === 0 && result.data?.token) {
        magicToken.value = result.data.token
        magicTiendaId.value = (result.data as any).tienda_id || null
      }
    } catch {
      // Non-fatal: user can still login manually
    }
  }

  function setCodigo(newCodigo: string) {
    codigo.value = newCodigo
  }

  function clearState() {
    codigo.value = null
    magicToken.value = null
    datosPaso2.value = null
    currentStep.value = 1
    isLoading.value = false
    error.value = null
  }

  return {
    codigo,
    magicToken,
    datosPaso2,
    currentStep,
    isLoading,
    error,
    tiendaUrl,
    panelUrl,
    submitPaso1,
    submitPaso2,
    validarSubdominio,
    setCodigo,
    clearState
  }
})
