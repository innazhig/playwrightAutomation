import { Locator, Page, expect } from "@playwright/test";

export class Droppable {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  get dragElement() {
    return "#draggable";
  }
  get headerLocator(): Locator {
    return this.page.getByRole("heading", { name: "Droppable" });
  }

  get simpleDropLocation() {
    return "#simpleDropContainer #droppable";
  }

  get acceptDropLocation() {
    return "#acceptDropContainer #droppable";
  }

  //     async dragAndDropElementDemo2(text: string, textInDropBox: string) {
  //     await this.page
  //       .locator(this.dragMe, { hasText: text })
  //       .dragTo(this.page.locator(this.dropMe));
  //     expect(await this.page.locator(this.dropMe).textContent()).toContain(
  //       textInDropBox
  //     );
  //     expect(this.page.locator(this.dropMe)).toHaveCSS(
  //       "background-color",
  //       "rgb(14, 186, 197)"
  //     );
  //   }

  public async checkHeaderVisibility() {
    await expect(this.headerLocator).toBeVisible();
  }

  public async dragAndDropSimple() {
    const draggableElLocator = this.page.locator(this.dragElement);
    const draggableElText = await draggableElLocator.textContent();

    const dropLocator = this.page
      //.getByLabel("Simple")
      .locator(this.simpleDropLocation); //"#simpleDropContainer #droppable"
    await expect(dropLocator).toHaveClass("drop-box ui-droppable");

    await draggableElLocator.dragTo(dropLocator);
    //expect(await this.page.locator(this.dropLocation).textContent()).toContain("Dropped!");
    expect(await dropLocator.textContent()).toContain("Dropped!");
    //await expect(dropLocator).toHaveText(draggableElText);
    await expect(dropLocator).toHaveClass(/ui-state-highlight/);
    await expect(dropLocator).toHaveCSS(
      "background-color",
      "rgb(70, 130, 180)"
    );
  }

  get acceptableEl() {
    return "#acceptable";
  }

  get notAcceptableEl() {
    return "#notAcceptable";
  }

  get acceptNavTab() {
    return 'a[id="droppableExample-tab-accept"]';
  }

  public async dragAndDropAcceptAcceptable() {
    // go to Accept tab
    await this.page.locator(this.acceptNavTab).click();

    const acceptableElLocator = this.page.locator(this.acceptableEl);
    const dropLocator = this.page.locator(this.acceptDropLocation);
    // how to check background color?
    await expect(dropLocator).toHaveClass("drop-box ui-droppable"); // no color?
    await acceptableElLocator.hover();
    this.page.mouse.down(); // click mouse button
    await dropLocator.hover();
    await expect(dropLocator).toHaveClass(/ui-droppable-hover/); // green color
    await expect(dropLocator).toHaveCSS(
      "background-color",
      "rgb(60, 179, 113)"
    );
    await this.page.mouse.up(); // release mouse button
    await expect(dropLocator).toHaveClass(/ui-state-highlight/); // blue color
    await expect(dropLocator).toHaveCSS(
      "background-color",
      "rgb(70, 130, 180)"
    );
    await expect(dropLocator).toHaveText("Dropped!");
  }

  public async dragAndDropAcceptNotAcceptable() {
    const notAcceptableElLocator = this.page.locator(this.notAcceptableEl);
  }
}
