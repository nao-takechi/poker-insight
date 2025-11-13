"use client";

import { sessionDomainSchema } from "@shared/schema/domain/sessionDomainSchema";
import Button from "app/components/Button";
import { useState } from "react";

export default function Sessions() {
  const [type, setType] = useState<"tournament" | "ring">("tournament");
  const [buyIn, setBuyIn] = useState("");
  const [result, setResult] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [note, setNote] = useState("");

  const baseCard =
    "border border-gray-300 hover:border-blue-400 transition-colors rounded-2xl h-[150px] flex flex-col items-center justify-center w-full cursor-pointer bg-white shadow-sm hover:shadow-md";

  const text =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const submit = async () => {
    // --- 1. 型チェック（Zod） ---
    const parsed = sessionDomainSchema.safeParse({
      type,
      buyIn: Number(buyIn),
      result: Number(result),
      otherCost: otherCost ? Number(otherCost) : undefined,
      note,
      createdAt: new Date().toISOString(),
    });

    if (!parsed.success) {
      console.error(parsed.error);
      alert("入力内容に誤りがあります");
      return;
    }

    // --- 2. バックエンドへPOST ---
    const res = await fetch("http://127.0.0.1:8080/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      alert("保存に失敗しました");
      return;
    }

    alert("保存成功！");
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">新規セッション</h1>
        <p className="text-gray-600 text-sm">
          最新のポーカーセッションを記録しましょう。
        </p>
      </div>

      {/* セッションタイプ */}
      <section className="space-y-4">
        <label className="block text-gray-700 font-semibold">
          セッションタイプ
        </label>
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

      {/* 数値入力 */}
      <section className="space-y-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">投資</label>
          <input
            type="number"
            className={text}
            value={buyIn}
            onChange={(e) => setBuyIn(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">回収</label>
          <input
            type="number"
            className={text}
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            その他コスト
          </label>
          <input
            type="number"
            className={text}
            value={otherCost}
            onChange={(e) => setOtherCost(e.target.value)}
          />
        </div>
      </section>

      {/* メモ */}
      <section>
        <label className="block text-gray-700 font-semibold mb-1">メモ</label>
        <textarea
          rows={4}
          className={text}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>

      {/* 保存ボタン */}
      <div className="pt-4">
        <Button onClick={submit} variant="primary">
          保存する
        </Button>
      </div>
    </div>
  );
}
