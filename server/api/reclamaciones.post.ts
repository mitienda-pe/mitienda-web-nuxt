/**
 * POST /api/reclamaciones
 *
 * Proxies the Libro de Reclamaciones form to the CI4 API
 * (POST /api/v1/libroreclamaciones/registrar), remapping the legacy
 * `libroreclamacion_*` field names to the new snake_case contract and
 * returning the shape the Vue page expects ({ hash, error }).
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

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
      'libroreclamacion_detallereclamacion',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `Campo requerido: ${field}`,
          data: { error: `Campo requerido: ${field}` },
        })
      }
    }

    // Convert the date to ISO (YYYY-MM-DD). The form sends
    // toLocaleDateString('es-PE') which is DD/MM/YYYY — not a safe format
    // for MySQL DATE columns.
    let isoDate: string
    const rawDate = String(body.libroreclamacion_fecha || '')
    const ddmmyyyy = rawDate.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
    if (ddmmyyyy) {
      const [, dd, mm, yyyy] = ddmmyyyy
      isoDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
    } else {
      isoDate = new Date().toISOString().slice(0, 10)
    }

    const data = await $fetch<{
      sw_error?: number
      hash?: string
      codigo?: string
      message?: string
    }>('https://api2.mitienda.pe/api/v1/libroreclamaciones/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': config.apiToken,
      },
      body: {
        date: isoDate,
        names: body.libroreclamacion_nombre,
        address: body.libroreclamacion_domicilio,
        doc_type: Number(body.libroreclamacion_tipodocumento),
        doc_number: String(body.libroreclamacion_numero),
        email: body.libroreclamacion_email,
        phone_number: String(body.libroreclamacion_telefono),
        identification_type: Number(body.libroreclamacion_tipobien),
        identification_details: body.libroreclamacion_descripcionbien,
        claim_type: Number(body.libroreclamacion_tiporeclamacion),
        claim_details: body.libroreclamacion_detallereclamacion,
        terms: 1,
      },
    })

    if (data?.hash) {
      return {
        hash: data.hash,
        codigo: data.codigo,
      }
    }

    return {
      error: data?.message || 'No se pudo registrar el reclamo',
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    const apiMessage =
      error?.data?.messages?.error ||
      error?.data?.message ||
      error?.message ||
      'Error interno del servidor'

    console.error('Error en reclamaciones:', apiMessage)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno del servidor',
      data: { error: apiMessage },
    })
  }
})
