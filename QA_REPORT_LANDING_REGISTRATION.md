# Reporte QA: Flujo de Registro / Prueba Gratis 14 Dias
**Fecha:** 2026-04-10
**Proyecto:** mitienda-landingpage-Nuxt
**Alcance:** Flujo completo de registro v2 (6 pasos con OTP)
**Tipo:** Revision por codigo fuente + analisis de UX

---

## Resumen Ejecutivo

El flujo de registro v2 es un proceso de 6 pasos con verificacion OTP por WhatsApp y Email. Es un flujo moderno y bien diseñado, pero tiene **26 issues** que van desde vulnerabilidades de seguridad criticas hasta mejoras de UX.

### Hallazgos por Severidad

| Severidad | Cantidad | Ejemplos Clave |
|-----------|----------|----------------|
| **Critical** | 4 | OTP sin limite de intentos, password minimo 6 chars, sesion no validada server-side |
| **High** | 6 | Sin rate limiting en resend OTP, back button invalida verificacion, telefono sin validacion por pais |
| **Medium** | 8 | Error messages genericos, subdomain race condition, password en memoria |
| **Low** | 8 | ARIA labels, timer cleanup, timeout requests |

---

## Flujo Actual (6 pasos)

```
/prueba-gratis (landing)
    |
    v
/registro-v2 (paso 1-5)
    |
    +-- Paso 1: Datos personales (nombre, telefono, email, terminos)
    |       API: POST /api/otp/start-session
    |
    +-- Paso 2: Verificar WhatsApp (OTP 6 digitos)
    |       API: POST /api/otp/send-whatsapp + POST /api/otp/verify
    |
    +-- Paso 3: Verificar Email (OTP 6 digitos)
    |       API: POST /api/otp/send-email + POST /api/otp/verify
    |
    +-- Paso 4: Crear contraseña (con medidor de fortaleza)
    |       API: POST /api/registro-paso1
    |
    +-- Paso 5: Configurar tienda (nombre, subdominio, categoria, pais)
    |       API: POST /api/guardar-paso2
    |
    v
/registro-v2/completar/[codigo] (exito)
    |       API: POST /api/generate-magic-token
    v
Admin Panel (auto-redirect con magic token)
```

---

## Bugs Encontrados

### CRITICAL

| ID | Descripcion | Archivo | Linea |
|----|-------------|---------|-------|
| REG-001 | **OTP sin limite de intentos**: No hay max attempts en verificacion. Un atacante puede fuerza bruta los 6 digitos (1M combinaciones) con requests automatizados | server/api/otp/verify.post.ts | - |
| REG-002 | **Password minimo 6 chars**: Demasiado debil. El estandar es 8+. Passwords como "123456" son aceptados | CreatePassword.vue | 29-30 |
| REG-003 | **Session no validada server-side**: Los endpoints proxy OTP no validan que el session_id sea legitimo. Un atacante podria forjar session_ids | stores/registrationV2.ts | 85-144 |
| REG-004 | **Email validation basica**: Regex simple acepta emails invalidos y no detecta proveedores desechables (mailinator, 10minutemail, etc.) | UserDataForm.vue | 58-60 |

### HIGH

