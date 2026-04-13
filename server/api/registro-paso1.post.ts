export default defineEventHandler(async (event) => {
  let emailForLog = 'N/A'
  const clientIp = getRequestHeader(event, 'x-forwarded-for') || getRequestHeader(event, 'x-real-ip') || 'unknown'

  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    emailForLog = body.email || 'N/A'

    // Log registration attempt for audit/fraud detection
    console.log(`[REGISTRO] Intento: email=${emailForLog} ip=${clientIp} ts=${new Date().toISOString()}`)

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

    // Separar nombre y apellido (la API requiere ambos)
    const nameParts = body.name.trim().split(/\s+/)
    const firstName = nameParts[0]
    const surname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : firstName

    // Llamar a la API de miTienda
    const data = await $fetch<Record<string, unknown>>('https://api2.mitienda.pe/api/v1/planes/planprueba14dias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': config.apiToken
      },
      body: {
        name: firstName,
        surname: surname,
        email: body.email.trim().toLowerCase(),
        phone: body.phone,
        client_password: body.client_password,
        origin_store: body.origin_store || 1
      }
    })

    console.log(`[REGISTRO] Resultado: email=${emailForLog} response=`, JSON.stringify(data), `ip=${clientIp}`)
    return data
  } catch (error: any) {
    // Re-throw H3/Nitro errors (from createError above)
    if (error.statusCode && error.data) throw error

    // Extract error message from external API response
    const apiMessage = error.data?.message || error.data?.msn || error.message || 'Error al crear la cuenta. Intenta nuevamente.'
    console.error(`[REGISTRO] Error: email=${emailForLog} ip=${clientIp}`, apiMessage)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: 'Error en registro',
      data: { error: 1, message: apiMessage }
    })
  }
})
