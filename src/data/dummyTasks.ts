import { Task } from "../types";

export const dummyTasks: Task[] = [
    {
        id: 1,
        title: 'Finish portfolio site',
        description: 'Create task manages and deploy',
        dueDate: '2025-07-25',
        priority: 'high',
        completed: false
    },
    {
        id: 2,
        title: 'Update resume',
        description: 'Include recent projects and skills',
        dueDate: '2023-11-15',
        priority: 'medium',
        completed: true
    },
    {
        id: 3,
        title: 'Read a book on design patterns',
        description: 'Enhance problem-solving skills',
        dueDate: '2024-01-31',
        priority: 'low',
        completed: false
    }
]