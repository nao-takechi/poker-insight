import { z } from "zod";

//  GET /api/stats/summary
export const statsSummarySchema = z.object({
  sessionCount: z.number(), // セッション数
  totalProfit: z.number(), // 総収支
  averageProfit: z.number(), // 平均収支
  winRate: z.number(), // 勝率 (0〜1)
});

export type StatsSummary = z.infer<typeof statsSummarySchema>;

// GET /api/stats/monthly
export const monthlyStatSchema = z.object({
  month: z.string(), // "2025-11" 形式
  profit: z.number(), // その月の収支
});

export const monthlyStatsResponseSchema = z.array(monthlyStatSchema);

export type MonthlyStat = z.infer<typeof monthlyStatSchema>;
export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;
