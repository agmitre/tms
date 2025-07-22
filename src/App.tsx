import { useState } from 'react';

import './index.css';

import TaskList from './components/TaskList';
import type { Task } from './types';
import TaskForm from './components/TaskForm';


export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks((prev) => [...tasks, newTask]);
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-6">Task Management App 📃</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}