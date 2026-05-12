export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const mtserviciosUrl = config.mtserviciosUrl || 'https://servicios.mitienda.pe'

    // Validar campos requeridos
    if (!body.nombre || !body.email || !body.telefono) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { success: false, error: 'Faltan campos requeridos' }
      })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Formato de email inválido',
        data: { success: false, error: 'El formato del email no es válido' }
      })
    }

    // Validar nombre (min 2 chars)
    if (typeof body.nombre !== 'string' || body.nombre.trim().length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nombre inválido',
        data: { success: false, error: 'El nombre debe tener al menos 2 caracteres' }
      })
    }

    // Validar teléfono (solo dígitos)
    if (!/^\d+$/.test(body.telefono)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Teléfono inválido',
        data: { success: false, error: 'El teléfono debe contener solo dígitos' }
      })
    }

    // Llamar a MTServicios para iniciar sesión OTP
    let data: any
    try {
      data = await $fetch(`${mtserviciosUrl}/api/otp/start-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.mtserviciosApiKey}`
        },
        body: {
          nombre: body.nombre.trim(),
          email: body.email.trim().toLowerCase(),
          telefono: body.telefono
        }
      })
    } catch (fetchError: any) {
      const status = fetchError.status || fetchError.statusCode
      console.error('[otp-start-session] MTServicios fetch error', {
        status,
        message: fetchError.message,
        data: fetchError.data,
        url: `${mtserviciosUrl}/api/otp/start-session`,
        hasApiKey: !!config.mtserviciosApiKey
      })
      if (status === 401) {
        throw createError({
          statusCode: 502,
          statusMessage: 'Error de autenticación con el servicio de verificación',
          data: { success: false, error: 'Error de comunicación con el servicio. Intente nuevamente.' }
        })
      }
      throw fetchError
    }

    if (!data?.success || !data?.session_id) {
      console.error('[otp-start-session] MTServicios respondió con shape inesperado', { data })
    }

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en otp-start-session:', error)
    const isTimeout = error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED'
    throw createError({
      statusCode: isTimeout ? 504 : 500,
      statusMessage: isTimeout ? 'Tiempo de espera agotado' : 'Error interno del servidor',
      data: { success: false, error: isTimeout ? 'El servicio no responde. Intenta nuevamente.' : 'Error al iniciar la sesión. Intenta nuevamente.' }
    })
  }
})
