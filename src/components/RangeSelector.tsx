type Props = {
  active: number;
  onSelect: (days: number) => void;
};

const RangeSelector = ({ active, onSelect }: Props) => {
  const ranges = [
    { label: "1D", days: 1 },
    // { label: "3D", days: 3 },
    { label: "7D", days: 7 },
    { label: "2W", days: 14 },
    { label: "1M", days: 30 },
    { label: "3M", days: 90 },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {ranges.map((r) => (
        <button
          key={r.days}
          onClick={() => onSelect(r.days)}
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            border border-transparent
            ${active === r.days 
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"}
          `}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};

export default RangeSelector;
