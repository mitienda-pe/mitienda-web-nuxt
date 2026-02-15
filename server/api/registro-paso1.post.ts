export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    // Validar campos requeridos
    if (!body.name || !body.email || !body.phone || !body.client_password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { error: 1, message: 'Faltan campos requeridos' }
      })
    }

    // Llamar a la API de miTienda
    const data = await $fetch('https://api.mitienda.pe/v1/planes/planprueba14dias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': config.apiToken
      },
      body: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        client_password: body.client_password,
        origin_store: body.origin_store || 1
      }
    })

    return data
  } catch (error: any) {
    // Re-throw if it's already a createError
    if (error.statusCode) throw error

    console.error('Error en registro-paso1:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { error: 1, message: 'Error interno del servidor' }
    })
  }
})
