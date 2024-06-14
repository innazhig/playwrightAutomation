import { test } from "@playwright/test";

test("intercept", async ({ page }) => {
  page.route("**/*.{png,jpg,jpeg,svg}", (request) => {
    console.log(request.request().resourceType());
    if (request.request().resourceType() === "image") {
      request.abort();
    } else {
      request.continue();
    }
  });
  //await page.pause();
  await page.goto("https://coding.pasv.us");
  //await page.pause();
});
