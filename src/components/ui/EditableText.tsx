// components/ui/EditableText.tsx
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
    text: string;
    onSave: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export default function EditableText({
    text,
    onSave,
    className = "",
    placeholder = "Click to edit...",
}: EditableTextProps) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const handleBlur = () => {
        setEditing(false);
        if (value.trim() !== text.trim()) {
            onSave(value.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            inputRef.current?.blur();
        } else if (e.key === "Escape") {
            setEditing(false);
            setValue(text);
        }
    };

    return editing ? (
        <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
                "w-full bg-transparent border-none border-b border-dashed border-gray-400 dark:border-gray-600 focus:outline-none focus:border-b-1 focus:border-cyan-500 transition-all",
                className
            )}
        />
    ) : (
        <div
            onClick={() => setEditing(true)}
            className={cn(
                "cursor-default transition-colors hover:bg-black/5 dark:hover:bg-white/5 px-0.5 py-0.5 rounded",
                className,
                !text && "text-gray-400 italic"
            )}
        >
            {text || placeholder}
        </div>
    );
}
