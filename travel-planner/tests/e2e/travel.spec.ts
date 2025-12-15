import { test, expect } from '@playwright/test'

test('save favorite and create trip with activity', async ({ page }) => {
  await page.goto('http://localhost:5173/destinations')
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('text=Explore Destinations', { timeout: 15000 })
  // Click Save on first card
  const saveButton = page.locator('button', { hasText: 'Save' }).first()
  await saveButton.click()
  await page.goto('http://localhost:5173/favorites')
  await expect(page.locator('text=You haven\'t saved any places yet.')).not.toBeVisible()
  await expect(page.locator('img').first()).toBeVisible()

  // Create trip
  await page.goto('http://localhost:5173/trips')
  await page.fill('input[placeholder="Trip name"]', 'E2E Trip')
  await page.click('button:has-text("Create")')
  await expect(page.locator('text=E2E Trip')).toBeVisible()
  // Add activity to trip
  await page.click('button:has-text("Paris")')
  // Open itinerary
  await page.click('text=Open')
  await expect(page.locator('text=Day 1')).toBeVisible()
  await expect(page.locator('text=Paris')).toBeVisible()
})
