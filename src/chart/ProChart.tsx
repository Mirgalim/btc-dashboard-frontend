"use client";

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  BarController,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useEffect, useState, useRef } from "react";
import { ChartData as PriceData } from "@/types/dashboard";

// ✅ ChartJS plugins-ийг render-ээс гадуур нэг удаа бүртгэх
ChartJS.register(
  LineController,
  BarController,
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  annotationPlugin
);

type Props = {
  data: PriceData[];
  volumeData?: { label: string; value: number }[];
  smaData?: { label: string; value: number }[];
  emaData?: { label: string; value: number }[];
  currentPrice?: number;
  supportLevels?: number[];
  resistanceLevels?: number[];
};

export default function ProChart({
  data,
  volumeData,
  smaData,
  emaData,
  currentPrice,
  supportLevels = [],
  resistanceLevels = [],
}: Props) {
  const chartRef = useRef<any>(null);
  const [livePrice, setLivePrice] = useState<number | null>(currentPrice || null);

  if (!data || data.length === 0) return null;

  // 📡 Real-time price (Binance WebSocket)
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setLivePrice(parseFloat(msg.p));
    };
    return () => ws.close();
  }, []);

  const labels = data.map((d) => d.label);

  const chartData: any = {
    labels,
    datasets: [
      {
        type: "line",
        label: "BTC Price",
        data: data.map((d) => d.value),
        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
      smaData && {
        type: "line",
        label: "SMA",
        data: smaData.map((d) => d.value),
        borderColor: "#3b82f6",
        borderWidth: 1.2,
        tension: 0.25,
        pointRadius: 0,
      },
      emaData && {
        type: "line",
        label: "EMA",
        data: emaData.map((d) => d.value),
        borderColor: "#10b981",
        borderWidth: 1.2,
        tension: 0.25,
        pointRadius: 0,
      },
      volumeData && {
        type: "bar",
        label: "Volume",
        data: volumeData.map((v) => v.value),
        backgroundColor: "rgba(156,163,175,0.3)",
        yAxisID: "yVolume",
        borderRadius: 2,
      },
    ].filter(Boolean),
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { labels: { color: "#9ca3af" } },
      annotation: {
        annotations: {
          ...(livePrice && {
            live: {
              type: "line",
              yMin: livePrice,
              yMax: livePrice,
              borderColor: "#facc15",
              borderWidth: 1,
              borderDash: [4, 4],
              label: {
                enabled: true,
                content: `Live: $${livePrice.toLocaleString()}`,
                position: "end",
                backgroundColor: "#111",
                color: "#facc15",
              },
            },
          }),
        },
      },
    },
    scales: {
      x: {
        type: "time",
        ticks: { color: "#9ca3af" },
      },
      y: {
        ticks: { color: "#9ca3af", callback: (v: number) => `$${v.toLocaleString()}` },
      },
      yVolume: { position: "right", ticks: { color: "#9ca3af" }, grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow h-[500px]">
      <Chart ref={chartRef} type="line" data={chartData} options={options} />
    </div>
  );
}
