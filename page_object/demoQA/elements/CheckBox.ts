import { Locator, Page, expect } from "@playwright/test";

export class CheckBox {
  readonly page: Page;

  /**
   *
   * @param {import('@playwright/test').Page} page
   */

  constructor(page: Page) {
    this.page = page;
  }

  get title() {
    return this.page.getByRole("heading", { name: "Check Box" });
  }

  get unchecked() {
    return '[class="rct-icon rct-icon-uncheck"]';
  }

  get checked() {
    return '[class="rct-icon rct-icon-check"]';
  }

  get unExpanded() {
    //return 'button[class="rct-collapse rct-collapse-btn"]';
    return '[class="rct-icon rct-icon-expand-close"]';
  }

  get collapsedListItems() {
    return 'li[class$="rct-node-collapsed"]';
  }

  get expanded() {
    return '[class="rct-icon rct-icon-expand-open"]';
  }

  get boxesTree() {
    return "#tree-node ol";
  }

  get rootNode() {
    return 'label[for="tree-node-home"] span.rct-checkbox';
    //"#tree-node-home";
  }

  async goto() {
    await this.page.goto("https://demoqa.com/checkbox");
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  /**
   *
   * @param {string} text
   */
  async clickButton(text: string): Promise<void> {
    const tree = this.page.locator(this.boxesTree).first();
    const listItems = await tree.getByRole("listitem").all();
    let i = 0;

    for (const item of listItems) {
      const itemContent = await item.textContent();
      console.log(i, itemContent);
      if (itemContent === text) {
        await item.getByRole("button").click(); // Locator
        return;
      }

      i++;
    }
    console.log("text = " + text + " not found");
  }

  // async clickButtonAllLevels(text: string): Promise<void> {
  //   const button = this.getButtonAllLevels(text);
  //   if (button !== null) {
  //     await button.click();
  //   }
  //   else console.log("text = " + text + " not found");
  // }

  async clickButtonAllLevels(
    text: string,
    level = 0,
    parent = null
  ): Promise<Boolean> {
    if (!parent) parent = this.page.locator(this.boxesTree);
    else parent = parent.locator(this.boxesTree);
    const listItems = await parent.getByRole("listitem").all();

    // check the top level list
    let i = 0;
    for (const item of listItems) {
      const itemContent = await item.textContent();
      console.log(i, itemContent);
      if (itemContent === text) {
        await item.getByRole("button").click(); // Locator
        return true;
      }

      i++;
    }
    console.log("text = " + text + " not found on level " + level);

    // going deeper
    for (const item of listItems) {
      const itemClass = await item.getAttribute("class");
      console.log("node " + itemClass);
      if (itemClass.toLowerCase().includes("rct-node-parent")) {
        console.log("----------going into subtree-------");
        await item.getByRole("button").click(); // expand the subtree
        if (await this.clickButtonAllLevels(text, ++level, item)) return true;
      }
    }
    return false; //
  }

  async getButton(text: string) {
    //const listItems = await this.page.getByRole("listitem").all();
    const tree = this.page.locator(this.boxesTree);
    const listItems = await tree.getByRole("listitem").all();

    let i = 0;
    for (const item of listItems) {
      const itemContent = await item.textContent();
      console.log(i, itemContent);
      if (itemContent === text) {
        return item.getByRole("button"); // Locator
      }

      i++;
    }
    console.log("text = " + text + " not found");
  }

  async checkAll() {
    const checkBox = this.page.locator(this.rootNode);
    await expect(checkBox).toBeVisible(); //hidden ???
    await expect(checkBox).not.toBeChecked();
    await checkBox.check();

    for (const item of await this.page.getByRole("checkbox").all()) {
      await expect(item).toBeChecked();
    }
  }

  async expandAll() {
    let list = this.page.locator(this.collapsedListItems);
    while ((await list.count()) > 0) {
      await list.first().getByRole("button").click();
      list = this.page.locator(this.collapsedListItems);
    }
  }

  /**
   *
   * @param {string} text
   */

  // async remove(text: string): Promise<void> {
  //   const todo = this.page.getByTestId(this.todoItem).filter({ hasText: text });
  //   await todo.hover();
  //   await todo.getByLabel("Delete").click();
  // }

  // async removeAll(): Promise<void> {
  //   while ((await this.page.getByTestId(this.todoItem).count()) > 0) {
  //     await this.page.getByTestId(this.todoItem).first().hover();
  //     await this.page
  //       .getByTestId(this.todoItem)
  //       .first()
  //       .getByLabel("Delete")
  //       .click();
  //   }
  // }
}
