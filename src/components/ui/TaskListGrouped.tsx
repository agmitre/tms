//components/ui/GroupedTaskList.tsx

import { getTaskStatus } from "@/lib/task_utility";
import type { Task } from "@/types/task_models";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";
import { TaskCard } from "./TaskCard";



const statusLabels: Record<string, string> = {
    today: "Today",
    overdue: "Overdue",
    due: "Upcoming",
    pending: "No Due Date",
    completed: "Completed",
};

interface Props {
    tasks: Task[]
    onToggleComplete: (id: string) => void
    onDelete: (id: string) => void
    onArchive: (id: string) => void
    onEdit: (id: string, updates: Partial<Task>) => void
    sortDirection?: "asc" | "desc"
}

export default function GroupedTaskList({
    tasks,
    onToggleComplete,
    onDelete,
    onArchive,
    onEdit,
    sortDirection = "asc",
}: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        today: true,
        overdue: true,
        due: true,
        pending: true,
        completed: false,
    });


    const toggleGroup = (key: string) => {
        setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const statusOrder = ["today", "overdue", "due", "pending", "completed"] as const;
    const grouped = tasks.reduce<Record<string, Task[]>>((acc, task) => {
        const status = getTaskStatus(task); // "today", "overdue", etc.
        if (!acc[status]) acc[status] = [];
        acc[status].push(task);
        return acc;
    }, {});

    const sorted = (group: Task[]) => {
        return [...group].sort((a, b) => {
            const aTime = new Date(a.dueDate ?? a.createdAt).getTime();
            const bTime = new Date(b.dueDate ?? b.createdAt).getTime();
            return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
        });
    };

    return (
        <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-800">
            {statusOrder.map((groupKey) => {
                const tasksInGroup = grouped[groupKey] ?? [];
                if (tasksInGroup.length === 0) return null
                return (
                    <div key={groupKey} className="pt-4">
                        {/* Header */}
                        <div
                            className="flex items-center justify-between cursor-pointer px-2 pb-2 transition-all"
                            onClick={() => toggleGroup(groupKey)}
                        >
                            <div className="flex items-center gap-2">
                                {expandedGroups[groupKey] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                <h3 className="text-md font-semibold">
                                    {statusLabels[groupKey] ?? groupKey}
                                </h3>
                                <Badge variant="outline" text={tasksInGroup.length.toString()} />
                            </div>
                        </div>

                        {/* Divider line */}
                        <div className="h-px w-full bg-gray-300 dark:bg-gray-700 opacity-40 mb-2" />

                        {/* Tasks */}
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedGroups[groupKey] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="flex flex-col gap-2 pl-2">
                                {sorted(tasksInGroup).map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onToggleComplete={onToggleComplete}
                                        onDelete={onDelete}
                                        onArchive={onArchive}
                                        onEdit={onEdit} />
                                ))}
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    );
}