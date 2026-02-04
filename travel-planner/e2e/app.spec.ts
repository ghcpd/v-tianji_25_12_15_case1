import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Travel Planner/);
});

test('navigate to destinations', async ({ page }) => {
  await page.goto('/');

  await page.click('text=Destinations');
  await expect(page.locator('text=Browse Destinations')).toBeVisible();
});