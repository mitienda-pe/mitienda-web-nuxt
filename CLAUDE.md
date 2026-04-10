# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing and registration website for **miTienda** / **TiendaBox**, a SaaS e-commerce platform. Built with **Nuxt 3** (SSR) + **Vue 3** + **TypeScript** (strict mode). Deployed on a **self-hosted server** (Caddy + Node + PM2). All user-facing content is in **Spanish**.

### Multi-Country / Multi-Brand

A single deployment serves 3 countries via hostname detection:

| Country | Brand | Domain | Currency | GA4 |
|---------|-------|--------|----------|-----|
| Peru (PE) | MiTienda | `mitienda.pe` | PEN (S/) | `G-J91H38CJ41` |
| Ecuador (EC) | TiendaBox | `tiendabox.ec` | USD ($) | `G-D1E0WNTMBZ` |
| Colombia (CO) | TiendaBox | `tiendabox.co` | USD ($) | `G-BTNWQQR373` |

Country is detected from the `Host` header via `composables/useCountry.ts` → `config/countries.ts`. All country-specific data (branding, pricing, payment gateways, legal, analytics, social media) is centralized in `config/countries.ts`.

**To test a specific country locally:**
```bash
NUXT_PUBLIC_DEFAULT_COUNTRY=EC npm run dev   # Ecuador
NUXT_PUBLIC_DEFAULT_COUNTRY=CO npm run dev   # Colombia
npm run dev                                   # Peru (default)
```

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build (node-server preset)
npm run preview    # Preview production build locally
npm run postinstall # Runs `nuxt prepare` (generates .nuxt types)
```

No test runner or linter is configured.

## Architecture

### Rendering Strategy
Hybrid SSR. Legal pages are prerendered via `routeRules` in `nuxt.config.ts`. Home, blog, and registration pages are server-rendered (needed for country detection by hostname).

### BFF Pattern (Backend-for-Frontend)
All external API calls go through Nitro server routes in `server/api/`. The server routes proxy to external APIs and keep auth tokens server-side via `runtimeConfig`:
- `https://api.mitienda.pe/v1/` — Legacy API (registration, complaints)
- `https://api2.mitienda.pe/api/v1/` — Newer API (store config, subdomain validation)
- `https://servicios.mitienda.pe/` — OTP verification service (WhatsApp + Email)

### Dynamic Server Routes
- `server/routes/robots.txt.ts` — Country-specific robots.txt
- `server/routes/sitemap.xml.ts` — Country-specific sitemap with hreflang alternates (includes blog posts)

### State Management
Pinia with Composition API (setup stores) in `stores/`:
- `registration.ts` — V1 three-step registration flow
- `registrationV2.ts` — V2 six-step flow with OTP verification
- `ui.ts` — Global UI state (loading, alerts, mobile menu)

### Two Parallel Registration Flows
- **V1** (`/prueba-gratis/`) — Simpler 3-step flow, components in `components/registration/`. Uses default layout (header/footer).
- **V2** (`/registro-v2/`) — 6-step flow with WhatsApp/Email OTP, components in `components/registration-v2/`. Uses `layout: false` (no default header/footer). Steps: UserData → WhatsApp OTP → Email OTP → Password → StoreData → Success.
- V2 includes a **magic token flow**: after store creation, a one-time login token is generated so the user lands already authenticated in the backoffice (`https://admin.mitienda.pe/auth/magic?token=...`).

### Blog (SEO Longtail)

Powered by `@nuxt/content` v3 with Markdown files in `content/blog/`. Each post has frontmatter:

```yaml
---
title: "Post title for SEO"
description: "Meta description (150-160 chars)"
date: "2026-04-10"
image: "/img/blog/image.jpg"
tags: ["ecommerce", "guia"]
author: "MiTienda"
countries: ["PE", "EC", "CO"]   # Controls which country domains show this post
---
```

- Collection defined in `content.config.ts` with Zod schema
- Blog listing: `pages/blog/index.vue` — filtered by current country
- Blog post: `pages/blog/[slug].vue` — with JSON-LD structured data (BlogPosting) and CTA
- Posts are automatically included in the country-specific sitemap

**To add a new post:** Create a `.md` file in `content/blog/`. The filename becomes the URL slug (`/blog/filename`).

### Form Validation
Uses `vee-validate` + `yup` for schema-based form validation. Validation happens client-side in registration forms.

