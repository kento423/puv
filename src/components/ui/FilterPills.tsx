interface FilterPillsProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  getColor: (value: string, isSelected: boolean) => string;
  className?: string;
}

export default function FilterPills({
  options,
  selectedValues,
  onToggle,
  getColor,
  className = "",
}: FilterPillsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onToggle(option.value)}
          className={`px-3 py-1 text-xs rounded-full border transition-all font-medium whitespace-nowrap ${getColor(
            option.value,
            selectedValues.includes(option.value)
          )}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
