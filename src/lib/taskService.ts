import type { Task } from "@/types"

const STORAGE_KEY = "tasks"

export function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    try {
        return storedTasks ? JSON.parse(storedTasks) : []
    } catch (error) {
        console.error("Error parsing tasks from localStorage:", error)
        return []
    }
}

export function saveTasks(tasks: Task[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
        console.error("Error saving tasks to localStorage:", error)
    }
}