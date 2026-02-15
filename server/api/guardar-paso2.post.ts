export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    // Validar campos requeridos
    if (!body.codigo || !body.nombre_tienda || !body.subdominio || !body.categoria || !body.pais) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan campos requeridos',
        data: { error: 1, message: 'Faltan campos requeridos' }
      })
    }

    // Llamar a la API de miTienda (API2)
    const data: any = await $fetch(
      `https://api2.mitienda.pe/api/v1/tienda/actualizarconfiguracion/${encodeURIComponent(body.codigo)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': config.apiToken
        },
        body: {
          nombre_tienda: body.nombre_tienda,
          subdominio: body.subdominio,
          categoria: body.categoria,
          pais: body.pais,
          descripcion: body.descripcion || ''
        }
      }
    )

    // Determinar el dominio basado en el país
    let domain = 'mitienda.pe'
    if (body.pais === 'EC') {
      domain = 'tiendabox.ec'
    }

    // Construir URL de la tienda
    const tiendaUrl = data.tienda?.url || `https://${body.subdominio}.${domain}`

    return {
      error: data.error ?? 0,
      message: data.message || 'Configuración guardada',
      tienda: {
        url: tiendaUrl,
        ...data.tienda
      }
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Error en guardar-paso2:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { error: 1, message: 'Error interno del servidor' }
    })
  }
})
