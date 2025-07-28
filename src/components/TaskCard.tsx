import { AppSpacing, TaskStatusColor, type Task, type TaskDateInfo } from "@/types/types";
import TaskCheck from "./ui/taskCheck";
import { getTaskDateInfo } from "@/lib/taskServices";

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onArchive: (id: number) => void;
    onDelete: (id: number) => void;
}


function toSentenceCase(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function TaskCard({ task, onToggleComplete, onArchive, onDelete }: TaskCardProps) {

    function getDateStatusInfo(task: Task): string {
        const dateInfo = getTaskDateInfo(task);
        var prefix = dateInfo.status.toString()
        if (task.dueDate === "") prefix = ""

        return toSentenceCase(prefix);
    }

    return (
        <div
            key={task.id}
            className={AppSpacing.padding.horizontal.sm + " " + AppSpacing.padding.vertical.md + " hover:shadow-lg/5 hover:bg-gradient-to-b hover:from-transparent hover:to-gray-50 dark:hover:to-gray-800 min-h-[42px] transition-all ease-in-out duration-200 rounded-md"} >
            <div className="flex items-center divide-gray-200">
                <TaskCheck completed={false} status={"today"} onToggleComplete={() => onToggleComplete(task.id)} />
                <div className={"flex-1 " + AppSpacing.padding.left["xl"]}>{task.flagged && "🚩"} {task.title}</div>
                <div className="text-muted-foreground text-sm flex-shrink-0"><span className={TaskStatusColor.text[getTaskDateInfo(task).status] + " font-bold"}>{getDateStatusInfo(task)}</span> {getTaskDateInfo(task).timeframe}</div>
            </div>
        </div >
    )
}


