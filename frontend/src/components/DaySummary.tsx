import { NotificationBadge } from '@my-app/ui-library'

import type { Task } from '@my-app/ui-library'

export interface DaySummaryProps {
  tasks: Task[]
}

export function DaySummary({ tasks }: DaySummaryProps) {
  const completedCount = tasks.filter((task) => task.completed).length
  const activeRemindersCount = tasks.filter((task) => !task.completed).length

  return (
    <section className="summary-strip" aria-label="Сводка задач">
      <div className="summary-icon" aria-hidden="true">☷</div>
      <div className="summary-copy">
        <strong>Ваш день под контролем</strong>
        <span>
          {tasks.length === 0 ? 'Начните с первой задачи' : `${completedCount} из ${tasks.length} задач выполнено`}
        </span>
      </div>
      <NotificationBadge count={activeRemindersCount} enabled />
      <div className="progress-track" aria-label="Прогресс выполнения">
        <span style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }} />
      </div>
    </section>
  )
}
