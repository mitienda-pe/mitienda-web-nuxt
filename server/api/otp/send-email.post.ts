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

    // Llamar a MTServicios para enviar código por Email
    const data = await $fetch(`${mtserviciosUrl}/api/otp/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.mtserviciosApiKey}`
      },
      body: {
        session_id: body.session_id,
        email: body.email,
        nombre: body.nombre || ''
      }
    })

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en otp-send-email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { success: false, error: 'Error interno del servidor' }
    })
  }
})
