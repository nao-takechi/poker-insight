import { expect, test } from "@playwright/test";

test("フォームからセッションを登録できる", async ({ page }) => {
  await page.goto("http://localhost:3000/sessions");

  await page.fill('input[type="number"]', "1000");
  await page.click("text=保存する");

  await expect(page).toHaveURL("/sessions");
});
