
import { useState } from "react";
import type { Task } from "../types";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue } from "@radix-ui/react-select";

interface Props {
    onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('low');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            priority,
            completed: false,
        }
        onAdd(newTask);
        setTitle('');
        setDescription('');
        setDueDate(new Date().toISOString().split('T')[0]);
        setPriority('low');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <Input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required>
            </Input>
            <Textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required>
            </Textarea>
            <Input
                type="date"
                value={dueDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setDueDate(e.target.value)}>
            </Input>
            <Select
                value={priority}
                onValueChange={(val) => setPriority(val as 'high' | 'medium' | 'low')}>
                <SelectTrigger><SelectValue placeholder="Priority"></SelectValue></SelectTrigger>
                <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit">Add Task</Button>

        </form>
    )
}