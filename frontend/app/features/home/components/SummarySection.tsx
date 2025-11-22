"use client";
import { statsSummarySchema } from "@shared/schema/api/statsApiSchema";
import { z } from "zod";

import { SummaryCard } from "./SummaryCard";
export type StatsSummary = z.infer<typeof statsSummarySchema>;

type Props = {
  summary: StatsSummary | undefined;
};

export function SummarySection({ summary }: Props) {
  if (!summary) {
    return (
      <section>
        <div className="">読み込み中...</div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard
          label="勝率"
          value={`${Math.round(summary.winRate * 100)}%`}
        />

        <SummaryCard
          label="総収支"
          value={`¥${summary.totalProfit.toLocaleString()}`}
        />

        <SummaryCard
          label="平均収支"
          value={`¥${summary.averageProfit.toLocaleString()}`}
        />

        <SummaryCard
          label="セッション数"
          value={summary.sessionCount.toString()}
        />
      </div>
    </section>
  );
}
