interface Props {
  completed: boolean;
}

export default function StatusPill({ completed }: Props) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        completed ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
      }`}
    >
      {completed ? "Completed" : "Pending"}
    </span>
  );
}
