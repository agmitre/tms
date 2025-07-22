interface Props {
  priority: "low" | "medium" | "high";
}

export default function PriorityBadge({ priority }: Props) {
  const colorMap = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-semibold ${colorMap[priority]}`}
    >
      {priority.toUpperCase()}
    </span>
  );
}
