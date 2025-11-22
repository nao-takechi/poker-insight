"use client";

import { monthlyStatsResponseSchema } from "@shared/schema/api/statsApiSchema";
import { z } from "zod";
import { MonthlyChartCanvas } from "./MonthlyChartCanvas";

export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;

type Props = {
  monthly: MonthlyStatsResponse | undefined;
};

export function TrendSection({ monthly }: Props) {
  if (!monthly) {
    return (
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-4">月ごとの収支推移</h2>
        <div className="">読み込み中...</div>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <h2 className="text-xl font-semibold mb-4">月ごとの収支推移</h2>

      <figure className="bg-white p-4 rounded-2xl shadow-md">
        <figcaption className="text-sm mb-2">月ごとの収支推移</figcaption>

        <MonthlyChartCanvas monthly={monthly} />
      </figure>
    </section>
  );
}
