import type { Task } from "@/types/task_models";
import { Funnel, FlagIcon, Archive } from "lucide-react";
import FilterBar from "./FilterBar";
import BadgeCounter from "./ui/BadgeCounter";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import TaskListGrouped from "./ui/TaskListGrouped";


interface Props {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updates: Partial<Task>) => void;
}

export function TaskListView({ tasks = [], onToggleComplete, onArchive, onDelete, onEdit }: Props) {


    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">My Tasks</h2>
                <Popover>
                    <PopoverTrigger><Button variant="secondary"><Funnel /></Button></PopoverTrigger>
                    <PopoverContent>
                        <div className="divide-y space-y-2">
                            {/* <FilterBar
                                filterStatus={filterStatus}
                                filterPriority={filterPriority}
                                setFilterStatus={setFilterStatus}
                                setFilterPriority={setFilterPriority}
                            /> */}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex gap-2 mb-2">
                <BadgeCounter content={tasks.filter(t => t.flagged).length}><FlagIcon className="w-4" /></BadgeCounter>
                <BadgeCounter content={tasks.filter(t => t.archived).length}><Archive className="w-4" /></BadgeCounter>
            </div>

            <TaskListGrouped
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onArchive={onArchive}
                onEdit={onEdit}
            />
        </div>
    )
}