import { expect, test } from "@playwright/test";

test("セッション登録のE2E: フォーム入力 → 保存成功 まで通る", async ({
  page,
}) => {
  // ページにアクセス
  await page.goto("/sessions");

  // Type 切り替え（部分一致でOK）
  await page.getByRole("button", { name: /リングゲーム/ }).click();

  // number input（buyIn, result, otherCost）
  const inputs = page.locator("input[type=number]");

  await inputs.nth(0).fill("1000");
  await inputs.nth(1).fill("1500");
  await inputs.nth(2).fill("0");

  // note
  await page.locator("textarea").fill("test note");

  // 保存（UIは「セッションを保存」）
  const saveButton = page.getByRole("button", { name: /セッションを保存/ });
  await saveButton.click();

  // alert の検証
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("保存成功！");
    await dialog.accept();
  });
});
