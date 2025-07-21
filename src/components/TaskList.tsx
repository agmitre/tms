import { dummyTasks } from "../data/dummyTasks";
import type { Task } from "../types";

export default function TaskList() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">My Tasks</h1>

            {dummyTasks.map((task: Task) => (
                <div key={task.id.toString()}
                    className="border p-4 mb-2 rounded bg-white shadow">
                    <h2 className="">{task.title}</h2> 
                    <p>{task.description}</p>
                    <p className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className={`text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-500`}>
                        Priority: {task.priority}
                    </p>
                </div>
            ))
            }
        </div >
    )
}