import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { ListMenu } from "./components/ui/ListMenu"
import { ScrollArea } from "@/components/ui/scroll-area"
import ScheduleView from "@/components/ScheduleView"
import { createTask } from "@/lib/task_utility"
import { nowISO } from "@/lib/global_utility"
import { type AppStorage, loadStorage, saveStorage, selectors } from "@/lib/task_services"
import type { Task } from "@/types/task_models"
import { TaskListView } from "./components/TaskListView"
import { SideBarView } from "./components/sideBarView"
import { TopBarView } from "./components/topBarView"
import { cn } from "./lib/utils"

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

  //============ responsive design handlers
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [showRightSidebar, setShowRightSidebar] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024) // lg breakpoint
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div id="app-container" className={cn(
      "min-h-screen w-screen",
      " bg-gray-100 dark:bg-gray-900",
      "text-gray-900 dark:text-white",
      "transition-all duration-300 ease-in-out"

    )}>
      <div className="flex flex-col h-full gap-4">

        {/* Top Bar - only for small screens */}
        {isSmallScreen && (
          <div className="w-full h-16 flex items-center justify-center sticky top-0 z-100">
            <TopBarView />
          </div>
        )}

        <div className="flex flex-1 gap-12">

          {/* Left Sidebar - hidden on small screens */}
          {!isSmallScreen && (
            <aside className={cn(
              "flex flex-col items-center pl-8 sticky top-0 z-100",
              "max-w-[140px] min-w-[80px]")
            }>
              <SideBarView />
            </aside>
          )}

          {/* Center Content */}
          <main className="flex-1 min-w-0 rounded-md p-4 overflow-y-auto">
            <ScheduleView tasks={tasks} />
          </main>

          {/* Right Sidebar - visible and toggleable */}
          <aside
            className={
              cn(
                "transition-all duration-300 ease-in-out overflow-auto",
                showRightSidebar ? (isSmallScreen ? "max-w-sm" : "max-w-md")
                  : "w-full"
              )}
          >
            {showRightSidebar && (
              <div className="h-full p-4">
                <ScrollArea className="max-h-[calc(100vh-5rem)] pr-2">
                  <TaskListView tasks={filteredTasks} onToggleComplete={toggleTask} onArchive={archiveTask} onDelete={deleteTask} onEdit={editTask} />
                </ScrollArea>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  )
}