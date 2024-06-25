import { test as it, expect } from "@playwright/test";

it("Testing Single File Upload", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
  await page.setInputFiles('input[type="file"]', "upload/1.PNG");
  await page.click("#file-submit");
  await expect(page.locator("#uploaded-files")).toContainText("1.PNG");
});

it("Testing Multiple Files Upload", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
  const images = ["upload/1.PNG", "upload/2.png", "upload/3.png"];
  await page.setInputFiles('input[type="file"]', images);
  await page.click('button[type="submit"]');
  await expect(page.locator("p.name")).toContainText("1.PNG");
  await expect(page.locator("p.name")).toContainText("2.png");
  await expect(page.locator("p.name")).toContainText("3.png");

  const names = await page.locator("p.name").allTextContents();
  expect(names).toEqual(images);
});
