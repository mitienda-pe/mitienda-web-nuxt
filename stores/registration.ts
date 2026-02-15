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
  // State
  const codigo = ref<string | null>(null)
  const urlPanelExito = ref<string | null>(null)
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
      return `https://${datosPaso2.value.subdominio}.mitienda.pe`
    }
    return null
  })

  const panelUrl = computed(() => {
    if (urlPanelExito.value) {
      return urlPanelExito.value
    }
    if (codigo.value) {
      return `https://panel.mitienda.host/exito/index/${codigo.value}`
    }
    return null
  })

  // Actions
  async function submitPaso1(datos: Paso1Data): Promise<{ success: boolean; codigo?: string; error?: string }> {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<Record<string, unknown>>('/api/registro-paso1', {
        method: 'POST',
        body: {
          name: datos.nombre,
          email: datos.correo,
          phone: datos.telefono,
          client_password: datos.password,
          origin_store: 1
        }
      })

      if (result.error === 0 || result.response === 'success') {
        codigo.value = result.cod as string
        urlPanelExito.value = `https://panel.mitienda.host/exito/index/${result.cod}`
        currentStep.value = 2
        return { success: true, codigo: result.cod as string }
      } else {
        const errorMsg = (result.message || result.msn || 'Error en el registro') as string
        error.value = errorMsg
        return { success: false, error: errorMsg }
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Error de conexión'
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
          tienda_url: tienda?.url || `https://${datos.subdominio}.mitienda.pe`
        }
        currentStep.value = 3
        return { success: true }
      } else {
        const errorMsg = (result.message || 'Error al guardar configuración') as string
        error.value = errorMsg
        return { success: false, error: errorMsg }
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Error de conexión'
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  function setCodigo(newCodigo: string) {
    codigo.value = newCodigo
  }

  function clearState() {
    codigo.value = null
    urlPanelExito.value = null
    datosPaso2.value = null
    currentStep.value = 1
    isLoading.value = false
    error.value = null
  }

  return {
    codigo,
    urlPanelExito,
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
