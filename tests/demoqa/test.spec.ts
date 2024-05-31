import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/login");
});

test("AUTHENTICATION THROUGH UI", async ({ page, browserName }) => {
  //await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.locator("#submit")).toHaveText("Log out");
  await page.screenshot({ path: `screenShot/${browserName}.png` });
});
