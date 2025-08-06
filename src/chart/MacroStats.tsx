"use client";

interface MacroData {
  interest_rate: number;
  inflation: number;
  dxy: number;
}

export default function MacroStats({ data }: { data: MacroData }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Macro Indicators</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Interest Rate:</span>
          <span className="font-semibold">{data.interest_rate}%</span>
        </li>
        <li className="flex justify-between">
          <span>Inflation:</span>
          <span className="font-semibold">{data.inflation}%</span>
        </li>
        <li className="flex justify-between">
          <span>USD Index (DXY):</span>
          <span className="font-semibold">{data.dxy}</span>
        </li>
      </ul>
    </div>
  );
}
