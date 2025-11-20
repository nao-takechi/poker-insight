import Chart from "chart.js/auto";
import { MonthlyStatsResponse } from "../components/TrendSection";

/**
 * 月ごとの収支グラフを初期化する関数。
 * 副作用（Chart.js描画）は React hook 側 useEffect で呼び出す。
 */
export function initMonthlyChart(
  canvas: HTMLCanvasElement,
  monthly: MonthlyStatsResponse
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // "2025-11" → "11月" に整形（表示用ラベル）
  const labels = monthly.map((m) => {
    const [, month] = m.month.split("-");
    return `${Number(month)}月`;
  });

  // 月ごとの収支データ
  const data = monthly.map((m) => m.profit);

  // プラスは緑、マイナスは赤で色分け
  const colors = data.map((value) =>
    value >= 0 ? "rgba(75, 181, 167, 0.8)" : "rgba(222, 97, 113, 0.8)"
  );

  // Chart.js のバーグラフを生成
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderRadius: 8,
          borderSkipped: false, // 角丸を有効
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }, // 凡例は不要なので非表示
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: "#e5e7eb" }, // グリッド線（薄いグレー）
          ticks: { color: "#6b7280" }, // 目盛り文字色（gray-500）
        },
        x: {
          ticks: { color: "#6b7280" }, // x軸ラベルの色
        },
      },
    },
  });
}
