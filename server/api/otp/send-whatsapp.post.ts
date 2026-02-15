export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const mtserviciosUrl = config.mtserviciosUrl || 'https://servicios.mitienda.pe'

    // Validar campos requeridos
    if (!body.session_id || !body.telefono) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { success: false, error: 'Faltan campos requeridos' }
      })
    }

    // Llamar a MTServicios para enviar código por WhatsApp
    const data = await $fetch(`${mtserviciosUrl}/api/otp/send-whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.mtserviciosApiKey}`
      },
      body: {
        session_id: body.session_id,
        telefono: body.telefono,
        country_code: body.country_code || '+51'
      }
    })

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en otp-send-whatsapp:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { success: false, error: 'Error interno del servidor' }
    })
  }
})
