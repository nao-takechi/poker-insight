import { rest } from "msw";
import { setupServer } from "msw/node";
import { createSession } from "../api/createSession";

const server = setupServer(
  rest.post("http://127.0.0.1:8080/api/sessions", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 1 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("createSession 正常系", async () => {
  const res = await createSession({
    type: "ring",
    buyIn: 1000,
    result: 1500,
    otherCost: 0,
    note: "",
    createdAt: "2025-01-01T00:00:00Z",
  });

  expect(res).toEqual({ id: 1 });
});

test("createSession 異常系（500）", async () => {
  server.use(
    rest.post("http://127.0.0.1:8080/api/sessions", (req, res, ctx) => {
      return res(ctx.status(500));
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
  ).rejects.toThrow("Failed to create session");
});
