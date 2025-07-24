import type { Task } from "../types";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveRestore, Shredder, Trash } from "lucide-react";
import TaskCheck from "./ui/taskCheck";

interface Props {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onArchive, onDelete }: Props) {

  const getDaysDiff = (checkDate: string) => {
    const today = new Date();
    const date = new Date(checkDate);
    const diffTime = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    type TaskStatus = "Overdue" | "Due" | "Today" | "";
    var status: TaskStatus = "";

    var daysDiffText = ""

    if (daysDiff < 0) {
      daysDiffText = daysDiff === -1 ? "Yesterday" : `${Math.abs(daysDiff)} days ago`;
      status = "Overdue";
    } else if (daysDiff > 0) {
      daysDiffText = daysDiff === 1 ? "Tomorrow" : `in ${Math.abs(daysDiff)} days`;
      status = "Due";
    } else {
      daysDiffText = "Today"
      status = "Today";
    }
    //console.log("diffTime: " + diffTime + " | daysDiff: " + daysDiff)

    return { status, daysDiff, daysDiffText }
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
          className={`${task.completed ? "bg-gray-200 dark:bg-gray-950" : "bg-white dark:bg-gray-800"} rounded-2xl shadow p-5 hover:shadow-lg transition-shadow border`}
        >
          <div className="flex gap-4 items-center justify-center">
            <TaskCheck
              completed={task.completed}
              status={task.dueDate === "" ? "due" : getDaysDiff(task.dueDate).status.toLocaleLowerCase() as "overdue" | "today" | "due" | "archived" || "due"}
              onToggleComplete={() => onToggleComplete(task.id)} />
            {/* <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="size-6"
            /> */}

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold leading-tight ${task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-900 dark:text-white"
                  }`}
              >
                {task.title}
              </h3>
              <p
                className={`leading-tight ${task.completed
                  ? "line-through text-gray-400 dark:text-white "
                  : "text-gray-500 dark:text-white"
                  }`}

              >
                {task.description}
              </p>

            </div>
            <div className="flex items-center gap-2 animate-in transition-all ease-in-out duration-200">
              <p className="text-sm text-gray-500">{`${(task.dueDate != "" && !task.completed) ? "Due " : ""} ${getDaysDiff(task.dueDate).daysDiffText}`}</p>
              {
                (task.archived) &&
                <Button
                  variant="outline"
                  size="icon"
                  color="red"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash className="text-red-500 dark:text-red-700" stroke-width="3" absoluteStrokeWidth />
                </Button>
              }
              <Button
                variant="outline"
                size="icon"
                color="red"
                onClick={() => onArchive(task.id)}
              >
                {task.archived ? <ArchiveRestore strokeWidth="2" /> : <Archive strokeWidth="2" />}
              </Button>


            </div>
          </div>


        </div>
      ))}
    </div>
  );
}
