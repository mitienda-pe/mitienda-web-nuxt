import { checkRateLimit } from '~/server/utils/rateLimiter'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const mtserviciosUrl = config.mtserviciosUrl || 'https://servicios.mitienda.pe'

    // Validar campos requeridos
    if (!body.session_id || !body.type || !body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { success: false, error: 'Faltan campos requeridos' }
      })
    }

    // Validar tipo
    if (!['whatsapp', 'email'].includes(body.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tipo de verificación inválido',
        data: { success: false, error: 'Tipo de verificación inválido' }
      })
    }

    // Rate limiting: max 5 verification attempts per 10 minutes per session
    const rateLimitKey = `otp-verify:${body.session_id}`
    const { allowed, remaining } = checkRateLimit(rateLimitKey, 5, 600000)
    if (!allowed) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Demasiados intentos',
        data: { success: false, error: 'Has excedido el número máximo de intentos. Espera unos minutos.' }
      })
    }

    // Llamar a MTServicios para verificar código
    let data: any
    try {
      data = await $fetch(`${mtserviciosUrl}/api/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.mtserviciosApiKey}`
        },
        body: {
          session_id: body.session_id,
          type: body.type,
          code: body.code
        }
      })
    } catch (fetchError: any) {
      // Check for auth failure from upstream API
      if (fetchError.status === 401 || fetchError.statusCode === 401) {
        console.error('Error de autenticación con MTServicios en otp-verify')
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

    console.error('Error en otp-verify:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { success: false, error: 'Error interno del servidor' }
    })
  }
})
