
// lib/task_services.ts

import type { Ledger, Task, TaskList } from "@/types/task_models"
import type { UUID } from "@/types/types"
import { createTask, ensureUnassigned } from "./task_utility"


//xxxxxxxxxxx Local Storage v02 (Width ledger and TaskLists)

// ---- App State to handle all app configs for local storage

export type AppStorage = {
    version: 2
    ledgers: Record<UUID, Ledger>
    taskLists: Record<UUID, TaskList>
    tasks: Record<UUID, Task>
    // Pending add user prefs, filters, etc., here later
}

// ---- Storage keys
const STORAGE_KEY_V1 = "tasks" // old key for v01 storage
const STORAGE_KEY_V2 = "taskel_state_v2" // new key for v02 storage


// Shape of old tasks (for migration)
type OldTaskV1 = {
    id: number;
    title: string;
    description: string;
    dueDate: string;      // ISO
    createdDate: string;  // ISO
    flagged: boolean;
    starred: boolean;
    completed: boolean;
    archived: boolean;
};


// Load entire store. Tries v2; if missing, migrates v1 tasks into Unassigned.
export function loadStorage(): AppStorage {
    // 1) Try new v2 state
    const raw = localStorage.getItem(STORAGE_KEY_V2)
    if (raw) {
        try {
            return JSON.parse(raw)
        } catch (e) {
            console.error("Error parsing v2 state from localStorage:", e)
        }
    }

    // 2) Try migrate from old "tasks"
    const rawV1 = localStorage.getItem(STORAGE_KEY_V1)
    if (rawV1) {
        try {
            const oldTasks = JSON.parse(rawV1) as OldTaskV1[]
            const store: AppStorage = {
                version: 2, ledgers: {}, taskLists: {}, tasks: {}
            }
            // Make sure Unassigned ledger/list exist
            ensureUnassigned(store);
            // Migrate each task
            for (const ot of oldTasks) {
                const t = createTask(store, {
                    title: ot.title,
                    description: ot.description,
                    dueDate: ot.dueDate,
                    flagged: ot.flagged,
                    starred: ot.starred,
                    completed: ot.completed,
                    archived: ot.archived,
                    // no ledgerId/taskListId → helper will place into Unassigned
                })
                // Preserve original created date if it existed
                if (ot.createdDate) {
                    store.tasks[t.id].createdAt = ot.createdDate;
                }

            }

            saveStorage(store);
            return store

        } catch (e) {
            console.error("Failed migrating v1 tasks to V2:", e)
        }
    }

    // 3) Fresh store
    const fresh: AppStorage = {
        version: 2,
        ledgers: {},
        taskLists: {},
        tasks: {}
    }
    saveStorage(fresh)
    return fresh
}


//xxxxxxxxxx Save Local Storage V02

export function saveStorage(store: AppStorage) {
    try {
        localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(store))
    } catch (e) {
        console.error("Error saving state to localStorage:", e)
    }
}
//xxxxxxxxxx


/** Convenience selectors (arrays for UI mapping) */
export const selectors = {
    ledgers: (s: AppStorage) => Object.values(s.ledgers),
    taskLists: (s: AppStorage) => Object.values(s.taskLists),
    tasks: (s: AppStorage) => Object.values(s.tasks),
};


//xxxxxxxxxxx Local Storage V01 ---> migration implemented above in V02
//const STORAGE_KEY = "tasks"   -->>> defined above for migration

// export function loadTasks(): Task[] {
//     const storedTasks = localStorage.getItem(STORAGE_KEY_V1)
//     try {
//         return storedTasks ? JSON.parse(storedTasks) : []
//     } catch (error) {
//         console.error("Error parsing tasks from localStorage:", error)
//         return []
//     }
// }

// export function saveTasks(tasks: Task[]) {
//     try {
//         localStorage.setItem(STORAGE_KEY_V1, JSON.stringify(tasks))
//     } catch (error) {
//         console.error("Error saving tasks to localStorage:", error)
//     }
// }
//xxxxxxxxxx
