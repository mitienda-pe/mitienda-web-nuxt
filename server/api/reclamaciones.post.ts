export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const apiUrl = config.apiUrlLegacy || 'https://api.mitienda.pe/v1'

    // Validate required fields
    const requiredFields = [
      'libroreclamacion_nombre',
      'libroreclamacion_domicilio',
      'libroreclamacion_tipodocumento',
      'libroreclamacion_numero',
      'libroreclamacion_email',
      'libroreclamacion_telefono',
      'libroreclamacion_tipobien',
      'libroreclamacion_descripcionbien',
      'libroreclamacion_tiporeclamacion',
      'libroreclamacion_detallereclamacion'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `Campo requerido: ${field}`,
          data: { error: `Campo requerido: ${field}` }
        })
      }
    }

    // Call the API
    const data = await $fetch(`${apiUrl}/libroreclamaciones/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': config.apiToken
      },
      body: {
        libroreclamacion_fecha: body.libroreclamacion_fecha || new Date().toLocaleDateString('es-PE'),
        libroreclamacion_nombre: body.libroreclamacion_nombre,
        libroreclamacion_domicilio: body.libroreclamacion_domicilio,
        libroreclamacion_tipodocumento: body.libroreclamacion_tipodocumento,
        libroreclamacion_numero: body.libroreclamacion_numero,
        libroreclamacion_email: body.libroreclamacion_email,
        libroreclamacion_telefono: body.libroreclamacion_telefono,
        libroreclamacion_tipobien: body.libroreclamacion_tipobien,
        libroreclamacion_descripcionbien: body.libroreclamacion_descripcionbien,
        libroreclamacion_tiporeclamacion: body.libroreclamacion_tiporeclamacion,
        libroreclamacion_detallereclamacion: body.libroreclamacion_detallereclamacion,
        libroreclamacion_accionadoptada: body.libroreclamacion_accionadoptada || ''
      }
    })

    return data
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en reclamaciones:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { error: 'Error interno del servidor' }
    })
  }
})
