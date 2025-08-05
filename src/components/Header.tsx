import { AppSpacing } from "@/types/types";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import type { Task } from "@/types/task_models";
import TaskForm from "./TaskForm";


interface HeaderPops {
    // The addTask function now expects a TaskInput, not a full Task object
    addTask: (input: Partial<Task>) => void
}


export function Header({ addTask }: HeaderPops) {
    return (

        <>
            <div id="header" className={"sticky top-8 z-100 items-start flex justify-between " + AppSpacing.padding.horizontal.xl}>
                <Logo size="md" variant="icon-only" />
                <div id="form" className={"flex sticky top-0 z-10 min-w-md" + AppSpacing.padding.horizontal.xl}>
                    <TaskForm onAdd={addTask} />
                </div>
                <div className="min-w-[150px] flex flex-row-reverse"> <DarkModeToggle /></div>
            </div>

            {/* <div id="form" className={"flex sticky top-0 z-10" + AppSpacing.padding.horizontal.xl}>
                <TaskForm onAdd={addTask} />
            </div> */}
        </>
    )
}