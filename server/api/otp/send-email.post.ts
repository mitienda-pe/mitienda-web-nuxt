import { checkRateLimit } from '~/server/utils/rateLimiter'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const mtserviciosUrl = config.mtserviciosUrl || 'https://servicios.mitienda.pe'

    // Validar campos requeridos
    if (!body.session_id || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { success: false, error: 'Faltan campos requeridos' }
      })
    }

    // Rate limiting: max 5 sends per hour per session
    const rateLimitKey = `otp-send:${body.session_id}`
    const { allowed } = checkRateLimit(rateLimitKey, 5, 3600000)
    if (!allowed) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Demasiados intentos',
        data: { success: false, error: 'Has excedido el número máximo de envíos. Espera unos minutos.' }
      })
    }

    // Llamar a MTServicios para enviar código por Email
    let data: any
    try {
      data = await $fetch(`${mtserviciosUrl}/api/otp/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.mtserviciosApiKey}`
        },
        body: {
          session_id: body.session_id,
          email: body.email,
          nombre: body.nombre || '',
          country: (body.country || config.public?.defaultCountry || 'PE').toString().toUpperCase()
        }
      })
    } catch (fetchError: any) {
      if (fetchError.status === 401 || fetchError.statusCode === 401) {
        console.error('Error de autenticación con MTServicios en otp-send-email')
        throw createError({
          statusCode: 502,
          statusMessage: 'Error de autenticación con el servicio de verificación',
          data: { success: false, error: 'Error de comunicación con el servicio. Intente nuevamente.' }
        })
      }
      throw fetchError
    }

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en otp-send-email:', error)
    const isTimeout = error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED'
    throw createError({
      statusCode: isTimeout ? 504 : 500,
      statusMessage: isTimeout ? 'Tiempo de espera agotado' : 'Error interno del servidor',
      data: { success: false, error: isTimeout ? 'El servicio no responde. Intenta nuevamente.' : 'Error al enviar el código por email. Intenta nuevamente.' }
    })
  }
})
