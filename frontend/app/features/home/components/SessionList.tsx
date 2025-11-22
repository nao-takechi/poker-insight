import { sessionResponseSchema } from "@shared/schema/api/sessionApiSchema";
import { Trophy } from "lucide-react";
import { z } from "zod";

import { SessionCard } from "./SessionCard";

export type SessionResponse = z.infer<typeof sessionResponseSchema>;

type Props = {
  sessions: SessionResponse[];
};

export function SessionList({ sessions }: Props) {
  return (
    <section>
      <div className="bg-white rounded-3xl shadow-md p-6">
        {/* 見出し */}
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} color="#e9c273" />
          <h2 className="text-secondary text-sm">最近のセッション</h2>
        </div>
        {/* カードリスト */}
        <div className="flex flex-col gap-4">
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
