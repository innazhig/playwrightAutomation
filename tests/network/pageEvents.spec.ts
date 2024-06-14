import { test } from "@playwright/test";

test("intercept", async ({ page }) => {
  await page.route("**/*.{png,jpg,jpeg,svg}", (request) => {
    //console.log(request.request().resourceType());
    if (request.request().resourceType() === "image") {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on("pageerror", async (err) => {
    console.log(`error: ${err}`);
  });

  await page.pause();
  await page.goto('data:text/html,<script>throw new Error("Test")</script>');
  await page.goto("https://amazon.com");
  await page.pause();
});
