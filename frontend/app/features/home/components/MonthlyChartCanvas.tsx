"use client";

import { useEffect, useRef } from "react";
import { initMonthlyChart } from "../hooks/useMonthlyChart";
import { MonthlyStatsResponse } from "./TrendSection";

type Props = {
  monthly: MonthlyStatsResponse | undefined;
};

export function MonthlyChartCanvas({ monthly }: Props) {
  // Chart.js を適用する <canvas> 要素の参照
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // canvas がまだ DOM に存在しない場合は何もしない
    if (!canvasRef.current) return;

    // データ未取得・空配列のときは描画しない
    if (!monthly || monthly.length === 0) return;

    // Chart.js の初期化（描画）
    const chart = initMonthlyChart(canvasRef.current, monthly);

    // コンポーネントのアンマウント時にグラフを破棄
    return () => {
      chart?.destroy();
    };
  }, [monthly]); // monthly が変わるたびにグラフを再描画

  return <canvas ref={canvasRef} className="w-full h-40"></canvas>;
}
