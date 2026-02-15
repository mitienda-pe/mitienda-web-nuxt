// Subdominios reservados
const RESERVED_SUBDOMAINS = [
  'www', 'api', 'admin', 'mail', 'ftp',
  'test', 'demo', 'panel', 'api2', 'nuevo',
  'app', 'help', 'support', 'blog', 'shop'
]

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const subdominio = body.subdominio || ''

    // Validar formato básico
    if (!subdominio || subdominio.length < 3 || subdominio.length > 20) {
      return {
        disponible: false,
        mensaje: 'El subdominio debe tener entre 3 y 20 caracteres'
      }
    }

    // Validar caracteres permitidos
    if (!/^[a-z0-9-]+$/.test(subdominio)) {
      return {
        disponible: false,
        mensaje: 'Solo se permiten letras minúsculas, números y guiones'
      }
    }

    // Verificar si es reservado
    if (RESERVED_SUBDOMAINS.includes(subdominio)) {
      return {
        disponible: false,
        mensaje: 'Este subdominio está reservado'
      }
    }

    // Llamar a la API de miTienda para verificar disponibilidad
    const data: any = await $fetch(
      `https://api2.mitienda.pe/api/v1/tienda/validarsubdominio/${encodeURIComponent(subdominio)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': config.apiToken
        }
      }
    )

    // Normalizar respuesta
    const disponible = data.disponible === true || data.disponible === 1
    const mensaje = disponible
      ? '¡Subdominio disponible!'
      : (data.mensaje || data.message || 'Este subdominio no está disponible')

    return { disponible, mensaje }
  } catch (error) {
    console.error('Error en validar-subdominio:', error)
    return {
      disponible: false,
      mensaje: 'Error al verificar disponibilidad'
    }
  }
})
