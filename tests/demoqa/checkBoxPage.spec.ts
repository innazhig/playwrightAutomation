import {
  test,
  expect,
} from "../../page_object/demoQA/elements/checkBoxFixture";


test.describe("DemoQA Check box fixture test", () => {
  test("Check All", async ({ page, checkBoxPage }) => {
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

  test.only("Click buttons", async ({ page, checkBoxPage }) => {
    await expect(checkBoxPage.title).toBeVisible();
    await checkBoxPage.clickButton("Home");
    console.log("Home button clicked");
    checkBoxPage.reloadPage();
    await expect(checkBoxPage.title).toBeVisible();
    await checkBoxPage.clickButtonAllLevels("Documents");
    console.log("Documents button clicked");
    checkBoxPage.reloadPage();
    await checkBoxPage.clickButtonAllLevels("Office");
    console.log("Office button clicked");
    checkBoxPage.reloadPage();
    await checkBoxPage.clickButtonAllLevels("General");
    console.log("General button clicked");
  });

  test("Expand all", async ({ page, checkBoxPage }) => {
    await expect(checkBoxPage.title).toBeVisible();
    await checkBoxPage.expandAll();
    expect(await page.locator(checkBoxPage.collapsedListItems).count()).toBe(0);
  });

});
