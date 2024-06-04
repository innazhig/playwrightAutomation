import { test, expect } from "./todo-page";

test("fixture test", async ({ page, todoPage }) => {
  await todoPage.addTodo("spec Fixture Test");
  await expect(page.getByTestId("todo-title")).toContainText([
    "spec Fixture Test",
  ]);
});
