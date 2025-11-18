import { apiFetch } from "@/../lib/api/client";
import { sessionResponseSchema } from "@shared/schema/api/sessionApiSchema";
import { z } from "zod";

export type SessionResponse = z.infer<typeof sessionResponseSchema>;

export async function fetchRecentSessions(): Promise<SessionResponse[]> {
  return apiFetch("/api/sessions", sessionResponseSchema.array());
}
