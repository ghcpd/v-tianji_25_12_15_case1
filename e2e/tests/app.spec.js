import { test, expect } from '@playwright/test'

test('E2E: create trip, add itinerary, and favorite a destination', async ({ page }) => {
  await page.goto('/')

  // Favorite first destination: wait for list then scope the favorite button
  const destList = page.getByTestId('destination-list')
  await expect(destList).toBeVisible()
  const fav = destList.getByTestId('fav-paris')
  await expect(fav).toBeVisible()
  await fav.click()
  await expect(page.getByTestId('favorite-paris')).toBeVisible()

  // Create a trip
  await page.getByTestId('create-trip-button').click()
  await page.getByTestId('trip-name-input').fill('Playwright Trip')
  await page.getByTestId('trip-days-input').fill('2')
  await page.getByTestId('trip-submit').click()

  // Select new trip (scope inside trips list to avoid matching header)
  const tripsList = page.getByTestId('trips-list')
  await expect(tripsList.getByText('Playwright Trip')).toBeVisible()
  await tripsList.getByText('Playwright Trip').click()

  // Add itinerary item (scope inside Day 1 panel)
  const day1Panel = page.getByTestId('itinerary-day-1').locator('xpath=..')
  await day1Panel.getByTestId('add-item-place').fill('Morning Coffee')
  await day1Panel.getByTestId('add-item-time').fill('08:45')
  await day1Panel.getByTestId('add-item-submit').click()

  await expect(day1Panel.getByText('Morning Coffee')).toBeVisible()
})
