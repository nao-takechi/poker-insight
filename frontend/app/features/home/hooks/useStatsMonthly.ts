"use client";

import { monthlyStatsResponseSchema } from "@shared/schema/api/statsApiSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

import { fetchStatsMonthly } from "../api/fetchStatsMonthly";

export type MonthlyStatsResponse = z.infer<typeof monthlyStatsResponseSchema>;

export function useStatsMonthly() {
  const [monthly, setMonthly] = useState<MonthlyStatsResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatsMonthly()
      .then(setMonthly)
      .finally(() => setLoading(false));
  }, []);

  return { monthly, loading };
}
