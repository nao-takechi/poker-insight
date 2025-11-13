import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Zod 拡張実行
extendZodWithOpenApi(z);

export const sessionDomainSchema = z.object({
  type: z.enum(["tournament", "ring"]),
  buyIn: z.number().int().nonnegative(),
  result: z.number().int(),
  otherCost: z.number().int().optional(),
  note: z.string().optional(),
  createdAt: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), {
      message: "Invalid datetime format",
    })
    .optional(),
});
