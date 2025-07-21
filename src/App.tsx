import './index.css';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Task Management App 📃</h1>
      <TaskList />
    </div>
  );
}