### Styling

Bootstrap 5.3.0 + CSS custom properties (no Tailwind). Global styles in `assets/css/` (variables, base, components). Components use `<style scoped>`. CSS load order in `nuxt.config.ts`: `bootstrap.min.css` → `variables.css` → `base.css` → `components.css`. Font: Inter (Google Fonts, 300–900).

Key CSS custom properties (`variables.css`): `--primary-color: #00b2a6`, `--primary-hover: #007d74`, `--text-dark: #293f54`, `--header-height: 70px`.

### Plugins (all client-only)

- `bootstrap.client.ts` — Bootstrap JS bundle
- `analytics.client.ts` — GA4 + Facebook Pixel (IDs from country config, only loads if configured)
- `cookie-consent.client.ts` — orestbida/cookieconsent v3.1.0
- `support-chat.client.ts` — Chatref chat widget

### Key Integrations

- Google Analytics 4 + Facebook Pixel per country (via `plugins/analytics.client.ts`)
- Senja (testimonial widgets)
- lite-youtube (lazy YouTube embeds)
- Cookie consent with ES/EN translations

## Deployment

### Infrastructure
- **Server**: Ubuntu (150.136.182.212)
- **Reverse proxy**: Caddy (auto TLS, serves static assets from `.output/public/`)
- **Runtime**: Node.js + PM2 (`pm2 start .output/server/index.mjs --name mitienda`)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — auto-deploys on push to `main`

### Caddyfile structure
```
mitienda.pe, www.mitienda.pe,
tiendabox.ec, www.tiendabox.ec,
tiendabox.co, www.tiendabox.co {
    root * /var/www/mitienda-web-nuxt/.output/public
    @static file
    handle @static { file_server }
    handle { reverse_proxy localhost:3000 }
}
```

## Environment Variables

Set via Nuxt `runtimeConfig` (prefix with `NUXT_` for env vars):

| Variable                     | Scope  | Purpose                                                        |
| ---------------------------- | ------ | -------------------------------------------------------------- |
| `NUXT_API_TOKEN`             | Server | Token for miTienda API auth (sent as `token` header)           |
| `NUXT_MTSERVICIOS_URL`       | Server | OTP service base URL (default: `https://servicios.mitienda.pe`)|
| `NUXT_MTSERVICIOS_API_KEY`   | Server | Bearer token for OTP API                                       |
| `NUXT_PUBLIC_SITE_URL`       | Public | Site URL (default: `https://mitienda.pe`)                      |
| `NUXT_PUBLIC_DEFAULT_COUNTRY`| Public | Country override for local dev (PE, EC, CO)                    |

## Server API Routes

All server routes are POST-only (`server/api/*.post.ts`). They proxy to external APIs and keep tokens server-side (sent as `token` header, not Bearer). Key endpoints:

- `/api/registro-paso1` → creates user + 14-day trial (legacy API)
- `/api/guardar-paso2` → saves store config (name, subdomain, category, country)
- `/api/validar-subdominio` → checks subdomain availability (local rules first, then API)
- `/api/generate-magic-token` → one-time login token for auto-login after registration
- `/api/reclamaciones` → consumer complaint submission (legal requirement)
- `/api/otp/start-session`, `/api/otp/send-whatsapp`, `/api/otp/send-email`, `/api/otp/verify` → OTP verification flow

## Conventions

- Components use `<script setup lang="ts">` with Composition API
- Nuxt auto-imports: Vue APIs, composables, and Pinia stores — no manual imports needed
- Component auto-import naming follows directory structure: `components/common/FormInput.vue` → `<CommonFormInput />`, `components/registration/RegistrationForm.vue` → `<RegistrationRegistrationForm />`
- Shared types and constants (store categories, countries, reserved subdomains) live in `types/index.ts`
- Country-specific configuration centralized in `config/countries.ts`
- Legal: "Libro de Reclamaciones" page is Peru-only (required by Ley 29571), hidden for other countries via middleware
- Single layout (`layouts/default.vue`) with header, footer, and floating complaints link (Peru only). V2 registration bypasses it with `layout: false`
- Global analytics middleware (`middleware/analytics.global.ts`) fires GA4 page_view on every client-side navigation
- Catch-all 404 page: `pages/[...slug].vue`
- Legal entity for all countries: "Tiendas Virtuales Latinoamérica SAC" (Peru-registered company)
