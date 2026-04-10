import { test, expect } from '@playwright/test'

// Registration v2 pages require deploy to production server
// These tests will pass once /registro-v2 is deployed
// To test locally: PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e

test.describe('Registro V2 - Flujo de Prueba Gratis', () => {

  // Skip all if /registro-v2 is not deployed
  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/registro-v2')
    if (response && response.status() >= 400) {
      test.skip(true, '/registro-v2 no desplegado en este entorno')
    }
    await page.waitForLoadState('networkidle')
  })

  test.describe('Paso 1: Datos del Usuario', () => {
    test('muestra formulario de datos personales', async ({ page }) => {
      await expect(page.locator('text=Ingresa tus datos')).toBeVisible()
      await expect(page.locator('input[autocomplete="name"]')).toBeVisible()
      await expect(page.locator('input[type="tel"]')).toBeVisible()
      await expect(page.locator('input[type="email"]')).toBeVisible()
    })

    test('muestra progress steps', async ({ page }) => {
      await expect(page.locator('text=Tus datos')).toBeVisible()
      await expect(page.locator('text=WhatsApp')).toBeVisible()
      await expect(page.locator('text=Contraseña')).toBeVisible()
    })

    test('valida nombre minimo 2 caracteres', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('A')
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=al menos 2 caracteres')).toBeVisible({ timeout: 3000 })
    })

    test('valida telefono requerido', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('Test User')
      await page.locator('input[type="email"]').fill('test@gmail.com')
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=/teléfono|dígitos/')).toBeVisible({ timeout: 3000 })
    })

    test('valida email formato invalido', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('Test User')
      await page.locator('input[type="tel"]').fill('999888777')
      await page.locator('input[type="email"]').fill('notanemail')
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=correo electrónico válido')).toBeVisible({ timeout: 3000 })
    })

    test('bloquea email desechable', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('Test User')
      await page.locator('input[type="tel"]').fill('999888777')
      await page.locator('input[type="email"]').fill('test@mailinator.com')
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=correos temporales')).toBeVisible({ timeout: 3000 })
    })

    test('valida terminos y condiciones requeridos', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('Test User')
      await page.locator('input[type="tel"]').fill('999888777')
      await page.locator('input[type="email"]').fill('test@gmail.com')
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=aceptar los términos')).toBeVisible({ timeout: 3000 })
    })

    test('valida telefono Peru 9 digitos', async ({ page }) => {
      await page.locator('input[autocomplete="name"]').fill('Test User')
      await page.locator('input[type="tel"]').fill('12345')
      await page.locator('input[type="email"]').fill('test@gmail.com')
      await page.locator('input[type="checkbox"]').first().check()
      await page.locator('button:has-text("Continuar")').click()

      await expect(page.locator('text=/9 dígitos|teléfono/')).toBeVisible({ timeout: 3000 })
    })

    test('selector de pais muestra opciones', async ({ page }) => {
      const countrySelect = page.locator('select.country-select')
      await expect(countrySelect).toBeVisible()
    })

    test('muestra enlace para usuarios existentes', async ({ page }) => {
      await expect(page.locator('text=¿Ya estás registrado?')).toBeVisible()
    })

    test('muestra contacto de soporte', async ({ page }) => {
      await expect(page.locator('text=soporte@mitienda.pe')).toBeVisible()
    })
  })

  test.describe('UI y Accesibilidad', () => {
    test('responsive: formulario se adapta a mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 })
      await page.goto('/registro-v2')
      await page.waitForLoadState('networkidle')

      await expect(page.locator('form').first()).toBeVisible()
      await expect(page.locator('button:has-text("Continuar")')).toBeVisible()
    })

    test('formulario tiene autocomplete attributes', async ({ page }) => {
      await expect(page.locator('input[autocomplete="name"]')).toBeVisible()
      await expect(page.locator('input[autocomplete="tel"]')).toBeVisible()
      await expect(page.locator('input[autocomplete="email"]')).toBeVisible()
    })
  })
})
