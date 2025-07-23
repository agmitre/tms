import type { Task } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Badge from "./ui/Badge";
import { Archive, Shredder, Trash } from "lucide-react";

interface Props {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onArchive, onDelete }: Props) {

  const getDaysDiff = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    type TaskState = "Overdue" | "Due" | "Today" | "";
    var state: TaskState = "";

    var daysDiffText = ""

    if (daysDiff < 0) {
      daysDiffText = daysDiff === -1 ? "Yesterday" : `${Math.abs(daysDiff)} days ago`;
      state = "Overdue";
    } else if (daysDiff > 0) {
      daysDiffText = daysDiff === 1 ? "Tomorrow" : `in ${Math.abs(daysDiff)} days`;
      state = "Due";
    } else {
      daysDiffText = "Today"
      state = "Today";
    }
    //console.log("diffTime: " + diffTime + " | daysDiff: " + daysDiff)

    return { state, daysDiff, daysDiffText }
  }

  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
    );
  }

  return (
    <div className="space-y-6 transition-all ease-in-out duration-200">

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex gap-4 align-middle">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="size-6"
            />

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${task.completed
                  ? "line-through text-gray-400 dark:text-white"
                  : "text-gray-900 dark:text-white"
                  }`}
              >
                {task.title}
              </h3>
              <p
                className={`${task.completed
                  ? "line-through text-gray-400 dark:text-white"
                  : "text-gray-700 dark:text-white"
                  }`}
              >
                {task.description}
              </p>

              <div className="mt-2 text-sm text-gray-500">

                <Badge
                  variant="outline"
                  text={(function () {
                    //const today = new Date();
                    const daysDiff = getDaysDiff(task.dueDate);
                    const days = daysDiff.daysDiff;
                    var daysDiffText = daysDiff.daysDiffText;

                    if (!task.completed) { return `${days < 0 ? "Overdue" : "Due"} ${daysDiffText}` }
                    else { return daysDiffText }
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
            <div className="flex items-center gap-4 ">
              <p className="text-sm text-gray-500">{getDaysDiff(task.dueDate).daysDiffText}</p>
              <Button
                variant="outline"
                size="icon"
                color="red"
                onClick={() => onArchive(task.id)}
              >
                <Archive stroke-width="2" />
              </Button>
            </div>
            {/* <Button
              variant="outline"
              size="icon"
              color="red"
              onClick={() => onDelete(task.id)}
            >
              <Trash className="text-red-500 dark:text-red-700" stroke-width="3" absoluteStrokeWidth />
            </Button> */}
          </div>


        </div>
      ))}
    </div>
  );
}
