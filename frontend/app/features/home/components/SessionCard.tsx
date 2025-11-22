import { formatDate } from "@/../lib/utils/format";
import { sessionResponseSchema } from "@shared/schema/api/sessionApiSchema";
import { z } from "zod";

export type SessionResponse = z.infer<typeof sessionResponseSchema>;

export function SessionItem({ session }: { session: SessionResponse }) {
  return <span>{formatDate(session.createdAt)}</span>;
}

export function SessionCard({ session }: { session: SessionResponse }) {
  const profit = session.result - session.buyIn;
  const isPlus = profit >= 0;

  return (
    <article className="bg-[#fbfbf9] rounded-3xl p-5 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-secondary">
            {session.type === "tournament" ? "トーナメント" : "リング"}
          </h3>
          <p className="text-secondary text-[12px]">
            {formatDate(session.createdAt)}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isPlus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {isPlus
            ? `+¥${profit.toLocaleString()}`
            : `¥${profit.toLocaleString()}`}
        </span>
      </div>

      <div className="grid grid-cols-2 text-sm mb-3">
        <div>
          <p className="text-secondary text-[12px]">投資額</p>
          <p className="text-primary font-medium">
            ¥{session.buyIn.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-secondary text-[12px]">回収額</p>
          <p className="text-primary font-medium">
            ¥{session.result.toLocaleString()}
          </p>
        </div>
      </div>

      {session.note && (
        <p className="text-secondary text-sm mt-2 whitespace-pre-line">
          {session.note}
        </p>
      )}
    </article>
  );
}
