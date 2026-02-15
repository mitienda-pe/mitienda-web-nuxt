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

    // Llamar a MTServicios para verificar código
    const data = await $fetch(`${mtserviciosUrl}/api/otp/verify`, {
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
