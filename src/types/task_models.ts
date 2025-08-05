// types/task_models.ts
//All task realated definitions should live here

import type { ISODateString, UUID } from "./types";

export interface BaseEntity { //to reuse for each type to reduce code size
    id: UUID; //this will autoasign an id to each element that extents 
    createdAt: ISODateString
    updatedAt: ISODateString
    archived: boolean
    order?: number //for future implementing or user drag and drop order
}

// ====== Ledget element
export interface Ledger extends BaseEntity {
    name: string
    description?: string // optional
    color?: string //hex or tailwind token for custom color -- future implementation
    icon?: string //emoji or icon key for custom icon -- future implementation
}

// ====== TaskList element
export interface TaskList extends BaseEntity {
    name: string
    ledgerId: UUID; //parent ledger
}

// ======= Define a Task Model
export interface Task extends BaseEntity {
    title: string
    description?: string
    dueDate?: ISODateString // ISO date, undefined if not set
    endDate?:ISODateString // ISO date, undefined if not set
    flagged: boolean
    starred: boolean
    completed: boolean
    taskListId: UUID
    ledgerId: UUID
}

////========= Define a new task model
// export type TaskInput = {
//     title: string;
//     description?: string;
//     dueDate?: string;
//     flagged?: boolean;
//     starred?: boolean;
//     completed?: boolean;
//     archived?: boolean;

//     // ✅ Optional placement
//     ledgerId?: UUID;
//     taskListId?: UUID;
// };

// Names we’ll standardize on for the “safety net” containers
export const UNASSIGNED_LEDGER_NAME = "Unassigned";
export const UNASSIGNED_LIST_NAME = "Unassigned";




/////!!!!!!!!!!!!!!! to be redefined and worked better in utils !!!!!!!!!

export interface TaskDateInfo {
    status: TaskDueStatus // "today" | "overdue" | "due" | "pending" | "completed"
    daysDiff: number
    timeframe: string
}

export type TaskDueStatus = "today" | "overdue" | "due" | "pending" | "completed"

// today: "Today",
// overdue: "Overdue",
// due: "Upcoming",
// pending: "No Due Date",
// completed: "Completed",