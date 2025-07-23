import { useEffect, useState } from "react";

import "./index.css";

import type { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import { loadTasks, saveTasks } from "./lib/taskService";
import DarkModeToggle from "./components/DarkModeToggle";
import { Button } from "./components/ui/button";
import { Funnel } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import Badge from "./components/ui/Badge";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");

  //Save tasks to localStorage on every change
  useEffect(() => { saveTasks(tasks); }, [tasks]);


  const addTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "pending" && !task.completed) ||
      (filterStatus === "completed" && task.completed);

    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 ease-in-out">
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
            <Badge variant="outline" text={filteredTasks.length.toString()} />
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

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
