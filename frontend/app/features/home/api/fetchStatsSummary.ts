import { apiFetch } from "@/../lib/api/client";
import { statsSummarySchema } from "@shared/schema/api/statsApiSchema";
import { z } from "zod";

export type StatsSummary = z.infer<typeof statsSummarySchema>;

export async function fetchStatsSummary(): Promise<StatsSummary> {
  return apiFetch("/api/stats/summary", statsSummarySchema);
}
