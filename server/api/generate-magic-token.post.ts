export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.codigo) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El campo codigo es requerido',
        data: { error: 1, message: 'El campo codigo es requerido' }
      })
    }

    const data = await $fetch<{ error: number; data?: { token: string; expires_in: number } }>(
      'https://api2.mitienda.pe/auth/generate-magic-token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { codigo: body.codigo }
      }
    )

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en generate-magic-token:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { error: 1, message: 'Error interno del servidor' }
    })
  }
})
