import type { Task, TaskDateInfo, TaskStatus } from "@/types/types"


//xxxxxxxxxxx Local Storage
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
//xxxxxxxxxx

//xxxxxxxxxxx Handle task data and sorting
export function getTaskStatus(task: Task): TaskStatus {
    if (task.archived) return "archived"
    if (!task.dueDate) return "due"
    //if (task.dueDate === "") return "due"

    const today = new Date();
    const due = new Date(task.dueDate ?? task.createdDate);
    const diff = Math.ceil((due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)); // Get day diff only
    console.log(today + "=" + due)
    if (diff < 0) return "overdue";
    if (diff === 0) return "today";
    return "due"
}

export function getTaskDateInfo(task: Task): TaskDateInfo {

    const status: TaskStatus = getTaskStatus(task);

    const today = new Date();
    const date = new Date(task.dueDate != "" ? task.dueDate : task.createdDate);
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