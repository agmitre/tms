import type { Task } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Badge from "./ui/Badge";

interface Props {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
    );
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1"
            />

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
                  }`}
              >
                {task.title}
              </h3>
              <p
                className={`${task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700"
                  }`}
              >
                {task.description}
              </p>

              <div className="mt-2 text-sm text-gray-500">

                <Badge
                  text={(() => {
                    const today = new Date().toDateString();
                    const due = new Date(task.dueDate).toDateString();
                    if (!task.completed && new Date(task.dueDate) < new Date()) return "Overdue";
                    if (today === due) return "Due Today";
                    return `Due ${new Date(task.dueDate).toLocaleDateString()}`;
                  })()}
                  color={
                    !task.completed && new Date(task.dueDate) < new Date()
                      ? "red"
                      : new Date(task.dueDate).toDateString() === new Date().toDateString()
                        ? "yellow"
                        : "gray"
                  }

                />
                <Badge
                  text={`Priority: ${task.priority.toLocaleUpperCase()}`}
                  color={
                    task.priority === "high"
                      ? "red"
                      : task.priority === "medium"
                        ? "yellow"
                        : "green"
                  }
                />
                <Badge text={task.completed ? "Completed" : "Pending"} color={task.completed ? "green" : "gray"} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
