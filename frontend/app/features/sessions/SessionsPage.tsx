"use client";

import { SessionsForm } from "./SessionsForm";

export function SessionsPage() {
  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">新規セッション</h1>
      <p className="text-gray-600">最新のポーカーセッションを記録</p>
      <SessionsForm />
    </div>
  );
}
