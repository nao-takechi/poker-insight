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
      <div className="flex flex-col gap-4 mb-4 p-6  bg-white rounded-2xl shadow-md">
        <h2 className="text-secondary text-sm">🏆 最近のセッション</h2>
        <div>
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
