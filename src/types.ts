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