"use client";

import { SummaryCard } from "./SummaryCard";

export function SummarySection() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard label="勝率" value="58%" />
        <SummaryCard label="総収支" value="¥98,500" />
        <SummaryCard label="平均収支" value="¥4,104" />
        <SummaryCard label="セッション数" value="24" />
      </div>
    </section>
  );
}
