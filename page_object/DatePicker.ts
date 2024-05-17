import { Page, expect } from "@playwright/test";
import _ from "lodash";

export class DatePicker {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return "h1";
  }
  get fromInput() {
    return "#from";
  }
  get toInput() {
    return "#to";
  }
  get monthOfTheYear() {
    return '[class="ui-datepicker-month"]';
  }
  get prevMonth() {
    return '[title="Prev"]';
  }
  get nextMonth() {
    return '[title="Next"]';
  }
  // get getDate() {
  //   return ".ui-state-default";
  // }
  get getDate() {
    // todays date
    return '[class="ui-state-default ui-state-highlight"]';
  }
  get dateFromComponent() {
    return "#ui-datepicker-div";
  }
  get dateOfTheYear() {
    return '[class="ui-datepicker-year"]';
  }
  get dateOfTheMonth() {
    return '[class="ui-datepicker-month"]';
  }

  public async verifyHeader() {
    const header = this.page.locator(this.header);
    await expect(header).toContainText("Date Picker");
  }

  randomClickNumber = _.random(1, 50);
  date = _.random(1, 30);

  public async dateFromToday() {
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    //await this.page.click(this.fromInput);
    await this.page.locator(this.fromInput).click();

    for (let i = 0; i < this.randomClickNumber; i++) {
      // click on prev month button
      await this.page.locator(this.prevMonth).click();
    }

    let year = await this.page.locator(this.dateOfTheYear).textContent();
    let month = await this.page
      .locator(this.dateOfTheMonth)
      .locator('[selected="selected"]')
      .textContent();
    console.log(this.randomClickNumber);
    console.log(year, month);
    console.log(this.date);
    await this.page
      .locator(this.dateFromComponent)
      .getByRole("link", { name: this.date, exact: true })
      .click();
    let date = this.date < 10 ? `0${this.date}` : this.date + "";
    expect(await this.page.locator(this.fromInput).inputValue()).toBe(
      `${months[month]}/${date}/${year}`
    ); ///mm/dd/yyyy
  }
}
