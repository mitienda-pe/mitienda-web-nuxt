// Registration types
export interface Paso1FormData {
  nombre: string
  telefono: string
  correo: string
  password: string
  terminoscheck: boolean
}

export interface Paso2FormData {
  nombre_tienda: string
  subdominio: string
  categoria: string
  pais: string
  descripcion: string
}

export interface RegistrationResponse {
  error: number
  cod?: string
  message?: string
  msn?: string
  response?: string
}

export interface SubdomainValidationResponse {
  disponible: boolean
  mensaje?: string
  message?: string
}

export interface StoreConfigResponse {
  error: number
  message?: string
  tienda?: {
    url: string
    id?: number
  }
}

// Complaints types
export interface ComplaintFormData {
  nombre: string
  domicilio: string
  tipo_documento: string
  numero_documento: string
  email: string
  telefono: string
  tipo_bien: 'producto' | 'servicio'
  descripcion_bien: string
  tipo_reclamacion: 'reclamo' | 'queja'
  detalle_reclamacion: string
  aceptar_terminos: boolean
}

export interface ComplaintResponse {
  error: number
  message?: string
  hash?: string
}

// Pricing types
export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  highlighted?: boolean
  badge?: string
}

// Category options
export interface CategoryOption {
  value: string
  label: string
}

export const CATEGORIES: CategoryOption[] = [
  { value: 'moda', label: 'Moda y Accesorios' },
  { value: 'belleza', label: 'Belleza y Cuidado Personal' },
  { value: 'hogar', label: 'Hogar y Decoración' },
  { value: 'tecnologia', label: 'Tecnología y Electrónica' },
  { value: 'deportes', label: 'Deportes y Fitness' },
  { value: 'alimentacion', label: 'Alimentación y Bebidas' },
  { value: 'servicios', label: 'Servicios Profesionales' },
  { value: 'otros', label: 'Otros' }
]

// Country options
export interface CountryOption {
  value: string
  label: string
  domain: string
}

export const COUNTRIES: CountryOption[] = [
  { value: 'PE', label: 'Perú', domain: 'mitienda.pe' },
  { value: 'EC', label: 'Ecuador', domain: 'tiendabox.ec' },
  { value: 'CO', label: 'Colombia', domain: 'tiendabox.co' },
  { value: 'MX', label: 'México', domain: 'mitienda.pe' },
  { value: 'otros', label: 'Otro país', domain: 'mitienda.pe' }
]

// Reserved subdomains
export const RESERVED_SUBDOMAINS = [
  'www', 'api', 'admin', 'mail', 'ftp',
  'test', 'demo', 'panel', 'api2', 'nuevo',
  'app', 'help', 'support', 'blog', 'shop'
]

// Document types for complaints
export interface DocumentType {
  value: string
  label: string
}

export const DOCUMENT_TYPES: DocumentType[] = [
  { value: 'dni', label: 'DNI' },
  { value: 'ce', label: 'Carné de Extranjería' },
  { value: 'pasaporte', label: 'Pasaporte' },
  { value: 'ruc', label: 'RUC' }
]
