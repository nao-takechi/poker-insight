import { act, renderHook } from "@testing-library/react";
import { createSession } from "../sessionApi";
import { useSessionForm } from "../useSessionForm";

jest.mock("../sessionApi", () => ({
  createSession: jest.fn(),
}));

describe("useSessionForm", () => {
  test("submit が createSession を呼ぶ", async () => {
    const { result } = renderHook(() => useSessionForm());

    act(() => {
      result.current.setType("ring");
      result.current.setBuyIn("1000");
      result.current.setResult("1500");
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(createSession).toHaveBeenCalled();
  });
});
