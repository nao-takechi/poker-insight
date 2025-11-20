import { fireEvent, render, screen } from "@testing-library/react";
import { NewSessionForm } from "../components/NewSessionForm";

const dummyProps = {
  onSuccess: jest.fn(),
  onCancel: jest.fn(),
};

describe("NewSessionForm UI", () => {
  test("保存ボタンが表示される", () => {
    render(<NewSessionForm {...dummyProps} />);
    expect(screen.getByText("セッションを保存")).toBeInTheDocument();
  });

  test("保存ボタンを押せる", () => {
    render(<NewSessionForm {...dummyProps} />);
    fireEvent.click(screen.getByText("セッションを保存"));
  });

  test("入力欄に値を入力できる", () => {
    render(<NewSessionForm {...dummyProps} />);

    const inputs = screen.getAllByRole("spinbutton");

    fireEvent.change(inputs[0], { target: { value: "1000" } });
    fireEvent.change(inputs[1], { target: { value: "1500" } });
    fireEvent.change(inputs[2], { target: { value: "200" } });

    expect(inputs[0]).toHaveValue(1000);
    expect(inputs[1]).toHaveValue(1500);
    expect(inputs[2]).toHaveValue(200);
  });

  test("ゲームタイプの切り替えができる", () => {
    render(<NewSessionForm {...dummyProps} />);

    const ringButton = screen.getByRole("button", { name: /リングゲーム/ });

    fireEvent.click(ringButton);

    expect(ringButton.className).toMatch(/border-green-500/);
  });
});
