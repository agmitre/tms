interface Props {
  dueDate: string;
  completed: boolean;
}

export default function DueBadge({ dueDate, completed }: Props) {
  const today = new Date();
  const due = new Date(dueDate);
  const isOverdue = !completed && due < today;
  //const isToday = due === today;

  let text = due.toLocaleDateString();
  let classes = "bg-gray-100 text-gray-700";

  if (isOverdue) {
    text += " (overdue)";
    classes = " bg-red-100 text-red-700";
  } else if (completed) {
    text += " (completed)";
    classes = "bg-yellow-100 text-yellow-700";
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${classes}`}>
      {text}
    </span>
  );
}
