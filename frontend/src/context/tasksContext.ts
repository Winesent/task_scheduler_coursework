import { createContext, useContext } from 'react'

import type { NewTaskData, Task } from '@my-app/ui-library'

export interface TasksContextValue {
  tasks: Task[]
  addTask: (data: NewTaskData) => Task
  changeTaskCompletion: (taskId: string, completed: boolean) => void
}

export const initialTasks: Task[] = [
  { id: 'task-1', title: 'Утренняя зарядка', time: '07:30', repeat: 'daily', completed: true },
  { id: 'task-2', title: 'Подготовить план на день', time: '08:15', repeat: 'weekdays', completed: false },
  { id: 'task-3', title: 'Изучить TypeScript', time: '10:00', repeat: 'none', completed: false },
  { id: 'task-4', title: 'Обеденный перерыв', time: '13:00', repeat: 'daily', completed: false },
  { id: 'task-5', title: 'Позвонить другу', time: '18:30', repeat: 'weekly', completed: false },
]

export const TasksContext = createContext<TasksContextValue | null>(null)

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks должен использоваться внутри TasksProvider')
  }

  return context
}
