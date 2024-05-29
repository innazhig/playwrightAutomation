import { Page, test } from "@playwright/test";
import { Form } from "../../page_object/letcode/Form";

const URL = "https://letcode.in/forms";

test.describe("Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("Test Form", async ({ page }) => {
    let form = new Form(page);
    await form.fillForm();
  });

  test("COUNTRY CODES", async ({ page }) => {
    let form = new Form(page);
    await form.interactWithCountryCode();
  });

  test.only("COUNTRIES", async ({ page }) => {
    let form = new Form(page);
    await form.interactWithCountrySelector();
  });
});
