import { test as it } from "@playwright/test";
import { DatePicker } from "../../page_object/DatePicker";

const URL =
  "https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo";

it.describe("DATA PICKER", () => {
  it("working with date picker", async ({ page }) => {
    let datePicker = new DatePicker(page);
    await page.goto(URL);
    await datePicker.verifyHeader();
    await datePicker.dateFromToday();
  });
});
