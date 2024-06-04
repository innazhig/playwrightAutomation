import { test as base } from "@playwright/test";
import { TodoPage } from "./TodoPage";

type Fixture = {
  todoPage: TodoPage;
};

export const test = base.extend<Fixture>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addTodo("Test Todo");
    await todoPage.addTodo("Test Todo2");
    await todoPage.addTodo("Test Todo3");
    await use(todoPage);
    await todoPage.removeAll();
  },
});

export { expect } from "@playwright/test";
