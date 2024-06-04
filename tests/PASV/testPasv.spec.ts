import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://coding.pasv.us");
});

test("AUTHENTICATION THROUGH UI", async ({ page, browserName }) => {
  await expect(
    page.getByRole("heading", { name: "Interactive learning" })
  ).toBeVisible();
  await expect(page.locator('[class="ms-2 me-2"]')).toHaveText(
    "Inna Zhigalskaya"
  );
  await page.getByRole("link", { name: "Courses" }).click();
  await expect(
    page.getByRole("heading", { name: "Interactive Courses" })
  ).toBeVisible();
  await page.screenshot({ path: `screenShot/${browserName}.png` });
});
