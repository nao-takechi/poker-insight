// shared/schema/api/sessionApiSchema.ts
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { sessionDomainSchema } from "../domain/sessionDomainSchema";

extendZodWithOpenApi(z);

// -------------------------------------------------------------
// 🟦 POST /sessions → SessionInput
// -------------------------------------------------------------
export const sessionInputSchema = sessionDomainSchema.openapi("SessionInput");

export type SessionInput = z.infer<typeof sessionInputSchema>;

// -------------------------------------------------------------
// 🟪 GET /sessions / POST response → SessionResponse
// -------------------------------------------------------------
export const sessionResponseSchema = sessionDomainSchema
  .extend({
    id: z.number().int(),
    createdAt: z
      .string()
      .refine((v) => !isNaN(Date.parse(v)), "Invalid datetime format"),
  })
  .openapi("SessionResponse");

export type SessionResponse = z.infer<typeof sessionResponseSchema>;
