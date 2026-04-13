export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    if (!body.email) {
      throw createError({
        statusCode: 400,
        data: { error: 1, message: 'Email requerido' }
      })
    }

    // Check if email has an active trial via the API
    const data = await $fetch<Record<string, unknown>>(
      'https://api2.mitienda.pe/api/v1/planes/verificar-email-trial',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': config.apiToken
        },
        body: { email: body.email.trim().toLowerCase() }
      }
    )

    return data
  } catch (error: any) {
    if (error.statusCode && error.data) throw error

    const message = error.data?.message || error.message || 'Error al verificar email'
    throw createError({
      statusCode: error.statusCode || 500,
      data: { error: 1, message }
    })
  }
})
