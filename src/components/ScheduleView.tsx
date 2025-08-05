import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import type { Task } from "@/types/task_models";

const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

const viewOptions = ["Today", "Tomorrow", "This Week", "Work Week"]

interface Props {
    tasks: Task[];
}

export default function ScheduleView({ tasks }: Props) {
    const [view, setView] = useState("Today")

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const now = dayjs();
    const nowOffset = now.hour() * 48 + (now.minute() / 60) * 48; // each hour = 48px

    useEffect(() => {
        const scrollTo = nowOffset - 100;
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTo({ top: scrollTo, behavior: "smooth" });
        }
    }, [nowOffset]);

    const dummyTasks: Task[] = [
        {
            id: '1',
            title: 'Team Meeting',
            dueDate: dayjs().hour(9).minute(30).toISOString(),
            endDate: dayjs().hour(10).minute(30).toISOString(),
            flagged: false,
            starred: false,
            completed: false,
            taskListId: "",
            ledgerId: "",
            createdAt: "",
            updatedAt: "",
            archived: false
        },
        {
            id: '2',
            title: 'Code Review',
            dueDate: dayjs().hour(14).minute(0).toISOString(),
            endDate: dayjs().hour(15).minute(0).toISOString(),
            flagged: false,
            starred: false,
            completed: false,
            taskListId: "",
            ledgerId: "",
            createdAt: "",
            updatedAt: "",
            archived: false
        }
    ];

    const filteredTasks = dummyTasks
        .filter(t => t.dueDate && dayjs(t.dueDate).isSame(now, 'day'))


    return (
        <div className="flex flex-col gap-4">
            {/* View Switcher */}
            <div className="flex gap-2">
                {viewOptions.map(opt => (
                    <Button
                        key={opt}
                        className="cursor-pointer"
                        variant={view === opt ? "default" : "outline"}
                        onClick={() => setView(opt)}
                    >
                        {opt}
                    </Button>
                ))}
            </div>

            {/* Schedule scrollarea */}
            <div className="relative w-full max-h-[80vh] overflow-hidden border rounded-md">

                <div
                    ref={scrollContainerRef}
                    className="relative overflow-y-auto max-h-[80vh]"
                >
                    {/* Red line indicating current time */}
                    <div
                        className="absolute left-16 right-0 z-10 pointer-events-none flex items-center"
                        style={{ top: `${nowOffset}px`, left: "12px" }}
                    >
                        <span className="bg-red-500 h-2 aspect-square rounded-full"></span>
                        <div className="h-0.5 bg-red-500 w-full" />
                    </div>
                    <div className="flex flex-col min-h-[1152px] relative">
                        {/* 🕐 Hour slots */}
                        {hours.map((hour) => (
                            <div key={hour} className="flex">
                                {/* Hour label */}
                                <div className="w-16 h-12 border-t text-right pr-2 pt-1 text-sm text-muted-foreground">
                                    {dayjs().hour(hour).minute(0).format("h A")}
                                </div>

                                {/* Empty task zone grid only */}
                                <div className="flex-1 h-12 border-t border-dashed border-gray-300 dark:border-gray-600 relative" />
                            </div>
                        ))}

                        {/* ✅ Tasks rendered once */}
                        {filteredTasks.map(task => {
                            const start = dayjs(task.dueDate);
                            const end = task.endDate ? dayjs(task.endDate) : start.add(1, 'hour');
                            const top = (start.hour() * 60 + start.minute()) * 0.8;
                            const height = end.diff(start, 'minute') * 0.8;

                            return (
                                <div
                                    key={task.id}
                                    className="absolute left-20 right-4 bg-blue-500/80 text-white px-2 py-1 rounded-md text-sm shadow-md"
                                    style={{ top, height }}
                                >
                                    {task.title}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
