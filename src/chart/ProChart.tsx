"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
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

  // 📌 Register plugins (zoom only client-side)
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const zoomPlugin = (await import("chartjs-plugin-zoom")).default;
        ChartJS.register(zoomPlugin);
      }
    })();
  }, []);

  ChartJS.register(
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
        borderColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "#facc15";
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(34,197,94,1)"); // Green
          gradient.addColorStop(1, "rgba(239,68,68,1)"); // Red
          return gradient;
        },
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
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#facc15",
        bodyColor: "#fff",
        callbacks: {
          title: (items: any) => `Time: ${items[0].label}`,
          label: (ctx: any) => {
            if (ctx.dataset.type === "bar") {
              return `Volume: ${ctx.parsed.y.toLocaleString()}`;
            }
            return `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`;
          },
        },
      },
      zoom: {
        pan: { enabled: true, mode: "x", modifierKey: "shift" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
      },
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
          ...supportLevels.reduce((acc, lvl, i) => ({
            ...acc,
            [`support-${i}`]: {
              type: "line",
              yMin: lvl,
              yMax: lvl,
              borderColor: "#10b981",
              borderWidth: 1,
              borderDash: [4, 4],
              label: { enabled: true, content: `Support ${i + 1}`, position: "start" },
            },
          }), {}),
          ...resistanceLevels.reduce((acc, lvl, i) => ({
            ...acc,
            [`resistance-${i}`]: {
              type: "line",
              yMin: lvl,
              yMax: lvl,
              borderColor: "#ef4444",
              borderWidth: 1,
              borderDash: [4, 4],
              label: { enabled: true, content: `Resistance ${i + 1}`, position: "start" },
            },
          }), {}),
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: { tooltipFormat: "MMM dd HH:mm", displayFormats: { minute: "HH:mm", hour: "HH:mm", day: "yyyy-MM-dd" } },
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9ca3af", callback: (v: number) => `$${v.toLocaleString()}` },
        grid: { color: "rgba(255,255,255,0.05)" },
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
