import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Sessions from "../Sessions";

beforeAll(() => {
  window.alert = jest.fn();
});

const server = setupServer(
  rest.post("*", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "success" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("保存ボタンを押すとAPIが呼ばれる", async () => {
  render(<Sessions />);

  fireEvent.click(screen.getByText("リングゲーム"));

  const inputs = screen.getAllByRole("spinbutton");

  fireEvent.change(inputs[0], { target: { value: "1000" } });
  fireEvent.change(inputs[1], { target: { value: "1500" } });
  fireEvent.change(inputs[2], { target: { value: "0" } });

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "test note" },
  });

  fireEvent.click(screen.getByText("保存する"));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("保存成功！");
  });
});
