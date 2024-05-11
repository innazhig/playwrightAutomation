import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  //await expect(page).toContainText('enables reliable');

  await expect(page.getByRole('link', {name: 'Docs'})).toBeVisible();
  
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  //await page.getByText("Get started").click();

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
