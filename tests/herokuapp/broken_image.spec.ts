import { test as it } from "@playwright/test";

it("Testing broken image", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/broken_images");
  await page.route("**/*", (route) => {
    route.continue().catch(() => console.log("Error"));
  });
  const image = await page.evaluate(async () => {
    const brokenImages = Array.from(document.querySelectorAll("img"));
    const arrayOfImages = [];

    for (const img of brokenImages) {
      const response = await fetch(img.src).catch(() =>
        console.log("Error fetching image")
      );
      if (img.naturalHeight === 0 || img.naturalWidth === 0) {
        //if (!response || response.status !== 200) {
        arrayOfImages.push(img.src);
      }
    }
    return arrayOfImages;
    //throw new Error();
  });
  console.log(image.length, "array length");
  for (const src of image) console.log(src, "image src");
});
