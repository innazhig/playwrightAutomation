import { test, expect } from "@playwright/test";
//import { log } from 'console';

test.describe("ASSERTION", () => {
  test.use({ viewport: { width: 500, height: 500 } });
  test("assertion", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/");
    const title = await page.title();
    console.log("title ", title);
    expect(title).toContain("LambdaTest");
    //expect.soft(title).toContain("LambdaTests");
    const header = page.locator("h1");
    expect(await header.textContent()).toBe(
      "Next-Generation Mobile Apps and Cross Browser Testing Cloud"
    );

    await expect(page.locator('img[src$="/Vimeo.svg"]')).toHaveAttribute(
      "alt",
      "vimeo",
      { timeout: 1000 }
    );
  });
});
