"use client";

import Button from "@/components/Button";

import { useRouter } from "next/navigation";
import { useNewSessionForm } from "../hooks/useNewSessionForm";

export function NewSessionForm() {
  const router = useRouter();
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
  } = useNewSessionForm();

  const handleSubmit = async () => {
    const res = await submit();
    if (!res.ok) {
      alert("入力に誤りがあります");
      return;
    }
    router.push("/");
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md space-y-8">
      {/* セッションタイプ */}
      <div className="space-y-2">
        <p className="font-medium text-gray-700">セッションタイプ</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setType("tournament")}
            className={`p-4 border rounded-xl flex flex-col items-center justify-center 
              ${
                type === "tournament"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
          >
            <span className="text-lg">🏆</span>
            <span>トーナメント</span>
          </button>

          <button
            onClick={() => setType("ring")}
            className={`p-4 border rounded-xl flex flex-col items-center justify-center 
              ${
                type === "ring"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
          >
            <span className="text-lg">💰</span>
            <span>リングゲーム</span>
          </button>
        </div>
      </div>

      {/* Buy In */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">バイイン（円）</label>
        <input
          type="number"
          value={buyIn}
          onChange={(e) => setBuyIn(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-gray-100"
        />
      </div>

      {/* Result */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">結果（円）</label>
        <input
          type="number"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-gray-100"
        />
      </div>

      {/* otherCost ← 戻した */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">
          その他費用（円・任意）
        </label>
        <input
          type="number"
          value={otherCost}
          onChange={(e) => setOtherCost(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-gray-100"
        />
      </div>

      {/* note */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">メモ（任意）</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-gray-100"
        />
      </div>

      {/* 保存 */}
      <Button
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl text-lg bg-green-500 hover:bg-green-600"
      >
        セッションを保存
      </Button>

      {/* キャンセル */}
      <Button
        onClick={() => router.push("/")}
        className="w-full py-4 rounded-xl text-lg"
      >
        キャンセル
      </Button>
    </div>
  );
}
