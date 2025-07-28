import { useState, useEffect, useRef } from "react";
import type { Task } from "../types/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

interface Props {
    onAdd: (task: Task) => void;
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
        if (!title.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            title: title.charAt(0).toUpperCase() + title.slice(1),
            description: description && description.charAt(0).toUpperCase() + description.slice(1),
            dueDate,
            createdDate: Date.now().toString(),
            flagged: false,
            starred: false,
            completed: false,
            archived: false
        };
        onAdd(newTask);
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

