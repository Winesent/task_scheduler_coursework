import { useState, type ReactNode } from 'react'

import { initialTasks, TasksContext } from './tasksContext'

import type { NewTaskData, Task } from '@my-app/ui-library'

export interface TasksProviderProps {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function addTask(data: NewTaskData): Task {
    const newTask: Task = {
      ...data,
      id: globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      completed: false,
    }

    setTasks((current) => [...current, newTask])

    return newTask
  }

  function changeTaskCompletion(taskId: string, completed: boolean) {
    setTasks((current) => current.map((task) => (
      task.id === taskId ? { ...task, completed } : task
    )))
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, changeTaskCompletion }}>
      {children}
    </TasksContext.Provider>
  )
}
