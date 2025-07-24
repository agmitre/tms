// src/types.ts
// Define a Task Model
export interface Task {
    id: number
    title: string
    description: string
    dueDate: string // ISO date
    createdDate: string // ISO date
    priority: 'low' | 'medium' | 'high'
    completed: boolean
    archived: boolean
}

export interface TaskDateInfo {
    status: TaskStatus // today, overdue, due, archived
    daysDiff: number
    timeframe: string
}

export type TaskStatus = "today" | "overdue" | "due" | "archived" 