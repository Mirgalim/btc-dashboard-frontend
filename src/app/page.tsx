"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib/api";
import MetricCard from "@/components/MetricCard";
import ChartContainer from "@/components/ChartContainer";
import InsightBlock from "@/components/InsightBlock";
import Loading from "@/components/Loading";
import RangeSelector from "@/components/RangeSelector";

// 📊 Шинэ Chart component-ууд
import MAChart from "@/chart/MAChart";
import RSIChart from "@/chart/RSIChart";
import MACDChart from "@/chart/MACDChart";
import VolumeChart from "@/chart/VolumeChart";
import BollingerChart from "@/chart/BollingerChart";
import MVRVChart from "@/chart/MVRVChart";
import MacroStats from "@/chart/MacroStats";

import type { DashboardData, Metric } from "@/types/dashboard";
import PriceHistoryTable from "@/components/PriceHistoryTable";
import ProChart from "@/chart/ProChart";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [activeRange, setActiveRange] = useState(90);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(activeRange);
  }, [activeRange]);

  const buildMetricsFromSummary = (
    summary: DashboardData["summary"]
  ): Metric[] => {
    return [
      {
        key: "current",
        label: "Bitcoin Current Price",
        value: summary.current_price,
        format: "currency",
      },
      {
        key: "max",
        label: "Max Price",
        value: summary.max,
        format: "currency",
      },
      {
        key: "min",
        label: "Min Price",
        value: summary.min,
        format: "currency",
      },
      {
        key: "average",
        label: "Average Price",
        value: summary.average,
        format: "currency",
      },
      {
        key: "median",
        label: "Median",
        value: summary.median,
        format: "currency",
      },
      {
        key: "volatility",
        label: "Volatility",
        value: summary.volatility,
        format: "number",
      },
    ];
  };

  const fetchData = async (days: number) => {
    setLoading(true);
    try {
      const res = await getDashboardData(days);
      const metrics = buildMetricsFromSummary(res.summary);
      setData({ ...res, metrics });
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Bitcoin Analytics Dashboard
      </h1>

      <RangeSelector
        active={activeRange}
        onSelect={(days) => setActiveRange(days)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 ">
          <ProChart
            data={data.chart}
            volumeData={data.volume.values.map((v) => ({
              label: v.timestamp,
              value: v.volume,
            }))}
            smaData={data.ma.values.map((d) => ({
              label: d.timestamp,
              value: d.SMA,
            }))}
            emaData={data.ma.values.map((d) => ({
              label: d.timestamp,
              value: d.EMA,
            }))}
            currentPrice={data.summary.current_price}
            supportLevels={[30000, 35000]}
            resistanceLevels={[40000, 42000]}
          />
          {/* <ChartContainer data={data.chart} /> */}
        </div>

        <div className="lg:col-span-1 flex flex-col justify-between items-start gap-6">
          <MacroStats data={data.macro} />
          <PriceHistoryTable data={data.price_history} />
        </div>
      </div>
      <InsightBlock insight={data.insight} news={data.news} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MAChart data={data.ma.values} />
        <RSIChart data={data.rsi.values} />
        <MACDChart data={data.macd.values} />
        <VolumeChart data={data.volume.values} />
        <BollingerChart data={data.bollinger.values} />
        <MVRVChart data={data.mvrv.values} />
      </div>
    </div>
  );
}
