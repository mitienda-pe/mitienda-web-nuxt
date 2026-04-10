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

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Formato de email inválido',
        data: { error: 1, message: 'El formato del email no es válido' }
      })
    }

    // Validar password (min 8 chars)
    if (typeof body.client_password !== 'string' || body.client_password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Contraseña muy corta',
        data: { error: 1, message: 'La contraseña debe tener al menos 8 caracteres' }
      })
    }

    // Validar nombre (min 2 chars)
    if (typeof body.name !== 'string' || body.name.trim().length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nombre inválido',
        data: { error: 1, message: 'El nombre debe tener al menos 2 caracteres' }
      })
    }

    // Validar teléfono (solo dígitos, min 9 chars)
    if (typeof body.phone !== 'string' || !/^\d{9,}$/.test(body.phone)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Teléfono inválido',
        data: { error: 1, message: 'El teléfono debe contener solo dígitos y tener al menos 9 caracteres' }
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
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
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
