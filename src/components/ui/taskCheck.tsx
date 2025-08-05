import { useState } from "react"
import { Check } from "lucide-react"

interface Props {
    completed: boolean
    onToggleComplete: () => void
}

export default function TaskCheck({
    completed,
    onToggleComplete,
}: Props) {
    const [showSparkle, setShowSparkle] = useState(false)

    //cta tembok dev hero color: cyan electric #00B2A9

    const baseClass =
        "text-white dark:text-black h-4 w-4 flex items-center justify-center rounded-full border-3 transition-all duration-200 ease-in-out "
    const style = `${baseClass} + " "+ ${completed ? "bg-[#00B5E2] border-[#00B5E2]" : "border-[#00B5E2]"}`

    const handleClick = () => {

        if (!completed) {
            setShowSparkle(true)
            setTimeout(() => setShowSparkle(false), 800)
        }

        // Delay completion to allow animation to play before moving groups
        setTimeout(() => onToggleComplete(), 600);
    }

    return (
        <button
            onClick={handleClick}
            role="checkbox"
            aria-checked={completed}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
            className="relative group h-6 w-6 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-120 active:scale-95 focus:outline-none"
        >
            {/* Background Circle */}
            <div className=" p-1 cursor-pointer">
                <div
                    className={`flex items-center justify-center h-full w-full rounded-full border-2 transition-all duration-300 ease-out
          ${completed ? "bg-cyan-500 border-cyan-500" : "border-cyan-500"}
        `}
                >
                    {
                        <span className="w-4 h-4 aspect-square rounded-full flex items-center justify-center p-1">
                            {completed && <Check
                                strokeWidth={4}
                                className={"text-white dark:text-black scale-120 transition-all duration-200"}
                            />}
                        </span>
                    }
                </div>
            </div>

            {/* Sparkle Animation */}
            {showSparkle && (
                <span className="absolute -top-3 -right-3 animate-ping text-yellow-400 text-base pointer-events-none">
                    ✨
                </span>
            )}
        </button>
    );
}
