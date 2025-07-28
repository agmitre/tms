import { useEffect, useState } from "react";

import "./index.css";

import type { Task, TaskStatus } from "./types/types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import { getTaskStatus, loadTasks, saveTasks } from "./lib/taskServices";
import DarkModeToggle from "./components/DarkModeToggle";
import { Button } from "./components/ui/button";
import { Funnel } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import Badge from "./components/ui/Badge";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("pending");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");

  //Save tasks to localStorage on every change
  useEffect(() => { saveTasks(tasks); }, [tasks]);


  const addTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed, archived: !task.completed } : task
      )
    );
  };

  const archiveTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, archived: !task.archived } : task
      )
    );
  };


  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Handle filtering
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "pending" && !task.completed) ||
      (filterStatus === "completed" && task.completed);

    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  //Sort the tasks based on the status order
  const statusOrder: TaskStatus[] = ["today", "overdue", "due", "archived"]
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const statusA = getTaskStatus(a);
    const statusB = getTaskStatus(b);
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  });



  return (
    <div className="bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 ease-in-out">
      <div className="min-h-screen p-8 max-w-2xl mx-auto ">
        <div className="flex justify-between mb-6">
          <h1 className="text-4xl font-bold">Task Manager 📃</h1>
          <DarkModeToggle />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <TaskForm onAdd={addTask} />
        </div>


        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-4 mb-4">My Tasks</h2>
            <Badge variant="outline" text={sortedTasks.length.toString()} />
          </div>
          <Popover>
            <PopoverTrigger><Button variant="secondary"><Funnel /></Button></PopoverTrigger>
            <PopoverContent>
              <FilterBar
                filterStatus={filterStatus}
                filterPriority={filterPriority}
                setFilterStatus={setFilterStatus}
                setFilterPriority={setFilterPriority}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>

          {tasks.filter(task => getTaskStatus(task) === "today").length > 0 && <Button variant="ghost">Today<Badge variant="outline" color="yellow" text={tasks.filter(task => getTaskStatus(task) === "today").length.toString()} /></Button>}
          {tasks.filter(task => getTaskStatus(task) === "overdue").length > 0 && <Button variant="ghost">Overdue<Badge variant="outline" color="red" text={tasks.filter(task => getTaskStatus(task) === "overdue").length.toString()} /></Button>}
          <Button variant="ghost">Due<Badge variant="outline" color="green" text={tasks.filter(task => getTaskStatus(task) === "due").length.toString()} /></Button>
          <Button variant="ghost">Archived<Badge variant="outline" color="gray" text={tasks.filter(task => task.archived).length.toString()} /></Button>
        </div>

        <TaskList
          tasks={sortedTasks}
          onToggleComplete={toggleTask}
          onDelete={deleteTask}
          onArchive={archiveTask} />
      </div>
    </div >
  );
}
