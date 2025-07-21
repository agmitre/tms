// src/types.ts
// Define a Task Model
export interface Task {
    id: Number
    title: String
    description: String
    dueDate: string // ISO date
    priority: 'low' | 'medium' | 'high'
    completed: boolean
}