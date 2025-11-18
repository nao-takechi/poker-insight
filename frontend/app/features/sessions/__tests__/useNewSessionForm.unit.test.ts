import { act, renderHook } from "@testing-library/react";
import { createSession } from "../api/createSession";
import { useNewSessionForm } from "../hooks/useNewSessionForm";

jest.mock("../api/createSession", () => ({
  createSession: jest.fn(),
}));

describe("useNewSessionForm (Unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ① 正常系：バリデーション成功 → createSession を呼ぶ
  test("submit() はバリデーション成功時に createSession を呼び出す", async () => {
    const { result } = renderHook(() => useNewSessionForm());

    act(() => {
      result.current.setType("ring");
      result.current.setBuyIn("1000");
      result.current.setResult("1500");
      result.current.setOtherCost("200");
      result.current.setNote("memo");
    });

    await act(async () => {
      const res = await result.current.submit();
      expect(res.ok).toBe(true);
    });

    expect(createSession).toHaveBeenCalled();
  });

  // ② 異常系：バリデーション失敗 → createSession を呼ばない
  test("バリデーション失敗時は createSession を呼ばない", async () => {
    const { result } = renderHook(() => useNewSessionForm());

    act(() => {
      result.current.setBuyIn("abc");
      result.current.setResult("abc");
    });

    await act(async () => {
      const res = await result.current.submit();
      expect(res.ok).toBe(false);
    });

    expect(createSession).not.toHaveBeenCalled();
  });

  // ③ 正常系：payload が正しく createSession に渡される
  test("createSession に正しい payload が渡される", async () => {
    const mockDate = "2025-01-01T00:00:00Z";
    jest.spyOn(global.Date.prototype, "toISOString").mockReturnValue(mockDate);

    const { result } = renderHook(() => useNewSessionForm());

    act(() => {
      result.current.setType("ring");
      result.current.setBuyIn("1000");
      result.current.setResult("1500");
      result.current.setOtherCost("200");
      result.current.setNote("test note");
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(createSession).toHaveBeenCalledWith({
      type: "ring",
      buyIn: 1000,
      result: 1500,
      otherCost: 200,
      note: "test note",
      createdAt: mockDate,
    });
  });
});
