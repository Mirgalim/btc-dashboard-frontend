import { Metric } from "@/types/dashboard";
import { formatCurrency, formatNumber } from "@/lib/formatter";

type Props = {
  metric: Metric;
};

const MetricCard = ({ metric }: Props) => {
  const formatted =
    metric.format === "currency"
      ? formatCurrency(metric.value)
      : formatNumber(metric.value);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
      <h4 className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</h4>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{formatted}</p>
    </div>
  );
};

export default MetricCard;
