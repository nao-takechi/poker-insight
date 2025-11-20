import { rest } from "msw";
import { setupServer } from "msw/node";
import { createSession } from "../api/createSession";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// テスト全体で 1 つの MSW server を使う
const server = setupServer(
  // デフォルトの正常レスポンス
  rest.post("http://localhost/api/sessions", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        type: "ring",
        buyIn: 1000,
        result: 1500,
        otherCost: 0,
        note: "",
        createdAt: "2025-01-01T00:00:00Z",
      })
    );
  })
);

// MSW ライフサイクル
beforeAll(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost"; // ★ 重要
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// -------------------------------------
// 正常系
// -------------------------------------
test("createSession 正常系", async () => {
  const res = await createSession({
    type: "ring",
    buyIn: 1000,
    result: 1500,
    otherCost: 0,
    note: "",
    createdAt: "2025-01-01T00:00:00Z",
  });

  expect(res).toEqual({
    id: 1,
    type: "ring",
    buyIn: 1000,
    result: 1500,
    otherCost: 0,
    note: "",
    createdAt: "2025-01-01T00:00:00Z",
  });
});

// -------------------------------------
// 異常系（500）
// -------------------------------------
test("createSession 異常系（500）", async () => {
  server.use(
    rest.post("http://localhost/api/sessions", (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ error: "server error" }) // ★ 必ず JSON を返す
      );
    })
  );

  await expect(
    createSession({
      type: "ring",
      buyIn: 1000,
      result: 1500,
      otherCost: 0,
      note: "",
      createdAt: "2025-01-01T00:00:00Z",
    })
  ).rejects.toThrow("API Error: 500");
});
