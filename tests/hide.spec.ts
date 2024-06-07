import { test, expect } from "@playwright/test";

test.describe("HIDDEN ELEMENTS", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  });

  test("Hidden Elements", async ({ page }) => {
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
  });
});
