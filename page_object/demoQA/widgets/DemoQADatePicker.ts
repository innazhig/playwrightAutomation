import { Locator, Page, expect } from "@playwright/test";
import _ from "lodash";

export class DemoQADatePicker {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get heading() {
    return "h1";
  }

  get dateInput() {
    return "input#datePickerMonthYearInput";
  }

  get dateAndTimeInput() {
    return "input#dateAndTimePickerInput";
  }

  get dateToday() {
    return ".react-datepicker__day--selected.react-datepicker__day--today";
  }

  get monthYearSelected() {
    return ".react-datepicker__current-month";
  }

  get monthSelect() {
    return ".react-datepicker__month-select";
  }

  get yearSelect() {
    return ".react-datepicker__year-select";
  }

  public async monthSelectedContent() {
    const select = this.page.locator(this.monthSelect);
    const textContent = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("month Selected= ", textContent);
    return textContent;
  }

  public async yearSelectedContent() {
    const select = this.page.locator(this.yearSelect);
    const textContent = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("year Selected= ", textContent);
    return textContent;
  }

  public async verifyHeading() {
    const heading = this.page.locator(this.heading);
    await expect(heading).toContainText("Date Picker");
  }

  get previousMonthButton(): Locator {
    return this.page.getByLabel("Previous Month");
  }

  get nextMonthButton(): Locator {
    return this.page.getByLabel("Next Month");
  }

  get dateInputLocator(): Locator {
    return this.page.locator(this.dateInput);
  }

  public async checkDefaultDate() {
    // check if the default date is today
    let dateInputLocator = this.dateInputLocator;
    //await this.page.pause();
    let dateFromPicker = await dateInputLocator.inputValue(); //mm/dd/yyyy
    console.log("dateFromPicker= ", dateFromPicker);
    let now = new Date();
    const dateNow = now.getDate();
    const dateNowStr = dateNow < 10 ? "0" + dateNow : dateNow + "";
    const monthNow = now.getMonth() + 1;
    const monthNowStr = monthNow < 10 ? "0" + monthNow : monthNow;
    const yearNow = now.getFullYear();
    const dateNowString = monthNowStr + "/" + dateNowStr + "/" + yearNow;
    expect(dateFromPicker).toBe(dateNowString);
  }

  monthsByNumbers = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  monthsByNames = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  dayOfTheMonthLocator(day: string): Locator {
    return this.page.locator(
      `[class="react-datepicker__day react-datepicker__day--0${day}"]`
    );
  }

  public async nMonthBefore(n = _.random(0, 50)) {
    let dateInputLocator = this.dateInputLocator;
    let dateFromPicker = await dateInputLocator.inputValue(); //mm/dd/yyyy
    await dateInputLocator.click();
    const startMonth = +this.monthsByNames[await this.monthSelectedContent()];
    const startYear = await this.yearSelectedContent();
    for (let i = 0; i < n; i++) {
      await this.previousMonthButton.click();
    }
    const endMonthReceived = await this.monthSelectedContent();
    const endYearReceived = await this.yearSelectedContent();

    const monthDiff = startMonth - n;
    const yearDiff = Math.trunc(Math.abs(monthDiff) / 12) + +(monthDiff <= 0);
    const endMonth = monthDiff > 0 ? monthDiff : 12 + (monthDiff % 12);
    const endYear = +startYear - yearDiff;

    expect(endMonthReceived).toBe(this.monthsByNumbers[endMonth]);
    expect(endYearReceived).toBe(endYear.toString());
  }

  public async pickDate() {
    let dateInputLocator = this.dateInputLocator;
    await dateInputLocator.click();
    const day = _.random(1, 28);
    const dayStr = day < 10 ? `0${day}` : day;
    const month = _.random(1, 12);
    const year = _.random(1900, 2100);
    const dateString = `${month < 10 ? "0" + month : month}/${dayStr}/${year}`;
    console.log("dateString= ", dateString);
    // select a month from the dropdown
    await this.page
      .locator(this.monthSelect)
      .selectOption(this.monthsByNumbers[month]);
    // select a year from the dropdown
    await this.page.locator(this.yearSelect).selectOption(year.toString());
    // select a day from the dropdown
    await this.dayOfTheMonthLocator(dayStr).click();

    //let dateInputLocator = this.dateInputLocator;
    //await this.page.pause();
    let dateFromPicker = await dateInputLocator.inputValue(); //mm/dd/yyyy
    console.log("dateFromPicker= ", dateFromPicker);
    expect(dateFromPicker).toBe(dateString);
  }
}
