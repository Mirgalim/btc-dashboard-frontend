"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface VolumeData {
  timestamp: string;
  volume: number;
}

export default function VolumeChart({ data }: { data: VolumeData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Trading Volume</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="volume" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
