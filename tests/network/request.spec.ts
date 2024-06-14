import { test } from "@playwright/test";

test("request failed", async ({ page }) => {
  await page.route("**/*.{png,jpg,jpeg,svg}", (request) => {
    //console.log(request.request().resourceType());
    if (request.request().resourceType() === "image") {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on("requestfailed", async (req) => {
    console.log(`error: ${req.url()}`);
  });

  //await page.pause();
  //await page.goto('data:text/html,<script>throw new Error("Test")</script>');
  await page.goto("https://demoqa.com");
  //await page.pause();
});
