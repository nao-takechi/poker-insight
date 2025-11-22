"use client";

import { monthlyStatsResponseSchema } from "@shared/schema/api/statsApiSchema";
import { TrendingUp } from "lucide-react";
import { z } from "zod";
import { MonthlyChartCanvas } from "./MonthlyChartCanvas";

export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;

type Props = {
  monthly?: MonthlyStatsResponse;
};

export function TrendSection({ monthly }: Props) {
  return (
    <section>
      {!monthly ? (
        <div className="text-center text-gray-500">読み込み中...</div>
      ) : (
        <figure className="bg-white rounded-2xl shadow p-6">
          {/* 見出し */}
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} color="#64b5a6" />
            <figcaption className="text-secondary text-sm">
              月ごとの収支推移
            </figcaption>
          </div>

          {/* グラフ */}
          <MonthlyChartCanvas monthly={monthly} />
        </figure>
      )}
    </section>
  );
}
