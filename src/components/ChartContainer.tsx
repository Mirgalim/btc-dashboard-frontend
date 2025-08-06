"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { ChartData } from "@/types/dashboard";
import { useEffect } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

type Props = {
  data: ChartData[];
  currentPrice?: number;
};

const ChartContainer = ({ data, currentPrice }: Props) => {
  useEffect(() => {
    (async () => {
      const zoom = (await import("chartjs-plugin-zoom")).default;
      ChartJS.register(zoom);
    })();
  }, []);

  const chartData = {
    labels: data?.map((d) => d.label) || [],
    datasets: [
      {
        label: "Bitcoin Price",
        data: data?.map((d) => d.value) || [],
        borderColor: "#facc15",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(250, 204, 21, 0.4)");
          gradient.addColorStop(1, "rgba(250, 204, 21, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.25,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#facc15",
        bodyColor: "#fff",
        callbacks: {
          label: (ctx: any) =>
            ` $${ctx.parsed.y?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
      },
      annotation: currentPrice
        ? {
            annotations: {
              baseline: {
                type: "line",
                yMin: currentPrice,
                yMax: currentPrice,
                borderColor: "#d1d5db",
                borderWidth: 1,
                borderDash: [4, 4],
              },
            },
          }
        : {},
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "MMM dd HH:mm",
          displayFormats: {
            minute: "HH:mm",
            hour: "HH:mm",
            day: "yyyy-MM-dd",
          },
        },
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value: number) =>
            `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartContainer;
