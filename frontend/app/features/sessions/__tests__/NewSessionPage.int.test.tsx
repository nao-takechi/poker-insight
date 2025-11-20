import { pushMock } from "@/../__mocks__/next/navigation";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { NewSessionPage } from "../pages/NewSessionPage";

beforeAll(() => {
  window.alert = jest.fn();
});

const server = setupServer(
  rest.post("http://localhost/api/sessions", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 999,
        type: "ring",
        buyIn: 1000,
        result: 1500,
        otherCost: 0,
        note: "test note",
        createdAt: "2025-01-01T00:00:00Z",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewSessionPage Integration Test", () => {
  test("フォーム入力 → API 呼び出し → 成功時に router.push('/') が呼ばれる", async () => {
    // API BASE URL をテスト用に設定
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost";

    render(<NewSessionPage />);

    fireEvent.click(screen.getByText("リングゲーム"));

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "1000" } });
    fireEvent.change(inputs[1], { target: { value: "1500" } });
    fireEvent.change(inputs[2], { target: { value: "0" } });

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test note" },
    });

    fireEvent.click(screen.getByText("セッションを保存"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });
});
