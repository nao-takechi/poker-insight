"use client";

import { NewSessionForm } from "../components/NewSessionForm";

export function NewSessionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">新規セッション</h1>
      <p className="text-gray-600">最新のポーカーセッションを記録</p>
      <NewSessionForm />
    </div>
  );
}
