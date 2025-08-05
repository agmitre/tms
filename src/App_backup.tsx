import { useEffect, useState } from "react"
import { Archive, Circle, CircleCheck, FlagIcon, Funnel } from "lucide-react"
import { Header } from "./components/Header"
import BadgeCounter from "./components/ui/BadgeCounter"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Button } from "./components/ui/button"
import { ListMenu } from "./components/ui/ListMenu"
import { ScrollArea } from "@/components/ui/scroll-area"
import ScheduleView from "@/components/ScheduleView"
import { createTask } from "@/lib/task_utility"
import { nowISO } from "@/lib/global_utility"
import { type AppStorage, loadStorage, saveStorage, selectors } from "@/lib/task_services"
import type { Task } from "@/types/task_models"
import TaskListGrouped from "./components/ui/TaskListGrouped"
import FilterBar from "./components/FilterBar"
import { TaskListView } from "./components/TaskListView"

export default function App() {
  const [storage, setStorage] = useState<AppStorage>(() => loadStorage())
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all")
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all")
  const [filterArchived, setFilterArchived] = useState(false)
  const [filterFlagged, setFilterFlagged] = useState(false)
  const [filterStarred, setFilterStarred] = useState(false)

  const tasks = selectors.tasks(storage)
  const ledgers = selectors.ledgers(storage)
  const taskLists = selectors.taskLists(storage)

  useEffect(() => { saveStorage(storage) }, [storage])

  const addTask = (newTask: Partial<Task>) => {
    createTask(storage, newTask)
    setStorage({ ...storage })
    saveStorage(storage)
  }

  const toggleTask = (id: string) => {
    const task = storage.tasks[id]
    if (!task) return
    task.completed = !task.completed
    task.updatedAt = nowISO()
    setStorage({ ...storage })
    saveStorage(storage)
  }

  const archiveTask = (id: string) => {
    const task = storage.tasks[id]
    if (!task) return
    task.archived = !task.archived
    task.updatedAt = nowISO()
    setStorage({ ...storage })
    saveStorage(storage)
  }

  const deleteTask = (id: string) => {
    if (!storage.tasks[id]) return
    delete storage.tasks[id]
    setStorage({ ...storage })
    saveStorage(storage)
  }

  const editTask = (id: string, updates: Partial<Task>) => {
    const task = storage.tasks[id]
    if (!task) return
    Object.assign(task, updates)
    task.updatedAt = nowISO()
    setStorage({ ...storage })
    saveStorage(storage)
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "pending" && !task.completed) ||
      (filterStatus === "completed" && task.completed)

    const flaggedMatch = filterFlagged ? task.flagged : true
    const starredMatch = filterStarred ? task.starred : true
    const archivedMatch = filterArchived ? task.archived : true

    return statusMatch && flaggedMatch && starredMatch && archivedMatch
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 ease-in-out">
      <Header addTask={addTask} />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pt-4 max-h-[calc(100vh-5rem)]">
        {/* Left Column - Ledger + Lists */}
        <ScrollArea className="max-h-[calc(100vh-5rem)] pr-2">
          <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 pt-2 pb-4">
            <h2 className="text-2xl font-bold">Ledger</h2>
            <ListMenu items={[{ id: "all", label: "All" }, { id: "work", label: "Work" }, { id: "personal", label: "Personal" }]} />
            <h2 className="text-2xl font-bold mt-4">Lists</h2>
            <ListMenu items={[{ id: "all", label: "All Tasks" }, { id: "ideas", label: "Ideas" }]} />
          </div>
        </ScrollArea>

        {/* Middle Column - Schedule */}
        <ScrollArea className="max-h-[calc(100vh-5rem)] pr-2">
          <ScheduleView tasks={tasks} />
        </ScrollArea>

        {/* Right Column - Task List */}
        <ScrollArea className="max-h-[calc(100vh-5rem)] pr-2">
          <TaskListView tasks={filteredTasks} onToggleComplete={toggleTask} onArchive={archiveTask} onDelete={deleteTask} onEdit={editTask} />
        </ScrollArea>
      </main>
    </div>
  )
}