"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MAData {
  timestamp: string;
  SMA: number;
  EMA: number;
  WMA: number;
}

export default function MAChart({ data }: { data: MAData[] }) {
  if (!data || data.length === 0) return null;

  const allValues = data.flatMap((d) => [d.SMA, d.EMA, d.WMA]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Moving Averages</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis
            domain={[Math.floor(minValue), Math.ceil(maxValue)]}
            width={60}
            tick={{ fill: "#ccc" }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="SMA" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="EMA" stroke="#82ca9d" dot={false} />
          <Line type="monotone" dataKey="WMA" stroke="#ffc658" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
