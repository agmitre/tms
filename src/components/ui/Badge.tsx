interface BadgeProps {
    text: string;
    color?: "gray" | "red" | "yellow" | "green" | "blue";
    variant?: "solid" | "outline"; // outline
}

export default function Badge({ text, color = "gray", variant = "solid" }: BadgeProps) {
    const base = "text-xs px-2 py-1 rounded-full font-medium";
    const styles = {
        solid: {
            gray: "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
            red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
            green: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
            blue: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        },
        outline: {
            gray: "border border-gray-400 text-gray-800 dark:border-gray-600 dark:text-gray-400",
            red: "border border-red-400 text-red-700 dark:border-red-600 dark:text-red-400",
            green: "border border-green-400 text-green-700 dark:border-green-600 dark:text-green-400",
            yellow: "border border-yellow-400 text-yellow-700 dark:border-yellow-600 dark:text-yellow-400",
            blue: "border border-blue-400 text-blue-700 dark:border-blue-600 dark:text-blue-400",
        },
    }


    return (
        <span className={`${base} ${styles[variant][color]}`}>{text}</span>
    )
}