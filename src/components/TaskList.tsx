import type { Task } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No Tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold mb-4">My Tasks</h1>
      {tasks.map((task: Task) => (
        <div
          key={task.id.toString()}
          className="rounded-2xl p-4 mb-2 bg-white shadow"
        >
          <div className="flex items-start gap-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
            />
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="mb-4">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p
                className={`${
                  task.priority === "high"
                    ? "text-red-500"
                    : task.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Priority: {task.priority.toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <Button variant="destructive" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
