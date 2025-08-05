import { useState, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { Task } from "@/types/task_models";


interface Props {
    onAdd: (input: Partial<Task>) => void;
}

export default function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
    const [expanded, setExpanded] = useState(false);
    const [showHelper, setShowHelper] = useState(false);


    const containerRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return; // dallback if no title is set
        // ✅ Use v02 helper (this auto-adds to Unassigned if no placement given)
        // Optional: capitalize title/description
        const cleanTitle = title.trim().charAt(0).toUpperCase() + title.trim().slice(1);
        const cleanDescription =
            description?.trim() ? description.trim().charAt(0).toUpperCase() + description.trim().slice(1) : undefined;

        const draft: Partial<Task> = { title: cleanTitle, description: cleanDescription, dueDate: dueDate || undefined }
        onAdd(draft) //call the add function provided by parent state manager

        // const newTask: Task = {
        //     id: Date.now(),
        //     title: title.charAt(0).toUpperCase() + title.slice(1),
        //     description: description && description.charAt(0).toUpperCase() + description.slice(1),
        //     dueDate,
        //     createdDate: Date.now().toString(),
        //     flagged: false,
        //     starred: false,
        //     completed: false,
        //     archived: false
        // };
        // onAdd(newTask);  ----> deprecated for v02


        // ✅ Clear form UI state --> reset values
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("low");
        setExpanded(false);
        setShowHelper(false);
    };

    // Global typing detection
    useEffect(() => {
        const handleGlobalKey = (e: KeyboardEvent) => {
            const isTextInput = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;

            // Only act if we're not already typing in an input/textarea
            if (
                !isTextInput &&
                e.key.length === 1 &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.altKey
            ) {
                setExpanded(true);
                setShowHelper(true);
                // Focus but DO NOT preventDefault (let key be typed)
                titleRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleGlobalKey);
        return () => window.removeEventListener("keydown", handleGlobalKey);
    }, []);

    // Collapse when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setExpanded(false);
                setShowHelper(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="  flex-1 max-w-2xl mx-auto cursor-text">
            <form onSubmit={handleSubmit} ref={containerRef} className="transition-all duration-300">
                <div className="flex gap-2">
                    <Input
                        ref={titleRef}
                        type="text"
                        placeholder="What would you like to achieve today?"
                        className="bg-white font-bold border-none outline-non rounded-full p-8 shadow-xl overflow-hidden transition-all duration-300"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (!expanded) setExpanded(true);
                        }}

                    />
                    {/* <Button variant="outline" size="icon" onClick={() => setExpanded(!expanded)}>{expanded ? <ChevronsDownUp /> : <ChevronsUpDown />}</Button> */}
                </div>

                {showHelper && !expanded && (
                    <p className="text-sm text-muted-foreground mb-2">Start typing to add a task</p>
                )}
                <div
                    className={`pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                >
                    <Textarea
                        placeholder="Optional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="md:col-span-2"
                    />
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <Select
                        value={priority}
                        onValueChange={(value) =>
                            setPriority(value as "low" | "medium" | "high")
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" className="md:col-span-2">
                        Add Task
                    </Button>
                </div>
            </form>
        </div>

    );
}

