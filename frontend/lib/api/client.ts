import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080";

export async function apiFetch<T>(
  path: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const raw = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid response schema");
  }

  return parsed.data;
}
