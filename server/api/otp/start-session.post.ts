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

    // Llamar a MTServicios para iniciar sesión OTP
    const data = await $fetch(`${mtserviciosUrl}/api/otp/start-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.mtserviciosApiKey}`
      },
      body: {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono
      }
    })

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en otp-start-session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { success: false, error: 'Error interno del servidor' }
    })
  }
})
