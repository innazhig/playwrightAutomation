import { test } from "@playwright/test";
import { DragAndDrop } from "../../page_object/DragAndDrop";
//const URL = `${process.env.URL_LAMBDA}/selenium-playground/drag-and-drop-demo`;
const URL = `https://www.lambdatest.com/selenium-playground/drag-and-drop-demo`;

test.describe("DRAG AND DROP", () => {
  test("drag and drop", async ({ page }) => {
    const dragAndDrop = new DragAndDrop(page);
    await page.goto(URL);
    console.log("URL=" + URL);
    await dragAndDrop.dragAndDropElement("Draggable 1");
    await dragAndDrop.dragAndDropElement("Draggable 2");
    await page.reload();
    await dragAndDrop.dragAndDropElementOption2("Draggable 1");
    await dragAndDrop.dragAndDropElementOption2("Draggable 2");
  });
});
