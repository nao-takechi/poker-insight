import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T>(
  path: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  let raw: unknown = null;
  try {
    raw = await res.json();
  } catch (_) {
    throw new Error("Invalid JSON response");
  }

  if (!res.ok) {
    console.error("API Error Response:", raw);
    throw new Error(`API Error: ${res.status}`);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    console.error("Zod Schema Error:", parsed.error);
    throw new Error("Invalid response schema");
  }

  return parsed.data;
}
