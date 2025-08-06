"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MVRVData {
  timestamp: string;
  MVRV: number;
}

export default function MVRVChart({ data }: { data: MVRVData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">MVRV Ratio</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="MVRV" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
