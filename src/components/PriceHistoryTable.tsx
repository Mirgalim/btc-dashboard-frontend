"use client";

type PriceHistoryRow = {
  label: string;
  amountChange: number;
  percentChange: number;
};

type Props = {
  data: PriceHistoryRow[];
};

export default function PriceHistoryTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        BTC Price History USD
      </h2>
      <table className="w-full text-sm">
        <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="text-left py-2">Date Comparison</th>
            <th className="text-right py-2">Amount Change</th>
            <th className="text-right py-2">% Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <td className="py-2 text-gray-900 dark:text-gray-100">
                {row.label}
              </td>
              <td
                className={`py-2 text-right font-medium ${
                  row.amountChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {row.amountChange >= 0
                  ? `$${row.amountChange.toLocaleString()}`
                  : `-$${Math.abs(row.amountChange).toLocaleString()}`}
              </td>
              <td
                className={`py-2 text-right font-medium ${
                  row.percentChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {row.percentChange >= 0
                  ? `+${row.percentChange.toFixed(2)}%`
                  : `${row.percentChange.toFixed(2)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
