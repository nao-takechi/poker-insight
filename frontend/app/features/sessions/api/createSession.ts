import { sessionDomainSchema } from "@shared/schema/domain/sessionDomainSchema";
import { z } from "zod";

// Zod から型を生成
export type SessionInput = z.infer<typeof sessionDomainSchema>;

export async function createSession(data: SessionInput) {
  const res = await fetch("http://127.0.0.1:8080/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create session");
  }

  return res.json();
}
