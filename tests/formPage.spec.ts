import { test } from "@playwright/test";
const URL = "https://www.lambdatest.com/selenium-playground/input-form-demo";

test.describe.skip("FORM PAGE", () => {
  test.beforeAll(() => {
    console.log("beforeAll");
  });
  test.beforeEach(async ({ page }) => {
    console.log("beforeEach");
    //await page.goto('http://localhost:3000/form')
  });

  test.afterEach(async ({ page }) => {
    console.log("afterEach");
    //await page.close()
  });

  test.afterAll(() => {
    console.log("afterAll");
  });

  test("Test 2", async ({ page }) => {
    console.log("Test 2");
  });

  test.skip("Test 3", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log("Test 3");
  });
});

test.describe("FORM PAGE TYPE", () => {
  test("Fill all fields", async ({ page }) => {
    console.log("Test 1");
    await page.goto(URL);
    await page.locator("#name").pressSequentially("Inna", { delay: 500 });
    //page.pause();
    //await page.locator("#email").fill("Inna@123.com");
    page
      .locator(
        '[class="w-full border border-gray-90 text-size-14 rounded mt-10 px-10 py-5"][type="email"]'
      )
      .pressSequentially("Inna@123.com");

    await page.locator('input[pleceholder="Password"]').fill("test1234");
    await page
      .locator('[for="companyname"] ~ input[placeholder="Company"]')
      .fill("company");

    await page.selectOption('select[name="country"]', {
      label: "United States",
    });
    await page
      .locator('label:has-text("City") ~ input#inputCity')
      .fill("Orlando");
    //await page.locator('form[name="form"] button').click();
    await page.getByPlaceholder("Adress 1").fill("704 ct lane");
    await page.getByRole("textbox", { name: "Address 2" }).fill("appt 12");
    await page.getByRole("textbox", { name: "Zip code" }).fill("12345");
  });
});
