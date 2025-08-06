"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MACDData {
  timestamp: string;
  MACD: number;
  Signal: number;
}

export default function MACDChart({ data }: { data: MACDData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">MACD</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="MACD" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="Signal" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
