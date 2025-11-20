"use client";

import { statsSummarySchema } from "@shared/schema/api/statsApiSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

import { fetchStatsSummary } from "../api/fetchStatsSummary";

export type StatsSummary = z.infer<typeof statsSummarySchema>;

export function useStatsSummary() {
  const [summary, setSummary] = useState<StatsSummary>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatsSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  return { summary, loading };
}
