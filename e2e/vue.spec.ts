import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('h1')).toHaveText('WikiSearch');
})

test('should show error message for an empty search query', async ({ page }) => {
  const searchInput = page.locator('input[type="text"]');
  await searchInput.fill('');
  const searchButton = page.locator('button:has-text("GO")');
  await searchButton.click();

  // Wait for error message
  const errorMessage = page.locator('.error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Search query cannot be empty!');
});
