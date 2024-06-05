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
    //await todoPage.removeAll(); // clear up the check???
  },
});

export { expect } from "@playwright/test";
