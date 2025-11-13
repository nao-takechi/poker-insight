"use client";

import Button from "@/components/Button";
import { useSessionForm } from "./useSessionForm";

export default function Sessions() {
  const {
    type,
    setType,
    buyIn,
    setBuyIn,
    result,
    setResult,
    otherCost,
    setOtherCost,
    note,
    setNote,
    submit,
  } = useSessionForm();

  const baseCard =
    "border border-gray-300 hover:border-blue-400 transition-colors rounded-2xl h-[150px] flex flex-col items-center justify-center w-full cursor-pointer bg-white shadow-sm hover:shadow-md";

  const text =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const onSubmit = async () => {
    const result = await submit();
    if (!result.ok) {
      alert("入力に誤りがあります");
      return;
    }
    alert("保存成功！");
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-1">新規セッション</h1>

      <section>
        <div className="flex gap-4">
          <div
            className={`${baseCard} ${
              type === "tournament" ? "border-blue-500" : ""
            }`}
            onClick={() => setType("tournament")}
          >
            トーナメント
          </div>

          <div
            className={`${baseCard} ${
              type === "ring" ? "border-blue-500" : ""
            }`}
            onClick={() => setType("ring")}
          >
            リングゲーム
          </div>
        </div>
      </section>

      <input
        type="number"
        className={text}
        value={buyIn}
        onChange={(e) => setBuyIn(e.target.value)}
      />

      <input
        type="number"
        className={text}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />

      <input
        type="number"
        className={text}
        value={otherCost}
        onChange={(e) => setOtherCost(e.target.value)}
      />

      <textarea
        rows={4}
        className={text}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button onClick={onSubmit} variant="primary">
        保存する
      </Button>
    </div>
  );
}
