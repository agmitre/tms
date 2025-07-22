import { useState } from "react";

import "./index.css";

import type { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import { dummyTasks } from "./data/dummyTasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [filterPriority, setFilterPriority] = useState<
    "all" | "low" | "medium" | "high"
  >("all");

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
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Task Management App 📃</h1>
      <TaskForm onAdd={addTask} />
      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-4">My Tasks</h2>
      <FilterBar
        filterStatus={filterStatus}
        filterPriority={filterPriority}
        setFilterStatus={setFilterStatus}
        setFilterPriority={setFilterPriority}
      />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
