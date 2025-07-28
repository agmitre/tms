import type { Task, TaskStatus } from "../types/types";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveRestore, Trash } from "lucide-react";
import TaskCheck from "./ui/taskCheck";
import { getTaskDateInfo, getTaskStatus } from "@/lib/taskServices";
import { TaskCard } from "./TaskCard";

interface Props {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onArchive, onDelete }: Props) {


  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
    );
  }

  return (
    <div className="divide-y-1 divide-gray-300 dark:divide-gray-800 transition-all ease-in-out duration-200">

      {tasks.map((task) => (

        <>
          <TaskCard task={task} onToggleComplete={onToggleComplete} onArchive={onArchive} onDelete={onDelete} />
        </>



        /*<div
        key={task.id}
        className={`${task.completed ? "bg-gray-200 dark:bg-gray-950" : "bg-white dark:bg-gray-800"} rounded-2xl shadow p-5 hover:shadow-lg transition-shadow border`}
      >
        <div className="flex gap-4 items-center justify-center">
           <TaskCheck
            completed={task.completed}
            status={getTaskStatus(task)}
            onToggleComplete={() => onToggleComplete(task.id)} />

          <div className="flex-1">
            <h3
              className={`text-base font-semibold leading-tight ${task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-900 dark:text-white"
                }`}
            >
              {task.title}
            </h3>
            {task.description && !task.completed && (
              <p
                className={`leading-tight text-sm pt-2 ${task.completed
                  ? "line-through text-gray-400 dark:text-white "
                  : "text-gray-500 dark:text-white"
                  }`}

              >
                {task.description}
              </p>
            )}

          </div>
          <div className="flex items-center gap-2 animate-in transition-all ease-in-out duration-200">
            <p className="text-sm text-gray-500">{`${(task.dueDate != "" && !task.completed) ? "Due " : ""} ${getTaskDateInfo(task).timeframe}`}</p>
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


          </div> </div></div>*/




      ))
      }
    </div >
  );
}
