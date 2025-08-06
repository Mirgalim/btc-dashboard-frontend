"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BollingerData {
  timestamp: string;
  Upper: number;
  Lower: number;
}

export default function BollingerChart({ data }: { data: BollingerData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Bollinger Bands</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Upper" stroke="#ff7300" dot={false} />
          <Line type="monotone" dataKey="Lower" stroke="#387908" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
