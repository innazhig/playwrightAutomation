import { Page, test } from "@playwright/test";

test.describe("FORM PAGE TYPE", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/pages/form/layout");
  });

  test("inline form", async ({ page }) => {
    // email
    await page.locator('[placeholder="Email"]').nth(0).fill("test@email.com");

    await page.locator('[class="inner-circle"]').nth(0).check();

    await page.pause();
  });
});
