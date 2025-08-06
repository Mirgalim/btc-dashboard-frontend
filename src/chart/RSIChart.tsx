"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface RSIData {
  timestamp: string;
  RSI: number;
}

export default function RSIChart({ data }: { data: RSIData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Relative Strength Index (RSI)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={30} stroke="green" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="RSI" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
