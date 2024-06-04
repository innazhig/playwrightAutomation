import { Page } from "@playwright/test";

export class TodoPage {
  readonly page: Page;

  /**
   *
   * @param {import('@playwright/test').Page} page
   */

  constructor(page: Page) {
    this.page = page;
  }

  get input() {
    return "input.new-todo";
  }

  get todoItem() {
    return "todo-item";
  }
  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
  }

  /**
   *
   * @param {string} text
   */

  async addTodo(text: string): Promise<void> {
    await this.page.locator(this.input).fill(text);
    await this.page.keyboard.press("Enter");
  }

  async remove(text: string): Promise<void> {
    const todo = this.page.getByTestId(this.todoItem).filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }

  async removeAll(): Promise<void> {
    while ((await this.page.getByTestId(this.todoItem).count()) > 0) {
      await this.page.getByTestId(this.todoItem).first().hover();
      await this.page
        .getByTestId(this.todoItem)
        .first()
        .getByLabel("Delete")
        .click();
    }
  }
}