| ID | Descripcion | Archivo | Linea |
|----|-------------|---------|-------|
| REG-005 | **Sin rate limiting en resend OTP**: Solo hay cooldown de 60s en frontend (bypasseable via DevTools). Server no limita resends. Vector de spam/DoS | VerifyWhatsApp.vue | 42-59 |
| REG-006 | **Back button invalida verificacion**: Usuario puede volver al paso 1, cambiar email/telefono, y avanzar sin re-verificar. Los OTP verificados ya no corresponden a los datos nuevos | registro-v2/index.vue | 30-34 |
| REG-007 | **Telefono sin validacion por pais**: Acepta cualquier 9+ digitos sin validar formato del pais seleccionado (Peru = 9 digits, Ecuador/Colombia = 10 digits) | UserDataForm.vue | 54-56 |
| REG-008 | **API auth sin manejo de error**: Si MTSERVICIOS_API_KEY es invalida/expirada, los errores son silenciosos. No se valida la respuesta de autorizacion | server/api/otp/*.post.ts | 22 |
| REG-009 | **Magic token expuesto en URL**: El token de auto-login se pasa como query param, visible en historial del browser, logs de referrer, y cache | registrationV2.ts | 276-306 |
| REG-010 | **Endpoints no validan input server-side**: Los POST endpoints proxy no validan tipos/formatos de los campos antes de reenviar al servicio externo | server/api/*.post.ts | - |

### MEDIUM

| ID | Descripcion | Archivo | Linea |
|----|-------------|---------|-------|
| REG-011 | **Subdomain race condition**: Validacion de disponibilidad no se re-verifica al momento del submit. Otro usuario puede tomar el subdominio entre check y submit | StoreDataForm.vue | 109-118 |
| REG-012 | **Password almacenado en memoria**: El password queda en el Pinia store en texto plano. Si hay XSS, el atacante obtiene el password | registrationV2.ts | 38, 46 |
| REG-013 | **Error messages genericos**: Todos los errores server devuelven "Error interno del servidor" sin distinguir tipo de error (rate limit, validacion, timeout) | server/api/*.post.ts | - |
| REG-014 | **Country code regex permisiva**: El input custom de codigo de pais acepta formatos invalidos como "++51" o "+5 1" | UserDataForm.vue | 39-44 |
| REG-015 | **Categoria/pais no validados server-side**: El endpoint guardar-paso2 no valida que los valores sean de la lista permitida. Acepta valores arbitrarios | server/api/guardar-paso2.post.ts | 24-30 |
| REG-016 | **Password confirmation no se limpia**: Refs de password y confirmacion no se limpian despues del submit exitoso | CreatePassword.vue | 4-7 |
| REG-017 | **Masked email muestra dominio completo**: `ab****@gmail.com` revela el proveedor de email | registrationV2.ts | 65-73 |
| REG-018 | **Estado no se resetea en refresh**: Si usuario recarga la pagina en paso 4, el sessionId persiste y puede continuar con datos potencialmente obsoletos | registro-v2/index.vue | 30-34 |

### LOW

| ID | Descripcion | Archivo | Linea |
|----|-------------|---------|-------|
| REG-019 | **OTP timer no se limpia en unmount**: `cooldownInterval` no tiene `onUnmounted` cleanup explicito | VerifyWhatsApp.vue, VerifyEmail.vue | - |
| REG-020 | **Sin ARIA labels en OTP inputs**: Los inputs de OTP no tienen labels accesibles para screen readers | OtpInput.vue | 134-149 |
| REG-021 | **Placeholder como label**: "Minimo 6 caracteres" en placeholder no es accesible como requisito real | CreatePassword.vue | 89-94 |
| REG-022 | **Sin timeout en requests**: `$fetch` sin timeout puede dejar al usuario esperando indefinidamente | registrationV2.ts | - |
| REG-023 | **Auto-redirect confuso**: Si usuario cancela countdown pero el redirect ya inicio, queda en estado inconsistente | completar/[[codigo]].vue | 15-35 |
| REG-024 | **Sin logging de intentos de registro**: No hay audit trail de registros para deteccion de fraude o analisis de conversion | server/api/*.post.ts | - |
| REG-025 | **Password strength score incluye largo 6 como punto**: El medidor da puntos por tener 6+ chars, incentivando passwords cortos | CreatePassword.vue | 14-15 |
| REG-026 | **Dominio hardcodeado en paso2**: Mapping pais->dominio esta hardcodeado en el server route, no configurable | server/api/guardar-paso2.post.ts | 35-40 |

---

## Analisis de UX y Oportunidades de Mejora

### Lo que esta bien hecho
- Flujo multi-paso con indicador de progreso visual
- Verificacion dual (WhatsApp + Email) genera confianza
- Auto-generacion de subdominio desde nombre de tienda
- Verificacion en tiempo real de disponibilidad de subdominio
- Medidor visual de fortaleza de password
- Auto-redirect con magic token elimina friccion post-registro
- Soporte multi-pais (PE, EC, CO)
- Tracking de conversiones (GA4 + FB Pixel)

### Oportunidades de Mejora

#### 1. Reducir friccion del registro (ALTO IMPACTO)
**Problema**: 6 pasos es mucho. El usuario debe verificar WhatsApp Y email antes de siquiera crear su cuenta.
**Propuesta**: Reducir a 4 pasos:
- Paso 1: Datos + email (verificar email con OTP)
- Paso 2: Crear password
- Paso 3: Configurar tienda
- Paso 4: Exito
- WhatsApp se puede verificar post-registro (no bloquea el onboarding)
**Impacto estimado**: +15-25% conversion rate

#### 2. Social login (Google) para registro instantaneo (ALTO IMPACTO)
**Problema**: El formulario de datos personales es la primera barrera.
**Propuesta**: Agregar "Crear cuenta con Google" que autocompleta nombre y email verificado, saltando los pasos de verificacion.
**Impacto estimado**: +20-30% conversion rate

#### 3. Progress bar con estimacion de tiempo (MEDIO IMPACTO)
**Problema**: El usuario no sabe cuanto falta ni cuanto tardara.
**Propuesta**: Agregar "Paso 2 de 5 - ~3 minutos restantes" al progress indicator.

#### 4. Guardar progreso parcial (MEDIO IMPACTO)
**Problema**: Si el usuario cierra el browser despues de verificar WhatsApp, pierde todo el progreso.
**Propuesta**: Persistir el estado del registro en localStorage. Al volver, ofrecer continuar donde dejo.

#### 5. Validacion de email en tiempo real (MEDIO IMPACTO)
**Problema**: El usuario ingresa un email invalido o con typo y solo se entera al intentar verificar.
**Propuesta**: 
- Sugerir correcciones ("Quisiste decir gmail.com en vez de gamil.com?")
- Verificar que el dominio MX exista
- Bloquear proveedores desechables

#### 6. Seleccion de plan durante el registro (MEDIO IMPACTO)
**Problema**: Todos entran al plan de prueba sin contexto de planes.
**Propuesta**: Mostrar una tabla simplificada de planes en el paso 1 con el trial pre-seleccionado. Esto educa al usuario sobre el valor y facilita la conversion post-trial.

#### 7. Mostrar preview de la tienda en el paso 5 (BAJO IMPACTO)
**Problema**: El usuario configura su tienda sin ver como quedara.
**Propuesta**: Mostrar un mockup/preview en tiempo real del storefront con el nombre, logo placeholder, y colores.

#### 8. Onboarding checklist post-registro (BAJO IMPACTO)
**Problema**: Despues del registro, el usuario llega al admin sin guia.
**Propuesta**: Mostrar un checklist interactivo: "Agrega tu primer producto", "Personaliza tu tienda", "Configura pagos", etc.

---

## Metricas Recomendadas para Tracking

| Metrica | Evento GA4 | Objetivo |
|---------|-----------|----------|
| Inicio de registro | `registration_started` | Baseline |
| Verificacion WhatsApp completada | `whatsapp_verified` | Medir drop-off WhatsApp |
| Verificacion Email completada | `email_verified` | Medir drop-off Email |
| Cuenta creada | `account_created` | Conversion principal |
| Tienda configurada | `store_configured` | Onboarding completado |
| Auto-login exitoso | `magic_login_success` | Experiencia fluida |
| Drop-off por paso | `registration_abandoned` con paso | Identificar cuellos de botella |
| Tiempo por paso | `step_duration` | Optimizar UX |

---

## Estadisticas

- **Total issues encontrados:** 26
- **Critical:** 4
- **High:** 6
- **Medium:** 8
- **Low:** 8
- **Oportunidades de mejora UX:** 8
- **Archivos analizados:** ~20
- **API endpoints revisados:** 7

---

*Reporte generado por revision de codigo fuente con Claude Code. No incluye testing funcional en navegador.*
