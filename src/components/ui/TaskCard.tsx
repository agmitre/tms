import { useState } from "react";
import { getTaskDateInfo } from "@/lib/task_utility";
import TaskCheck from "./taskCheck";
import EditableText from "./EditableText";
import { Button } from "./button";
import { Archive, Trash, Text } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility for class merging
import type { Task } from "@/types/task_models";

interface Props {
    task: Task;
    isFocus?: boolean;
    onToggleComplete: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updates: Partial<Task>) => void;
}

export function TaskCard({
    task,
    isFocus,
    onToggleComplete,
    onArchive,
    onDelete,
    onEdit,
}: Props) {
    const [expanded, setExpanded] = useState(false);
    const { timeframe } = getTaskDateInfo(task);

    return (
        <div
            className={cn(
                "group w-full max-w-full min-w-0 relative px-3 py-2 cursor-default transition-all duration-300 ease-in-out",
                "rounded-lg border-2 bg-white/30 dark:bg-gray-800/40 hover:shadow-cyan-500/10",
                expanded ? "border-cyan-500" : "border-transparent"
            )}

        >
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2"
                onClick={() => setExpanded(!expanded)}
            >
                <TaskCheck completed={task.completed} onToggleComplete={() => onToggleComplete(task.id)} />

                {/* Title */}
                <div className="flex-1 min-w-0 px-2 overflow-hidden">
                    <span className={cn(
                        " block w-full leading-snug",
                        task.completed ? "text-gray-400 line-through" : "text-zinc-900 dark:text-white"
                    )
                    }>{task.title}</span>

                    {task.dueDate && !task.completed && (
                        <div className="text-xs text-zinc-500">{`Due ${timeframe}`}</div>
                    )}
                </div>

                {/* Buttons and icons to the right */}
                <div className="flex items-center flex-shrink-0 gap-1 sm:gap-2">
                    {task.description && task.description.trim() !== '' ? <Text size={18} /> : null}

                    <span className="opacity-0 group-hover:opacity-100 transition text-lg text-gray-400">{expanded ? "-" : "+"}</span>

                </div>
            </div>

            {/* Expandable section */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out grid",
                    expanded ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr] pt-0"
                )}
            >
                <div className="min-h-0">
                    {/* Description */}
                    <EditableText
                        text={task.description ?? ""}
                        onSave={(val) => onEdit(task.id, { description: val })}
                        className="text-xs text-gray-500 dark:text-gray-300"
                        placeholder="No description"
                    />

                    <div className="flex justify-between mt-2">
                        <Button variant="ghost" size="sm" onClick={() => onArchive(task.id)}>
                            <Archive className="w-4 h-4 mr-1" /> Archive
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
                            <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
