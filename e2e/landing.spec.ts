import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('homepage carga correctamente', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 })
    await expect(page).toHaveTitle(/miTienda|TiendaBox/)
  })

  test('muestra header con navegacion', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Logo visible
    await expect(page.locator('text=miTienda').first()).toBeVisible({ timeout: 5000 })

    // Nav links
    await expect(page.locator('nav').first()).toBeVisible()
  })

  test('muestra hero section con CTA', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Hero heading
    await expect(page.locator('h1').first()).toBeVisible()

    // CTA button (could be a, button, or NuxtLink rendered as a)
    const cta = page.locator('text=/[Ee]mpieza|[Pp]rueba [Gg]ratis|[Cc]rear/').first()
    await expect(cta).toBeVisible({ timeout: 5000 })
  })

  test('muestra seccion de precios', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll down to pricing
    await page.locator('text=/[Pp]recio|[Pp]lan/').first().scrollIntoViewIfNeeded()
    await expect(page.locator('text=/[Pp]recio|[Pp]lan/').first()).toBeVisible({ timeout: 10000 })
  })

  test('footer es visible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('footer').first()).toBeVisible()
  })
})

test.describe('Registro V2 (requiere deploy)', () => {
  test.fixme('pagina de registro carga con formulario', async ({ page }) => {
    await page.goto('/registro-v2')
    await expect(page.locator('h3').first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('form').first()).toBeVisible()
  })

  test.fixme('redirect desde /prueba-gratis a /registro-v2', async ({ page }) => {
    await page.goto('/prueba-gratis')
    await expect(page).toHaveURL(/\/registro-v2/)
  })
})
