import { dummyTasks } from "../data/dummyTasks";
import type { Task } from "../types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold mb-4">My Tasks</h1>
            {dummyTasks.map((task: Task) => (
                <div key={task.id.toString()} className=" rounded-2xl p-4 mb-2 bg-white shadow">
                    <h2 className="font-semibold">{task.title}</h2>
                    <p className="mb-4">{task.description}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className={task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}>
                        Priority: {task.priority.toLocaleUpperCase()}
                    </p>
                </div>
            ))
            }
        </div>
    )
}