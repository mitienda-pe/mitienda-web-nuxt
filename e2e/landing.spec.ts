import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('homepage carga correctamente', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 })
    await expect(page).toHaveTitle(/miTienda/)
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

test.describe('Prueba Gratis (requiere deploy)', () => {
  test.fixme('pagina prueba gratis carga con formulario', async ({ page }) => {
    await page.goto('/prueba-gratis')
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('form').first()).toBeVisible()
  })

  test.fixme('muestra FAQs en prueba gratis', async ({ page }) => {
    await page.goto('/prueba-gratis')
    await expect(page.locator('text=Preguntas frecuentes')).toBeVisible()
  })

  test.fixme('muestra estadisticas de confianza', async ({ page }) => {
    await page.goto('/prueba-gratis')
    await expect(page.locator('text=2,000+')).toBeVisible()
  })
})
