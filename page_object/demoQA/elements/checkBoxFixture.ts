import { test as base } from "@playwright/test";
import { CheckBox } from "./CheckBox";

type Fixture = {
  checkBoxPage: CheckBox;
};

export const test = base.extend<Fixture>({
  checkBoxPage: async ({ page }, use) => {
    const checkBoxPage = new CheckBox(page);
    await checkBoxPage.goto();
    await use(checkBoxPage);
    //await checkBoxPage.uncheckAll(); // clear up the check???
    await page.reload();
});

export { expect } from "@playwright/test";
