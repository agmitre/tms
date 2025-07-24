import { useState } from "react"
import { Check } from "lucide-react"

interface TaskCheckProps {
    completed: boolean
    status: "overdue" | "today" | "due" | "archived"
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
        overdue: "border border-rose-600 bg-rose-500/10 text-rose-600",
        today: "border border-yellow-600 bg-yellow-500/10 text-yellow-600",
        due: "border border-emerald-600 bg-emerald-500/10 text-emerald-600",
        archived: "border border-gray-600 bg-gray-500/10 text-gray-600",
    }

    const style = completed
        ? `${baseClass} ${completedBg[status]}`
        : `${baseClass} ${pendingBorder[status]}`

    const handleClick = () => {
        onToggleComplete()
        if (!completed) {
            setShowSparkle(true)
            setTimeout(() => setShowSparkle(false), 600)
        }
    }

    return (
        <span
            className={style + " hover:scale-105 hover:shadow-sm"}
            onClick={handleClick}
            role="checkbox"
            aria-checked={completed}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
        >
            {completed && <Check size={16} strokeWidth={3} />}
            {showSparkle && (
                <span className="absolute -top-6 -right-6 animate-ping text-yellow-400 text-xl pointer-events-none">
                    ✨
                </span>
            )}
        </span>
    )
}
