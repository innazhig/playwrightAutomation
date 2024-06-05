import {
  test,
  expect,
} from "../../page_object/demoQA/elements/checkBoxFixture";

test("DemoQA Check box fixture test", async ({ page, checkBoxPage }) => {
  await expect(checkBoxPage.title).toBeVisible();
  await checkBoxPage.clickButton("Home");
  //await checkBoxPage.getButton("Home").click();
  const root = page.locator(checkBoxPage.rootNode);
  console.log("is root checked? ", await root.isChecked());
  await expect(root).not.toBeChecked();
  await checkBoxPage.checkAll();
  console.log("is root checked? ", await root.isChecked());
  await expect(root).toBeChecked();
});
