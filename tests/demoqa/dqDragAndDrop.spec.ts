import { Droppable } from "../../page_object/demoQA/interactions/Droppable";
import { test } from "@playwright/test";

const URL = "https://demoqa.com/droppable";
// test.beforeAll(async ({ page }) => {
//   await page.goto(URL);
// });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  //await page.reload();
});

test.describe("DEMOQA DROPPABLE", () => {
  test("Drag and drop Simple", async ({ page }) => {
    let droppable = new Droppable(page);
    //await page.goto(URL);
    await droppable.checkHeaderVisibility();
    await droppable.dragAndDropSimple();
  });

  test.only("Drag and drop Accept Acceptable", async ({ page }) => {
    let droppable = new Droppable(page);
    //await page.goto(URL);
    await droppable.checkHeaderVisibility();
    await droppable.dragAndDropAcceptAcceptable();
  });
});
