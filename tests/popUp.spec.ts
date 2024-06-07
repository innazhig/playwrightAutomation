import { test, expect } from "@playwright/test";
import { timeout } from "rxjs-compat/operator/timeout";

test.describe("POPUP WINDOW", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  });

  test("Popup window confirm test", async ({ page }) => {
    page.pause();
    page.on("dialog", (el) => el.accept());
    await page.locator("#confirmbtn").click();
    page.pause();
    //await expect(page.locator("#displayed-text")).toBeHidden();
  });

  test("Popup window decline test", async ({ page }) => {
    page.pause();
    page.on("dialog", (el) => el.dismiss());
    await page
      .locator("#confirmbtn")
      .click({ noWaitAfter: true, timeout: 500 });
    page.pause();
    //await expect(page.locator("#displayed-text")).toBeHidden();
  });
});
