# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing and registration website for **miTienda**, a SaaS e-commerce platform (https://nuevo.mitienda.pe). Built with **Nuxt 3** (SSR) + **Vue 3** + **TypeScript** (strict mode). Deployed on **Netlify**. All user-facing content is in **Spanish**.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build (Netlify preset)
npm run generate   # Static site generation
npm run preview    # Preview production build locally
```

No test runner or linter is configured.

## Architecture

### Rendering Strategy
Hybrid SSR. Static pages (home, legal pages) are prerendered via `routeRules` in `nuxt.config.ts`. Registration pages are server-rendered.

### BFF Pattern (Backend-for-Frontend)
All external API calls go through Nitro server routes in `server/api/`. The server routes proxy to external APIs and keep auth tokens server-side via `runtimeConfig`:
- `https://api.mitienda.pe/v1/` — Legacy API (registration, complaints)
- `https://api2.mitienda.pe/api/v1/` — Newer API (store config, subdomain validation)
- `https://servicios.mitienda.pe/` — OTP verification service (WhatsApp + Email)

### State Management
Pinia with Composition API (setup stores) in `stores/`:
- `registration.ts` — V1 three-step registration flow
- `registrationV2.ts` — V2 six-step flow with OTP verification
- `ui.ts` — Global UI state (loading, alerts, mobile menu)

### Two Parallel Registration Flows
- **V1** (`/prueba-gratis/`) — Simpler 3-step flow, components in `components/registration/`
- **V2** (`/registro-v2/`) — 6-step flow with WhatsApp/Email OTP, components in `components/registration-v2/`. Uses `layout: false` (no default header/footer)

### Styling
Bootstrap 5.3.0 + CSS custom properties (no Tailwind). Global styles in `assets/css/` (variables, base, components). Components use `<style scoped>`. Primary brand color: `#00b2a6`.

### Plugins (all client-only)
- `bootstrap.client.ts` — Bootstrap JS bundle
- `analytics.client.ts` — GA4 + Facebook Pixel script injection
- `cookie-consent.client.ts` — orestbida/cookieconsent v3.1.0

### Key Integrations
- Google Analytics 4 + Facebook Pixel (conversion tracking)
- Senja (testimonial widgets)
- lite-youtube (lazy YouTube embeds)
- Cookie consent with ES/EN translations

## Environment Variables

Set via Nuxt `runtimeConfig` (prefix with `NUXT_` for env vars):

| Variable | Scope | Purpose |
|---|---|---|
| `NUXT_API_TOKEN` | Server | Token for miTienda API auth (sent as `token` header) |
| `NUXT_MTSERVICIOS_URL` | Server | OTP service base URL (default: `https://servicios.mitienda.pe`) |
| `NUXT_MTSERVICIOS_API_KEY` | Server | Bearer token for OTP API |
| `NUXT_PUBLIC_SITE_URL` | Public | Site URL (default: `https://nuevo.mitienda.pe`) |

## Conventions

- Components use `<script setup lang="ts">` with Composition API
- Nuxt auto-imports: Vue APIs, composables (`useSeoMeta`, `useRoute`, `navigateTo`, `$fetch`, etc.), and Pinia stores — no manual imports needed
- Shared types and constants (store categories, countries, reserved subdomains) live in `types/index.ts`
- Reusable form components in `components/common/` (FormInput, FormSelect, FormCheckbox, FormTextarea, AlertMessage)
- Multi-country support: Peru (PE), Ecuador (EC), Colombia (CO), Mexico (MX). Country determines store domain: `mitienda.pe` vs `tiendabox.ec`
- Legal: "Libro de Reclamaciones" page is required by Peruvian consumer law (Ley 29571)
