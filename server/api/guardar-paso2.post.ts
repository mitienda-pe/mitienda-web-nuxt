const ALLOWED_CATEGORIAS = [
  'Moda y Accesorios',
  'Belleza y Cuidado Personal',
  'Hogar y Decoración',
  'Tecnología y Electrónica',
  'Deportes y Fitness',
  'Alimentación y Bebidas',
  'Servicios Profesionales',
  'Otros'
]

const ALLOWED_PAISES = ['PE', 'EC', 'CO']

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

    // Validar categoría contra lista permitida
    if (!ALLOWED_CATEGORIAS.includes(body.categoria)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Categoría inválida',
        data: { error: 1, message: 'La categoría seleccionada no es válida' }
      })
    }

    // Validar país contra lista permitida
    if (!ALLOWED_PAISES.includes(body.pais)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'País inválido',
        data: { error: 1, message: 'El país seleccionado no es válido' }
      })
    }

    // Validar formato de subdominio (3-20 chars, lowercase alphanumeric + hyphens, no leading/trailing hyphens)
    if (!/^[a-z0-9][a-z0-9-]{1,18}[a-z0-9]$/.test(body.subdominio)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Subdominio inválido',
        data: { error: 1, message: 'El subdominio debe tener entre 3 y 20 caracteres, solo letras minúsculas, números y guiones' }
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
    const domainMap: Record<string, string> = {
      PE: 'mitienda.pe',
      EC: 'tiendabox.ec',
      CO: 'tiendabox.co',
    }
    const domain = domainMap[body.pais] || 'mitienda.pe'

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
