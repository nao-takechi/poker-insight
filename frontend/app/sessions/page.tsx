"use client";
import Button from "@/components/Button";

export default function Sessions() {
  const baseCard =
    "border border-gray-300 hover:border-blue-400 transition-colors rounded-2xl h-[150px] flex flex-col items-center justify-center w-full cursor-pointer bg-white shadow-sm hover:shadow-md";
  const text =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">新規セッション</h1>
        <p className="text-gray-600 text-sm">
          最新のポーカーセッションを記録しましょう。
        </p>
      </div>

      <section className="space-y-4">
        <label className="block text-gray-700 font-semibold">
          セッションタイプ
        </label>
        <div className="flex gap-4">
          <div className={baseCard}>トーナメント</div>
          <div className={baseCard}>リングゲーム</div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">投資</label>
          <input type="number" placeholder="例: 5000" className={text} />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">回収</label>
          <input type="number" placeholder="例: 8500" className={text} />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            その他コスト
          </label>
          <input type="number" placeholder="例: 1000" className={text} />
        </div>
      </section>

      <section>
        <label className="block text-gray-700 font-semibold mb-1">メモ</label>
        <textarea
          rows={4}
          placeholder="セッションの状況や気づきなどをメモできます。"
          className={text}
        />
      </section>

      <div className="pt-4">
        <Button onClick={() => console.log("保存")} variant="primary">
          保存する
        </Button>
      </div>
    </div>
  );
}
