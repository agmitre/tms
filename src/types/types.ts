// src/types.ts
// Define a Task Model
export interface Task {
    id: number
    title: string
    description: string
    dueDate: string // ISO date
    createdDate: string // ISO date
    //priority: 'low' | 'medium' | 'high'
    flagged: boolean
    starred: boolean
    completed: boolean
    archived: boolean
}

export interface TaskDateInfo {
    status: TaskStatus // today, overdue, due, archived
    daysDiff: number
    timeframe: string
}

export type TaskStatus = "today" | "overdue" | "due" | "archived"
export const TaskStatusColor = {
    text: {
        today: "text-blue-500 dark:text-blue-200",
        overdue: "text-rose-400 dark:text-rose-200",
        due: "text-green-500 dark:text-green-200",
        archived: "text-gray-500 dark:text-gray-200"
    },
    border: {
        today: "border-blue-500 dark:border-blue-200",
        overdue: "border-rose-400 dark:border-rose-200",
        due: "border-green-500 dark:border-green-200",
        archived: "border-gray-500 dark:border-gray-200"
    },
    background: {
        today: "bg-blue-500 dark:bg-blue-200",
        overdue: "bg-rose-400 dark:bg-rose-200",
        due: "bg-green-500 dark:bg-green-200",
        archived: "bg-gray-500 dark:bg-gray-200"
    }
}

export const AppSpacing = {
    padding: {
        all: {
            sm: "p-[8px]",
            md: "p-[12px]",
            lg: "p-[24px]",
            xl: "p-[36px]",
            "2xl": "p-[72px]" // new option
        },
        top: {
            sm: "pt-[8px]",
            md: "pt-[12px]",
            lg: "pt-[24px]",
            xl: "pt-[36px]",
            "2xl": "pt-[72px]" // new option
        },
        bottom: {
            sm: "pb-[8px]",
            md: "pb-[12px]",
            lg: "pb-[24px]",
            xl: "pb-[36px]",
            "2xl": "pb-[72px]" // new option
        },
        left: {
            sm: "pl-[8px]",
            md: "pl-[12px]",
            lg: "pl-[24px]",
            xl: "pl-[36px]",
            '2xl': "pl-[72px]" // new option
        },
        right: {
            sm: "pr-[8px]",
            md: "pr-[12px]",
            lg: "pr-[24px]",
            xl: "pr-[36px]",
            "2xl": "pr-[72px]" // new option
        },
        horizontal: {
            sm: "px-[8px]",
            md: "px-[12px]",
            lg: "px-[24px]",
            xl: "px-[36px]",
            "2xl": "px-[72px]" // new option
        },
        vertical: {
            sm: "py-[8px]",
            md: "py-[12px]",
            lg: "py-[24px]",
            xl: "py-[36px]",
            '2xl': "py-[72px]" // new option
        }


    }
}