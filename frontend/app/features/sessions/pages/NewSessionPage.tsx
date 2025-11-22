"use client";

import { useRouter } from "next/navigation";
import { NewSessionForm } from "../components/NewSessionForm";

export function NewSessionPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="heading-primary font-eng">新規セッション</h1>
        <p className="text-secondary mt-2">最新のポーカーセッションを記録</p>
      </header>
      <NewSessionForm
        onSuccess={() => router.push("/")}
        onCancel={() => router.push("/")}
      />
    </div>
  );
}
