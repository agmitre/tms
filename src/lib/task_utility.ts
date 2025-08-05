// types/task_utility.ts
import { nowISO } from "./global_utility";
import { UNASSIGNED_LEDGER_NAME, type BaseEntity, type Ledger, type Task, type TaskDateInfo, type TaskDueStatus, type TaskList } from "../types/task_models";
import type { AppStorage } from "./task_services";
import type { UUID } from "@/types/types";

// Utility: make a fresh entity base
export const makeBase = (): Pick<BaseEntity, "id" | "createdAt" | "updatedAt" | "archived"> => ({
    id: crypto.randomUUID(),
    createdAt: nowISO(),
    updatedAt: nowISO(),
    archived: false
})

/**
 * Ensure the store has an Unassigned Ledger and an Unassigned List.
 * Returns both (existing or newly created).
 */

export function ensureUnassigned(store: AppStorage): { ledger: Ledger; list: TaskList } {

    // 1- Find or create the Unassigned ledger
    let ledger = Object.values(store.ledgers).find(l => l.name === UNASSIGNED_LEDGER_NAME);

    if (!ledger) {
        ledger = {
            ...makeBase(),
            name: UNASSIGNED_LEDGER_NAME,
            color: "#FDE047", // ~yellow-300 (optional)
            icon: "📥",
        }
        store.ledgers[ledger.id] = ledger;
    }

    // 2- Find or create the Unassigned list under that ledger
    let list = Object.values(store.taskLists).find(tl => tl.ledgerId === ledger.id && tl.name === UNASSIGNED_LEDGER_NAME);

    if (!list) {
        list = {
            ...makeBase(),
            name: UNASSIGNED_LEDGER_NAME,
            ledgerId: ledger.id
        }
        store.taskLists[list.id] = list;
    }

    return { ledger, list };
}

/**
 * Create a Task, automatically dropping it into Unassigned if
 * ledgerId or taskListId aren’t provided (or are invalid).
 */

export function createTask(
    store: AppStorage,
    input: Partial<Task>
): Task {
    const base = makeBase();

    // Resolve placement
    let ledgerId = input.ledgerId;
    let taskListId = input.taskListId;

    const isValidLedger = (id?: UUID) => !!id && !!store.ledgers[id]; // check if it has a valid ledgerid
    const isValidTaskList = (id?: UUID) => !!id && !!store.taskLists[id]; // check if it has a valid TaskList id

    // If list is provided but ledger is missing, infer ledger from the list
    if (!ledgerId && isValidTaskList(taskListId)) {
        ledgerId = store.taskLists[taskListId!].ledgerId;
    }

    // If anything is missing/invalid, fall back to Unassigned
    if (!isValidLedger(ledgerId) || !isValidTaskList(taskListId)) {
        const { ledger, list } = ensureUnassigned(store);
        ledgerId = ledger.id;
        taskListId = list.id;
    }

    // generate final task to be created with previous Ids
    const task: Task = {
        ...base,
        title: input.title?.trim() || "Untitled",
        description: input.description?.trim() || undefined,
        dueDate: input.dueDate || undefined,
        flagged: input.flagged ?? false,
        starred: input.starred ?? false,
        completed: input.completed ?? false,
        archived: input.archived ?? false,
        ledgerId: input.ledgerId ?? "", // fallback to Unassigned
        taskListId: input.taskListId ?? "", // fallback to Unassigned
    };

    store.tasks[task.id] = task;
    return task;
}


/**
 * Move a task to a different list (and auto-sync the denormalized ledgerId).
 * If the target is invalid, move to Unassigned.
 */

export function moveTaskTo(store: AppStorage, taskId: UUID, targetListId?: UUID) {
    const task = store.tasks[taskId];
    if (!task || task.taskListId === targetListId!) return // if the task does not exist or if taskListId is thesame do nothing

    if (targetListId && store.taskLists[targetListId]) {
        const target = store.taskLists[targetListId]
        task.taskListId = target.id
        task.ledgerId = target.ledgerId
    } else {
        const { ledger, list } = ensureUnassigned(store);
        task.taskListId = list.id
        task.ledgerId = ledger.id
    }
    task.updatedAt = nowISO()
    return task
}



// today: "Today",
// overdue: "Overdue",
// due: "Upcoming",
// pending: "No Due Date",
// completed: "Completed",

//xxxxxxxxxxx Handle task data and sorting
export function getTaskStatus(task: Task): TaskDueStatus {
    if (task.completed) return "completed"
    if (!task.completed && !task.dueDate) return "pending"

    //if (task.dueDate === "") return "due"

    const today = new Date();
    const due = new Date(task.dueDate!);
    const diff = Math.ceil((due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)); // Get day diff only
    //console.log(today + "=" + due)
    if (diff < 0) return "overdue"; //negative days mean overdue
    if (diff === 0) return "today"; // 0 days diff means today
    return "due" // else its upcoming
}

export function getTaskDateInfo(task: Task): TaskDateInfo {

    const status: TaskDueStatus = getTaskStatus(task);

    const today = new Date();
    const date = task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt); //se the date to check, if its does not have due date, then use createdAt
    const diffTime = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    var timeframe = ""

    if (daysDiff < 0) {
        timeframe = daysDiff === -1 ? "Yesterday" : `${Math.abs(daysDiff)} days ago`;
    } else if (daysDiff > 0) {
        timeframe = daysDiff === 1 ? "Tomorrow" : `in ${Math.abs(daysDiff)} days`;
    } else {
        timeframe = "Today"
    }
    //console.log("diffTime: " + diffTime + " | daysDiff: " + daysDiff)

    return { status, daysDiff, timeframe }
}
//xxxxxxxxxx

