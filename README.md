# miTienda - Sitio Web

Sitio web de marketing y registro de [miTienda](https://nuevo.mitienda.pe), plataforma SaaS de comercio electrónico para Latinoamérica.

## Tech Stack

- **Framework:** Nuxt 3 (SSR) + Vue 3 + TypeScript (strict)
- **UI:** Bootstrap 5.3 + CSS custom properties
- **Estado:** Pinia (Composition API)
- **Validación:** VeeValidate + Yup
- **Deploy:** Netlify

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
NUXT_API_TOKEN=              # Token de autenticación para APIs de miTienda
NUXT_MTSERVICIOS_URL=        # URL del servicio OTP (default: https://servicios.mitienda.pe)
NUXT_MTSERVICIOS_API_KEY=    # API Key para servicio OTP
NUXT_PUBLIC_SITE_URL=        # URL pública del sitio (default: https://nuevo.mitienda.pe)
```

## Desarrollo

```bash
npm run dev
```

El servidor de desarrollo inicia en `http://localhost:3000`.

## Build

```bash
# Build de producción (Netlify)
npm run build

# Preview local del build
npm run preview

# Generación estática
npm run generate
```

## Estructura del proyecto

```
server/api/          → Rutas API del servidor (BFF) — proxy a APIs externas
stores/              → Stores de Pinia (registration, registrationV2, ui)
components/
  common/            → Componentes UI reutilizables (formularios, alertas, header, footer)
  registration/      → Flujo de registro V1 (3 pasos)
  registration-v2/   → Flujo de registro V2 con OTP (6 pasos)
pages/               → Páginas del sitio (landing, registro, legales, 404)
composables/         → Composables (analytics)
plugins/             → Plugins client-only (Bootstrap, Analytics, Cookie Consent)
assets/css/          → Estilos globales (variables, base, componentes)
types/               → Interfaces TypeScript y constantes compartidas
```

## APIs externas

El sitio actúa como BFF (Backend-for-Frontend), todas las llamadas a APIs externas pasan por `server/api/`:

| API | URL | Uso |
|---|---|---|
| miTienda v1 | `api.mitienda.pe/v1/` | Registro de usuarios, reclamaciones |
| miTienda v2 | `api2.mitienda.pe/api/v1/` | Configuración de tienda, validación de subdominio |
| MTServicios | `servicios.mitienda.pe` | Verificación OTP (WhatsApp + Email) |

## Países soportados

- Peru (PE) — `mitienda.pe`
- Ecuador (EC) — `tiendabox.ec`
- Colombia (CO) — `mitienda.pe`
- México (MX) — `mitienda.pe`
