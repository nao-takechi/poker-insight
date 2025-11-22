"use client";

import { monthlyStatsResponseSchema } from "@shared/schema/api/statsApiSchema";
import { z } from "zod";
import { MonthlyChartCanvas } from "./MonthlyChartCanvas";

export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;

type Props = {
  monthly?: MonthlyStatsResponse;
};

export function TrendSection({ monthly }: Props) {
  return (
    <section className="mb-20">
      {!monthly ? (
        <div>読み込み中...</div>
      ) : (
        <figure className="bg-white p-6 flex-col rounded-2xl shadow-md">
          <figcaption className="text-secondary text-sm mb-2">
            💹 月ごとの収支推移
          </figcaption>
          <MonthlyChartCanvas monthly={monthly} />
        </figure>
      )}
    </section>
  );
}
