import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { SessionsPage } from "../SessionsPage";

beforeAll(() => {
  // alert をモック
  window.alert = jest.fn();
});

// MSW サーバー起動
const server = setupServer(
  rest.post("*", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "success" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SessionsPage Integration Test", () => {
  test("フォーム入力 → API 呼び出し → 成功アラート表示まで通る", async () => {
    render(<SessionsPage />);

    // ゲームタイプ切り替え
    fireEvent.click(screen.getByText("リングゲーム"));

    // 入力
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "1000" } });
    fireEvent.change(inputs[1], { target: { value: "1500" } });
    fireEvent.change(inputs[2], { target: { value: "0" } });

    // note
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test note" },
    });

    // 保存
    fireEvent.click(screen.getByText("セッションを保存"));

    // 最終結果（UI反映）
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("保存成功！");
    });
  });
});
