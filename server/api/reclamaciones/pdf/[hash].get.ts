/**
 * GET /api/reclamaciones/pdf/:hash
 *
 * Sirve el PDF de una reclamación registrada. El CI4 API
 * (GET /api/v1/libroreclamaciones/descargapdf/:hash) lo devuelve en base64
 * dentro de un JSON ({ pdf_content, filename }), así que se decodifica acá para
 * que el botón de la página pueda abrirlo con window.open.
 *
 * Antes el botón apuntaba al API CI3 (api.mitienda.pe), que responde 403.
 */
export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash') || ''

  // El hash es un md5: cualquier otra cosa no llega al API.
  if (!/^[a-f0-9]{32}$/i.test(hash)) {
    throw createError({ statusCode: 400, statusMessage: 'Código inválido' })
  }

  try {
    const data = await $fetch<{
      sw_error?: number
      pdf_content?: string
      filename?: string
    }>(`https://api2.mitienda.pe/api/v1/libroreclamaciones/descargapdf/${hash}`)

    if (!data?.pdf_content) {
      throw createError({ statusCode: 404, statusMessage: 'Reclamo no existe' })
    }

    const filename = (data.filename || 'reclamacion.pdf').replace(/[^\w.-]/g, '_')

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="${filename}"`)

    return Uint8Array.from(atob(data.pdf_content), (c) => c.charCodeAt(0))
  } catch (error: any) {
    if (error.statusCode === 404 || error?.response?.status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Reclamo no existe' })
    }
    if (error.statusCode) throw error

    console.error('Error al descargar el PDF de la reclamación:', error?.message)
    throw createError({ statusCode: 500, statusMessage: 'Error interno del servidor' })
  }
})
