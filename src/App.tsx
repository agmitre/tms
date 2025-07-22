import { useState } from "react";

import "./index.css";

import type { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { dummyTasks } from "./data/dummyTasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Task Management App 📃</h1>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

