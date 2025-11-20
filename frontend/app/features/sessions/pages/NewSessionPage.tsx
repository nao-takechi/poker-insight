"use client";

import { useRouter } from "next/navigation";
import { NewSessionForm } from "../components/NewSessionForm";

export function NewSessionPage() {
  const router = useRouter();

  return (
    <NewSessionForm
      onSuccess={() => router.push("/")}
      onCancel={() => router.push("/")}
    />
  );
}
