import { z } from "zod";

export const sessionSchema = z.object({
  type: z.enum(["tournament", "ring"]),
  buyIn: z.number().nonnegative(),
  result: z.number().nonnegative(),
  cost: z.number().nonnegative().optional(),
  memo: z.string().optional(),
});

export type SessionInput = z.infer<typeof sessionSchema>;
