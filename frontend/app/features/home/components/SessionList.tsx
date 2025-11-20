import { sessionResponseSchema } from "@shared/schema/api/sessionApiSchema";
import { z } from "zod";

import { SessionCard } from "./SessionCard";

export type SessionResponse = z.infer<typeof sessionResponseSchema>;

type Props = {
  sessions: SessionResponse[];
};

export function SessionList({ sessions }: Props) {
  return (
    <section className="mt-8">
      {/* セクションタイトル */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <h2 className="text-xl font-semibold">最近のセッション</h2>
      </div>

      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} />
      ))}
    </section>
  );
}
