import { test, expect } from '@playwright/test'

test.describe('SEO y Meta Tags', () => {
  test('homepage tiene title y description', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/miTienda/)

    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /.+/)
  })
})

test.describe('Paginas Legales', () => {
  test('terminos y condiciones carga', async ({ page }) => {
    await page.goto('/terminos-y-condiciones')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 })
  })

  test('politica de privacidad carga', async ({ page }) => {
    await page.goto('/politicas-de-privacidad')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 })
  })

  test('politica de cookies carga', async ({ page }) => {
    await page.goto('/politica-de-cookies')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 })
  })

  test('libro de reclamaciones carga', async ({ page }) => {
    const response = await page.goto('/libro-de-reclamaciones')
    if (response && response.status() >= 400) {
      test.skip(true, '/libro-de-reclamaciones no desplegado')
    }
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Blog', () => {
  test('blog listing carga', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('text=/[Bb]log/').first()).toBeVisible({ timeout: 10000 })
  })
})
