import { test as it } from "@playwright/test";
import { DemoQADatePicker } from "../../page_object/demoQA/widgets/DemoQADatePicker";

const URL = "https://demoqa.com/date-picker";

it.describe("DemoQa DATA PICKER", () => {
  it("working with date picker", async ({ page }) => {
    let datePicker = new DemoQADatePicker(page);
    await page.goto(URL);
    await datePicker.verifyHeading();
    // await datePicker.checkDefaultDate();
    // await datePicker.nMonthBefore();
    await datePicker.pickDate();
  });
});
