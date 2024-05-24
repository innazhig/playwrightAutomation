import { test, expect } from "@playwright/test";
import { DemoQADatePicker } from "../../page_object/demoQA/widgets/DemoQADatePicker";

const URL = "https://demoqa.com/date-picker";

test.describe("DemoQa DATA PICKER", () => {
  test("working with date picker", async ({ page }) => {
    let datePicker = new DemoQADatePicker(page);
    await page.goto(URL);
    await datePicker.verifyHeading();
    // await datePicker.checkDefaultDate();
    // await datePicker.nMonthBefore();
    await datePicker.pickDate();
  });
  test.only("test", async ({ page }) => {
    await page.goto(URL);
    await page.locator("#datePickerMonthYearInput").click();
    const arrayDays = await page.locator(".react-datepicker__day").all();
    // find days by number
    const myDays = ["--001", "--011", "--019", "--030"];
    for (const day of arrayDays) {
      const dayClass = await day.getAttribute("class");
      if (dayClass.includes("react-datepicker__day--outside-month")) continue;
      for (const myDay of myDays) {
        if (dayClass.includes(myDay)) console.log(dayClass);
      }
    }
    console.log("All days = ", arrayDays.length);
  });
});
