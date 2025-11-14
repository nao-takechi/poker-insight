import { sessionDomainSchema } from "@shared/schema/domain/sessionDomainSchema";
import { useState } from "react";
import { createSession } from "./sessionApi";

export function useSessionForm() {
  const [type, setType] = useState<"tournament" | "ring">("tournament");
  const [buyIn, setBuyIn] = useState("");
  const [result, setResult] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [note, setNote] = useState("");
  const validate = () => {
    return sessionDomainSchema.safeParse({
      type,
      buyIn: Number(buyIn),
      result: Number(result),
      otherCost: otherCost ? Number(otherCost) : undefined,
      note,
      createdAt: new Date().toISOString(),
    });
  };
  const submit = async () => {
    const parsed = validate();
    if (!parsed.success) {
      return { ok: false, error: parsed.error };
    }
    await createSession(parsed.data);
    return { ok: true };
  };
  return {
    type,
    setType,
    buyIn,
    setBuyIn,
    result,
    setResult,
    otherCost,
    setOtherCost,
    note,
    setNote,
    submit,
  };
}
