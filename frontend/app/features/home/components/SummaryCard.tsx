"use client";

type Props = {
  label: string;
  value: string | number;
};

export function SummaryCard({ label, value }: Props) {
  return (
    <article className="bg-white p-5 rounded-2xl shadow flex flex-col gap-1">
      <h3 className="text-gray-600 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </article>
  );
}
