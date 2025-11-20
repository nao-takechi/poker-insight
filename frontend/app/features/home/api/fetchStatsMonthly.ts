import { apiFetch } from "@/../lib/api/client";
import { monthlyStatsResponseSchema } from "@shared/schema/api/statsApiSchema";
import { z } from "zod";

export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;

export async function fetchStatsMonthly(): Promise<MonthlyStatsResponse> {
  return apiFetch("/api/stats/monthly", monthlyStatsResponseSchema);
}
