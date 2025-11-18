"use client";

export function TrendSection() {
  return (
    <section aria-labelledby="trend-heading" className="mb-20">
      <h2 id="trend-heading" className="text-xl font-semibold mb-4">
        月ごとの収支推移
      </h2>

      <figure className="bg-white p-4 rounded-2xl shadow-md">
        <canvas id="monthlyChart" className="w-full h-40"></canvas>
        <figcaption className="text-sm text-gray-500 mt-2">
          月ごとの収支推移のグラフ
        </figcaption>
      </figure>
    </section>
  );
}
