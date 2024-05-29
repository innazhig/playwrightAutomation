import { Page, expect } from "@playwright/test";

export class Form {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get firstNameInput() {
    return 'input[id="firstname"]';
  }

  get lastNameInput() {
    return 'input[id="lasttname"]';
  }

  get emailInput() {
    return 'input[id="email"]';
  }

  get countryCodesSelector() {
    return '[class="control"] select';
    //"select[id='country']";
  }

  async countrySelectorLocator() {
    const countryContainer = await this.page.getByLabel("Country");
    return countryContainer.locator("select");
  }

  async fieldContainerByLabel(label: string) {
    return this.page.locator(".field").filter({ hasText: label });
  }

  public async interactWithCountryCode() {
    const fieldContainer = this.page
      .locator(".field")
      .filter({ hasText: "Country code" });
    const select = fieldContainer.locator("select");
    await select.selectOption("44");
    const selectedOption = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("selected = ", selectedOption);
    expect(selectedOption).toContain("UK");
  }

  public async interactWithCountrySelector() {
    const select = (await this.fieldContainerByLabel("Country")).locator(
      "select"
    );
    //await this.countrySelectorLocator();
    await select.selectOption("Bahamas"); // select option by Value
    let selectedOption = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("selected = ", selectedOption);
    expect(selectedOption).toContain("Bahamas");

    await select.selectOption({ index: 11 }); //select option by index - Armenia
    selectedOption = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("selected = ", selectedOption);
    expect(selectedOption).toContain("Armenia");

    await select.selectOption({ label: "Mali" }); //select option by label
    selectedOption = await select.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("selected = ", selectedOption);
    expect(selectedOption).toContain("Mali");
  }

  public async fillForm() {
    await this.page.locator(this.firstNameInput).fill("Inna");
    await this.page.locator(this.lastNameInput).fill("Kovalenko");
    await this.page.locator(this.emailInput).clear();
    await this.page.locator(this.emailInput).fill("Inna@123.com");

    const countryCodeSelector = this.page
      .locator(this.countryCodesSelector)
      .nth(0);
    await countryCodeSelector.selectOption({ label: "Algeria (+213)" });
    const selectedOption = await countryCodeSelector.evaluate(
      (node: HTMLSelectElement) =>
        node.options[node.options.selectedIndex].textContent
    );
    console.log("Country code = ", selectedOption);
  }
}
