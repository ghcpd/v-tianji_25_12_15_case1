import { test, expect } from '@playwright/test'

test('homepage and create trip', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page.locator('text=Travel Planner')).toBeVisible()
  await page.fill('input[aria-label="trip-name"]', 'Playwright Trip')
  await page.click('button:has-text("Create")')
  await expect(page.locator('text=Playwright Trip')).toBeVisible()
})
