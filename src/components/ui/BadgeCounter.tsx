import React from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "dot" | "number";

interface BadgeCounterProps {
    children: React.ReactNode;
    content?: string | number;
    variant?: BadgeVariant;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    className?: string;
    positionClass?: string; // for custom positioning
}


export default function BadgeCounter({
    children,
    content,
    variant = "default",
    bgColor = "bg-red-500",
    textColor = "text-white",
    borderColor = "border-white",
    className = "",
    positionClass = "top-0 right-0",
}: BadgeCounterProps) {

    const isDot = variant === "dot";

    return (
        <div className="relative inline-block">
            {children}
            <span
                className={clsx(
                    "absolute transform translate-x-1/2 -translate-y-1/2",
                    positionClass,
                    isDot
                        ? "w-2.5 h-2.5 rounded-full"
                        : "min-w-[1.25rem] h-5 text-xs px-1.5 py-0.5 rounded-full flex items-center justify-center",
                    bgColor,
                    textColor,
                    "",
                    borderColor,
                    className
                )}
            >
                {!isDot && content}
            </span>
        </div>
    );
};

