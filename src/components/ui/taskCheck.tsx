import { useState } from "react"
import { Check } from "lucide-react"
import { TaskStatusColor, type TaskStatus } from "@/types/types"

interface TaskCheckProps {
    completed: boolean
    status: TaskStatus
    onToggleComplete: () => void
}

export default function TaskCheck({
    completed,
    status = "due",
    onToggleComplete,
}: TaskCheckProps) {
    const [showSparkle, setShowSparkle] = useState(false)

    const baseClass =
        "h-6 w-6 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer relative"

    const completedBg: Record<TaskCheckProps["status"], string> = {
        overdue: "bg-rose-500 text-white",
        today: "bg-yellow-400 text-white",
        due: "bg-emerald-500 text-white",
        archived: "bg-gray-500 text-white",
    }

    const pendingBorder: Record<TaskCheckProps["status"], string> = {
        overdue: "border " + TaskStatusColor.border[status],
        today: "border " + TaskStatusColor.border[status] ,
        due: "border " + TaskStatusColor.border[status] ,
        archived: "border " + TaskStatusColor.border[status] ,
    }

    const style = completed
        ? `${baseClass} ${completedBg[status]}`
        : `${baseClass} ${pendingBorder[status]}`

    const handleClick = () => {

        if (!completed) {
            setShowSparkle(true)
            setTimeout(() => setShowSparkle(false), 600)
        }
        setTimeout(() => onToggleComplete(), 600); // delay the task complete to allow the animation to play
    }

    return (
        <div className=" p-2 aspect-square cursor-pointer rounded-full hover:scale-105 hover:shadow-sm transition-all duration-200 ease-in-out"
            onClick={handleClick}
            role="checkbox"
            aria-checked={completed}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
        >
            <span
                className={style + " border-3"}
            >
                {completed && <Check size={16} strokeWidth={3} />}
                {showSparkle && (
                    <span className="absolute -top-6 -right-6 animate-ping text-yellow-400 text-xl pointer-events-none">
                        ✨
                    </span>
                )}
            </span>
        </div>
    )
}
