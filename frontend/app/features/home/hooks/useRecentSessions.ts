"use client";

import { sessionResponseSchema } from "@shared/schema/api/sessionApiSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

import { fetchRecentSessions } from "../api/fetchRecentSessions";

export type SessionResponse = z.infer<typeof sessionResponseSchema>;

export function useRecentSessions() {
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentSessions()
      .then(setSessions)
      .finally(() => setLoading(false));
  }, []);

  return { sessions, loading };
}
