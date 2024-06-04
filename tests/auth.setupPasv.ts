import { test as setup, expect } from "@playwright/test";

const authFile = "./.auth/userPasv.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://coding.pasv.us/user/login");
  await page.getByPlaceholder("Email").fill("inna@dzex.com");
  await page.getByPlaceholder("Password").fill("MyPassword22#");
  await page.getByRole("button", { name: "Login" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //await page.waitForURL("https://demoqa.com/profile");

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole("heading", { name: "Inna Zhigalskaya" })
  ).toBeVisible();

  await page.screenshot({ path: `./screen/authenticatePASV.png` });

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
