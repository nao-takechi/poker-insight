"use client";

import { useRouter } from "next/navigation";
import { FabButton } from "../components/FabButton";
import { SessionList } from "../components/SessionList";
import { SummarySection } from "../components/SummarySection";
import { TrendSection } from "../components/TrendSection";
import { useRecentSessions } from "../hooks/useRecentSessions";
import { useStatsMonthly } from "../hooks/useStatsMonthly";
import { useStatsSummary } from "../hooks/useStatsSummary";

export function HomePage() {
  const router = useRouter();
  const { sessions } = useRecentSessions();
  const { summary } = useStatsSummary();
  const { monthly } = useStatsMonthly();

  return (
    <div className="relative min-h-screen bg-gray-50 p-6 pb-28">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Poker Insight</h1>
        <p className="text-gray-600 mt-2">
          あなたのポーカージャーニーを記録しよう
        </p>
        <p className="text-gray-600 mt-2">
          ※現在ユーザ登録機能は未実装のため、データはすべてデモ用です
        </p>
        <p className="text-gray-600">
          ※誰でも追加／削除して構いません（定期的にリセットします）
        </p>
      </header>

      <SummarySection summary={summary} />

      <TrendSection monthly={monthly} />

      <SessionList sessions={sessions} />

      <FabButton onClick={() => router.push("/sessions/new")} />
    </div>
  );
}
