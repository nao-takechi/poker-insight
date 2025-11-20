import { apiFetch } from "@/../lib/api/client";
import {
  SessionInput,
  sessionResponseSchema,
} from "@shared/schema/api/sessionApiSchema";

export function createSession(data: SessionInput) {
  return apiFetch("/api/sessions", sessionResponseSchema, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
